import { useState, useEffect } from 'react';
import './MacroDashboard.css';

const FALLBACK_MACRO = [
  { label: 'Fed Funds Rate', value: '4.25%', change: '-0.25', trend: 'down' },
  { label: '10Y Treasury', value: '4.12%', change: '+0.05', trend: 'up' },
  { label: 'CPI (YoY)', value: '2.6%', change: '-0.1', trend: 'down' },
  { label: 'Core CPI', value: '2.7%', change: '-0.1', trend: 'down' },
  { label: 'GDP Growth', value: '2.8%', change: '+0.3', trend: 'up' },
  { label: 'Unemployment', value: '4.4%', change: '+0.1', trend: 'up' },
  { label: 'DXY (Dollar)', value: '103.2', change: '-0.8', trend: 'down' }
];

export function MacroDashboard() {
  const [macro, setMacro] = useState(FALLBACK_MACRO);
  const [source, setSource] = useState('loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/macro')
      .then(res => res.json())
      .then(data => {
        if (!cancelled && data.macro?.length) {
          setMacro(data.macro);
          setSource(data.source || 'fallback');
        } else if (!cancelled) {
          setSource('fallback');
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

  return (
    <div className="macro-dashboard">
      <h2 className="section-title">Macro Dashboard</h2>
      <p className="section-desc">
        Key economic indicators
        {source === 'fred' && ' • Live data'}
        {source === 'fallback' && ' • Sample data'}
      </p>

      {loading ? (
        <p className="macro-loading">Loading macro data...</p>
      ) : (
        <>
          <div className="macro-grid">
            {macro.map((item) => (
              <div key={item.label} className="macro-card">
                <span className="macro-label">{item.label}</span>
                <div className="macro-values">
                  <span className="macro-value">{item.value}</span>
                  <span className={`macro-change ${item.trend}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="macro-note">
            {source === 'fred' ? 'Data from FRED (St. Louis Fed).' : 'Sample data. Add FRED_API_KEY for live macro data.'}
          </p>
        </>
      )}
    </div>
  );
}
