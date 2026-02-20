import { useState } from 'react';
import { BacktestingTool } from './advanced/BacktestingTool';
import { MandAFeed } from './advanced/MandAFeed';
import { IPOPipeline } from './advanced/IPOPipeline';
import { MonteCarloSimulator } from './advanced/MonteCarloSimulator';
import './Advanced.css';

export function Advanced() {
  const [subTab, setSubTab] = useState('backtesting');

  const tabs = [
    { id: 'backtesting', label: 'Backtesting' },
    { id: 'ma', label: 'M&A Activity' },
    { id: 'ipo', label: 'IPO Pipeline' },
    { id: 'montecarlo', label: 'Monte Carlo' }
  ];

  return (
    <section className="advanced">
      <div className="advanced-subnav">
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

      {subTab === 'backtesting' && <BacktestingTool />}
      {subTab === 'ma' && <MandAFeed />}
      {subTab === 'ipo' && <IPOPipeline />}
      {subTab === 'montecarlo' && <MonteCarloSimulator />}
    </section>
  );
}
