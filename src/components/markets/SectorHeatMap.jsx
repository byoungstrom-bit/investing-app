import './SectorHeatMap.css';

// Mock data - replace with API in production
const SECTORS = [
  { name: 'Technology', change: 2.4, ticker: 'XLK' },
  { name: 'Healthcare', change: -0.3, ticker: 'XLV' },
  { name: 'Financials', change: 1.8, ticker: 'XLF' },
  { name: 'Consumer Disc.', change: 1.2, ticker: 'XLY' },
  { name: 'Industrials', change: 0.9, ticker: 'XLI' },
  { name: 'Energy', change: -1.5, ticker: 'XLE' },
  { name: 'Materials', change: 0.4, ticker: 'XLB' },
  { name: 'Utilities', change: -0.8, ticker: 'XLU' },
  { name: 'Real Estate', change: -1.2, ticker: 'XLRE' },
  { name: 'Comm. Services', change: 3.1, ticker: 'XLC' }
];

function getHeatClass(change) {
  if (change >= 1.5) return 'hot';
  if (change >= 0.5) return 'warm';
  if (change >= -0.5) return 'neutral';
  if (change >= -1.5) return 'cool';
  return 'cold';
}

export function SectorHeatMap() {
  return (
    <div className="sector-heatmap">
      <h2 className="section-title">Sector Heat Map</h2>
      <p className="section-desc">1-day performance by sector</p>

      <div className="heatmap-grid">
        {SECTORS.map((sector) => (
          <div
            key={sector.ticker}
            className={`heatmap-cell ${getHeatClass(sector.change)}`}
          >
            <span className="sector-name">{sector.name}</span>
            <span className="sector-ticker">{sector.ticker}</span>
            <span className={`sector-change ${sector.change >= 0 ? 'up' : 'down'}`}>
              {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

      <div className="heatmap-legend">
        <span className="legend-item cold">-2%</span>
        <span className="legend-item neutral">0%</span>
        <span className="legend-item hot">+2%</span>
      </div>
    </div>
  );
}
