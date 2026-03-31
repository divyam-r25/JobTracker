# Smart Job Tracker Dashboard

Professional React-based SaaS-style application for managing job applications, interview pipelines, and progress analytics.

## Table of Contents

- Overview
- Core Features
- Product Routes
- Tech Stack
- Architecture
- Data Model
- Local Setup
- Environment Variables
- Available Scripts
- API Integration
- UI/UX Details
- Build and Deployment
- Troubleshooting
- Future Enhancements
- License

## Overview

Job seekers often manage applications in spreadsheets or notes, which makes it hard to track status, interviews, follow-ups, and trends. This project solves that with a centralized dashboard built for real-world usage:

- Track every application in one place
- Visualize job-search pipeline health
- Search, filter, sort, and prioritize quickly
- Keep critical opportunities bookmarked
- Measure performance with analytics

## Core Features

- Add, edit, and delete applications
- Schema-based form validation with `react-hook-form` + `yup`
- Dynamic debounced search (`company`, `role`)
- Multi-filter support:
  - status
  - platform
  - location type
- Sorting by:
  - applied date
  - salary
  - company name
- Pipeline tabs:
  - Applied
  - Interview Scheduled
  - Offer Received
  - Rejected
- Bookmark system for high-priority jobs
- Dashboard KPIs:
  - total applications
  - interviews
  - offers
  - rejections
  - bookmarked jobs
- Charts:
  - status distribution (pie)
  - monthly applications trend (area)
- Card and table views for application list
- Loading and empty states
- Toast notifications for important actions
- Responsive, mobile-friendly layout
- Route-level code splitting for better load performance

## Product Routes

| Route | Purpose |
| --- | --- |
| `/dashboard` | Main overview and quick insights |
| `/applications` | Full application management |
| `/applications/new` | Create a new job application |
| `/applications/:id` | Edit an existing application |
| `/analytics` | Detailed chart analytics |

## Tech Stack

- React 19
- Vite
- React Router DOM
- Context API
- Axios
- React Hook Form
- Yup
- Recharts
- Framer Motion
- React Toastify
- date-fns

## Architecture

### State Management

Global app state is managed through `ApplicationContext`:

- `applications`
- `addApplication()`
- `updateApplication()`
- `deleteApplication()`
- `toggleBookmark()`
- `getApplicationById()`

### Custom Hooks

- `useLocalStorage` for persistent storage
- `useDebounce` for performant live search
- `useApplications` for filtered/sorted/derived data

### Data Flow

1. App boots with local storage data if present.
2. If empty, it fetches mock records from DummyJSON.
3. If API fails, it falls back to local seed data.
4. UI updates instantly through Context-driven state updates.

## Data Model

```js
{
  id: string,
  company: string,
  role: string,
  location: string,
  locationType: 'Remote' | 'Hybrid' | 'On-site',
  salary: number,
  platform: string,
  status: 'Applied' | 'Interview Scheduled' | 'Offer Received' | 'Rejected',
  appliedDate: 'yyyy-MM-dd',
  interviewDate: 'yyyy-MM-dd' | '',
  notes: string,
  bookmarked: boolean
}
```

## Local Setup

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+

### Installation

```bash
git clone <your-repo-url>
cd JobTrack-app
npm install
```

### Start Development Server

```bash
npm run dev
```

App runs by default on Vite local URL (typically `http://localhost:5173`).

## Environment Variables

No mandatory environment variable is required for current functionality.

Optional future variables (if backend/auth is introduced):

```bash
VITE_API_BASE_URL=
VITE_AUTH_PROVIDER=
```

## Available Scripts

```bash
npm run dev      # start local dev server
npm run lint     # run eslint checks
npm run build    # production build
npm run preview  # preview production build
```

## API Integration

### Seed Data API

- Endpoint: `https://dummyjson.com/products`
- Purpose: map product data to mock job applications on first load

### Company Logos

- Primary: Clearbit logo endpoint (`https://logo.clearbit.com/{domain}`)
- Fallback: generated dummy logo (SVG) when original logo is unavailable

## UI/UX Details

- Responsive layout for desktop and mobile
- Clean visual hierarchy for quick scanning
- Status pills with semantic color coding
- Motion effects for smoother transitions
- Empty states and loaders for better user guidance

## Build and Deployment

### Production Build

```bash
npm run build
```

Generated output is available in the `dist/` folder.

### Deploy Options

- Vercel
- Netlify
- Firebase Hosting
- Any static host supporting SPA fallback routes

For SPA deployments, ensure all routes resolve to `index.html`.

## Troubleshooting

- If logos do not appear, check internet connectivity and logo domain availability.
- If local data seems stale, clear browser local storage for the app and reload.
- If dependency install fails on Windows PowerShell policy, run using `npm.cmd`.

## Future Enhancements

- Authentication and user-specific workspaces
- Follow-up reminders with calendar integration
- Interview round tracking timeline
- Offer comparison module
- Export/import application data (CSV)
- Backend sync (Supabase/Firebase/Node API)

## License

For academic and portfolio usage. Add a formal OSS license (MIT/Apache-2.0) before open-source distribution.
