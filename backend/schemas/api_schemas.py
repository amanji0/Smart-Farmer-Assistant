from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    google_id: str
    role: str

class UserResponse(UserBase):
    id: int
    role: str

    class Config:
        from_attributes = True

class ListingBase(BaseModel):
    crop_name: str
    quantity_kg: float
    price_per_kg: float
    description: Optional[str] = None
    image_url: Optional[str] = None

class ListingCreate(ListingBase):
    pass

class ListingResponse(ListingBase):
    id: int
    farmer_id: int
    status: str
    created_at: datetime
    farmer: Optional[UserResponse] = None

    class Config:
        from_attributes = True

class TransactionCreate(BaseModel):
    listing_id: int
    amount: float

class TransactionResponse(BaseModel):
    id: int
    listing_id: int
    vendor_id: int
    amount: float
    razorpay_order_id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
