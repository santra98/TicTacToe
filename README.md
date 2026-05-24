# Tic-Tac-Toe

This is a React + TypeScript version of Tic-Tac-Toe with a more polished feel than the usual plain 3x3 grid.

The app is made for local pass-and-play, so two people can play on the same screen. It keeps track of wins, draws, games played, and streaks using `localStorage`, so the stats stay around even after refreshing the page.

## Features

- A clean Tic-Tac-Toe board with animated X and O moves
- Win and draw detection
- Score tracking for X, O, and draws
- Current streak tracking
- A stats modal with overall performance
- Reset buttons for the current game and saved stats
- Small particle effects when a game ends
- Responsive layout with Tailwind CSS

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

## Running It Locally

Install the dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

This started as a small Tic-Tac-Toe project and grew into a more complete mini app with better UI, saved stats, clean game state, and a bit of motion without overcomplicating the logic.
