import './MandAFeed.css';

// Mock M&A data - replace with API
const MA_DEALS = [
  { acquirer: 'Microsoft', target: 'Character.AI', value: '$4.75B', date: 'Jan 2026', status: 'Rumored' },
  { acquirer: 'Alphabet', target: 'Intersect Energy', value: '$4.75B', date: 'Dec 2025', status: 'Closed' },
  { acquirer: 'Amazon', target: 'Rio Tinto (copper)', value: 'Supply deal', date: 'Jan 2026', status: 'Announced' },
  { acquirer: 'Nvidia', target: 'Grok (xAI)', value: 'IP licensing', date: 'Jan 2026', status: 'Rumored' },
  { acquirer: 'Apple', target: 'AI startup', value: 'TBD', date: '2026', status: 'Speculated' },
  { acquirer: 'Meta', target: 'Content studio', value: 'TBD', date: '2026', status: 'Rumored' }
];

export function MandAFeed() {
  return (
    <div className="ma-feed">
      <h2 className="section-title">M&A Activity Feed</h2>
      <p className="section-desc">
        Recent and rumored mergers & acquisitions. Sample data.
      </p>

      <div className="ma-list">
        {MA_DEALS.map((deal, i) => (
          <div key={i} className="ma-card">
            <div className="ma-header">
              <span className="ma-acquirer">{deal.acquirer}</span>
              <span className="ma-arrow">→</span>
              <span className="ma-target">{deal.target}</span>
            </div>
            <div className="ma-details">
              <span className="ma-value">{deal.value}</span>
              <span className="ma-date">{deal.date}</span>
              <span className={`ma-status ${deal.status.toLowerCase()}`}>{deal.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
