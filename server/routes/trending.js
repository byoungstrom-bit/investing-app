import express from 'express';
import fetch from 'node-fetch';

export const trendingRouter = express.Router();

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';

// Fallback trending data when API unavailable
const FALLBACK_TRENDING = [
  { symbol: 'NVDA', name: 'NVIDIA', change: 2.4, sector: 'Technology' },
  { symbol: 'AAPL', name: 'Apple', change: 1.8, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', change: 1.5, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet', change: 1.2, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon', change: 2.1, sector: 'Consumer' },
  { symbol: 'META', name: 'Meta', change: -0.8, sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla', change: 3.2, sector: 'Auto' },
  { symbol: 'AMD', name: 'AMD', change: 4.1, sector: 'Technology' },
  { symbol: 'COIN', name: 'Coinbase', change: 5.2, sector: 'Finance' },
  { symbol: 'HOOD', name: 'Robinhood', change: 2.9, sector: 'Finance' }
];

trendingRouter.get('/', async (req, res) => {
  try {
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${ALPHA_VANTAGE_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data['Error Message'] || data['Note']) {
      return res.json({ trending: FALLBACK_TRENDING, source: 'fallback' });
    }
    
    const topGainers = (data.top_gainers || []).slice(0, 5).map(g => ({
      symbol: g.ticker,
      name: g.ticker,
      change: parseFloat(g.change_percentage?.replace('%', '') || 0),
      sector: 'Market'
    }));
    
    const topLosers = (data.top_losers || []).slice(0, 5).map(l => ({
      symbol: l.ticker,
      name: l.ticker,
      change: parseFloat(l.change_percentage?.replace('%', '') || 0) * -1,
      sector: 'Market'
    }));
    
    const trending = [...topGainers, ...topLosers]
      .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
      .slice(0, 10);
    
    res.json({ trending, source: 'alphavantage' });
  } catch (err) {
    console.error('Trending fetch error:', err);
    res.json({ trending: FALLBACK_TRENDING, source: 'fallback' });
  }
});
