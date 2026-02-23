import express from 'express';
import fetch from 'node-fetch';

export const macroRouter = express.Router();

const FRED_KEY = process.env.FRED_API_KEY;

const FRED_SERIES = [
  { id: 'FEDFUNDS', label: 'Fed Funds Rate', format: 'pct', decimals: 2, period: 1 },
  { id: 'DGS10', label: '10Y Treasury', format: 'pct', decimals: 2, period: 1 },
  { id: 'CPIAUCSL', label: 'CPI (YoY)', format: 'pctYoy', decimals: 1, period: 12 },
  { id: 'CPILFESL', label: 'Core CPI', format: 'pctYoy', decimals: 1, period: 12 },
  { id: 'GDPC1', label: 'GDP Growth', format: 'pctYoy', decimals: 1, period: 4 },
  { id: 'UNRATE', label: 'Unemployment', format: 'pct', decimals: 1, period: 1 },
  { id: 'DTWEXBGS', label: 'DXY (Dollar)', format: 'raw', decimals: 1, period: 1 }
];

const FALLBACK_MACRO = [
  { label: 'Fed Funds Rate', value: '4.25%', change: '-0.25', trend: 'down' },
  { label: '10Y Treasury', value: '4.12%', change: '+0.05', trend: 'up' },
  { label: 'CPI (YoY)', value: '2.6%', change: '-0.1', trend: 'down' },
  { label: 'Core CPI', value: '2.7%', change: '-0.1', trend: 'down' },
  { label: 'GDP Growth', value: '2.8%', change: '+0.3', trend: 'up' },
  { label: 'Unemployment', value: '4.4%', change: '+0.1', trend: 'up' },
  { label: 'DXY (Dollar)', value: '103.2', change: '-0.8', trend: 'down' }
];

async function fetchFredSeries(seriesId, limit = 24) {
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=${limit}`;
  const res = await fetch(url);
  const data = await res.json();
  return data?.observations?.filter(o => o.value !== '.') || [];
}

function calcYoYChange(obs, period = 12) {
  if (!obs || obs.length <= period) return null;
  const latest = parseFloat(obs[0].value);
  const yearAgo = parseFloat(obs[period]?.value);
  if (!yearAgo || yearAgo === 0 || isNaN(latest)) return null;
  return ((latest - yearAgo) / yearAgo * 100).toFixed(1);
}

macroRouter.get('/', async (req, res) => {
  if (!FRED_KEY) {
    return res.json({ macro: FALLBACK_MACRO, source: 'fallback' });
  }

  try {
    const results = [];
    for (const s of FRED_SERIES) {
      const obs = await fetchFredSeries(s.id);
      if (!obs.length) continue;

      const latest = parseFloat(obs[0].value);
      const prev = parseFloat(obs[1]?.value || obs[0].value);
      let valueStr, change, trend;

      if (s.format === 'pctYoy') {
        const yoy = calcYoYChange(obs, s.period);
        valueStr = yoy != null ? `${yoy}%` : `${latest.toFixed(s.decimals)}`;
        const prevYoy = obs.length > s.period + 1 ? calcYoYChange(obs.slice(1), s.period) : null;
        change = prevYoy != null ? (parseFloat(yoy) - parseFloat(prevYoy)).toFixed(1) : '0';
      } else if (s.format === 'pct') {
        valueStr = `${latest.toFixed(s.decimals)}%`;
        change = (latest - prev).toFixed(2);
      } else {
        valueStr = latest.toFixed(s.decimals);
        change = (latest - prev).toFixed(1);
      }

      trend = parseFloat(change) >= 0 ? 'up' : 'down';
      results.push({ label: s.label, value: valueStr, change: (parseFloat(change) >= 0 ? '+' : '') + change, trend });
    }

    if (results.length === 0) {
      return res.json({ macro: FALLBACK_MACRO, source: 'fallback' });
    }

    res.json({ macro: results, source: 'fred' });
  } catch (err) {
    console.error('Macro fetch error:', err);
    res.json({ macro: FALLBACK_MACRO, source: 'fallback' });
  }
});
