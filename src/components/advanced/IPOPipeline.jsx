import './IPOPipeline.css';

// Mock IPO data - replace with API
const IPO_PIPELINE = [
  { company: 'SpaceX', estVal: '$200B+', date: 'H2 2026', status: 'Rumored' },
  { company: 'Stripe', estVal: '$70B', date: '2026', status: 'Expected' },
  { company: 'Anthropic', estVal: '$40B', date: '2026', status: 'Expected' },
  { company: 'OpenAI', estVal: '$100B+', date: '2026-27', status: 'Rumored' },
  { company: 'Anduril', estVal: '$12B', date: '2026', status: 'Expected' },
  { company: 'Databricks', estVal: '$43B', date: '2026', status: 'Expected' },
  { company: 'Discord', estVal: '$15B', date: 'TBD', status: 'Watching' },
  { company: 'Reddit', estVal: '$6.4B', date: 'Mar 2025', status: 'Completed' }
];

export function IPOPipeline() {
  return (
    <div className="ipo-pipeline">
      <h2 className="section-title">IPO Pipeline Tracker <span className="sample-badge">Sample data Not live</span></h2>
      <p className="section-desc">
        Upcoming and recent IPOs. Sample data.
      </p>

      <div className="ipo-table-wrap">
        <table className="ipo-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Est. Valuation</th>
              <th>Expected Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {IPO_PIPELINE.map((ipo, i) => (
              <tr key={i}>
                <td className="company">{ipo.company}</td>
                <td>{ipo.estVal}</td>
                <td>{ipo.date}</td>
                <td>
                  <span className={`ipo-status ${ipo.status.toLowerCase()}`}>
                    {ipo.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
