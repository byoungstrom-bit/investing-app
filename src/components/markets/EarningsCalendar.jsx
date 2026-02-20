import { STOCKS_BY_MARKET_CAP } from '../../data/stocksByMarketCap';
import './EarningsCalendar.css';

export function EarningsCalendar() {
  return (
    <div className="earnings-calendar">
      <h2 className="section-title">Earnings Calendar</h2>
      <p className="section-desc">Upcoming earnings by market cap (sample data)</p>

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

      <p className="earnings-note">AMC = After Market Close, BMO = Before Market Open.</p>
    </div>
  );
}
