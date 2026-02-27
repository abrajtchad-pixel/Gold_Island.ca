# Gold Island

A live gold market data website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

Displays real-time XAU/USD, XAU/EUR, and XAU/XAF gold prices with auto-refresh every 60 seconds.

## Features

- 📊 Live dashboard with current gold spot prices (XAU/USD, XAU/EUR, XAU/XAF)
- 📈 Interactive line charts with real-time polling
- 🌑 Dark theme with custom gold colour palette
- 🔌 Powered by [metals.dev](https://metals.dev) API (free tier compatible)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | lightweight-charts |
| Data | metals.dev REST API |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API key

Copy the example env file and add your [metals.dev](https://metals.dev) API key:

```bash
cp .env.local.example .env.local
# Edit .env.local and set METALS_DEV_API_KEY="your_key_here"
```

### 3. Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/quotes/route.ts   # REST endpoint – fetches & returns live quotes
│   ├── charts/page.tsx       # Charts page (client-side polling)
│   ├── about/page.tsx        # About / disclaimer page
│   ├── layout.tsx            # Root layout (header, nav, footer)
│   ├── page.tsx              # Dashboard (SSR live quotes)
│   └── globals.css           # Tailwind base styles
├── components/
│   ├── LineChart.tsx         # lightweight-charts wrapper
│   └── PriceCard.tsx         # Price display card
└── lib/
    ├── providers/
    │   └── metalsdev.ts      # metals.dev API integration
    ├── format.ts             # Number formatting helpers
    ├── quotes.ts             # Provider abstraction layer
    └── types.ts              # Shared TypeScript types
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `METALS_DEV_API_KEY` | ✅ | API key from metals.dev |
| `METALS_PROVIDER` | ❌ | Provider name (default: `metalsdev`) |
| `NEXT_PUBLIC_BASE_URL` | ❌ | Base URL for SSR fetch (default: empty string) |

## Disclaimer

Data is provided for informational purposes only. This site does not constitute financial advice.
