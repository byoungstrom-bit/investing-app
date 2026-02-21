import './MacroDashboard.css';

// Mock data - replace with API in production
const MACRO_DATA = [
  { label: 'Fed Funds Rate', value: '4.25%', change: '-0.25', trend: 'down' },
  { label: '10Y Treasury', value: '4.12%', change: '+0.05', trend: 'up' },
  { label: 'CPI (YoY)', value: '2.6%', change: '-0.1', trend: 'down' },
  { label: 'Core CPI', value: '2.7%', change: '-0.1', trend: 'down' },
  { label: 'GDP Growth', value: '2.8%', change: '+0.3', trend: 'up' },
  { label: 'Unemployment', value: '4.4%', change: '+0.1', trend: 'up' },
  { label: 'DXY (Dollar)', value: '103.2', change: '-0.8', trend: 'down' }
];

export function MacroDashboard() {
  return (
    <div className="macro-dashboard">
      <h2 className="section-title">Macro Dashboard</h2>
      <p className="section-desc">Key economic indicators</p>

      <div className="macro-grid">
        {MACRO_DATA.map((item) => (
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

      <p className="macro-note">Sample data. Add API for live macro data.</p>
    </div>
  );
}
