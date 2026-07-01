import { createTheme } from '@mui/material/styles';

/**
 * "Deep-space mission" identity for the Orbit-of-Experience portfolio.
 * Single source of truth for the new globe experience. Per-chapter accent
 * colors live in the journey data and are applied locally where needed.
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#38bdf8', // azure / mission cyan
      light: '#7dd3fc',
      dark: '#0ea5e9',
    },
    secondary: {
      main: '#f59e0b', // amber accent
    },
    background: {
      default: '#05060d', // near-black space
      paper: '#0b0e1a',
    },
    text: {
      primary: '#e8edf7',
      secondary: '#8a93a8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.015em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    overline: { fontFamily: '"JetBrains Mono", monospace' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        },
      },
    },
  },
});

export default theme;
