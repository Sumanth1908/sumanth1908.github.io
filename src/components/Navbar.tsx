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
                    >
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            SUMANTH
                        </Typography>
                    </motion.div>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Button color="inherit">About</Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Button color="inherit">Projects</Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Button color="primary" variant="outlined" sx={{ borderRadius: '20px' }}>
                                Contact
                            </Button>
                        </motion.div>
                    </Box>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default Navbar;
