from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import requests
from database import get_db
import db_models
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
async def google_auth(token: str, role: str, db: Session = Depends(get_db)):
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
        user = db.query(db_models.User).filter(db_models.User.email == email).first()
        if not user:
            user = db_models.User(
                google_id=google_id,
                email=email,
                name=name,
                role=role
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Generate JWT token
        access_token = create_access_token(data={"sub": user.email, "role": user.role, "id": user.id})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "role": user.role
            }
        }
    except ValueError as e:
        print(f"Google Auth Error: {e}")
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {str(e)}")

@router.post("/demo", response_model=dict)
async def demo_auth(role: str, db: Session = Depends(get_db)):
    # Demo bypass for local development testing
    demo_email = f"demo_{role}@example.com"
    demo_name = f"Demo {role.capitalize()}"
    google_id = f"demo_id_{role}"

    user = db.query(db_models.User).filter(db_models.User.email == demo_email).first()
    if not user:
        user = db_models.User(
            google_id=google_id,
            email=demo_email,
            name=demo_name,
            role=role
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token(data={"sub": user.email, "role": user.role, "id": user.id})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role
        }
    }

def get_current_user(token: str, db: Session):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(db_models.User).filter(db_models.User.email == email).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

@router.get("/users")
async def get_all_users(db: Session = Depends(get_db)):
    users = db.query(db_models.User).all()
    return [{"id": u.id, "email": u.email, "name": u.name, "role": u.role, "created_at": str(u.created_at)} for u in users]
