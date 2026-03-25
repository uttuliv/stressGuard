

# StressGuard — Web Prototype Plan

## What We're Building
An interactive web prototype that simulates both the **Apple Watch** and **iPhone app** for StressGuard, running a pre-computed demo timeline in the browser. This will serve as a presentation-ready demo.

## Layout
Split-screen layout: **phone mockup on the left**, **watch mockup on the right**, both inside realistic device frames. A control bar at the top for starting/resetting the demo and toggling between Demo mode (3 min) and Realistic mode.

---

## Watch Simulator

- **Circular watch face** with animated stress ring (green/amber/blue)
- **3 UI states**: Unstress (green ring, "All good", 65–75 BPM), Stress (pulsing amber ring, "Take 5 deep breaths", 88–98 BPM), Recovery (blue ring, "Well done", 76–85 BPM)
- Fake HR value drifting within state-appropriate ranges
- Recovery auto-transitions to Unstress after 10 seconds
- Stress auto-dismisses after 15 seconds if not tapped; tap dismisses immediately to Recovery

## Phone Simulator

### Screen 1 — Onboarding
- Privacy-first welcome screen with "I Understand / Get Started" button
- Shown once; skipped on revisit (localStorage flag)

### Screen 2 — Dashboard
- Today's date, seeded schedule (4 courses)
- Tap a course to start session; active session indicator
- Recent stress events summary

### Screen 3 — Post-Course Survey
- Appears when session ends (timer or manual)
- 4 questions: stress scale (1-5), free text, intervention helpfulness, notes
- In-memory storage

### Screen 4 — Weekly Report
- Seeded bar/line charts showing stress by day, per-course comparison, 4-week trend
- "Simulated Data" label on every chart
- Tappable days expand to show events

### Screen 5 — Intervention History
- Chronological log grouped by session
- Expandable entries with stress duration, intervention type, dismissal method

### Screen 6 — Schedule Management
- Manual course entry (name, times, days)
- Basic validation

## Demo Timeline
- Hardcoded `demo_timeline.json` data with ~3 min compressed playback
- Both watch and phone simulators read from the same timeline
- Timeline auto-loops silently

## Tech Approach
- React + Tailwind + TypeScript (existing stack)
- Recharts for Weekly Report charts
- Framer Motion for ring pulse animations
- All data in-memory / localStorage — no backend needed

