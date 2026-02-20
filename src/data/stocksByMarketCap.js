/**
 * Shared stock list organized by market cap
 * Used by Trending, Earnings Calendar, and other features
 *
 * Ranges:
 * - Large Cap: > $200B
 * - Mid Cap: $10B - $200B
 * - Small Cap: $300M - $10B
 */

export const STOCKS_BY_MARKET_CAP = {
  largeCap: {
    label: 'Large Cap',
    range: '>$200B',
    stocks: [
      { symbol: 'NVDA', name: 'NVIDIA', change: 2.4, date: 'Feb 26', time: 'AMC', estimate: '5.82' },
      { symbol: 'AAPL', name: 'Apple', change: 1.8, date: 'Feb 27', time: 'AMC', estimate: '2.11' },
      { symbol: 'MSFT', name: 'Microsoft', change: 1.5, date: 'Mar 10', time: 'AMC', estimate: '3.12' },
      { symbol: 'GOOGL', name: 'Alphabet', change: 1.2, date: 'Mar 7', time: 'AMC', estimate: '1.89' },
      { symbol: 'AMZN', name: 'Amazon', change: 2.1, date: 'Mar 6', time: 'AMC', estimate: '1.25' },
      { symbol: 'META', name: 'Meta', change: -0.8, date: 'Mar 5', time: 'AMC', estimate: '5.42' },
      { symbol: 'TSLA', name: 'Tesla', change: 3.2, date: 'Feb 28', time: 'AMC', estimate: '0.68' },
      { symbol: 'BRK', name: 'Berkshire Hathaway', change: 0.6, date: 'Mar 15', time: 'BMO', estimate: '4.21' },
      { symbol: 'JPM', name: 'JPMorgan Chase', change: 1.1, date: 'Mar 11', time: 'BMO', estimate: '4.52' },
      { symbol: 'V', name: 'Visa', change: 0.9, date: 'Mar 13', time: 'AMC', estimate: '2.45' }
    ]
  },
  midCap: {
    label: 'Mid Cap',
    range: '$10B - $200B',
    stocks: [
      { symbol: 'AMD', name: 'AMD', change: 4.1, date: 'Mar 18', time: 'AMC', estimate: '0.72' },
      { symbol: 'COIN', name: 'Coinbase', change: 5.2, date: 'Mar 20', time: 'AMC', estimate: '2.18' },
      { symbol: 'HOOD', name: 'Robinhood', change: 2.9, date: 'Mar 21', time: 'AMC', estimate: '0.15' },
      { symbol: 'NFLX', name: 'Netflix', change: -0.5, date: 'Mar 14', time: 'AMC', estimate: '5.21' },
      { symbol: 'COST', name: 'Costco', change: 1.3, date: 'Mar 12', time: 'AMC', estimate: '3.95' },
      { symbol: 'CRM', name: 'Salesforce', change: 1.7, date: 'Mar 19', time: 'AMC', estimate: '2.28' },
      { symbol: 'INTC', name: 'Intel', change: -1.2, date: 'Mar 22', time: 'AMC', estimate: '0.31' },
      { symbol: 'UBER', name: 'Uber', change: 2.4, date: 'Mar 25', time: 'AMC', estimate: '0.82' },
      { symbol: 'SQ', name: 'Block', change: 3.1, date: 'Mar 26', time: 'AMC', estimate: '0.68' },
      { symbol: 'SNOW', name: 'Snowflake', change: -0.9, date: 'Mar 27', time: 'AMC', estimate: '0.42' }
    ]
  },
  smallCap: {
    label: 'Small Cap',
    range: '$300M - $10B',
    stocks: [
      { symbol: 'RBLX', name: 'Roblox', change: 6.2, date: 'Mar 28', time: 'AMC', estimate: '0.52' },
      { symbol: 'PLTR', name: 'Palantir', change: 4.8, date: 'Mar 29', time: 'AMC', estimate: '0.28' },
      { symbol: 'SOFI', name: 'SoFi', change: 3.5, date: 'Apr 2', time: 'AMC', estimate: '0.08' },
      { symbol: 'RIVN', name: 'Rivian', change: -2.1, date: 'Apr 3', time: 'AMC', estimate: '-1.42' },
      { symbol: 'LCID', name: 'Lucid', change: -1.8, date: 'Apr 4', time: 'AMC', estimate: '-0.28' },
      { symbol: 'AFRM', name: 'Affirm', change: 5.4, date: 'Apr 8', time: 'AMC', estimate: '0.35' },
      { symbol: 'UPST', name: 'Upstart', change: 2.2, date: 'Apr 9', time: 'AMC', estimate: '0.22' },
      { symbol: 'PATH', name: 'UiPath', change: 1.8, date: 'Apr 10', time: 'AMC', estimate: '0.18' }
    ]
  }
};

// Flat list for backwards compatibility (e.g. Trending fallback)
export const trendingFallback = Object.values(STOCKS_BY_MARKET_CAP).flatMap(
  (tier) => tier.stocks
);
