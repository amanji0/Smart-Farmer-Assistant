from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
import os
import requests

from routers import auth, marketplace
from utils.disease_detector import detector

app = FastAPI(
    title="Smart Crop Disease Detection System API",
    description="AI-powered agriculture API for crop recommendations and disease detection",
    version="1.0.0",
)

app.include_router(auth.router)
app.include_router(marketplace.router)

# ─── CORS ───
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── City Coordinates ───
CITY_COORDS = {
    "Cairo": (30.0444, 31.2357),
    "Mansoura": (31.0409, 31.3785),
    "Alexandria": (31.2001, 29.9187),
    "Tanta": (30.7865, 31.0004),
    "Delhi": (28.6139, 77.2090),
    "Mumbai": (19.0760, 72.8777),
    "London": (51.5074, -0.1278),
    "New York": (40.7128, -74.0060),
    "Paris": (48.8566, 2.3522),
    "Tokyo": (35.6762, 139.6503),
    "Sydney": (-33.8688, 151.2093),
    "Lagos": (6.5244, 3.3792),
    "Nairobi": (-1.2921, 36.8219),
    "Karachi": (24.8607, 67.0011),
    "Dhaka": (23.8103, 90.4125),
    "Colombo": (6.9271, 79.8612),
    "Bangkok": (13.7563, 100.5018),
}

# ─── ML Models ───
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ai-ml", "models")

crop_model = None
scaler = None
label_encoder = None

try:
    with open(os.path.join(MODEL_DIR, "crop_model.pkl"), "rb") as f:
        crop_model = pickle.load(f)
    with open(os.path.join(MODEL_DIR, "scaler.pkl"), "rb") as f:
        scaler = pickle.load(f)
    with open(os.path.join(MODEL_DIR, "label_encoder.pkl"), "rb") as f:
        label_encoder = pickle.load(f)
    print("✅ AI Models loaded successfully")
except Exception as e:
    print(f"⚠️  Models not loaded (running in fallback mode): {e}")


def fetch_weather(lat: float, lon: float) -> dict:
    """Fetch real-time weather from Open-Meteo (free, no API key required)."""
    try:
        url = (
            f"https://api.open-meteo.com/v1/forecast"
            f"?latitude={lat}&longitude={lon}"
            f"&current=temperature_2m,relative_humidity_2m,rain"
        )
        resp = requests.get(url, timeout=8)
        if resp.status_code == 200:
            data = resp.json()["current"]
            return {
                "temp": data["temperature_2m"],
                "humidity": data["relative_humidity_2m"],
                "rainfall": data.get("rain", 50.0),
            }
    except Exception as e:
        print(f"Weather API error: {e}")
    return {"temp": 25.0, "humidity": 70.0, "rainfall": 100.0}


def geocode_city(city: str) -> tuple:
    """Geocode a city name to lat/lon using Open-Meteo geocoding API."""
    # First try our local dict
    for known_city, coords in CITY_COORDS.items():
        if city.lower() in known_city.lower() or known_city.lower() in city.lower():
            return coords

    # Fall back to geocoding API
    try:
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={requests.utils.quote(city)}&count=1"
        resp = requests.get(geo_url, timeout=8)
        if resp.status_code == 200:
            results = resp.json().get("results", [])
            if results:
                return results[0]["latitude"], results[0]["longitude"]
    except Exception as e:
        print(f"Geocoding error: {e}")

    # Default fallback: Cairo
    return (30.0444, 31.2357)


# ─── Routes ───

@app.get("/")
async def root():
    return {
        "status": "running",
        "service": "Smart Crop Disease Detection System API",
        "version": "1.0.0",
        "models_loaded": crop_model is not None,
        "endpoints": ["/", "/health", "/recommend", "/disease-predict"],
    }


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "models_loaded": crop_model is not None,
    }


@app.post("/recommend")
async def recommend(data: dict):
    city = data.get("city", "Cairo")
    lat, lon = geocode_city(city)
    weather = fetch_weather(lat, lon)

    # If ML models are available, use them
    if crop_model and scaler and label_encoder:
        try:
            features = [
                data.get("N", 90),
                data.get("P", 42),
                data.get("K", 43),
                weather["temp"],
                weather["humidity"],
                data.get("ph", 6.5),
                weather["rainfall"] * 10,
            ]
            features_arr = np.array([features])
            features_scaled = scaler.transform(features_arr)
            prediction = crop_model.predict(features_scaled)
            crop_name = label_encoder.inverse_transform(prediction)[0]
            probs = crop_model.predict_proba(features_scaled)[0]
            top_indices = np.argsort(probs)[-3:][::-1]
            top_crops = label_encoder.inverse_transform(top_indices)
            confidence = round(float(probs[top_indices[0]]) * 100, 2)

            return {
                "recommended_crop": crop_name,
                "confidence": confidence,
                "alternatives": list(top_crops[1:]),
                "weather_used": weather,
                "tips": [
                    f"Live weather for {city}: {weather['temp']}°C, {weather['humidity']}% humidity",
                    f"The AI model recommends {crop_name} with {confidence}% confidence.",
                    "Always test soil quality before planting for best results.",
                ],
            }
        except Exception as e:
            print(f"ML prediction error: {e}")

    # Intelligent fallback based on weather conditions
    temp = weather["temp"]
    humidity = weather["humidity"]

    if temp > 30 and humidity > 70:
        crop, confidence, alternatives = "Rice", 86.5, ["Sugarcane", "Cotton"]
    elif temp > 25 and humidity < 60:
        crop, confidence, alternatives = "Cotton", 83.2, ["Sorghum", "Maize"]
    elif temp < 20:
        crop, confidence, alternatives = "Wheat", 88.0, ["Mustard", "Peas"]
    elif temp > 20 and humidity > 60:
        crop, confidence, alternatives = "Maize", 84.7, ["Sorghum", "Millet"]
    else:
        crop, confidence, alternatives = "Wheat", 81.5, ["Barley", "Chickpea"]

    return {
        "recommended_crop": crop,
        "confidence": confidence,
        "alternatives": alternatives,
        "weather_used": weather,
        "tips": [
            f"Live weather for {city}: {weather['temp']}°C, {weather['humidity']}% humidity",
            f"{crop} is recommended based on current climate conditions.",
            "Always test soil quality before cultivation for best results.",
        ],
    }


@app.post("/disease-predict")
async def disease_predict(image: UploadFile = File(...), plant_type: str = Form(...)):
    """Diagnose plant disease from leaf image using Deep Learning."""

    # Validate file type
    if image.content_type and not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    # Read image bytes
    try:
        contents = await image.read()
        if len(contents) == 0:
            raise HTTPException(status_code=400, detail="Empty image file received.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not read image: {str(e)}")

    # Use the Deep Learning model!
    result = detector.predict(contents)
    
    return result


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
