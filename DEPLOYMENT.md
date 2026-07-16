# 🚀 Deployment Guide

This guide will walk you through deploying the **Smart Farmer Assistant** to GitHub and Vercel.

---

## 1. 📂 GitHub Deployment (Version Control)

### Step 1: Initialize Git
If you haven't already, initialize a git repository in the root of your project:
```bash
git init
git add .
git commit -m "Initialize project: Smart Farmer Assistant"
```

### Step 2: Create a New Repo on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `smart-farmer-assistant`).
3. Click "Create repository".

### Step 3: Push to GitHub
Copy the commands from GitHub to link your local repo and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/smart-farmer-assistant.git
git branch -M main
git push -u origin main
```

---

## 2. ⚡ Vercel Deployment (Frontend)

Vercel is the best place to host your React frontend.

### Step 1: Connect your GitHub
1. Log in to [Vercel](https://vercel.com).
2. Click "Add New" → "Project".
3. Import your GitHub repository.

### Step 2: Configure Project
- **Framework Preset:** Vite
- **Root Directory:** `Frontend` (Click 'Edit' next to Root Directory and select the `Frontend` folder)
- **Install Command:** `npm install`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 3: Environment Variables
Add your production backend URL as an environment variable if needed:
- Key: `VITE_API_URL`
- Value: `https://your-backend-url.onrender.com`

---

## 3. 🐍 Backend Deployment (FastAPI)

Since Vercel is optimized for static sites/frontend, we recommend **Render** or **Railway** for the FastAPI backend.

### Deployment on Render.com:
1. Create a free account on [Render](https://render.com).
2. Click "New" → "Web Service".
3. Connect your GitHub and select the same repo.
4. **Root Directory:** `backend`
5. **Runtime:** `Python 3`
6. **Build Command:** `pip install -r requirements.txt`
7. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Important Note for Weights:
Ensure your `ai-ml/models/` folder is pushed to GitHub so Render can load the `.pkl` files.

---

## 🔗 Live Integration
Once both are deployed, update the `fetch` calls in `App.jsx` to point to your Render URL instead of `localhost:8000`.
