import { StrictMode, Suspense, lazy, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import BureauApp from './bureau/BureauApp';
import './index.css';

// Prior editions stay out of the main bundle.
const ConsoleApp = lazy(() => import('./console/ConsoleApp.tsx'));
const RadioApp = lazy(() => import('./radio/RadioApp.tsx'));
const LegacyPage = lazy(() => import('./legacy/LegacyPage.tsx'));

const TITLES: Record<string, string> = {
  '/': 'Sumanth Jillepally — Personnel File',
  '/console': 'Sumanth Jillepally — Console (archived)',
  '/radio': 'Sumanth Jillepally — Radio (archived)',
  '/legacy': 'Sumanth Jillepally — Cosmic (archived)',
};

function TitleSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/'];
  }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TitleSync />
      <Routes>
        <Route path="/" element={<BureauApp />} />
        <Route
          path="/console"
          element={
            <Suspense fallback={null}>
              <ConsoleApp />
            </Suspense>
          }
        />
        <Route
          path="/radio"
          element={
            <Suspense fallback={null}>
              <RadioApp />
            </Suspense>
          }
        />
        <Route
          path="/legacy"
          element={
            <Suspense fallback={null}>
              <LegacyPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
