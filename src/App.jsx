import { useState, lazy, Suspense } from 'react';
import { Markets } from './components/Markets';
import { Advanced } from './components/Advanced';
import { AmericanFlag } from './components/AmericanFlag';
import './App.css';

const Recommendations = lazy(() => import('./components/Recommendations').then(m => ({ default: m.Recommendations })));

function App() {
  const [activeSection, setActiveSection] = useState('recommendations');

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo-row">
            <AmericanFlag width={48} height={32} />
            <div>
              <h1 className="logo">Investors Center</h1>
              <p className="tagline">★ RESEARCH • RISK • TRENDS ★ YOUR MONEY. OUR EXPERTISE ★</p>
            </div>
          </div>
          <nav className="nav">
          <button
            className={activeSection === 'recommendations' ? 'active' : ''}
            onClick={() => setActiveSection('recommendations')}
          >
            Recommendations from Top Investors
          </button>
          <button
            className={activeSection === 'markets' ? 'active' : ''}
            onClick={() => setActiveSection('markets')}
          >
            Simple Market Data/Tools
          </button>
          <button
            className={activeSection === 'advanced' ? 'active' : ''}
            onClick={() => setActiveSection('advanced')}
          >
            Advanced
          </button>
        </nav>
        </div>
      </header>

      <div className="ticker-bar">
        ★ DOW +127 • NASDAQ +89 • S&P +34 ★ PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS ★
      </div>

      <main className="main">
        {activeSection === 'recommendations' && (
          <Suspense fallback={<div className="loading">Loading recommendations...</div>}>
            <Recommendations />
          </Suspense>
        )}
        {activeSection === 'markets' && <Markets />}
        {activeSection === 'advanced' && <Advanced />}
      </main>

      <footer className="footer">
        <p>PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS • NOT FDIC INSURED • Data from All-In Podcast 2026 • Not financial advice</p>
      </footer>
    </div>
  );
}

export default App;
