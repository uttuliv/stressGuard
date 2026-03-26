# StressGuard — Interactive Web Prototype

An interactive web prototype simulating both an **Apple Watch** and **iPhone app** for StressGuard — a stress-management tool designed to help teachers recognize stress before it shapes the classroom.

## Features

- **Watch Simulator** — Circular watch face with animated stress ring (green/amber/blue) and live heart rate display
- **Phone Simulator** — Full mobile app experience including:
  - Privacy-first onboarding with breathing animation
  - Dashboard with today's schedule and stress indicators
  - Post-session survey
  - Weekly stress report with charts
  - Intervention history log
  - Schedule management
- **Demo Timeline** — Pre-computed 3-minute compressed playback driving both simulators in sync
- **Control Bar** — Play/pause/reset and screen navigation

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Recharts (charts)
- Vite (build tool)

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build
```

## Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) for automatic deployment to GitHub Pages on push to `main`.

## License

All rights reserved.
