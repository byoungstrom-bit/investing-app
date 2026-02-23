# Investors Center

Investment research app — recommendations, risk tools, market data.

## Commit History

The project has 3 commits. Below is what each commit did, and how it would break down into smaller commits if we had committed after every tiny task.

---

### Commit 1: Initial commit

**What it did:** Set up the full app — React + Vite, Express backend, Recommendations, Markets tab (Overview, Sectors, Macro, Earnings, Screener), Advanced tab (Risk Calculator, Backtesting, IPO Pipeline, M&A Feed, Monte Carlo Simulator), and basic styling.

**If committed after each small task (~15–20 commits):**

1. Initialize Vite + React project
2. Add Express server and API routes
3. Add App shell (header, nav, footer, ticker bar)
4. Add Recommendations component with All-In podcast data
5. Add Markets tab container and sub-tabs
6. Add Market Sentiment Meter (mock)
7. Add Sector Heat Map (mock)
8. Add Macro Dashboard (mock)
9. Add Earnings Calendar (mock)
10. Add Undervalued Screener (mock)
11. Add Advanced tab container
12. Add Risk Calculator (API-wired)
13. Add Backtesting Tool (mock)
14. Add IPO Pipeline (mock)
15. Add M&A Feed (mock)
16. Add Monte Carlo Simulator
17. Add global CSS variables and base styles
18. Add Vite proxy for API
19. Add .env.example and .gitignore

---

### Commit 2: American flag logo, macro/sectors layout fixes, tagline update

**What it did:** Replaced the tricolor logo with a real American flag (13 stripes, 50 stars, blue canton), fixed layout issues on Macro and Sectors tabs, and updated the header tagline.

**If committed after each small task (~8 commits):**

1. Create AmericanFlag component (SVG with stripes, canton, stars)
2. Add black outline to flag
3. Replace logo-flag div with AmericanFlag in App.jsx
4. Remove old logo-flag CSS
5. Fix Macro grid (minmax, min-height, flex)
6. Fix Macro label/value separation (labels on own line)
7. Fix Sector Heat Map layout (grid, cells, word-break)
8. Update tagline: remove period, add star

---

### Commit 3: Add FRED/Finnhub APIs, backtest, sample data badges

**What it did:** Wired Macro, Earnings, and Backtesting to live APIs (FRED, Finnhub, Alpha Vantage), added sector API, and added "Sample data Not live" badges to sample-only features.

**If committed after each small task (~14 commits):**

1. Add sectors API route (Alpha Vantage SECTOR)
2. Wire SectorHeatMap to fetch from /api/sectors
3. Add macro API route (FRED)
4. Wire MacroDashboard to fetch from /api/macro
5. Add earnings API route (Finnhub)
6. Wire EarningsCalendar to fetch from /api/earnings
7. Add backtest API route (Alpha Vantage)
8. Wire BacktestingTool to fetch from /api/backtest
9. Add .env.example with FRED, Finnhub
10. Add LIVE_DATA.md
11. Update README with live data link
12. Add "Sample data Not live" badge to Market Sentiment
13. Add badge to Undervalued Screener, IPO Pipeline, M&A Feed
14. Style badge (red, bold)

---

**Total:** 3 commits, or ~37–42 commits if done incrementally.

---

## Live stock data

Add an Alpha Vantage API key for live data. See **[LIVE_DATA.md](LIVE_DATA.md)** for setup.

## Run locally

```bash
cd /Users/brad/Desktop/investment_app
npm install
npm run dev
```

Open **http://localhost:3000**
