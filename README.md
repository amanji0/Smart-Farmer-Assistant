# 🌱 Smart Crop Assistant

> An AI-powered web application helping Egyptian farmers make smarter agricultural decisions through crop recommendations and plant disease detection.

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)
![ML](https://img.shields.io/badge/ML-Random%20Forest%20%7C%20MobileNetV2-orange?style=flat-square)
![License](https://img.shields.io/badge/License-Academic-green?style=flat-square)

---

## 📌 Overview

**Smart Crop Assistant** is a graduation project developed for the 2025–26 academic year at Delta University, under the supervision of **Dr. Eman Salah Salem Ahmed**.

The application targets Egyptian farmers and provides two core AI-powered features:
- 🌾 **Crop Recommendation** — suggests the best crop based on soil nutrients and weather conditions
- 🔬 **Plant Disease Detection** — identifies diseases from leaf photos and provides treatment guidance

The system is fully built with **Arabic language support** and an RTL-compatible interface to serve the Egyptian farming community.

---

## ✨ Features

- 🤖 **Crop Recommendation Engine** — Random Forest model trained on 2,200 samples across 22 crops (~99% accuracy)
- 🧠 **Disease Detection CNN** — MobileNetV2 fine-tuned on PlantVillage dataset (38 disease classes)
- 🌤️ **Real-time Weather Data** — integrated with Open-Meteo API
- 🌍 **Soil Data** — integrated with SoilGrids API (N, P, K, pH)
- 🛰️ **Climate Data** — integrated with NASA POWER API
- 🌐 **Arabic RTL Interface** — full Arabic language support for Egyptian farmers
- 📱 **PWA Support** — installable on mobile devices

---

## 🏗️ System Architecture

```
👨‍🌾 Egyptian Farmer (Browser/Mobile)
         ↕ HTTP/HTTPS
    ⚛️  React.js Frontend (Arabic RTL)
         ↕ REST API
    ⚡  FastAPI Backend (Python)
    ↙           ↓           ↘
🗄️ PostgreSQL  🌿 Random Forest  🔬 MobileNetV2
               ↕
   🌤️ Open-Meteo | 🌍 SoilGrids | 🛰️ NASA POWER
```

---

## 🗂️ Project Structure

```
smart-crop-assistant/
│
├── 📁 frontend/              # React.js application
│   ├── App.jsx
│   ├── index.html
│   └── ...
│
├── 📁 backend/               # FastAPI application
│   ├── main.py
│   ├── routers/
│   │   ├── weather.py
│   │   ├── soil.py
│   │   ├── recommend.py
│   │   └── disease.py
│   ├── models/
│   └── schemas/
│
├── 📁 ai-ml/                 # AI/ML components
│   ├── notebooks/            # Jupyter notebooks (EDA, training)
│   ├── models/               # Trained model files (.pkl, .h5)
│   │   ├── crop_model.pkl
│   │   ├── scaler.pkl
│   │   └── label_encoder.pkl
│   ├── data/                 # Datasets
│   └── reports/              # Charts, confusion matrices, findings
│
├── 📁 docs/                  # Documentation & diagrams
│   ├── architecture.png
│   └── ...
│
└── 📁 tests/                 # Unit & integration tests
```

---

## 🤖 AI Models

### 🌾 Crop Recommendation — Random Forest
| Property | Value |
|----------|-------|
| Algorithm | Random Forest Classifier |
| Dataset | Crop Recommendation Dataset (Kaggle) |
| Training Samples | 1,760 |
| Test Samples | 440 |
| Accuracy | **99.55%** |
| F1 Score | **99.55%** |
| Output Classes | 22 crops |

**Input Features:** N, P, K, Temperature, Humidity, pH, Rainfall

### 🔬 Disease Detection — MobileNetV2 CNN
| Property | Value |
|----------|-------|
| Architecture | MobileNetV2 (Transfer Learning) |
| Dataset | PlantVillage |
| Output Classes | 38 disease classes |
| Target Accuracy | 95%+ |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/weather?city=Cairo` | Get weather data for a city |
| GET | `/soil?lat=30.0&lon=31.2` | Get soil properties |
| POST | `/recommend` | Get crop recommendation |
| POST | `/full-recommend?city=Cairo` | Full pipeline recommendation |
| POST | `/disease-predict` | Detect plant disease from image |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, react-i18next |
| Backend | FastAPI, Python, Uvicorn |
| Database | PostgreSQL |
| ML — Crop | scikit-learn, Random Forest |
| ML — Disease | TensorFlow, Keras, MobileNetV2 |
| External APIs | Open-Meteo, SoilGrids, NASA POWER |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 👥 Team

| Role | Responsibility |
|------|---------------|
| 👑 Team Leader | Architecture, Backend, APIs, Project Management |
| 🎨 Frontend | React UI, Arabic RTL, PWA |
| ✏️ UI/UX | Figma Design, User Flow |
| 🤖 AI/ML | Model Training, API Integration |
| 🧪 Testing & Docs | QA, Documentation |

> **Team Size:** 9 members | **Academic Year:** 2025–26
> **Supervisor:** Dr. Eman Salah Salem Ahmed | **Delta University**

---

## 📄 License

This project is developed for academic purposes at Delta University for the graduation project requirements of the 2025–26 academic year.

---

<div align="center">
  <b>🌱 Smart Crop Assistant — Empowering Egyptian Farmers with AI</b>
</div>
