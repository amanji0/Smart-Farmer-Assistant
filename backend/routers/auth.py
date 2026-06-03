from fastapi import APIRouter, Depends, HTTPException, status, Body, BackgroundTasks
import requests
from database import get_db
import os
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from utils.email_sender import send_verification_email, send_login_notification
import random
from bson.objectid import ObjectId
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter(prefix="/auth", tags=["auth"])

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "YOUR_GOOGLE_CLIENT_ID")
JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-key-change-in-prod")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    role: str
    name: Optional[str] = ""

class VerifyRequest(BaseModel):
    email: EmailStr
    otp: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ProfileUpdateRequest(BaseModel):
    address: str

# --- Native Auth Endpoints ---

@router.post("/register")
async def register_user(req: RegisterRequest, background_tasks: BackgroundTasks, db = Depends(get_db)):
    # Check if user exists
    existing = db.users.find_one({"email": req.email})
    if existing:
        if existing.get("is_verified", True):
            raise HTTPException(status_code=400, detail="User already exists and is verified")
        else:
            # Re-generate OTP for unverified user
            otp = str(random.randint(100000, 999999))
            db.users.update_one({"_id": existing["_id"]}, {"$set": {
                "password_hash": get_password_hash(req.password),
                "role": req.role,
                "name": req.name,
                "otp": otp,
                "otp_created_at": datetime.utcnow()
            }})
            background_tasks.add_task(send_verification_email, req.email, otp)
            return {"message": "OTP resent to email. Please verify."}

    # New user
    otp = str(random.randint(100000, 999999))
    user_doc = {
        "email": req.email,
        "password_hash": get_password_hash(req.password),
        "role": req.role,
        "name": req.name,
        "is_verified": False,
        "otp": otp,
        "otp_created_at": datetime.utcnow(),
        "created_at": datetime.utcnow()
    }
    db.users.insert_one(user_doc)
    
    background_tasks.add_task(send_verification_email, req.email, otp)
    return {"message": "Registration successful. Please check your email for the OTP."}

@router.post("/verify")
async def verify_user(req: VerifyRequest, background_tasks: BackgroundTasks, db = Depends(get_db)):
    user = db.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.get("is_verified"):
        raise HTTPException(status_code=400, detail="User is already verified")
    
    if user.get("otp") != req.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
        
    # Check OTP expiration (e.g., 10 minutes)
    otp_time = user.get("otp_created_at")
    if not otp_time or (datetime.utcnow() - otp_time).total_seconds() > 600:
        raise HTTPException(status_code=400, detail="OTP expired. Please register again to get a new OTP.")

    db.users.update_one({"_id": user["_id"]}, {"$set": {"is_verified": True}, "$unset": {"otp": "", "otp_created_at": ""}})
    
    user_id_str = str(user["_id"])
    access_token = create_access_token(data={"sub": user["email"], "role": user["role"], "id": user_id_str})
    
    background_tasks.add_task(send_login_notification, user["email"], user.get("name", ""), user["role"])

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id_str,
            "email": user["email"],
            "name": user.get("name", ""),
            "role": user["role"],
            "address": user.get("address", "")
        }
    }

@router.post("/login")
async def login_user(req: LoginRequest, background_tasks: BackgroundTasks, db = Depends(get_db)):
    user = db.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Allow login if it's a google user that hasn't set a password?
    # Usually we separate them, but if password_hash doesn't exist:
    if not user.get("password_hash"):
        raise HTTPException(status_code=401, detail="Account was created using Google. Please use Google Login.")
    
    if not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    if not user.get("is_verified", True):
        raise HTTPException(status_code=403, detail="Email is not verified. Please verify your email first.")

    user_id_str = str(user["_id"])
    access_token = create_access_token(data={"sub": user["email"], "role": user["role"], "id": user_id_str})
    
    background_tasks.add_task(send_login_notification, user["email"], user.get("name", ""), user["role"])

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id_str,
            "email": user["email"],
            "name": user.get("name", ""),
            "role": user["role"],
            "address": user.get("address", "")
        }
    }

