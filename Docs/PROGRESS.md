# 📊 Smart Farmer Assistant — Progress Log

> **Team Leader:** Ashraf AlAsil (ID: 4241391)  
> **Last Updated:** March 6, 2026  
> **Branch:** feature/crop-model  

---

## ✅ Week 1 — Completed Tasks

---

### TL-01 — GitHub Repo Setup ✅
**Date:** March 6, 2026  
**Done by:** Ashraf AlAsil

- ✅ Created repo: `smart-farmer-assistant` (Public)
- ✅ Created 6 branches: `main`, `dev`, `feature/backend`, `feature/frontend`, `feature/crop-model`, `feature/disease-model`
- ✅ Protected `main` branch (Pull Request required to merge)
- ✅ Invited all 9 team members

---

### TL-02 — System Architecture Diagram ✅
**Date:** March 6, 2026  
**Done by:** Ashraf AlAsil  
**File:** `/docs/smart_crop_architecture.png`

- ✅ Designed full system architecture diagram
- ✅ Shows data flow: User → React → FastAPI → PostgreSQL + ML Models + APIs
- ✅ Includes: Open-Meteo, SoilGrids, NASA POWER
- ✅ Uploaded to `/docs` on GitHub

**Architecture:**
```
👨‍🌾 Farmer
    ↕ HTTPS
⚛️ React.js (Arabic RTL)
    ↕ REST API
⚡ FastAPI (Python)
    ↙        ↘
🗄️ PostgreSQL   🌿 Random Forest + 🔬 MobileNetV2
                    ↕
        🌤️ Open-Meteo | 🌍 SoilGrids | 🛰️ NASA POWER
```

---

### AI-01 — Dataset Exploration (EDA) ✅
**Date:** March 6, 2026  
**Done by:** Ashraf AlAsil  
**Notebook:** `smart-farmer-ai/notebooks/crop_ai_week1.ipynb`

**Dataset:** Crop Recommendation Dataset (Kaggle)

| Property | Value |
|----------|-------|
| Rows | 2,200 |
| Columns | 8 |
| Missing Values | None ✅ |
| Crops | 22 |
| Samples per crop | 100 (balanced) ✅ |

**Features:**
| Feature | Min | Max | Mean |
|---------|-----|-----|------|
| N (Nitrogen) | 0 | 140 | 50.6 |
| P (Phosphorus) | 5 | 145 | 53.4 |
| K (Potassium) | 5 | 205 | 48.1 |
| Temperature | 8.8°C | 43.7°C | 25.6°C |
| Humidity | 14.3% | 100% | 71.5% |
| pH | 3.5 | 9.9 | 6.5 |
| Rainfall | 20.2mm | 298.6mm | 103.5mm |

**Charts saved in** `/docs`:
- `feature_distributions.png`
- `crop_distribution.png`

---

### AI-02 — Data Preprocessing ✅
**Date:** March 6, 2026  
**Done by:** Ashraf AlAsil  
**Files saved in** `smart-farmer-ai/models/`

- ✅ LabelEncoder → 22 crop names converted to numbers
- ✅ StandardScaler → all 7 features scaled (mean=0)
- ✅ Train/Test split: 80% / 20% (stratified)
  - Train: **1,760 samples**
  - Test: **440 samples**
- ✅ Saved `scaler.pkl`
- ✅ Saved `label_encoder.pkl`

---

### AI-03 — Random Forest Model Training ✅
**Date:** March 6, 2026  
**Done by:** Ashraf AlAsil  
**File:** `smart-farmer-ai/models/crop_model.pkl`

**Experiments:**
| n_estimators | Accuracy |
|-------------|----------|
| 50 | 99.55% |
| 100 | 99.55% |
| 200 | 99.55% |

**Final Model:** `n_estimators=100, random_state=42`

| Metric | Value |
|--------|-------|
| ✅ Accuracy | **99.55%** |
| ✅ F1 Score | **99.55%** |
| Train samples | 1,760 |
| Test samples | 440 |

**Confusion Matrix:** saved in `smart-farmer-ai/docs/confusion_matrix.png`  
Result: Near-perfect diagonal — model predicts almost all crops correctly.

---

## ⏭️ Next Tasks (For Team)

| Task | Description | Assigned To |
|------|-------------|-------------|
| AI-04 | Build `POST /recommend` FastAPI endpoint | AI/ML Team |
| AI-05 | Download & explore PlantVillage dataset | AI/ML Team |
| AI-06 | Image preprocessing pipeline | AI/ML Team |
| AI-07 | MobileNetV2 architecture setup | AI/ML Team |
| TL-03 | ERD Database Design | Team Leader |
| TL-04 | FastAPI Project Skeleton | Team Leader |

---

## 📁 File Structure (Current)

```
smart-farmer-assistant/
├── 📁 smart-farmer-ai/
│   ├── 📁 models/
│   │   ├── crop_model.pkl        ← Random Forest (99.55% accuracy)
│   │   ├── scaler.pkl            ← StandardScaler
│   │   └── label_encoder.pkl     ← LabelEncoder (22 crops)
│   ├── 📁 notebooks/
│   │   └── crop_ai_week1.ipynb   ← Full EDA + Training code
│   ├── 📁 docs/
│   │   ├── confusion_matrix.png
│   │   ├── crop_distribution.png
│   │   ├── feature_distributions.png
│   │   └── eda_findings.txt
│   ├── Crop_recommendation.csv
│   └── README.md
├── 📁 docs/
│   └── smart_crop_architecture.png
└── README.md
```

---

## 🔧 How to Load the Model

```python
import pickle

# Load
with open('smart-farmer-ai/models/crop_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('smart-farmer-ai/models/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)
with open('smart-farmer-ai/models/label_encoder.pkl', 'rb') as f:
    le = pickle.load(f)

# Predict
input_data = [[85, 42, 55, 22, 70, 7.1, 120]]  # N,P,K,Temp,Humidity,pH,Rainfall
input_scaled = scaler.transform(input_data)
prediction = model.predict(input_scaled)
crop = le.inverse_transform(prediction)
print("Recommended Crop:", crop[0])
```

---

## 🛠️ Environment Setup

```bash
pip install pandas numpy scikit-learn matplotlib seaborn jupyter
```

**Python version:** 3.12  
**Key packages:** scikit-learn, pandas, matplotlib, seaborn
