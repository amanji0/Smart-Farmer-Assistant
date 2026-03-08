<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=13&pause=1000&color=22C55E&center=true&vCenter=true&width=600&lines=AI-Powered+Agricultural+Assistant+for+Egyptian+Farmers" alt="Typing SVG" />

# 🌱 Smart Crop Assistant

**مساعد المحاصيل الذكي**

*An intelligent web application empowering Egyptian farmers with AI-driven crop recommendations and plant disease detection*

<br/>

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://tensorflow.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)

<br/>

> 🎓 **Graduation Project** · Delta University · 2025–26
> 
> 👩‍🏫 **Supervisor:** Dr. Eman Salah Salem Ahmed
> 
> 👑 **Team Leader:** Ashraf Al-Asil (ID: 4241391) · **Team Size:** 9 Members

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
- [External APIs](#-external-apis)
- [Team](#-team)
- [Roadmap](#-roadmap)

---

## 🌍 Overview

**Smart Crop Assistant** is a full-stack AI-powered web application built to address a critical challenge facing Egyptian agriculture: the lack of data-driven decision support tools accessible to everyday farmers.

The system combines **real-time environmental data** (weather + soil) with **machine learning models** to deliver two core services:

| Service | Description | Model | Accuracy |
|---------|-------------|-------|----------|
| 🌾 Crop Recommendation | Suggests the optimal crop based on soil & weather | Random Forest | **99.55%** |
| 🔬 Disease Detection | Identifies plant diseases from leaf images | MobileNetV2 CNN | **95%+ target** |

The entire interface is built with **full Arabic RTL support**, making it genuinely accessible to Egyptian farmers.

---

## ✨ Key Features

```
┌─────────────────────────────────────────────────────────────────┐
│  🤖  AI Crop Recommendation     →  22 crop classes, 99.55% acc  │
│  🔬  Plant Disease Detection    →  38 disease classes (CNN)     │
│  🌤️  Real-time Weather Data     →  Open-Meteo API integration   │
│  🌍  Soil Property Analysis     →  SoilGrids API (N,P,K,pH)    │
│  🛰️  Climate Intelligence       →  NASA POWER API               │
│  🌐  Full Arabic RTL UI         →  react-i18next + AR/EN toggle │
│  📱  Progressive Web App        →  Installable on mobile        │
│  ⚡  High-Performance Backend   →  FastAPI + async Python        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

```
                    ┌─────────────────────┐
                    │   👨‍🌾 Egyptian Farmer  │
                    │  (Browser / Mobile)  │
                    └──────────┬──────────┘
                               │ HTTPS
                    ┌──────────▼──────────┐
                    │   ⚛️  React.js        │
                    │   Arabic RTL UI      │
                    │   Tailwind CSS       │
                    │   PWA Ready          │
                    └──────────┬──────────┘
                               │ REST API
                    ┌──────────▼──────────┐
                    │   ⚡ FastAPI           │
                    │   Python Backend     │
                    │   Uvicorn Server     │
                    └────┬──────┬─────┬───┘
                         │      │     │
            ┌────────────▼┐  ┌──▼──┐ ┌▼──────────────┐
            │ 🗄️ PostgreSQL│  │🌿 RF│ │ 🔬 MobileNetV2 │
            │  cities      │  │ 99% │ │  PlantVillage  │
            │  crop_req    │  │ acc │ │  38 classes    │
            │  disease_req │  └──┬──┘ └───────┬────────┘
            └─────────────┘     │             │
                                └──────┬──────┘
                         ┌────────────▼────────────┐
                         │     External APIs        │
                         │  🌤️ Open-Meteo           │
                         │  🌍 SoilGrids            │
                         │  🛰️ NASA POWER            │
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
| **Training Samples** | 1,760 |
| **Test Samples** | 440 |
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
| **Saved Model** | `ai-ml/models/disease_model.h5` *(Week 2)* |

**Data Augmentation:** `rotation_range=20` · `horizontal_flip=True` · `zoom_range=0.2` · `rescale=1./255`

---

## 🔌 API Reference

### Base URL
```
Development:  http://localhost:8000
Production:   https://smart-crop-api.onrender.com
```

### Endpoints

#### 🌤️ GET `/weather`
```json
// Request
GET /weather?city=Cairo

// Response
{
  "city": "Cairo",
  "temperature": 28.5,
  "humidity": 45.2,
  "rainfall": 0.0
}
```

#### 🌍 GET `/soil`
```json
// Request
GET /soil?lat=30.0&lon=31.2

// Response
{
  "N": 45,
  "P": 38,
  "K": 52,
  "ph": 7.2
}
```

#### 🌾 POST `/full-recommend`
```json
// Request
POST /full-recommend?city=Cairo

// Response
{
  "city": "Cairo",
  "weather": { "temperature": 28.5, "humidity": 45.2, "rainfall": 0.0 },
  "soil": { "N": 45, "P": 38, "K": 52, "ph": 7.2 },
  "recommended_crop": "wheat",
  "confidence": 0.94,
  "top3_alternatives": ["maize", "cotton"]
}
```

#### 🔬 POST `/disease-predict`
```json
// Request — multipart/form-data
POST /disease-predict
Body: { image: <file>, plant_type: "tomato" }

// Response
{
  "disease": "Tomato Early Blight",
  "confidence": 0.92,
  "cause": "Fungal infection (Alternaria solani)",
  "symptoms": "Dark brown spots with yellow rings on leaves",
  "treatment": "Apply copper-based fungicide",
  "prevention": "Crop rotation, proper spacing",
  "severity": "Moderate"
}
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js 18 | UI framework |
| Tailwind CSS | Styling |
| react-i18next | Arabic/English i18n |
| Vite | Build tool |
| PWA | Mobile installability |

### Backend
| Technology | Purpose |
|-----------|---------|
| FastAPI | REST API framework |
| Uvicorn | ASGI server |
| Pydantic | Data validation |
| python-dotenv | Environment config |
| requests | External API calls |

### AI / ML
| Technology | Purpose |
|-----------|---------|
| scikit-learn | Random Forest, preprocessing |
| TensorFlow / Keras | CNN disease detection |
| pandas | Data manipulation |
| matplotlib / seaborn | Visualization |
| pickle | Model serialization |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| PostgreSQL | Primary database |
| GitHub | Version control |
| Vercel | Frontend deployment |
| Render | Backend deployment |

---

## 🗂️ Project Structure

```
smart-crop-assistant/
│
├── 📁 frontend/                    # React.js Application
│   ├── App.jsx                     # Main app component
│   ├── index.html                  # HTML entry point
│   ├── main.jsx                    # React DOM render
│   ├── App.css                     # Global styles
│   ├── package.json                # Dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind configuration
│   └── eslint.config.js            # ESLint rules
│
├── 📁 backend/                     # FastAPI Application
│   ├── main.py                     # App entry point
│   ├── config.py                   # Configuration
│   ├── requirements.txt            # Python dependencies
│   ├── 📁 routers/
│   │   ├── weather.py              # GET /weather
│   │   ├── soil.py                 # GET /soil
│   │   ├── recommend.py            # POST /recommend
│   │   └── disease.py              # POST /disease-predict
│   ├── 📁 models/                  # SQLAlchemy models
│   └── 📁 schemas/                 # Pydantic schemas
│
├── 📁 ai-ml/                       # AI / ML Components
│   ├── 📁 notebooks/               # Jupyter Notebooks
│   │   └── crop_ai_week1.ipynb     # EDA + Training notebook
│   ├── 📁 models/                  # Trained model artifacts
│   │   ├── crop_model.pkl          # Random Forest (99.55% acc)
│   │   ├── scaler.pkl              # StandardScaler
│   │   └── label_encoder.pkl       # LabelEncoder (22 crops)
│   ├── 📁 data/                    # Datasets
│   │   └── Crop_recommendation.csv # 2,200 samples
│   └── 📁 reports/                 # EDA outputs
│       ├── confusion_matrix.png
│       ├── feature_distributions.png
│       ├── crop_distribution.png
│       └── eda_findings.txt
│
├── 📁 docs/                        # Documentation
│   ├── architecture.png            # System architecture diagram
│   ├── PROGRESS.md                 # Weekly progress log
│   └── user-flow.html              # User flow diagram
│
├── 📁 tests/                       # Test Suite
│   └── test_models.py              # Model unit tests (Week 5)
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

```bash
# Check versions
python --version    # 3.10+
node --version      # 18+
psql --version      # PostgreSQL 14+
```

### 1. Clone the Repository

```bash
git clone https://github.com/AshrafAlAsil/smart-crop-assistant.git
cd smart-crop-assistant
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate      # Linux/Mac
venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start server
uvicorn main:app --reload
# API running at: http://localhost:8000
# Docs at: http://localhost:8000/docs
```

### 3. Frontend Setup

```bash
cd frontend

npm install
npm run dev
# App running at: http://localhost:5173
```

### 4. Environment Variables

```env
# backend/.env
DATABASE_URL=postgresql://user:password@localhost/smart_crop_db
SECRET_KEY=your-secret-key
ALLOWED_ORIGINS=http://localhost:5173
```

---

## 🌐 External APIs

| API | Used For | Auth Required | Cost |
|-----|----------|---------------|------|
| [Open-Meteo](https://open-meteo.com) | Temperature, humidity, rainfall | ❌ No | Free |
| [SoilGrids](https://soilgrids.org) | N, P, K, pH data | ❌ No | Free |
| [NASA POWER](https://power.larc.nasa.gov) | Solar radiation, climate | ❌ No | Free |

All external APIs are **free and require no API keys**.

---

## 👥 Team

| # | Role | Responsibilities |
|---|------|-----------------|
| 1 | 👑 **Team Leader** | Architecture · Backend APIs · Project Management · GitHub |
| 2–3 | 🎨 **Frontend (×2)** | React UI · Arabic RTL · PWA · Animations |
| 4 | ✏️ **UI/UX Designer** | Figma · User Flow · Wireframes · Arabic Design |
| 5–6 | 🤖 **AI/ML (×2)** | Model Training · Data Pipeline · API Integration |
| 7 | 🔧 **Backend** | FastAPI · Database · Integrations |
| 8–9 | 🧪 **Testing & Docs (×2)** | QA · Unit Tests · Documentation · Reports |

> **Academic Year:** 2025–26 · **University:** Delta University
> **Supervisor:** Dr. Eman Salah Salem Ahmed

---

## 🗓️ Roadmap

```
Week 1  ████████████████████  ✅ Foundation (Repo, Architecture, AI Setup)
Week 2  ██████████░░░░░░░░░░  🔄 Core AI + Backend
Week 3  ░░░░░░░░░░░░░░░░░░░░  📋 Full Integration
Week 4  ░░░░░░░░░░░░░░░░░░░░  📋 Frontend + Arabic RTL
Week 5  ░░░░░░░░░░░░░░░░░░░░  📋 Testing
Week 6  ░░░░░░░░░░░░░░░░░░░░  📋 Deployment
Week 7  ░░░░░░░░░░░░░░░░░░░░  📋 Polish + Docs
Week 8  ░░░░░░░░░░░░░░░░░░░░  📋 Final Submission
```

---

<div align="center">

---

**🌱 Smart Crop Assistant**

*Empowering Egyptian Farmers with Artificial Intelligence*

*Delta University · Faculty of Computer Science · 2025–26*

</div>
