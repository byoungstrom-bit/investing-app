# Investor's Edge

A full-stack investment research web app featuring:

- **All-In Podcast 2026 Predictions** — Recommendations and anti-recommendations from Chamath, Jason, Sacks, and Friedberg (from the Jan 10, 2026 episode)
- **Stock Risk Calculator** — Volatility + trend momentum formula to assess risk
- **Trending Now** — Current market movers

## Setup

```bash
npm install
```

### Optional: Alpha Vantage API

For live stock data (risk calculator + trending), get a free API key at [alphavantage.co](https://www.alphavantage.co/support/#api-key) and set:

```bash
export ALPHA_VANTAGE_API_KEY=your_key_here
```

Without it, the app uses fallback/sample data.

## Run

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Build

```bash
npm run build
```

Static files go to `dist/`. Serve the backend separately for API routes.

## Tech

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Data:** All-In predictions from podcast transcripts; Alpha Vantage for stocks
