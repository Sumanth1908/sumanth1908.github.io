import { AppBar, Toolbar, Typography, Box, IconButton, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Linkedin, Mail, Globe2, Boxes } from 'lucide-react';
import type { GlobeMode } from './globe/Globe';
import { profile } from '../data/profile';

/** Retained for backward-compat with the quarantined legacy pages. */
export interface NavLink {
    label: string;
    targetId: string;
}

interface Props {
    mode?: GlobeMode;
    onModeChange?: (mode: GlobeMode) => void;
    /** Unused in the new HUD; kept so legacy pages still type-check. */
    links?: NavLink[];
}

/** Minimal mission-HUD top bar for the globe experience. */
const Navbar = ({ mode = 'realistic', onModeChange }: Props) => {
    return (
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)', background: 'linear-gradient(to bottom, rgba(5,6,13,0.8), transparent)' }}>
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                    <Box sx={{
                        width: 38, height: 38, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1.5px solid', borderColor: 'primary.main',
                        boxShadow: '0 0 14px rgba(56,189,248,0.5)',
                        fontFamily: 'monospace', fontWeight: 800, color: 'primary.main',
                    }}>SJ</Box>
                    <Typography component={RouterLink} to="/" variant="h6" sx={{
                        fontWeight: 800, fontFamily: 'monospace', letterSpacing: 1,
                        color: '#fff', textDecoration: 'none',
                        display: { xs: 'none', sm: 'block' },
                    }}>
                        SUMANTH<span style={{ color: '#38bdf8' }}>_</span>
                    </Typography>
                </motion.div>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {/* Globe mode toggle */}
                    <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={mode}
                        onChange={(_, v) => v && onModeChange?.(v)}
                        sx={{
                            '& .MuiToggleButton-root': {
                                color: 'text.secondary', borderColor: 'rgba(255,255,255,0.15)',
                                px: 1.2, py: 0.4,
                                '&.Mui-selected': { color: 'primary.main', background: 'rgba(56,189,248,0.12)' },
                            },
                        }}
                    >
                        <ToggleButton value="realistic"><Tooltip title="Realistic Earth"><Globe2 size={16} /></Tooltip></ToggleButton>
                        <ToggleButton value="hologram"><Tooltip title="Hologram"><Boxes size={16} /></Tooltip></ToggleButton>
                    </ToggleButtonGroup>

                    <Tooltip title="LinkedIn">
                        <IconButton component="a" href={profile.contact.linkedin} target="_blank" rel="noopener" sx={{ color: '#fff' }}>
                            <Linkedin size={18} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Email">
                        <IconButton component="a" href={`mailto:${profile.contact.email}`} sx={{ color: '#fff' }}>
                            <Mail size={18} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
