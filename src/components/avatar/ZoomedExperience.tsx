import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Button, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FolderKanban, Target, X } from 'lucide-react';
import type { JourneyEntry } from '../../data/journey';
import Avatar from './Avatar';
import { useEffect, useState } from 'react';

interface Props {
    entry: JourneyEntry;
    onClose: () => void;
}

export default function ZoomedExperience({ entry, onClose }: Props) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setIsTyping(true);
        setDisplayedText('');

        const text = entry.narrative;
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, 12);

        return () => clearInterval(interval);
    }, [entry.narrative]);

    // Allow Esc to close the dossier.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose} // click the backdrop (outside content) to close
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                background: 'rgba(5, 5, 16, 0.97)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Always-visible floating close button */}
            <IconButton
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                aria-label="close dossier"
                sx={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 210,
                    color: '#fff',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    '&:hover': { background: 'rgba(255,255,255,0.14)' },
                }}
            >
                <X size={20} />
            </IconButton>

            {/* Top bar with prominent back button */}
            <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: { xs: 2, md: 4 },
                    py: 2,
                    borderBottom: `1px solid ${entry.color}22`,
                    flexShrink: 0,
                }}
            >
                <Button
                    onClick={onClose}
                    variant="outlined"
                    startIcon={<ArrowLeft size={18} />}
                    sx={{
                        color: entry.color,
                        borderColor: `${entry.color}80`,
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        fontSize: '0.78rem',
                        letterSpacing: 1.5,
                        px: 2,
                        '&:hover': { borderColor: entry.color, background: `${entry.color}15` },
                    }}
                >
                    Back to Globe
                </Button>

                <IconButton
                    onClick={onClose}
                    aria-label="close"
                    sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.15)', '&:hover': { background: 'rgba(255,255,255,0.08)' } }}
                >
                    <X size={18} />
                </IconButton>
            </Box>

            {/* Scrollable content area */}
            <Box sx={{
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                px: { xs: 2, md: 6 },
                py: 4,
            }}>
                <Box onClick={(e) => e.stopPropagation()} sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 4, md: 8 },
                    maxWidth: '1100px',
                    width: '100%',
                    alignItems: { xs: 'center', md: 'flex-start' },
                }}>
                    {/* Left side: Avatar + Title */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        sx={{
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3,
                            pt: { xs: 0, md: 4 },
                            width: { xs: '100%', md: '260px' },
                        }}>
                        <Avatar color={entry.color} isTalking={isTyping} />
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="overline" sx={{ color: entry.color, fontWeight: 700, letterSpacing: 2 }}>
                                {entry.period}
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                {entry.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                                {entry.subtitle}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                                📍 {entry.location}
                            </Typography>
                        </Box>

                        {/* Tech-stack chips */}
                        {entry.tech && entry.tech.length > 0 && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', maxWidth: '240px' }}>
                                {entry.tech.map((t, i) => (
                                    <Box
                                        key={t}
                                        component={motion.div}
                                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease: 'easeOut' }}
                                        sx={{
                                            px: 1.2, py: 0.4,
                                            fontSize: '0.72rem',
                                            fontFamily: 'monospace',
                                            borderRadius: '6px',
                                            color: entry.color,
                                            border: `1px solid ${entry.color}40`,
                                            background: `${entry.color}12`,
                                        }}
                                    >
                                        {t}
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Right side: Narrative & Achievements */}
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        {/* Narrative dialog box */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Box sx={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: `1px solid ${entry.color}30`,
                                borderRadius: '16px',
                                p: 4,
                                mb: 4,
                                minHeight: '160px',
                            }}>
                                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.9, color: '#d0d0d0' }}>
                                    {displayedText}
                                    {isTyping && (
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '18px',
                                                background: entry.color,
                                                verticalAlign: 'middle',
                                                marginLeft: '6px',
                                                borderRadius: '1px',
                                            }}
                                        />
                                    )}
                                </Typography>
                            </Box>
                        </motion.div>

                        {/* Achievements */}
                        {!isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Typography variant="h6" sx={{
                                    fontFamily: 'monospace',
                                    mb: 2,
                                    color: entry.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    fontSize: '0.9rem',
                                    letterSpacing: 2,
                                }}>
                                    <Target size={18} /> MISSION HIGHLIGHTS
                                </Typography>

                                <List disablePadding>
                                    <AnimatePresence>
                                        {entry.achievements.map((achievement, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 24 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease: 'easeOut' }}
                                            >
                                                <ListItem sx={{ px: 0, py: 1, alignItems: 'flex-start' }}>
                                                    <ListItemIcon sx={{ minWidth: 32, mt: 0.7 }}>
                                                        <Box sx={{
                                                            width: 6,
                                                            height: 6,
                                                            borderRadius: '50%',
                                                            background: entry.color,
                                                            boxShadow: `0 0 6px ${entry.color}`,
                                                        }} />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={achievement}
                                                        primaryTypographyProps={{
                                                            sx: { color: '#bbb', lineHeight: 1.7, fontSize: '0.95rem' }
                                                        }}
                                                    />
                                                </ListItem>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </List>
                            </motion.div>
                        )}

                        {/* Named projects shipped during this chapter */}
                        {!isTyping && entry.projects && entry.projects.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.25 + entry.achievements.length * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Typography variant="h6" sx={{
                                    fontFamily: 'monospace',
                                    mt: 4,
                                    mb: 2,
                                    color: entry.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    fontSize: '0.9rem',
                                    letterSpacing: 2,
                                }}>
                                    <FolderKanban size={18} /> PROJECTS
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {entry.projects.map((project, i) => (
                                        <motion.div
                                            key={project.title}
                                            initial={{ opacity: 0, x: 24 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + entry.achievements.length * 0.15 + i * 0.15, ease: 'easeOut' }}
                                        >
                                            <Box sx={{
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                border: `1px solid ${entry.color}25`,
                                                borderRadius: '12px',
                                                p: 2.5,
                                            }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
                                                    {project.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#bbb', lineHeight: 1.7, fontSize: '0.9rem', mb: 1.2 }}>
                                                    {project.description}
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                                                    {project.tech.map((t) => (
                                                        <Box
                                                            key={t}
                                                            sx={{
                                                                px: 1, py: 0.3,
                                                                fontSize: '0.68rem',
                                                                fontFamily: 'monospace',
                                                                borderRadius: '5px',
                                                                color: entry.color,
                                                                border: `1px solid ${entry.color}35`,
                                                                background: `${entry.color}10`,
                                                            }}
                                                        >
                                                            {t}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </motion.div>
                                    ))}
                                </Box>
                            </motion.div>
                        )}
                    </Box>
                </Box>
            </Box>
        </motion.div>
    );
}
