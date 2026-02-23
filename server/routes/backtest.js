import express from 'express';
import fetch from 'node-fetch';

export const backtestRouter = express.Router();

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';

backtestRouter.get('/', async (req, res) => {
  const { symbol, startDate, endDate, strategy } = req.query;
  const sym = (symbol || 'AAPL').toUpperCase();
  const start = startDate || '2024-01-01';
  const end = endDate || '2025-01-01';
  const strat = strategy || 'buy_hold';

  const mockResult = () => {
    const mockReturn = 12.5 + Math.random() * 20;
    const mockVol = 15 + Math.random() * 10;
    return res.json({
      totalReturn: mockReturn.toFixed(2),
      annualizedReturn: (mockReturn * 1.1).toFixed(2),
      volatility: mockVol.toFixed(2),
      sharpeRatio: (mockReturn / mockVol).toFixed(2),
      maxDrawdown: (-8 - Math.random() * 12).toFixed(2),
      trades: 1,
      source: 'demo'
    });
  };

  if (strat !== 'buy_hold') {
    return mockResult();
  }

  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${sym}&outputsize=compact&apikey=${ALPHA_VANTAGE_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data['Error Message'] || data['Note'] || !data['Time Series (Daily)']) {
      return mockResult();
    }

    const timeSeries = data['Time Series (Daily)'];
    const dates = Object.keys(timeSeries)
      .filter(d => d >= start && d <= end)
      .sort();
    if (dates.length < 2) return mockResult();

    const closes = dates.map(d => parseFloat(timeSeries[d]['4. close']));
    const startPrice = closes[0];
    const endPrice = closes[closes.length - 1];
    const totalReturn = ((endPrice - startPrice) / startPrice * 100);
    const days = dates.length;
    const years = days / 365;
    const annualizedReturn = years > 0 ? (Math.pow(1 + totalReturn / 100, 1 / years) - 1) * 100 : totalReturn;

    const returns = [];
    for (let i = 1; i < closes.length; i++) {
      returns.push((closes[i] - closes[i - 1]) / closes[i - 1] * 100);
    }
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((s, r) => s + Math.pow(r - mean, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance * 252);

    let peak = startPrice;
    let maxDrawdown = 0;
    for (const p of closes) {
      if (p > peak) peak = p;
      const dd = ((p - peak) / peak) * 100;
      if (dd < maxDrawdown) maxDrawdown = dd;
    }

    const sharpeRatio = volatility > 0 ? (annualizedReturn / volatility) : 0;

    res.json({
      totalReturn: totalReturn.toFixed(2),
      annualizedReturn: annualizedReturn.toFixed(2),
      volatility: volatility.toFixed(2),
      sharpeRatio: sharpeRatio.toFixed(2),
      maxDrawdown: maxDrawdown.toFixed(2),
      trades: 1,
      source: 'alphavantage'
    });
  } catch (err) {
    console.error('Backtest error:', err);
    mockResult();
  }
});
