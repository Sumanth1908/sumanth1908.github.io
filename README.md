# Sumanth's Portfolio 🚀

Welcome to my personal portfolio application! This is a modern, responsive, and beautifully animated frontend application showcasing my projects and skills as a developer.

## Built With 🛠️
- **Framework:** React with TypeScript (via Vite)
- **Styling:** Material-UI (MUI v5) and Emotion (CSS-in-JS). There are zero `.css` files in this project!
- **Animations:** Framer Motion for buttery-smooth page transitions and UI interactions.
- **Icons:** Lucide React and Material Icons.
- **Dependency Manager:** Yarn

## Getting Started 💻
To get a local copy up and running, follow these simple steps.

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
In the project directory, you can run:

### `yarn start` or `yarn dev`
Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page will reload when you make changes.

### `yarn build`
Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance. Everything compiles after verifying TypeScript types via `tsc`.

### `yarn lint`
Runs ESLint over the project to find and fix problems.

## Structure 📂
- `src/components/`: Reusable UI components like `Navbar`, `Footer`, and `ProjectCard`.
- `src/theme/`: Contains the global dark-mode MUI styling configuration.
- `src/data/`: Houses the mock application data displayed on the portfolio.
- `src/hooks/`: Custom abstracted React hooks.
- `src/App.tsx`: Main application combining all elements together.

## License
Distributed under the MIT License. See `LICENSE` for more information.
