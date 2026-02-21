# Deploy to Production (Render)

## Your Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Host:** Render (single platform for both)

---

## Step-by-Step Deployment

### 1. Push your latest code to GitHub
```bash
cd /Users/brad/Desktop/investment_app
git add .
git commit -m "Add production config"
git push
```

### 2. Create a Render account
- Go to **https://render.com**
- Click **Get Started Free**
- Sign up with **GitHub** (easiest)

### 3. Create a new Web Service
- Click **New +** → **Web Service**
- Connect your GitHub account if you haven’t
- Find **investing-app** and click **Connect**

### 4. Configure the service
Use these settings:

| Field | Value |
|-------|-------|
| **Name** | `investing-app` (or any name) |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `NODE_ENV=production node server/index.js` |

### 5. Environment variables (optional)
- **Environment** → **Add Environment Variable**
- Add `NODE_ENV` = `production` (Render often sets this automatically)
- Add `ALPHA_VANTAGE_API_KEY` if you use live stock data

### 6. Deploy
- Click **Create Web Service**
- Wait 5–10 minutes for the build
- When it says **Live**, your app is deployed

### 7. Get your URL
- Render gives you a URL like: `https://investing-app-xxxx.onrender.com`
- Open it in your browser to use your app

---

## Connect your GoDaddy domain later
1. In Render: **Settings** → **Custom Domains** → **Add Custom Domain**
2. Enter your domain (e.g. `investmentapp.com`)
3. In GoDaddy: Add the DNS records Render shows you
4. Wait for DNS to propagate (usually 5–30 minutes)
