import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Maximize2, Radio } from 'lucide-react';
import type { JourneyEntry } from '../../data/journey';
import { useEffect, useState } from 'react';

interface Props {
    journeyData: JourneyEntry[];
    activeIndex: number;
    onChange: (index: number) => void;
    onZoom: () => void;
}

export default function TimelineScrubber({ journeyData, activeIndex, onChange, onZoom }: Props) {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                onChange((activeIndex + 1) % journeyData.length);
            }, 6000); // ~6s per chapter — lets the fly-to animation finish before the next
        }
        return () => clearInterval(interval);
    }, [isPlaying, activeIndex, onChange, journeyData.length]);

    const handlePrev = () => {
        onChange(Math.max(0, activeIndex - 1));
    };

    const handleNext = () => {
        onChange(Math.min(journeyData.length - 1, activeIndex + 1));
    };

    const activeEntry = journeyData[activeIndex];

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'linear-gradient(to top, rgba(5,5,16,0.9) 0%, rgba(5,5,16,0) 100%)',
                pointerEvents: 'none', // Let clicks pass through empty areas
            }}
        >
            <Box sx={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
                
                {/* Active Chapter Info - Floating Dossier on the Left */}
                <motion.div
                    key={activeEntry.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                    style={{
                        position: 'fixed',
                        left: '24px',
                        top: '100px',
                        width: '340px',
                        background: 'rgba(10, 10, 20, 0.75)',
                        backdropFilter: 'blur(15px)',
                        padding: '28px',
                        borderRadius: '20px',
                        border: `1px solid ${activeEntry.color}35`,
                        boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 20px ${activeEntry.color}15`,
                        pointerEvents: 'auto',
                        zIndex: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="overline" sx={{ color: activeEntry.color, fontWeight: '800', letterSpacing: 2, fontSize: '0.7rem' }}>
                            CHAPTER 0{activeIndex + 1} / 0{journeyData.length}
                        </Typography>
                        <Box sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            background: `${activeEntry.color}15`,
                            border: `1px solid ${activeEntry.color}30`
                        }}>
                            <Typography variant="caption" sx={{ color: activeEntry.color, fontFamily: 'monospace', fontWeight: 'bold' }}>
                                {activeEntry.type.toUpperCase()}
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5, mb: 0.5 }}>
                            {activeEntry.title}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                            {activeEntry.subtitle}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5, fontFamily: 'monospace' }}>
                            📍 {activeEntry.location} • {activeEntry.period}
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={onZoom}
                        sx={{ 
                            mt: 1,
                            alignSelf: 'stretch',
                            border: `1px solid ${activeEntry.color}60`, 
                            color: activeEntry.color,
                            borderRadius: '8px',
                            py: 1.2,
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            letterSpacing: 2,
                            transition: 'all 0.3s',
                            '&:hover': { 
                                background: `${activeEntry.color}15`,
                                boxShadow: `0 0 15px ${activeEntry.color}30`,
                                borderColor: activeEntry.color
                            }
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            ACCESS DOSSIER <Maximize2 size={14} />
                        </span>
                    </IconButton>
                </motion.div>

                {/* Scrubber Bar with Years */}
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                    <IconButton onClick={() => setIsPlaying(!isPlaying)} sx={{ color: 'white' }}>
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </IconButton>
                    <IconButton onClick={handlePrev} disabled={activeIndex === 0} sx={{ color: 'white' }}>
                        <ChevronLeft size={20} />
                    </IconButton>

                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', position: 'relative', height: '60px' }}>
                        {/* The continuous background track */}
                        <Box sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: '20px',
                            height: '2px',
                            background: 'rgba(255,255,255,0.1)',
                            zIndex: 0
                        }} />

                        {journeyData.map((entry, idx) => {
                            const isActive = idx === activeIndex;
                            const isPast = idx <= activeIndex;
                            const pct = (idx / (journeyData.length - 1)) * 100;
                            const year = Math.floor(entry.startYear);

                            return (
                                <Box
                                    key={entry.id}
                                    onClick={() => onChange(idx)}
                                    sx={{
                                        position: 'absolute',
                                        left: `${pct}%`,
                                        top: '20px',
                                        transform: 'translate(-50%, -50%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        zIndex: 1
                                    }}
                                >
                                    {/* Circle node */}
                                    <Box sx={{
                                        width: isActive ? '16px' : '10px',
                                        height: isActive ? '16px' : '10px',
                                        borderRadius: '50%',
                                        background: isPast ? entry.color : '#555',
                                        boxShadow: isActive ? `0 0 10px ${entry.color}` : 'none',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.3)',
                                            boxShadow: `0 0 8px ${entry.color}`
                                        }
                                    }} />

                                    {/* Year Label below node */}
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 1.5,
                                            fontFamily: 'monospace',
                                            fontSize: '11px',
                                            color: isActive ? '#fff' : 'text.secondary',
                                            fontWeight: isActive ? 'bold' : 'normal',
                                            transition: 'color 0.3s',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {year}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>

                    <IconButton onClick={handleNext} disabled={activeIndex === journeyData.length - 1} sx={{ color: 'white' }}>
                        <ChevronRight size={20} />
                    </IconButton>

                    {/* Jump straight to the present-day chapter */}
                    <Tooltip title="Jump to present">
                        <IconButton
                            onClick={() => onChange(journeyData.length - 1)}
                            disabled={activeIndex === journeyData.length - 1}
                            sx={{
                                color: '#fff',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '8px',
                                px: 1.2,
                                gap: 0.6,
                                fontFamily: 'monospace',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                letterSpacing: 1,
                                '&:hover': { borderColor: '#38bdf8', color: '#38bdf8', background: 'rgba(56,189,248,0.1)' },
                                '&.Mui-disabled': { color: '#38bdf8', borderColor: 'rgba(56,189,248,0.5)' },
                            }}
                        >
                            <Radio size={15} /> NOW
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
}
