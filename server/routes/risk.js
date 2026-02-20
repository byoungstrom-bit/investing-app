import express from 'express';
import fetch from 'node-fetch';

export const riskRouter = express.Router();

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';

/**
 * Risk formula: Combines volatility (standard deviation of returns) 
 * and trend momentum (recent performance vs historical)
 * Higher score = higher risk
 */
function calculateRiskScore(returns) {
  if (!returns || returns.length < 5) return null;
  
  const n = returns.length;
  const mean = returns.reduce((a, b) => a + b, 0) / n;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / n;
  const volatility = Math.sqrt(variance) * 100; // as percentage
  
  // Trend: compare recent 20% of data vs older 80%
  const recentCount = Math.max(1, Math.floor(n * 0.2));
  const recentReturns = returns.slice(-recentCount);
  const olderReturns = returns.slice(0, -recentCount);
  
  const recentAvg = recentReturns.reduce((a, b) => a + b, 0) / recentReturns.length;
  const olderAvg = olderReturns.reduce((a, b) => a + b, 0) / olderReturns.length;
  const trendVolatility = Math.abs(recentAvg - olderAvg) * 100;
  
  // Risk score 0-100: 60% volatility weight, 40% trend divergence
  const riskScore = Math.min(100, Math.round(
    (volatility * 0.6) + (trendVolatility * 0.4)
  ));
  
  return {
    riskScore,
    volatility: Math.round(volatility * 10) / 10,
    trendMomentum: recentAvg > olderAvg ? 'up' : 'down',
    dataPoints: n
  };
}

// Demo fallback when Alpha Vantage is unavailable (no key, rate limit, etc.)
function getDemoRiskResult(symbolUpper) {
  const seed = symbolUpper.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const riskScore = 25 + (seed % 50);
  const volatility = 1.2 + (seed % 30) / 10;
  const change30d = -5 + (seed % 20);
  return {
    symbol: symbolUpper,
    currentPrice: 100 + (seed % 500),
    change30d,
    riskScore,
    volatility: Math.round(volatility * 10) / 10,
    trendMomentum: change30d >= 0 ? 'up' : 'down',
    dataPoints: 100,
    riskLevel: riskScore < 30 ? 'low' : riskScore < 60 ? 'medium' : 'high',
    _demo: true
  };
}

riskRouter.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const symbolUpper = symbol.toUpperCase();

  const sendDemo = () => res.json(getDemoRiskResult(symbolUpper));

  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbolUpper}&outputsize=compact&apikey=${ALPHA_VANTAGE_KEY}`;
    const response = await fetch(url);
    let data;
    try {
      data = await response.json();
    } catch {
      return sendDemo();
    }
    if (!data || typeof data !== 'object') return sendDemo();
    
    if (data['Error Message']) return sendDemo();
    if (data['Note']) return sendDemo();
    const timeSeries = data['Time Series (Daily)'];
    if (!timeSeries || typeof timeSeries !== 'object') return sendDemo();
    
    const dates = Object.keys(timeSeries).sort();
    const closes = dates.map(d => parseFloat(timeSeries[d]['4. close']));
    
    const returns = [];
    for (let i = 1; i < closes.length; i++) {
      returns.push((closes[i] - closes[i - 1]) / closes[i - 1]);
    }
    
    const riskAnalysis = calculateRiskScore(returns);
    if (!riskAnalysis) return sendDemo();
    
    const latestPrice = closes[closes.length - 1];
    const price30dAgo = closes[Math.max(0, closes.length - 22)];
    const change30d = ((latestPrice - price30dAgo) / price30dAgo * 100).toFixed(2);
    
    res.json({
      symbol: symbolUpper,
      currentPrice: latestPrice,
      change30d: parseFloat(change30d),
      ...riskAnalysis,
      riskLevel: riskAnalysis.riskScore < 30 ? 'low' : riskAnalysis.riskScore < 60 ? 'medium' : 'high'
    });
  } catch (err) {
    console.error('Risk calc error:', err);
    res.json(getDemoRiskResult(symbolUpper));
  }
});
