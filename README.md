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

---

## Phil Notes

### What the website does

Investors Center helps people who don’t know much about investing by:

- **Recommendations from proven investors** — Curated picks from the All-In Podcast (Chamath, Jason, David, Friedberg) with rationale and transcript references.
- **Simple and complex data** — Markets tab for quick overviews (sentiment, sectors, macro, earnings) and Advanced tab for deeper tools (risk calculator, backtesting, Monte Carlo).
- **Strategy testing** — Backtesting Tool lets users test buy-and-hold and other strategies on historical data.
- **Risk awareness** — Risk Calculator shows volatility and risk scores for any ticker.
- **Multiple knowledge levels** — Overview data for beginners; screener, backtest, and Monte Carlo for more advanced users.

### Design inspiration

The site is styled after the fictional “Investor Center” from *The Wolf of Wall Street* — the sketchy boiler-room investment firm. That’s why the look is intentionally bold, retro, and a bit over-the-top (red/white/blue, gold accents, strong typography).

---

### Live data vs sample data

| Section | Live data? | API |
|--------|------------|-----|
| **Risk Calculator** | ✅ Yes | Alpha Vantage |
| **Trending Stocks** | ✅ Yes | Alpha Vantage |
| **Sector Heat Map** | ✅ Yes | Alpha Vantage |
| **Macro Dashboard** | ✅ Yes | FRED (St. Louis Fed) |
| **Earnings Calendar** | ✅ Yes | Finnhub |
| **Backtesting (Buy & Hold)** | ✅ Yes | Alpha Vantage |
| **Market Sentiment Meter** | ❌ Sample | — |
| **Undervalued Screener** | ❌ Sample | — |
| **IPO Pipeline** | ❌ Sample | — |
| **M&A Feed** | ❌ Sample | — |
| **Backtesting (SMA, RSI, Momentum)** | ❌ Sample | — |

### Why some sections use sample data

- **Market Sentiment (VIX, Put/Call, Fear & Greed)** — No free API for these. CNN Fear & Greed has no official API; alternatives are paid or unofficial.
- **Undervalued Screener (P/E, P/B, PEG)** — Would need many API calls per symbol (Alpha Vantage free tier: 25/day). Finnhub has fundamentals but would require heavy batching and caching.
- **IPO Pipeline** — IPO calendars are mostly paid (e.g. Finnhub IPO Calendar is premium). Free sources are limited or unreliable.
- **M&A Feed** — M&A news and deal data usually require premium news/filings APIs.
- **Backtesting (SMA, RSI, Momentum)** — Would need historical data plus strategy logic. Alpha Vantage free tier limits make multi-strategy backtesting impractical without paid plans.

**Summary:** Adding live data for the sample sections would need expensive subscriptions (e.g. Alpha Vantage Premium ~$50/mo, Finnhub Premium) and more server-side processing than we can run on a free-tier deployment.

---

### Commit summary (for grading)

| Commit | What it contains |
|--------|------------------|
| **1. Initial commit** | Full app: React + Vite, Express, Recommendations, Markets (Sentiment, Sectors, Macro, Earnings, Screener), Advanced (Risk, Backtest, IPO, M&A, Monte Carlo), styling |
| **2. American flag, layout, tagline** | Real American flag SVG, Macro/Sectors layout fixes, tagline update |
| **3. APIs + badges** | FRED macro, Finnhub earnings, sectors API, backtest API, “Sample data Not live” badges |

---

### Other details

- **Stack:** React, Vite, Express, Node.js
- **Deployment:** Railway (www.polarisprojectinvestorcenter.xyz)
- **API keys:** Alpha Vantage, FRED, Finnhub (see LIVE_DATA.md)
