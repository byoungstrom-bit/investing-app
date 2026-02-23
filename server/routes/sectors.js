import express from 'express';
import fetch from 'node-fetch';

export const sectorsRouter = express.Router();

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';

// Map Alpha Vantage sector names to our display format + ETF ticker
const SECTOR_MAP = [
  { avName: 'Information Technology', name: 'Technology', ticker: 'XLK' },
  { avName: 'Health Care', name: 'Healthcare', ticker: 'XLV' },
  { avName: 'Financials', name: 'Financials', ticker: 'XLF' },
  { avName: 'Consumer Discretionary', name: 'Consumer Disc.', ticker: 'XLY' },
  { avName: 'Industrials', name: 'Industrials', ticker: 'XLI' },
  { avName: 'Energy', name: 'Energy', ticker: 'XLE' },
  { avName: 'Materials', name: 'Materials', ticker: 'XLB' },
  { avName: 'Utilities', name: 'Utilities', ticker: 'XLU' },
  { avName: 'Real Estate', name: 'Real Estate', ticker: 'XLRE' },
  { avName: 'Communication Services', name: 'Comm. Services', ticker: 'XLC' }
];

const FALLBACK_SECTORS = [
  { name: 'Technology', change: 2.4, ticker: 'XLK' },
  { name: 'Healthcare', change: -0.3, ticker: 'XLV' },
  { name: 'Financials', change: 1.8, ticker: 'XLF' },
  { name: 'Consumer Disc.', change: 1.2, ticker: 'XLY' },
  { name: 'Industrials', change: 0.9, ticker: 'XLI' },
  { name: 'Energy', change: -1.5, ticker: 'XLE' },
  { name: 'Materials', change: 0.4, ticker: 'XLB' },
  { name: 'Utilities', change: -0.8, ticker: 'XLU' },
  { name: 'Real Estate', change: -1.2, ticker: 'XLRE' },
  { name: 'Comm. Services', change: 3.1, ticker: 'XLC' }
];

function parsePercent(val) {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') return parseFloat(val.replace('%', '')) || 0;
  return 0;
}

sectorsRouter.get('/', async (req, res) => {
  try {
    const url = `https://www.alphavantage.co/query?function=SECTOR&apikey=${ALPHA_VANTAGE_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data['Error Message'] || data['Note']) {
      return res.json({ sectors: FALLBACK_SECTORS, source: 'fallback' });
    }

    // Alpha Vantage returns "Rank A: Real-Time Performance" or "Rank B: 1 Day Performance"
    const perfKey = Object.keys(data).find(k =>
      k.includes('1 Day') || k.includes('Real-Time') || k.includes('Performance')
    );
    const perf = perfKey ? data[perfKey] : null;

    if (!perf || typeof perf !== 'object') {
      return res.json({ sectors: FALLBACK_SECTORS, source: 'fallback' });
    }

    const sectors = SECTOR_MAP.map(({ avName, name, ticker }) => {
      const raw = perf[avName];
      const change = parsePercent(raw);
      return { name, change, ticker };
    }).filter(s => !Number.isNaN(s.change));

    if (sectors.length === 0) {
      return res.json({ sectors: FALLBACK_SECTORS, source: 'fallback' });
    }

    res.json({ sectors, source: 'alphavantage' });
  } catch (err) {
    console.error('Sectors fetch error:', err);
    res.json({ sectors: FALLBACK_SECTORS, source: 'fallback' });
  }
});
