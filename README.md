<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=13&pause=1000&color=22C55E&center=true&vCenter=true&width=600&lines=AI-Powered+Agricultural+Assistant+for+Farmers" alt="Typing SVG" />

# 🌱 Smart Crop Disease Detection System

*An intelligent web application empowering farmers with AI-driven crop recommendations and plant disease detection*

<br/>

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://tensorflow.org)

<br/>

> 🎓 **Graduation Project** · 2025–26
>
> 👩‍🏫 **Supervisor:** Dr. Eman Salah Salem Ahmed
>
> 👑 **Project Lead:** Aman Ji

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [AI Models](#-ai-models)
- [API Reference](#-api-reference)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Language Support](#-language-support)
- [External APIs](#-external-apis)
- [Roadmap](#-roadmap)

---

## 🌍 Overview

**Smart Crop Disease Detection System** is a full-stack AI-powered web application built to help farmers make data-driven agricultural decisions.

The system combines **real-time environmental data** (weather + soil) with **machine learning models** to deliver two core services:

| Service | Description | Model | Accuracy |
|---------|-------------|-------|----------|
| 🌾 Crop Recommendation | Suggests the optimal crop based on soil & weather | Random Forest | **99.55%** |
| 🔬 Disease Detection | Identifies plant diseases from leaf images | MobileNetV2 CNN | **95%+ target** |

The interface supports **English and Hindi** — making it accessible to farmers across India and beyond.

---

## ✨ Key Features

```
┌─────────────────────────────────────────────────────────────────┐
│  🤖  AI Crop Recommendation     →  22 crop classes, 99.55% acc  │
│  🔬  Plant Disease Detection    →  38 disease classes (CNN)     │
│  🌤️  Real-time Weather Data     →  Open-Meteo API integration   │
│  🌍  Soil Property Analysis     →  N, P, K, pH inputs           │
│  🌐  English & Hindi UI         →  Language toggle built-in     │
│  📱  Mobile Responsive          →  Works on all devices         │
│  ⚡  High-Performance Backend   →  FastAPI + async Python        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

```
                    ┌─────────────────────┐
                    │      👨‍🌾 Farmer       │
                    │  (Browser / Mobile)  │
                    └──────────┬──────────┘
                               │ HTTPS
                    ┌──────────▼──────────┐
                    │   ⚛️  React.js        │
                    │  English / Hindi UI  │
                    │   Tailwind CSS       │
                    └──────────┬──────────┘
                               │ REST API
                    ┌──────────▼──────────┐
                    │   ⚡ FastAPI           │
                    │   Python Backend     │
                    │   Gunicorn + Uvicorn │
                    └────┬──────┬─────────┘
                         │      │
             ┌───────────▼─┐  ┌─▼──────────────┐
             │ 🌿 Random    │  │ 🔬 MobileNetV2  │
             │   Forest     │  │  PlantVillage   │
             │  99.55% acc  │  │  38 classes     │
             └─────────────┘  └────────┬────────┘
                                       │
                          ┌────────────▼────────────┐
                          │     External APIs        │
                          │  🌤️ Open-Meteo           │
                          │  🌍 Geocoding API        │
                          └─────────────────────────┘
```

---

## 🤖 AI Models

### 🌾 Model 1 — Crop Recommendation (Random Forest)

| Property | Details |
|----------|---------|
| **Algorithm** | `RandomForestClassifier(n_estimators=100, random_state=42)` |
| **Dataset** | Kaggle — Crop Recommendation Dataset |
| **Total Samples** | 2,200 (perfectly balanced — 100 per crop) |
| **Train / Test Split** | 80% / 20% (stratified) |
| **Accuracy** | 🏆 **99.55%** |
| **F1 Score** | 🏆 **99.55%** |
| **Output Classes** | 22 crops |
| **Saved Model** | `ai-ml/models/crop_model.pkl` |

**Input Features:**

| Feature | Description | Range |
|---------|-------------|-------|
| `N` | Nitrogen content | 0 – 140 |
| `P` | Phosphorus content | 5 – 145 |
| `K` | Potassium content | 5 – 205 |
| `temperature` | Temperature (°C) | 8.8 – 43.7 |
| `humidity` | Relative humidity (%) | 14.3 – 100.0 |
| `ph` | Soil pH | 3.5 – 9.9 |
| `rainfall` | Rainfall (mm) | 20.2 – 298.6 |

**Supported Crops:**
`rice` · `maize` · `chickpea` · `kidneybeans` · `pigeonpeas` · `mothbeans` · `mungbean` · `blackgram` · `lentil` · `pomegranate` · `banana` · `mango` · `grapes` · `watermelon` · `muskmelon` · `apple` · `orange` · `papaya` · `coconut` · `cotton` · `jute` · `coffee`

---

### 🔬 Model 2 — Disease Detection (MobileNetV2 CNN)

| Property | Details |
|----------|---------|
| **Architecture** | MobileNetV2 (ImageNet weights, Transfer Learning) |
| **Dataset** | PlantVillage (Kaggle) |
| **Input Size** | 224 × 224 × 3 |
| **Output Classes** | 38 disease classes |
| **Head Layers** | GlobalAveragePooling2D → Dense(128) → Dense(38, softmax) |
| **Optimizer** | Adam + categorical_crossentropy |
| **Target Accuracy** | 95%+ |
| **Saved Model** | `ai-ml/models/disease_model.h5` |

**Data Augmentation:** `rotation_range=20` · `horizontal_flip=True` · `zoom_range=0.2` · `rescale=1./255`

---

## 🔌 API Reference

### Base URL
```
Development:  http://localhost:8000
Production:   https://smart-crop-api.onrender.com
```

### Endpoints

#### 🌾 POST `/recommend`
```json
// Request
POST /recommend
Body: { "city": "Delhi", "N": 90, "P": 42, "K": 43, "ph": 6.5 }

// Response
{
  "recommended_crop": "Rice",
  "confidence": 87.5,
  "alternatives": ["Maize", "Cotton"],
  "tips": ["Live weather for Delhi: 32°C, 78% humidity", "..."]
}
```

#### 🔬 POST `/disease-predict`
```json
// Request — multipart/form-data
POST /disease-predict
Body: { image: <file>, plant_type: "Tomato" }

// Response
{
  "disease": "Septoria Leaf Spot",
  "confidence": 92.5,
  "treatment": "Apply copper-based fungicide...",
  "prevention": "Avoid overhead watering..."
}
```

#### ❤️ GET `/health`
```json
{ "status": "ok", "models_loaded": true }
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js 18 | UI framework |
| Tailwind CSS | Styling |
| Vite | Build tool |
| i18n (EN/HI) | Language support |

### Backend
| Technology | Purpose |
|-----------|---------|
| FastAPI | REST API framework |
| Gunicorn + Uvicorn | Production ASGI server |
| Pydantic | Data validation |
| requests | External API calls |

### AI / ML
| Technology | Purpose |
|-----------|---------|
| scikit-learn | Random Forest, preprocessing |
| TensorFlow / Keras | CNN disease detection |
| pandas | Data manipulation |
| pickle | Model serialization |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| GitHub | Version control |
| Vercel | Frontend deployment |
| Render | Backend deployment |

---

## 🗂️ Project Structure

```
smart-crop-assistant/
│
├── 📁 Frontend/                    # React.js Application
│   ├── src/
│   │   ├── App.jsx                 # Main app component (EN/HI support)
│   │   ├── index.css               # Design system
│   │   └── main.jsx                # React DOM render
│   ├── index.html                  # HTML entry point
│   ├── package.json                # Dependencies
│   └── vite.config.js              # Vite configuration
│
├── 📁 backend/                     # FastAPI Application
│   ├── main.py                     # App entry point
│   └── requirements.txt            # Python dependencies
│
├── 📁 ai-ml/                       # AI / ML Components
│   ├── 📁 models/                  # Trained model artifacts
│   │   ├── crop_model.pkl          # Random Forest (99.55% acc)
│   │   ├── scaler.pkl              # StandardScaler
│   │   └── label_encoder.pkl       # LabelEncoder (22 crops)
│   └── 📁 data/
│       └── Crop_recommendation.csv # 2,200 samples
│
├── render.yaml                     # Render deployment config
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

```bash
python --version    # 3.10+
node --version      # 18+
```

### 1. Clone the Repository

```bash
git clone https://github.com/amanji0/Smart-Crop-Disease-Detection-System.git
cd smart-crop-assistant
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Linux/Mac
venv\Scripts\activate         # Windows

pip install -r requirements.txt
uvicorn main:app --reload
# API running at: http://localhost:8000
# Docs at: http://localhost:8000/docs
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
# App running at: http://localhost:5173
```

### 4. Environment Variables

```env
# Frontend/.env
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🌐 Language Support

The application supports **English** and **Hindi** — selectable directly in the interface.

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Default |
| Hindi | `hi` | ✅ Supported |

To switch language, use the **EN / HI** toggle button in the navigation bar.

---

## 🌍 External APIs

| API | Used For | Auth Required | Cost |
|-----|----------|---------------|------|
| [Open-Meteo](https://open-meteo.com) | Temperature, humidity, rainfall | ❌ No | Free |
| [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) | City → coordinates | ❌ No | Free |

All external APIs are **free and require no API keys**.

---

## 🗓️ Roadmap

```
Phase 1  ████████████████████  ✅ Foundation (Repo, Architecture, AI Setup)
Phase 2  ████████████████████  ✅ Core AI + Backend APIs
Phase 3  ████████████████████  ✅ Full Integration + UI Redesign
Phase 4  ██████████░░░░░░░░░░  🔄 Hindi Language Support
Phase 5  ░░░░░░░░░░░░░░░░░░░░  📋 Mobile PWA
Phase 6  ░░░░░░░░░░░░░░░░░░░░  📋 Advanced Disease Model
```

---

<div align="center">

**🌱 Smart Crop Disease Detection System**

*Empowering Farmers with Artificial Intelligence*

*Built with Machine Learning & Open Weather Data · 2025–26*

</div>
