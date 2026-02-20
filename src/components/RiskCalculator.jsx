import { useState } from 'react';
import './RiskCalculator.css';

export function RiskCalculator() {
  const [symbol, setSymbol] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/risk/${encodeURIComponent(symbol.trim())}`);
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error('Server returned invalid response. Is the backend running? Try "npm run dev".');
      }
      if (!res.ok) throw new Error(data.error || `Failed to fetch (${res.status})`);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="risk-calculator">
      <div className="section-header">
        <h2>Stock Risk Calculator</h2>
        <p className="formula-desc">
          Risk score combines <strong>volatility</strong> (standard deviation of daily returns) 
          and <strong>trend momentum</strong> (recent vs historical performance). 
          Higher score = higher risk.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="risk-form">
        <input
          type="text"
          placeholder="Enter symbol (e.g. AAPL, NVDA, TSLA)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="symbol-input"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Risk'}
        </button>
      </form>

      {error && <div className="error-msg">{error}</div>}

      {result && (
        <div className="risk-result">
          <div className="result-header">
            <h3>{result.symbol}</h3>
            <span className={`risk-badge ${result.riskLevel}`}>{result.riskLevel} risk</span>
          </div>
          <div className="result-grid">
            <div className="result-item">
              <span className="label">Risk Score</span>
              <span className="value">{result.riskScore}/100</span>
            </div>
            <div className="result-item">
              <span className="label">Volatility</span>
              <span className="value">{result.volatility}%</span>
            </div>
            <div className="result-item">
              <span className="label">30d Change</span>
              <span className={`value ${result.change30d >= 0 ? 'positive' : 'negative'}`}>
                {result.change30d >= 0 ? '+' : ''}{result.change30d}%
              </span>
            </div>
            <div className="result-item">
              <span className="label">Trend</span>
              <span className={`value trend-${result.trendMomentum}`}>
                {result.trendMomentum === 'up' ? '↑ Upward' : '↓ Downward'}
              </span>
            </div>
          </div>
          <p className="price-note">Current price: ${result.currentPrice?.toFixed(2)}</p>
          {result._demo && (
            <p className="api-note">
              Demo data — add <code>ALPHA_VANTAGE_API_KEY</code> to env for live data.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
