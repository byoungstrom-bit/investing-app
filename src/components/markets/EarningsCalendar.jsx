import { useState, useEffect } from 'react';
import { STOCKS_BY_MARKET_CAP } from '../../data/stocksByMarketCap';
import './EarningsCalendar.css';

function FallbackEarnings() {
  return (
    <>
      {Object.entries(STOCKS_BY_MARKET_CAP).map(([key, tier]) => (
        <div key={key} className="earnings-tier">
          <h3 className="tier-header">
            {tier.label}
            <span className="tier-range">{tier.range}</span>
          </h3>
          <div className="earnings-table-wrap">
            <table className="earnings-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Est. EPS</th>
                  <th>1d Change</th>
                </tr>
              </thead>
              <tbody>
                {tier.stocks.map((e) => (
                  <tr key={e.symbol}>
                    <td className="symbol">{e.symbol}</td>
                    <td>{e.name}</td>
                    <td>{e.date}</td>
                    <td><span className="time-badge">{e.time}</span></td>
                    <td className="estimate">${e.estimate}</td>
                    <td className={`change ${e.change >= 0 ? 'up' : 'down'}`}>
                      {e.change >= 0 ? '+' : ''}{e.change.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

export function EarningsCalendar() {
  const [earnings, setEarnings] = useState([]);
  const [source, setSource] = useState('loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/earnings')
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setEarnings(data.earnings || []);
          setSource(data.source || 'fallback');
        }
      })
      .catch(() => {
        if (!cancelled) setSource('fallback');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const useLive = source === 'finnhub' && earnings.length > 0;

  return (
    <div className="earnings-calendar">
      <h2 className="section-title">Earnings Calendar</h2>
      <p className="section-desc">
        {useLive ? 'Upcoming earnings (live)' : 'Upcoming earnings by market cap'}
        {source === 'fallback' && ' • Sample data'}
      </p>

      {loading ? (
        <p className="earnings-loading">Loading earnings...</p>
      ) : useLive ? (
        <div className="earnings-table-wrap">
          <table className="earnings-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Date</th>
                <th>Time</th>
                <th>Est. EPS</th>
                <th>Surprise</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((e, i) => (
                <tr key={`${e.symbol}-${e.date}-${i}`}>
                  <td className="symbol">{e.symbol}</td>
                  <td>{e.name}</td>
                  <td>{e.date}</td>
                  <td><span className="time-badge">{e.time}</span></td>
                  <td className="estimate">{e.estimate !== '—' ? `$${e.estimate}` : '—'}</td>
                  <td className={`change ${e.change != null ? (e.change >= 0 ? 'up' : 'down') : ''}`}>
                    {e.change != null ? `${e.change >= 0 ? '+' : ''}${e.change}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <FallbackEarnings />
      )}

      <p className="earnings-note">AMC = After Market Close, BMO = Before Market Open.</p>
    </div>
  );
}
