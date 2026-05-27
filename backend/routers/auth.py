from fastapi import APIRouter, Depends, HTTPException, status
import requests
from database import get_db
from schemas import api_schemas
import os
import jwt
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth", tags=["auth"])

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "YOUR_GOOGLE_CLIENT_ID")
JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-key-change-in-prod")
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)

@router.post("/google", response_model=dict)
async def google_auth(token: str, role: str, db = Depends(get_db)):
    try:
        # Verify Google Access Token by calling UserInfo endpoint
        user_info_url = "https://www.googleapis.com/oauth2/v3/userinfo"
        resp = requests.get(user_info_url, headers={"Authorization": f"Bearer {token}"})
        if resp.status_code != 200:
            raise ValueError(f"Invalid access token: {resp.text}")
            
        idinfo = resp.json()
        email = idinfo['email']
        name = idinfo.get('name', '')
        google_id = idinfo['sub']

        # Check if user exists
        user = db.users.find_one({"email": email})
        if not user:
            user_doc = {
                "google_id": google_id,
                "email": email,
                "name": name,
                "role": role,
                "created_at": datetime.utcnow()
            }
            result = db.users.insert_one(user_doc)
            user = db.users.find_one({"_id": result.inserted_id})

        # Generate JWT token
        user_id_str = str(user["_id"])
        access_token = create_access_token(data={"sub": user["email"], "role": user["role"], "id": user_id_str})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user_id_str,
                "email": user["email"],
                "name": user["name"],
                "role": user["role"]
            }
        }
    except ValueError as e:
        print(f"Google Auth Error: {e}")
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {str(e)}")

@router.post("/demo", response_model=dict)
async def demo_auth(role: str, db = Depends(get_db)):
    # Demo bypass for local development testing
    demo_email = f"demo_{role}@example.com"
    demo_name = f"Demo {role.capitalize()}"
    google_id = f"demo_id_{role}"

    user = db.users.find_one({"email": demo_email})
    if not user:
        user_doc = {
            "google_id": google_id,
            "email": demo_email,
            "name": demo_name,
            "role": role,
            "created_at": datetime.utcnow()
        }
        result = db.users.insert_one(user_doc)
        user = db.users.find_one({"_id": result.inserted_id})

    user_id_str = str(user["_id"])
    access_token = create_access_token(data={"sub": user["email"], "role": user["role"], "id": user_id_str})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id_str,
            "email": user["email"],
            "name": user["name"],
            "role": user["role"]
        }
    }

def get_current_user(token: str, db):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.users.find_one({"email": email})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        # Ensure we return ID as string for compatibility
        user["id"] = str(user["_id"])
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

# Secure Admin Endpoint to view the database
@router.get("/admin/users")
async def secure_get_users(secret: str, db = Depends(get_db)):
    admin_secret = os.getenv("ADMIN_SECRET", "super-secret-admin-key")
    if secret != admin_secret:
        raise HTTPException(status_code=403, detail="Forbidden: Incorrect admin secret")
    
    users = list(db.users.find())
    return [{"id": str(u["_id"]), "email": u["email"], "name": u.get("name", ""), "role": u.get("role", ""), "created_at": str(u.get("created_at", ""))} for u in users]
