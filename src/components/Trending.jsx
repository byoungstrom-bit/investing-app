import { STOCKS_BY_MARKET_CAP } from '../data/stocksByMarketCap';
import './Trending.css';

export function Trending() {
  return (
    <section className="trending">
      <div className="section-header">
        <h2>Trending Now</h2>
        <p className="source">
          By market cap — sample data
        </p>
      </div>

      {Object.entries(STOCKS_BY_MARKET_CAP).map(([key, tier]) => (
        <div key={key} className="market-cap-tier">
          <h3 className="tier-header">
            {tier.label}
            <span className="tier-range">{tier.range}</span>
          </h3>
          <div className="trending-grid">
            {tier.stocks.map((item, i) => (
              <div key={`${item.symbol}-${i}`} className="trending-card">
                <div className="trending-symbol">{item.symbol}</div>
                <div className="trending-name">{item.name}</div>
                <div className={`trending-change ${item.change >= 0 ? 'up' : 'down'}`}>
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
