from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests
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
        # Verify Google token
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
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
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")

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
