import os
from pymongo import MongoClient
import certifi

# MongoDB connection string
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")

# Initialize MongoDB Client
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client.smartcrop

def get_db():
    return db
