from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import get_db
import db_models
from schemas import api_schemas
from routers.auth import get_current_user
import razorpay
import os

router = APIRouter(prefix="/marketplace", tags=["marketplace"])

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "rzp_test_yourkey")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "your_secret")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

def get_user_from_token(authorization: str = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    token = authorization.split(" ")[1]
    return get_current_user(token, db)

@router.post("/listings", response_model=api_schemas.ListingResponse)
def create_listing(listing: api_schemas.ListingCreate, db: Session = Depends(get_db), current_user: db_models.User = Depends(get_user_from_token)):
    if current_user.role != "farmer":
        raise HTTPException(status_code=403, detail="Only farmers can create listings")
    
    db_listing = db_models.Listing(**listing.dict(), farmer_id=current_user.id)
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return db_listing

@router.get("/listings", response_model=list[api_schemas.ListingResponse])
def get_listings(db: Session = Depends(get_db)):
    return db.query(db_models.Listing).filter(db_models.Listing.status == "available").all()

@router.post("/buy/{listing_id}")
def buy_listing(listing_id: int, amount_kg: float, db: Session = Depends(get_db), current_user: db_models.User = Depends(get_user_from_token)):
    if current_user.role != "vendor":
        raise HTTPException(status_code=403, detail="Only vendors can buy")

    listing = db.query(db_models.Listing).filter(db_models.Listing.id == listing_id).first()
    if not listing or listing.status != "available":
        raise HTTPException(status_code=404, detail="Listing not available")
    
    if amount_kg > listing.quantity_kg:
        raise HTTPException(status_code=400, detail="Not enough quantity available")

    # Create Razorpay Order
    total_price = amount_kg * listing.price_per_kg
    order_amount = int(total_price * 100) # Razorpay expects amount in paise
    order_currency = "INR"

    try:
        razorpay_order = client.order.create(dict(amount=order_amount, currency=order_currency, receipt=f"receipt_{listing_id}"))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Create Transaction Record
    transaction = db_models.Transaction(
        listing_id=listing.id,
        vendor_id=current_user.id,
        amount=total_price,
        razorpay_order_id=razorpay_order['id'],
        status="pending"
    )
    db.add(transaction)
    db.commit()

    return {"order_id": razorpay_order['id'], "amount": order_amount, "currency": order_currency}

@router.post("/verify")
def verify_payment(razorpay_order_id: str, razorpay_payment_id: str, razorpay_signature: str, db: Session = Depends(get_db)):
    try:
        client.utility.verify_payment_signature({
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        })
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Signature Verification Failed")

    transaction = db.query(db_models.Transaction).filter(db_models.Transaction.razorpay_order_id == razorpay_order_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    transaction.status = "successful"
    transaction.razorpay_payment_id = razorpay_payment_id

    # Update Listing Quantity
    listing = db.query(db_models.Listing).filter(db_models.Listing.id == transaction.listing_id).first()
    # Assuming the transaction bought all for now, to be complex later
    listing.status = "sold_out"
    
    db.commit()
    return {"status": "Payment Successful"}
