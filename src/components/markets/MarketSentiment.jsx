import './MarketSentiment.css';

// Mock data - replace with API in production
const SENTIMENT = {
  level: 'bullish', // bullish | neutral | bearish
  score: 68, // 0-100
  sources: ['VIX', 'Put/Call', 'AAII', 'CNN Fear & Greed']
};

export function MarketSentiment() {
  const { level, score } = SENTIMENT;

  return (
    <div className="market-sentiment">
      <h2 className="section-title">Market Sentiment Meter <span className="sample-badge">Sample data Not live</span></h2>

      <div className="sentiment-meter">
        <div className="meter-track">
          <div
            className={`meter-fill ${level}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="meter-labels">
          <span className="label bearish">Bearish</span>
          <span className="label neutral">Neutral</span>
          <span className="label bullish">Bullish</span>
        </div>
        <div className="sentiment-badge">
          <span className={`badge ${level}`}>{level}</span>
          <span className="score">{score}/100</span>
        </div>
      </div>

      <p className="sentiment-note">
        Based on VIX, Put/Call ratio, AAII survey, CNN Fear & Greed. Sample data.
      </p>
    </div>
  );
}
