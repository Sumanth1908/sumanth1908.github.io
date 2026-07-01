import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ConsoleApp from './console/ConsoleApp.tsx';
import './index.css';

const LegacyPage = lazy(() => import('./legacy/LegacyPage.tsx'));
const RadioApp = lazy(() => import('./radio/RadioApp.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConsoleApp />} />
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
