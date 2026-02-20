import { useState } from 'react';
import { STOCKS_BY_MARKET_CAP } from '../../data/stocksByMarketCap';
import './UndervaluedScreener.css';

// Mock screener data - P/E, P/B, PEG, etc.
const getScreenerData = () => {
  const allStocks = Object.values(STOCKS_BY_MARKET_CAP).flatMap(t => t.stocks);
  return allStocks.map((s) => ({
    ...s,
    pe: (15 + Math.random() * 25).toFixed(1),
    pb: (1.5 + Math.random() * 4).toFixed(2),
    peg: (0.8 + Math.random() * 1.5).toFixed(2),
    dividend: (Math.random() * 3).toFixed(2),
    score: Math.floor(40 + Math.random() * 60)
  })).sort((a, b) => b.score - a.score);
};

export function UndervaluedScreener() {
  const [data] = useState(() => getScreenerData());
  const [sortBy, setSortBy] = useState('score');

  const sorted = [...data].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'pe') return parseFloat(a.pe) - parseFloat(b.pe);
    if (sortBy === 'peg') return parseFloat(a.peg) - parseFloat(b.peg);
    if (sortBy === 'change') return b.change - a.change;
    return 0;
  });

  return (
    <div className="undervalued-screener">
      <h2 className="section-title">Undervalued Screener</h2>
      <p className="section-desc">
        Screen for stocks with attractive valuations. Lower P/E and PEG may indicate undervaluation.
      </p>

      <div className="data-disclaimer">
        <strong>Not real-time.</strong> P/E, P/B, PEG, and scores are sample data for demo purposes. 
        Add an API (e.g. Alpha Vantage, Finnhub) for live fundamentals.
      </div>

      <div className="screener-controls">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="score">Undervalued Score</option>
          <option value="pe">P/E (Low first)</option>
          <option value="peg">PEG (Low first)</option>
          <option value="change">1d Change</option>
        </select>
      </div>

      <div className="screener-table-wrap">
        <table className="screener-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Company</th>
              <th>P/E</th>
              <th>P/B</th>
              <th>PEG</th>
              <th>Div %</th>
              <th>Score</th>
              <th>1d</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.symbol}>
                <td className="symbol">{row.symbol}</td>
                <td>{row.name}</td>
                <td>{row.pe}</td>
                <td>{row.pb}</td>
                <td>{row.peg}</td>
                <td>{row.dividend}%</td>
                <td>
                  <span className={`score-badge ${row.score >= 70 ? 'high' : row.score >= 50 ? 'mid' : 'low'}`}>
                    {row.score}
                  </span>
                </td>
                <td className={`change ${row.change >= 0 ? 'up' : 'down'}`}>
                  {row.change >= 0 ? '+' : ''}{row.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
