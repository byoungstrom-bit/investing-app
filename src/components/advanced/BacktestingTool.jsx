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

  const handleRun = (e) => {
    e.preventDefault();
    // Mock backtest result - replace with actual API/calculation
    const mockReturn = 12.5 + Math.random() * 20;
    const mockVolatility = 15 + Math.random() * 10;
    const mockSharpe = mockReturn / mockVolatility;
    setResult({
      totalReturn: mockReturn.toFixed(2),
      annualizedReturn: (mockReturn * 1.1).toFixed(2),
      volatility: mockVolatility.toFixed(2),
      sharpeRatio: mockSharpe.toFixed(2),
      maxDrawdown: (-8 - Math.random() * 12).toFixed(2),
      trades: Math.floor(20 + Math.random() * 30)
    });
  };

  return (
    <div className="backtesting-tool">
      <h2 className="section-title">Backtesting Tool</h2>
      <p className="section-desc">
        Test trading strategies against historical data. Add API for live backtesting.
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
        <button type="submit" className="run-btn">Run Backtest</button>
      </form>

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
              <span className="result-value positive">{result.annualizedReturn}%</span>
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
