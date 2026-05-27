from fastapi import APIRouter, Depends, HTTPException, Header
from database import get_db
from schemas import api_schemas
from routers.auth import get_current_user
import razorpay
import os
from datetime import datetime
from bson.objectid import ObjectId
from bson.errors import InvalidId

router = APIRouter(prefix="/marketplace", tags=["marketplace"])

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "rzp_test_yourkey")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "your_secret")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

def get_user_from_token(authorization: str = Header(None), db = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    token = authorization.split(" ")[1]
    return get_current_user(token, db)

@router.post("/listings", response_model=api_schemas.ListingResponse)
def create_listing(listing: api_schemas.ListingCreate, db = Depends(get_db), current_user = Depends(get_user_from_token)):
    if current_user.get("role") != "farmer":
        raise HTTPException(status_code=403, detail="Only farmers can create listings")
    
    listing_doc = listing.dict()
    listing_doc["farmer_id"] = current_user["id"]
    listing_doc["status"] = "available"
    listing_doc["created_at"] = datetime.utcnow()

    result = db.listings.insert_one(listing_doc)
    
    # Format for response
    listing_doc["id"] = str(result.inserted_id)
    return listing_doc

@router.get("/listings", response_model=list[api_schemas.ListingResponse])
def get_listings(db = Depends(get_db)):
    listings_cursor = db.listings.find({"status": "available"})
    results = []
    for listing in listings_cursor:
        listing["id"] = str(listing["_id"])
        # Fetch the farmer info
        farmer = db.users.find_one({"_id": ObjectId(listing["farmer_id"])})
        if farmer:
            farmer["id"] = str(farmer["_id"])
            listing["farmer"] = farmer
        results.append(listing)
    return results

@router.post("/buy/{listing_id}")
def buy_listing(listing_id: str, amount_kg: float, contact_number: str = None, db = Depends(get_db), current_user = Depends(get_user_from_token)):
    if current_user.get("role") != "vendor":
        raise HTTPException(status_code=403, detail="Only vendors can buy")

    try:
        obj_id = ObjectId(listing_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid listing ID format")

    listing = db.listings.find_one({"_id": obj_id})
    if not listing or listing.get("status") != "available":
        raise HTTPException(status_code=404, detail="Listing not available")
    
    if amount_kg > listing.get("quantity_kg", 0):
        raise HTTPException(status_code=400, detail="Not enough quantity available")

    # Create Razorpay Order
    total_price = amount_kg * listing.get("price_per_kg", 0)
    order_amount = int(total_price * 100) # Razorpay expects amount in paise
    order_currency = "INR"

    try:
        razorpay_order = client.order.create(dict(amount=order_amount, currency=order_currency, receipt=f"receipt_{listing_id}"))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Create Transaction Record
    transaction_doc = {
        "listing_id": listing_id,
        "vendor_id": current_user["id"],
        "vendor_contact_number": contact_number,
        "amount": total_price,
        "razorpay_order_id": razorpay_order['id'],
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    db.transactions.insert_one(transaction_doc)

    return {"order_id": razorpay_order['id'], "amount": order_amount, "currency": order_currency}

@router.post("/verify")
def verify_payment(razorpay_order_id: str, razorpay_payment_id: str, razorpay_signature: str, db = Depends(get_db)):
    try:
        client.utility.verify_payment_signature({
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        })
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Signature Verification Failed")

    transaction = db.transactions.find_one({"razorpay_order_id": razorpay_order_id})
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    db.transactions.update_one(
        {"_id": transaction["_id"]},
        {"$set": {"status": "successful", "razorpay_payment_id": razorpay_payment_id}}
    )

    # Update Listing Quantity
    try:
        listing_obj_id = ObjectId(transaction["listing_id"])
        # Assuming the transaction bought all for now, to be complex later
        db.listings.update_one(
            {"_id": listing_obj_id},
            {"$set": {"status": "sold_out"}}
        )
    except InvalidId:
        pass # Ignored for safety

    return {"status": "Payment Successful"}
