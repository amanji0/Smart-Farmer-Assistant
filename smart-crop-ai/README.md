# 🌱 Smart Crop Assistant — AI/ML Module

> **Team Leader:** Ashraf AlAsil (ID: 4241391)  
> **Supervisor:** Dr. Eman Salah Salem Ahmed  
> **Academic Year:** 2025–26  

---

## 📁 Folder Structure

```
smart-crop-ai/
├── 📁 models/
│   ├── crop_model.pkl        ← Trained Random Forest model
│   ├── scaler.pkl            ← StandardScaler for input features
│   └── label_encoder.pkl     ← LabelEncoder for crop names
│
├── 📁 notebooks/
│   └── crop_ai_week1.ipynb   ← EDA + Preprocessing + Training
│
├── 📁 docs/
│   ├── feature_distributions.png  ← Feature histograms (N,P,K,Temp,Humidity,pH,Rainfall)
│   ├── crop_distribution.png      ← 22 crop label bar chart
│   ├── confusion_matrix.png       ← Model confusion matrix heatmap
│   └── eda_findings.txt           ← EDA summary findings
│
└── Crop_recommendation.csv   ← Raw dataset (Kaggle)
```

---

## ✅ Week 1 — Completed Tasks

### AI-01 — Dataset Exploration (EDA)
- Downloaded **Crop Recommendation Dataset** from Kaggle
- Dataset: **2,200 rows × 8 columns**
- Features: `N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall`
- Target: `label` (22 crop types)
- **No missing values** found
- All 22 crops have **exactly 100 samples** (perfectly balanced)
- Charts saved in `/docs`

### AI-02 — Data Preprocessing
- Applied **LabelEncoder** on crop names → numbers
- Applied **StandardScaler** on all 7 features
- Split: **80% Train (1,760)** / **20% Test (440)** — stratified
- Saved `scaler.pkl` and `label_encoder.pkl` in `/models`

### AI-03 — Random Forest Model Training
- Tested `n_estimators`: 50, 100, 200
- All gave same accuracy → chose **n_estimators=100**
- **Accuracy: 99.55%**
- **F1 Score: 99.55%**
- Confusion matrix shows near-perfect diagonal
- Saved `crop_model.pkl` in `/models`

---

## 📊 Model Results

| Metric | Value |
|--------|-------|
| Algorithm | Random Forest |
| n_estimators | 100 |
| Train samples | 1,760 |
| Test samples | 440 |
| **Accuracy** | **99.55%** |
| **F1 Score** | **99.55%** |
| Missing values | None |
| Class balance | Perfect (100/class) |

---

## 🔧 How to Use the Model

```python
import pickle
import numpy as np

# Load model and scaler
with open('models/crop_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('models/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open('models/label_encoder.pkl', 'rb') as f:
    le = pickle.load(f)

# Predict
input_data = [[85, 42, 55, 22, 70, 7.1, 120]]  # N,P,K,Temp,Humidity,pH,Rainfall
input_scaled = scaler.transform(input_data)
prediction = model.predict(input_scaled)
crop = le.inverse_transform(prediction)
print("Recommended Crop:", crop[0])
```

---

## ⏭️ Next Steps (AI-04 onwards)

- [ ] AI-04 — Build `POST /recommend` API endpoint with FastAPI
- [ ] AI-05 — Download & explore PlantVillage dataset
- [ ] AI-06 — Image preprocessing pipeline for CNN
- [ ] AI-07 — MobileNetV2 architecture setup

---

## 🛠️ Dependencies

```
pandas
numpy
scikit-learn
matplotlib
seaborn
jupyter
```

Install with:
```
pip install pandas numpy scikit-learn matplotlib seaborn jupyter
```
