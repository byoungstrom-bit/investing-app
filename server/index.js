import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { recommendationsRouter } from './routes/recommendations.js';
import { riskRouter } from './routes/risk.js';
import { trendingRouter } from './routes/trending.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/recommendations', recommendationsRouter);
app.use('/api/risk', riskRouter);
app.use('/api/trending', trendingRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
