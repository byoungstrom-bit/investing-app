import { useState } from 'react';
import { STOCKS_BY_MARKET_CAP } from '../../data/stocksByMarketCap';
import './BacktestingTool.css';

const allSymbols = Object.values(STOCKS_BY_MARKET_CAP).flatMap(t => t.stocks.map(s => s.symbol));

export function BacktestingTool() {
  const [symbol, setSymbol] = useState('AAPL');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2025-01-01');
  const [strategy, setStrategy] = useState('buy_hold');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRun = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const params = new URLSearchParams({ symbol, startDate, endDate, strategy });
      const res = await fetch(`/api/backtest?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Backtest failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backtesting-tool">
      <h2 className="section-title">Backtesting Tool</h2>
      <p className="section-desc">
        Test trading strategies against historical data. Buy & Hold uses live data. SMA, RSI, Momentum use sample data.
      </p>

      <form onSubmit={handleRun} className="backtest-form">
        <div className="form-row">
          <div className="form-group">
            <label>Symbol</label>
            <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
              {allSymbols.filter((s, i, a) => a.indexOf(s) === i).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Strategy</label>
            <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
              <option value="buy_hold">Buy & Hold</option>
              <option value="sma_cross">SMA Crossover</option>
              <option value="rsi">RSI Mean Reversion</option>
              <option value="momentum">Momentum</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="run-btn" disabled={loading}>
          {loading ? 'Running...' : 'Run Backtest'}
        </button>
      </form>

      {error && <p className="backtest-error">{error}</p>}

      {result && (
        <div className="backtest-results">
          <h3>Results</h3>
          <div className="results-grid">
            <div className="result-card">
              <span className="result-label">Total Return</span>
              <span className="result-value positive">{result.totalReturn}%</span>
            </div>
            <div className="result-card">
              <span className="result-label">Annualized Return</span>
              <span className={`result-value ${parseFloat(result.annualizedReturn) >= 0 ? 'positive' : 'negative'}`}>
                {result.annualizedReturn}%
              </span>
            </div>
            <div className="result-card">
              <span className="result-label">Volatility</span>
              <span className="result-value">{result.volatility}%</span>
            </div>
            <div className="result-card">
              <span className="result-label">Sharpe Ratio</span>
              <span className="result-value">{result.sharpeRatio}</span>
            </div>
            <div className="result-card">
              <span className="result-label">Max Drawdown</span>
              <span className="result-value negative">{result.maxDrawdown}%</span>
            </div>
            <div className="result-card">
              <span className="result-label">Trades</span>
              <span className="result-value">{result.trades}</span>
            </div>
          </div>
        </div>
      )}

      <div className="strategy-guide">
        <h3>Strategy Explanations</h3>
        <div className="strategy-list">
          <div className="strategy-item">
            <h4>Buy & Hold</h4>
            <p>Buys the stock at the start date and holds until the end. No trading—pure exposure to the asset’s price movement. Used as a baseline to compare other strategies.</p>
          </div>
          <div className="strategy-item">
            <h4>SMA Crossover</h4>
            <p>Uses two moving averages (e.g., 50-day and 200-day). Buys when the short-term average crosses above the long-term (golden cross), sells when it crosses below (death cross). Tries to follow trend changes.</p>
          </div>
          <div className="strategy-item">
            <h4>RSI Mean Reversion</h4>
            <p>Uses the Relative Strength Index (0–100). Buys when RSI is below 30 (oversold) and sells when RSI is above 70 (overbought). Assumes prices tend to revert to the mean after extremes.</p>
          </div>
          <div className="strategy-item">
            <h4>Momentum</h4>
            <p>Buys when price momentum is strong (e.g., positive returns over the last N days) and sells when momentum weakens. Assumes winners keep winning for a period.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