# --- Existing Google / Demo Endpoints ---

@router.post("/google", response_model=dict)
async def google_auth(token: str, role: str, background_tasks: BackgroundTasks, db = Depends(get_db)):
    try:
        user_info_url = "https://www.googleapis.com/oauth2/v3/userinfo"
        resp = requests.get(user_info_url, headers={"Authorization": f"Bearer {token}"})
        if resp.status_code != 200:
            raise ValueError(f"Invalid access token: {resp.text}")
            
        idinfo = resp.json()
        email = idinfo['email']
        name = idinfo.get('name', '')
        google_id = idinfo['sub']

        user = db.users.find_one({"email": email})
        if not user:
            user_doc = {
                "google_id": google_id,
                "email": email,
                "name": name,
                "role": role,
                "is_verified": True,
                "created_at": datetime.utcnow()
            }
            result = db.users.insert_one(user_doc)
            user = db.users.find_one({"_id": result.inserted_id})

        user_id_str = str(user["_id"])
        access_token = create_access_token(data={"sub": user["email"], "role": user["role"], "id": user_id_str})
        
        background_tasks.add_task(send_login_notification, user["email"], user.get("name", ""), user["role"])

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user_id_str,
                "email": user["email"],
                "name": user.get("name", ""),
                "role": user["role"],
                "address": user.get("address", "")
            }
        }
    except ValueError as e:
        print(f"Google Auth Error: {e}")
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {str(e)}")

@router.post("/demo", response_model=dict)
async def demo_auth(role: str, background_tasks: BackgroundTasks, db = Depends(get_db)):
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
            "is_verified": True,
            "created_at": datetime.utcnow()
        }
        result = db.users.insert_one(user_doc)
        user = db.users.find_one({"_id": result.inserted_id})

    user_id_str = str(user["_id"])
    access_token = create_access_token(data={"sub": user["email"], "role": user["role"], "id": user_id_str})
    
    background_tasks.add_task(send_login_notification, user["email"], user.get("name", ""), user["role"])
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id_str,
            "email": user["email"],
            "name": user.get("name", ""),
            "role": user["role"],
            "address": user.get("address", "")
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

# Helper to decode token from authorization header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
security = HTTPBearer()

def get_current_user_from_token(credentials: HTTPAuthorizationCredentials = Depends(security), db = Depends(get_db)):
    token = credentials.credentials
    return get_current_user(token, db)


# --- Profile Endpoints ---

@router.get("/me")
async def get_my_profile(current_user = Depends(get_current_user_from_token)):
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "name": current_user.get("name", ""),
        "role": current_user.get("role", ""),
        "address": current_user.get("address", "")
    }

@router.put("/profile")
async def update_my_profile(req: ProfileUpdateRequest, current_user = Depends(get_current_user_from_token), db = Depends(get_db)):
    db.users.update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$set": {"address": req.address}}
    )
    return {"message": "Profile updated successfully", "address": req.address}

@router.delete("/delete")
async def delete_my_account(current_user = Depends(get_current_user_from_token), db = Depends(get_db)):
    # Delete the user
    result = db.users.delete_one({"_id": ObjectId(current_user["id"])})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
        
    # Also delete their listings if any
    db.listings.delete_many({"seller_id": current_user["id"]})
    return {"message": "Account deleted successfully"}

# Secure Admin Endpoint to view the database
@router.get("/admin/users")
async def secure_get_users(secret: str, db = Depends(get_db)):
    admin_secret = os.getenv("ADMIN_SECRET", "super-secret-admin-key")
    if secret != admin_secret:
        raise HTTPException(status_code=403, detail="Forbidden: Incorrect admin secret")
    
    users = list(db.users.find())
    return [{"id": str(u["_id"]), "email": u["email"], "name": u.get("name", ""), "role": u.get("role", ""), "is_verified": u.get("is_verified", True), "created_at": str(u.get("created_at", ""))} for u in users]
