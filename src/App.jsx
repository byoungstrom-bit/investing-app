import { useState, lazy, Suspense } from 'react';
import { Markets } from './components/Markets';
import { Advanced } from './components/Advanced';
import './App.css';

const Recommendations = lazy(() => import('./components/Recommendations').then(m => ({ default: m.Recommendations })));

function App() {
  const [activeSection, setActiveSection] = useState('recommendations');

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Investor's Edge</h1>
        <p className="tagline">Research • Risk • Trends</p>
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
      </header>

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
        <p>Data from All-In Podcast 2026 Predictions • Not financial advice</p>
      </footer>
    </div>
  );
}

export default App;
