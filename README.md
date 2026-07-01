# Sumanth's Portfolio 📟

A portfolio built as a live observability console for a service called `sumanth-prod`. It reads like Grafana/Datadog: a left nav across Overview / Services / Deployments / Metrics / Alerts / Config, a status pill, and a real ticking uptime counter since the first job (June 2016). Career maps onto a service topology graph, projects are a deployment history table, skills are bar gauges, the Extra Mile Award is a firing alert, and education/contact render as a syntax-colored `service.yaml`. A logs panel tails real responsibility bullets like `tail -f service.log`. Clicking any service or deployment opens a detail drawer.

Two earlier designs are preserved: a working shortwave radio at [`/radio`](/radio), and the original cosmic/terminal design at [`/legacy`](/legacy).

## Built With 🛠️
- **Framework:** React with TypeScript (via Vite)
- **Styling:** Emotion (`styled`) throughout the console and radio; MUI is retained only for the legacy route.
- **Animations:** Framer Motion for the topology pulse, drawers, and gauge fills.
- **Fonts:** IBM Plex Mono + Inter for the console; Bebas Neue / Special Elite / Cormorant Garamond for the radio.
- **Icons:** Lucide React.
- **Dependency Manager:** Yarn

## Getting Started 💻

### Prerequisites
Make sure you have Node.js and Yarn installed.

### Installation
1. Clone the repository
   ```sh
   git clone https://github.com/Sumanth1908/sumanth1908.github.io.git
   ```
2. Navigate to the project directory
   ```sh
   cd sumanth1908.github.io
   ```
3. Install dependencies
   ```sh
   yarn install
   ```

## Available Scripts 📜

### `yarn start` or `yarn dev`
Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `yarn build`
Type-checks with `tsc` and builds the app for production to the `dist` folder.

### `yarn lint`
Runs ESLint over the project.

## Structure 📂
- `src/data/resume.ts`: Typed resume content (experience, projects, skills, education, awards) — shared by every design.
- `src/console/`: The observability console — `ConsoleApp.tsx` orchestrates nav/drawer state, `stations`-equivalent mapping lives in `logLines.ts`, `components/views/` holds the six dashboards, `components/` holds the shared panel/gauge/drawer/topology primitives.
- `src/radio/`: The shortwave radio, served at `/radio`.
- `src/legacy/`: The original design, served at `/legacy`, self-contained with its own theme, contexts, and data.
- `public/404.html` + the redirect script in `index.html`: GitHub Pages SPA routing trick so deep links like `/radio` and `/legacy` survive a refresh.

## License
Distributed under the MIT License. See `LICENSE` for more information.
