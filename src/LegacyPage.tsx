import { ThemeProvider, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import App from './App';
import theme from './theme/theme';
import { BackgroundProvider } from './contexts/BackgroundContext';

// The 2025 "Cosmic" edition of the portfolio, preserved as-is.
export default function LegacyPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundProvider>
        <App />
        <Link
          to="/"
          style={{
            position: 'fixed',
            bottom: 12,
            left: 14,
            zIndex: 2000,
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#03dac6',
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(3,218,198,0.4)',
            borderRadius: 4,
            padding: '6px 12px',
            textDecoration: 'none',
          }}
        >
          ← RETURN TO ACTIVE FILE
        </Link>
      </BackgroundProvider>
    </ThemeProvider>
  );
}
