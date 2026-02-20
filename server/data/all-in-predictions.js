/**
 * All-In Podcast 2026 Predictions
 * Source: All-In's 2026 Predictions episode (Jan 10, 2026)
 * YouTube: https://www.youtube.com/watch?v=yEb2DX0TzKM
 * Timestamps: Best Performing Asset (1:03:05), Worst Performing Asset (1:08:02)
 */

export const allInPredictions = [
  {
    id: 'chamath',
    name: 'Chamath Palihapitiya',
    role: 'Social Capital, Former Facebook',
    avatar: 'CH',
    recommends: [
      {
        asset: 'Copper / Critical Metals Basket',
        ticker: 'CPER, FCX, SCCO',
        rationale: '~70% global supply deficit by 2040 from AI data centers, electrification, and defense. Most useful, cheapest, conductive material. "Absolutely parabolic" potential.',
        transcriptRef: '1:03:05 - Best Performing Asset'
      },
      {
        asset: 'Tech Supercycle',
        ticker: null,
        rationale: 'Trump prosperity theory. Atlanta Fed raised Q4 GDP forecast to 5.4%. Immigration reset, AI productivity gains, 2026 tax cuts create huge growth engine.',
        transcriptRef: '1:03:05'
      }
    ],
    recommendsAgainst: [
      {
        asset: 'Oil / Hydrocarbons',
        ticker: 'XLE, USO',
        rationale: 'Downward trend irreversible. Electrification and energy storage unstoppable. Oil more likely to fall to $45/barrel than back to $65.',
        transcriptRef: '1:08:02 - Worst Performing Asset'
      },
      {
        asset: 'Enterprise SaaS Software',
        ticker: 'CRM, NOW, WDAY, DOCU',
        rationale: '90% of $3-4T revenue comes from "maintenance" and "migration." AI will shrink these dramatically. Software industrial complex faces severe impact.',
        transcriptRef: '40:51 - Biggest Business Loser'
      }
    ]
  },
  {
    id: 'jason',
    name: 'Jason Calacanis',
    role: 'Angel Investor, All-In Host',
    avatar: 'JC',
    recommends: [
      {
        asset: 'Speculative/Gambling Platforms',
        ticker: 'HOOD, COIN',
        rationale: 'With economy taking off, rate cuts, and spare cash - Robinhood, Polymarket, PrizePicks, Coinbase. People will have more to bet and speculate.',
        transcriptRef: '1:03:05 - Best Performing Asset'
      },
      {
        asset: 'Amazon',
        ticker: 'AMZN',
        rationale: 'First "corporate singularity" - robots contribute more profit than humans. Zoox progressing, massive automation in warehouses and logistics.',
        transcriptRef: '32:15 - Biggest Business Winner'
      }
    ],
    recommendsAgainst: [
      {
        asset: 'US Dollar',
        ticker: 'UUP',
        rationale: 'National debt growing $2T this year. 50% military budget increase adds to debt. People turning to gold, silver, copper.',
        transcriptRef: '1:08:02 - Worst Performing Asset'
      },
      {
        asset: 'Young White-Collar Entry Jobs',
        ticker: null,
        rationale: 'Companies automating with AI instead of training graduates. Bottom third of tasks replaceable. Need resilience and AI tool proficiency.',
        transcriptRef: '40:51 - Biggest Business Loser'
      }
    ]
  },
  {
    id: 'sacks',
    name: 'David Sacks',
    role: 'Craft Ventures, Former PayPal',
    avatar: 'DS',
    recommends: [
      {
        asset: 'Tech Sector Supercycle',
        ticker: 'QQQ, SPY',
        rationale: 'Part of "Trump Prosperity" theory. IPO boom, trillions in new market cap. Major reversal of companies staying private.',
        transcriptRef: '1:03:05 - Best Performing Asset'
      },
      {
        asset: 'IPO Market',
        ticker: null,
        rationale: 'Huge wave of companies going public. SpaceX, Anduril, Stripe, Anthropic, OpenAI potential. "Trump boom" fuels reversal.',
        transcriptRef: '32:15 - Biggest Business Winner'
      }
    ],
    recommendsAgainst: [
      {
        asset: 'California Luxury Real Estate',
        ticker: null,
        rationale: 'Wealth tax rumors creating enormous pressure. Hope for "dead cat bounce" if proposal fails to clear properties.',
        transcriptRef: '1:08:02 - Worst Performing Asset'
      },
      {
        asset: 'California Economy',
        ticker: null,
        rationale: 'Wealth tax and regulatory overreach driving businesses and capital out. Signature collection could cause panic exodus.',
        transcriptRef: '40:51 - Biggest Business Loser'
      }
    ]
  },
  {
    id: 'friedberg',
    name: 'David Friedberg',
    role: 'The Production Board, Sultan of Science',
    avatar: 'DF',
    recommends: [
      {
        asset: 'Polymarket',
        ticker: null,
        rationale: 'Network effects emerging. Replacing traditional media and markets. Real-time news and collective intelligence. NYSE partnership - all exchanges will move.',
        transcriptRef: '1:03:05 - Best Performing Asset'
      },
      {
        asset: 'Huawei',
        ticker: null,
        rationale: 'Exceeding chip expectations with vertical stack outside US restrictions. SMIC cooperation, deep strategic deployment.',
        transcriptRef: '32:15 - Biggest Business Winner'
      }
    ],
    recommendsAgainst: [
      {
        asset: 'Netflix / Traditional Media',
        ticker: 'NFLX',
        rationale: 'Content library challenged from all sides. Cost-plus-10% harsh for creators. Needs Warner Bros acquisition. Independent creators and citizen journalism disrupting.',
        transcriptRef: '1:08:02 - Worst Performing Asset'
      },
      {
        asset: 'State Governments',
        ticker: null,
        rationale: 'Exposed pension liabilities, financing crises. Waste, fraud, abuse exposure. Long-term solvency questioned.',
        transcriptRef: '40:51 - Biggest Business Loser'
      }
    ]
  }
];
