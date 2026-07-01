import { ThemeProvider, CssBaseline } from '@mui/material';
import legacyTheme from './theme/theme';
import { BackgroundProvider } from './contexts/BackgroundContext';
import LegacyApp from './LegacyApp';

const LegacyPage = () => (
  <ThemeProvider theme={legacyTheme}>
    <CssBaseline />
    <BackgroundProvider>
      <LegacyApp />
    </BackgroundProvider>
  </ThemeProvider>
);

export default LegacyPage;
