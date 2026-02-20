import express from 'express';
import { allInPredictions } from '../data/all-in-predictions.js';

export const recommendationsRouter = express.Router();

recommendationsRouter.get('/', (req, res) => {
  res.json({
    source: "All-In Podcast 2026 Predictions",
    episode: "Jan 10, 2026",
    youtubeUrl: "https://www.youtube.com/watch?v=yEb2DX0TzKM",
    members: allInPredictions
  });
});
