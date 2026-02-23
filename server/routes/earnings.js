import express from 'express';
import fetch from 'node-fetch';

export const earningsRouter = express.Router();

const FINNHUB_KEY = process.env.FINNHUB_API_KEY;

function getDateRange() {
  const now = new Date();
  const from = new Date(now);
  from.setDate(1);
  const to = new Date(now);
  to.setMonth(to.getMonth() + 2);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10)
  };
}

earningsRouter.get('/', async (req, res) => {
  if (!FINNHUB_KEY) {
    return res.json({ earnings: [], source: 'fallback' });
  }

  try {
    const { from, to } = getDateRange();
    const url = `https://finnhub.io/api/v1/calendar/earnings?from=${from}&to=${to}&token=${FINNHUB_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.earningsCalendar || !Array.isArray(data.earningsCalendar)) {
      return res.json({ earnings: [], source: 'fallback' });
    }

    const earnings = data.earningsCalendar
      .filter(e => e.symbol && e.date)
      .slice(0, 50)
      .map(e => ({
        symbol: e.symbol,
        name: e.companyName || e.symbol,
        date: e.date ? new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—',
        time: e.hour === 'bmo' ? 'BMO' : e.hour === 'amc' ? 'AMC' : '—',
        estimate: e.epsEstimate != null ? e.epsEstimate.toFixed(2) : '—',
        change: e.actual != null && e.epsEstimate != null && e.epsEstimate !== 0
          ? (((e.actual - e.epsEstimate) / Math.abs(e.epsEstimate)) * 100).toFixed(2)
          : null
      }));

    res.json({ earnings, source: 'finnhub' });
  } catch (err) {
    console.error('Earnings fetch error:', err);
    res.json({ earnings: [], source: 'fallback' });
  }
});
