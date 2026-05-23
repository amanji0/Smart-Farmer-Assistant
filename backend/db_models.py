from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    google_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    role = Column(String)  # 'farmer' or 'vendor'
    
    # Relationships
    listings = relationship("Listing", back_populates="farmer")

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("users.id"))
    crop_name = Column(String, index=True)
    quantity_kg = Column(Float)
    price_per_kg = Column(Float)
    description = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    status = Column(String, default="available")  # available, sold_out
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    farmer = relationship("User", back_populates="listings")
    transactions = relationship("Transaction", back_populates="listing")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    listing_id = Column(Integer, ForeignKey("listings.id"))
    vendor_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    razorpay_order_id = Column(String, unique=True, index=True)
    razorpay_payment_id = Column(String, unique=True, index=True, nullable=True)
    status = Column(String, default="pending")  # pending, successful, failed
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    listing = relationship("Listing", back_populates="transactions")
    vendor = relationship("User")
