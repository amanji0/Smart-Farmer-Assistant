import asyncio
from fastapi import BackgroundTasks
from database import get_db
from passlib.context import CryptContext
from datetime import datetime
import random

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def get_password_hash(password):
    return pwd_context.hash(password)

class Req:
    email = "test@test.com"
    password = "pass"
    role = "farmer"
    name = "Bona"

req = Req()
print("Hashing...")
get_password_hash(req.password)
print("Done hashing.")
