# VizAi Frontend (React)

A bold, high-contrast React frontend for managing the VizAi product backlog. It features:
- Header with navigation
- Sidebar with quick filters
- Main area with a sortable backlog table
- Modal forms for creating and editing items

No external UI libraries; design is implemented via local CSS with the Ocean Professional theme.

## Run

- npm start
- npm test
- npm run build

Open http://localhost:3000

## Theme

Primary design tokens live in:
- src/styles/theme.css (colors, radii, shadows)
- src/styles/global.css (layout, components, utilities)

Key colors:
- primary: #F97316
- secondary: #10B981
- background: #000000
- surface: #1F2937
- text: #FFFFFF

## App Structure

- src/components/layout/Header.jsx
- src/components/layout/Sidebar.jsx
- src/components/backlog/BacklogTable.jsx
- src/components/forms/BacklogForm.jsx
- src/components/ui/Modal.jsx
- src/components/ui/Badge.jsx
- src/components/ui/SortHeader.jsx
- src/pages/BacklogPage.jsx
- src/styles/theme.css
- src/styles/global.css
- src/App.js (app shell and routing placeholder)
- src/index.js (React root)

## Data & State

Backlog items persist in localStorage (key: vizai.backlog). This app uses only local state and does not depend on environment variables initially.

To reset to seed data:
- Click "Reset Seed" button on the page, or
- Clear localStorage key `vizai.backlog` in your browser.

## Accessibility

- High contrast colors on dark background
- Focus rings for keyboard navigation
- Semantic buttons and labels
- ESC and backdrop click close for modals

## Next Steps / Extensibility

- Replace localStorage with real API calls (REST/GraphQL)
- Introduce environment variables (via .env) for API base URLs
- Add pagination, bulk actions, and role-based features
- Add routing for Cameras, Events, Analytics, Rules, Admin
