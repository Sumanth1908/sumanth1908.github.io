import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter.tsx';
import theme from './theme/theme.ts';
import { BackgroundProvider } from './contexts/BackgroundContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </BackgroundProvider>
    </ThemeProvider>
  </StrictMode>,
);
