import { useState } from 'react';
import { STOCKS_BY_MARKET_CAP } from '../../data/stocksByMarketCap';
import './MonteCarloSimulator.css';

const allSymbols = [...new Set(Object.values(STOCKS_BY_MARKET_CAP).flatMap(t => t.stocks.map(s => s.symbol)))];

// Simple Monte Carlo: random walk with mean return and volatility
function runSimulation(initialValue, annualReturn, volatility, years, simulations) {
  const results = [];
  const monthlyReturn = annualReturn / 100 / 12;
  const monthlyVol = volatility / 100 / Math.sqrt(12);

  for (let s = 0; s < simulations; s++) {
    let value = initialValue;
    const path = [value];
    for (let m = 0; m < years * 12; m++) {
      const random = (Math.random() - 0.5) * 2; // -1 to 1
      value *= 1 + monthlyReturn + monthlyVol * random;
      path.push(value);
    }
    results.push({ final: value, path });
  }

  results.sort((a, b) => a.final - b.final);
  const p10 = results[Math.floor(simulations * 0.1)].final;
  const p50 = results[Math.floor(simulations * 0.5)].final;
  const p90 = results[Math.floor(simulations * 0.9)].final;

  return { p10, p50, p90, samplePaths: results.slice(-5).map(r => r.path) };
}

export function MonteCarloSimulator() {
  const [symbol, setSymbol] = useState('AAPL');
  const [initialValue, setInitialValue] = useState(10000);
  const [years, setYears] = useState(10);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [volatility, setVolatility] = useState(20);
  const [simulations, setSimulations] = useState(1000);
  const [result, setResult] = useState(null);

  const handleRun = (e) => {
    e.preventDefault();
    const r = runSimulation(initialValue, annualReturn, volatility, years, simulations);
    setResult(r);
  };

  return (
    <div className="monte-carlo">
      <h2 className="section-title">Monte Carlo Simulator</h2>
      <p className="section-desc">
        Simulate portfolio outcomes using random walks. Uses your assumptions for return and volatility.
      </p>

      <form onSubmit={handleRun} className="mc-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Symbol (for reference)</label>
            <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
              {allSymbols.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Initial Investment ($)</label>
            <input type="number" value={initialValue} onChange={(e) => setInitialValue(Number(e.target.value))} min={100} step={1000} />
          </div>
          <div className="form-group">
            <label>Years</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} min={1} max={40} />
          </div>
          <div className="form-group">
            <label>Expected Annual Return (%)</label>
            <input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} step={0.5} />
          </div>
          <div className="form-group">
            <label>Annual Volatility (%)</label>
            <input type="number" value={volatility} onChange={(e) => setVolatility(Number(e.target.value))} step={1} />
          </div>
          <div className="form-group">
            <label>Simulations</label>
            <input type="number" value={simulations} onChange={(e) => setSimulations(Number(e.target.value))} min={100} max={10000} step={100} />
          </div>
        </div>
        <button type="submit" className="run-btn">Run Simulation</button>
      </form>

      {result && (
        <div className="mc-results">
          <h3>Projected Outcomes</h3>
          <p className="mc-note">10th, 50th, and 90th percentile of {simulations} simulations</p>
          <div className="percentile-grid">
            <div className="percentile-card">
              <span className="label">10th Percentile (Worst 10%)</span>
              <span className="value">${result.p10.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="percentile-card median">
              <span className="label">50th Percentile (Median)</span>
              <span className="value">${result.p50.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="percentile-card">
              <span className="label">90th Percentile (Best 10%)</span>
              <span className="value">${result.p90.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
