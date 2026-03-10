import { useState } from 'react';
import { Box, IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useBackground } from '../contexts/BackgroundContext';
import type { BackgroundType } from '../contexts/BackgroundContext';
import { Layers, Grid, Settings2, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds: { id: BackgroundType; name: string; icon: React.ReactNode }[] = [
  { id: 'cosmic', name: 'System.Cosmic', icon: <Layers size={18} /> },
  { id: 'retro', name: 'Env.RetroGrid', icon: <Grid size={18} /> },
  { id: 'neoncity', name: 'Cty.NeonCity', icon: <Building2 size={18} /> },
];

const BackgroundSwitcher = () => {
  const { activeBackground, setActiveBackground } = useBackground();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (id: BackgroundType) => {
    setActiveBackground(id);
    handleClose();
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 30, right: 30, zIndex: 100 }}>
      <Tooltip title="Switch Render Engine" placement="left">
        <IconButton
          onClick={handleClick}
          component={motion.button}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          sx={{
            background: 'rgba(18, 18, 18, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#03dac6',
            width: 50,
            height: 50,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(3, 218, 198, 0.2)',
            '&:hover': {
              background: 'rgba(18, 18, 18, 0.8)',
              border: '1px solid rgba(3, 218, 198, 0.5)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(3, 218, 198, 0.5)',
            }
          }}
        >
          <Settings2 size={24} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        slotProps={{
          paper: {
            sx: {
              background: 'rgba(18, 18, 18, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              minWidth: 200,
              mt: -2,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            }
          }
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase' }}>
            Render Engine
          </Box>
        </Box>
        <AnimatePresence>
          {backgrounds.map((bg) => (
            <MenuItem
              key={bg.id}
              onClick={() => handleSelect(bg.id)}
              selected={activeBackground === bg.id}
              sx={{
                py: 1.5,
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: activeBackground === bg.id ? '#03dac6' : 'text.primary',
                '&.Mui-selected': {
                  background: 'rgba(3, 218, 198, 0.1)',
                  '&:hover': {
                    background: 'rgba(3, 218, 198, 0.15)',
                  }
                },
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{bg.icon}</ListItemIcon>
              <ListItemText
                primary={bg.name}
                primaryTypographyProps={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
              />
            </MenuItem>
          ))}
        </AnimatePresence>
      </Menu>
    </Box>
  );
};

export default BackgroundSwitcher;
