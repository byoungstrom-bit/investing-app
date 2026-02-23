import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { recommendationsRouter } from './routes/recommendations.js';
import { riskRouter } from './routes/risk.js';
import { trendingRouter } from './routes/trending.js';
import { sectorsRouter } from './routes/sectors.js';
import { macroRouter } from './routes/macro.js';
import { earningsRouter } from './routes/earnings.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/recommendations', recommendationsRouter);
app.use('/api/risk', riskRouter);
app.use('/api/trending', trendingRouter);
app.use('/api/sectors', sectorsRouter);
app.use('/api/macro', macroRouter);
app.use('/api/earnings', earningsRouter);
app.use('/api/backtest', backtestRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
