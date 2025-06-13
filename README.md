# Tanstack Form Test

A simple React application using Tanstack Query for form handling and data fetching.

## Features

- React 19
- TypeScript
- Tanstack Query
- React Router
- Axios for API calls
- Canvas Confetti for celebrations

## Getting Started

### Prerequisites

- Node.js (v20.18.1 - specified in .nvmrc)
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Start the development server:

```bash
npm start
# or
pnpm start
```

This will start both the React development server and the backend server concurrently.

## Project Structure

The application follows a standard React project structure with the following key components:

- `/src` - Main source code directory
  - `/pages` - React components for different routes:
    - `ConnectAccount` - Initial account connection page
    - `VerifyEmail` - Email verification page
    - `ChoosePlan` - Plan selection page
    - `Success` - Success confirmation page
  - `App.tsx` - Main application component with routing setup
  - `App.css` - Main application styles
  - `Reset.css` - CSS reset styles

## Available Scripts

- `npm start` - Runs the app in development mode with both frontend and backend servers
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App

## Dependencies

Key dependencies include:

- @tanstack/react-query v5.80.7
- react v19.1.0
- react-router-dom v7.6.2
- axios v1.9.0
- canvas-confetti v1.9.3

## Browser Support

The application is configured to support:

- Production: All browsers with >0.2% market share
- Development: Latest versions of Chrome, Firefox, and Safari
