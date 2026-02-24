import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useScrollTrigger } from '@mui/material';
import { motion } from 'framer-motion';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function ElevationScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return children
        ? React.cloneElement(children as React.ReactElement<any>, {
            elevation: trigger ? 4 : 0,
            sx: {
                bgcolor: trigger ? 'rgba(18, 18, 18, 0.9)' : 'transparent',
                backdropFilter: trigger ? 'blur(10px)' : 'none',
                transition: 'background-color 0.3s, backdrop-filter 0.3s, elevation 0.3s'
            }
        })
        : null;
}

const Navbar = () => {
    return (
        <ElevationScroll>
            <AppBar position="fixed" color="transparent" elevation={0}>
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                    >
                        <Box
                            component="img"
                            src="/cosmic_logo.png"
                            alt="Logo"
                            sx={{ width: 40, height: 40, borderRadius: '50%', boxShadow: '0 0 10px rgba(3,218,198,0.5)' }}
                        />
                        <Typography variant="h6" component="div" sx={{ fontWeight: 800, fontFamily: 'monospace', letterSpacing: 1, color: '#fff' }}>
                            SUMANTH<span style={{ color: '#03dac6' }}>_</span>
                        </Typography>
                    </motion.div>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Button color="inherit" sx={{ fontFamily: 'monospace' }}>About</Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Button color="primary" variant="outlined" sx={{ borderRadius: '20px', fontFamily: 'monospace', borderColor: 'rgba(187,134,252,0.5)' }}>
                                System.connect()
                            </Button>
                        </motion.div>
                    </Box>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default Navbar;
