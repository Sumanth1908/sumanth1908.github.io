import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import BureauApp from './bureau/BureauApp';

// The 2025 cosmic edition (MUI + three.js) stays out of the main bundle.
const LegacyPage = lazy(() => import('./LegacyPage'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<BureauApp />} />
        <Route
          path="/legacy"
          element={
            <Suspense
              fallback={
                <div style={{ minHeight: '100vh', background: '#000', color: '#03dac6', display: 'grid', placeItems: 'center', fontFamily: 'monospace' }}>
                  LOADING ARCHIVED EDITION…
                </div>
              }
            >
              <LegacyPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
