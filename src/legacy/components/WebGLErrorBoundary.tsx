import { Component, type ErrorInfo, type ReactNode } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { TriangleAlert, Settings, Info, Monitor, MousePointer2 } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallbackBackground?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
  showDetails: boolean;
}

class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: '',
    showDetails: false
  };

  private checkWebGLSupport(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message, showDetails: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL/Three.js Background Error:', error, errorInfo);
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    if (event.reason && (event.reason.message?.includes('WebGL') || event.reason.message?.includes('WebGL context'))) {
      event.preventDefault(); 
      this.setState({ hasError: true, errorMsg: event.reason.message, showDetails: true });
    }
  };

  private handleContextLost = () => {
    // WebGL context lost usually happens when the GPU crashes or the browser reclaims resources
    this.setState({ 
      hasError: true, 
      errorMsg: 'WebGL Context Lost. Your GPU or browser has terminated the 3D rendering session.',
      showDetails: true
    });
  };

  public componentDidMount() {
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    // Use capture: true to catch the event bubbling up from the canvas
    window.addEventListener('webglcontextlost', this.handleContextLost, true);
    
    // Proactively check for WebGL support before letting Three.js try to mount
    if (!this.checkWebGLSupport()) {
      this.setState({
        hasError: true,
        errorMsg: 'WebGL is disabled or unsupported. This prevents 3D background rendering.',
        showDetails: true
      });
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.removeEventListener('webglcontextlost', this.handleContextLost, true);
  }

  private handleClose = () => {
    this.setState({ hasError: false });
  };

  private handleCheckAgain = () => {
    if (this.checkWebGLSupport()) {
       window.location.reload();
    } else {
       this.setState({ 
         hasError: true, 
         errorMsg: 'Hardware Acceleration is still disabled. WebGL check failed.' 
       });
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
            {this.props.fallbackBackground}
          </Box>
          
          <Dialog 
            open={this.state.hasError} 
            onClose={this.handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                bgcolor: 'rgba(18, 18, 18, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 2, 102, 0.3)',
                color: '#fff',
                borderRadius: 2
              }
            }}
          >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2, pb: 1 }}>
              <TriangleAlert color="#ff0266" size={32} />
              <Typography variant="h5" component="span" sx={{ fontWeight: 800 }}>
                RENDER ENGINE ERROR
              </Typography>
            </DialogTitle>
            
            <DialogContent dividers sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Typography variant="body1" gutterBottom sx={{ color: '#03dac6', fontWeight: 'bold' }}>
                Hardware Acceleration Required
              </Typography>
              
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                The 3D backgrounds in this portfolio require WebGL (Hardware Acceleration) to perform at high frame rates. It seems to be disabled in your browser.
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Settings size={18} /> How to enable:
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon><Monitor size={16} color="#bb86fc" /></ListItemIcon>
                  <ListItemText 
                    primary="Chrome / Edge" 
                    secondary="Settings > System > Use graphics acceleration when available" 
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.5)' } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Monitor size={16} color="#bb86fc" /></ListItemIcon>
                  <ListItemText 
                    primary="Firefox" 
                    secondary="Settings > Performance > Use hardware acceleration when available" 
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.5)' } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info size={16} color="#bb86fc" /></ListItemIcon>
                  <ListItemText 
                    primary="Safari" 
                    secondary="Settings > Advanced > Show features for web developers > Enable WebGL" 
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.5)' } }}
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 1, borderLeft: '4px solid #ff0266' }}>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block' }}>
                  $ error_log: {this.state.errorMsg}
                </Typography>
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 2, gap: 1 }}>
              <Button 
                onClick={this.handleClose} 
                sx={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Dismiss
              </Button>
              <Button 
                variant="contained" 
                onClick={this.handleCheckAgain}
                sx={{ 
                  bgcolor: '#ff0266', 
                  '&:hover': { bgcolor: '#c2185b' },
                  fontWeight: 'bold'
                }}
                startIcon={<MousePointer2 size={18} />}
              >
                Enable & Relink
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
