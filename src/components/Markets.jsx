import { useState } from 'react';
import { MarketSentiment } from './markets/MarketSentiment';
import { SectorHeatMap } from './markets/SectorHeatMap';
import { MacroDashboard } from './markets/MacroDashboard';
import { EarningsCalendar } from './markets/EarningsCalendar';
import { UndervaluedScreener } from './markets/UndervaluedScreener';
import { RiskCalculator } from './RiskCalculator';
import { Trending } from './Trending';
import './Markets.css';

export function Markets() {
  const [subTab, setSubTab] = useState('trending');

  const tabs = [
    { id: 'trending', label: 'Trending' },
    { id: 'risk', label: 'Risk Calculator' },
    { id: 'sentiment', label: 'Sentiment' },
    { id: 'sectors', label: 'Sectors' },
    { id: 'macro', label: 'Macro' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'screener', label: 'Undervalued Screener' }
  ];

  return (
    <section className="markets">
      <div className="markets-subnav">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={subTab === t.id ? 'active' : ''}
            onClick={() => setSubTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === 'trending' && <Trending />}
      {subTab === 'risk' && <RiskCalculator />}
      {subTab === 'sentiment' && <MarketSentiment />}
      {subTab === 'sectors' && <SectorHeatMap />}
      {subTab === 'macro' && <MacroDashboard />}
      {subTab === 'earnings' && <EarningsCalendar />}
      {subTab === 'screener' && <UndervaluedScreener />}
    </section>
  );
}
