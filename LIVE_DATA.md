# Live Data Setup

Your app uses three free APIs. Add the keys below to enable live data.

---

## Alpha Vantage (Stock Prices, Sectors, Trending)

### Get a Free API Key

1. Go to [alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)
2. Enter your email and click **Get Free API Key**
3. Copy the key (e.g. `ABC123XYZ...`)

### Add the Key

**Local:** In `.env`:
```
ALPHA_VANTAGE_API_KEY=your_key_here
```

**Railway:** Project → Service → Variables → Add `ALPHA_VANTAGE_API_KEY`

### What It Powers

| Feature | Location |
|---------|----------|
| Risk Calculator | Advanced tab |
| Trending Stocks | Markets → Overview |
| Sector Heat Map | Markets → Sectors |

### Free Tier Limits

- 25 requests per day
- 5 requests per minute

---

## FRED (Macro Economic Data)

### Get a Free API Key

1. Go to [fred.stlouisfed.org/docs/api/fred](https://fred.stlouisfed.org/docs/api/fred/)
2. Click **Request an API Key** (or go to [fred.stlouisfed.org/docs/api/api_key.html](https://fred.stlouisfed.org/docs/api/api_key.html))
3. Create a free account and copy your key

### Add the Key

**Local:** In `.env`:
```
FRED_API_KEY=your_key_here
```

**Railway:** Project → Service → Variables → Add `FRED_API_KEY`

### What It Powers

| Feature | Location |
|---------|----------|
| Macro Dashboard | Markets → Macro |

Fed Funds Rate, CPI, Unemployment, GDP, etc.

### Free Tier

- Free for personal/non-commercial use
- No strict rate limit for normal use

---

## Finnhub (Earnings, News, Fundamentals)

### Get a Free API Key

1. Go to [finnhub.io/register](https://finnhub.io/register)
2. Sign up with email or GitHub
3. Copy your API key from the dashboard

### Add the Key

**Local:** In `.env`:
```
FINNHUB_API_KEY=your_key_here
```

**Railway:** Project → Service → Variables → Add `FINNHUB_API_KEY`

### What It Powers

| Feature | Location |
|---------|----------|
| Earnings Calendar | Markets → Earnings |
| Company fundamentals | Markets → Undervalued Screener |
| News (IPO, M&A) | Advanced tab |

### Free Tier Limits

- 60 API calls per minute
- No daily cap on free tier

---

## Summary: Your `.env` File

```
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
FRED_API_KEY=your_fred_key
FINNHUB_API_KEY=your_finnhub_key
PORT=3001
```

Add the same variables in Railway under **Variables** for production.
