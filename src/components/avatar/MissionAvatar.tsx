import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface MissionAvatarProps {
    accent: string;
    /** When true the avatar animates its "speaking" waveform. */
    speaking?: boolean;
    size?: number;
}

// A stylized, code-generated explorer avatar — a glowing helmet orb with a visor
// and an audio waveform that animates while it narrates a role.
export default function MissionAvatar({ accent, speaking = true, size = 72 }: MissionAvatarProps) {
    const bars = [0.4, 0.7, 1, 0.6, 0.85, 0.5];

    return (
        <Box sx={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            {/* Pulsing aura */}
            <Box
                component={motion.div}
                animate={{ scale: speaking ? [1, 1.18, 1] : 1, opacity: speaking ? [0.5, 0.2, 0.5] : 0.3 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${accent}55 0%, transparent 70%)`,
                }}
            />
            {/* Floating helmet */}
            <Box
                component={motion.div}
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                    position: 'relative',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 30%, #2a2a3e, #0d0d18)',
                    border: `2px solid ${accent}`,
                    boxShadow: `0 0 18px ${accent}88, inset 0 0 14px ${accent}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Visor */}
                <Box
                    sx={{
                        width: '64%',
                        height: '42%',
                        borderRadius: '40% 40% 45% 45%',
                        background: `linear-gradient(135deg, ${accent}, #03dac6)`,
                        opacity: 0.9,
                        boxShadow: `0 0 12px ${accent}`,
                        position: 'relative',
                        top: '-4%',
                    }}
                />
                {/* Waveform mouth */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '20%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        height: '18%',
                    }}
                >
                    {bars.map((h, i) => (
                        <Box
                            key={i}
                            component={motion.div}
                            animate={speaking ? { scaleY: [h * 0.4, h, h * 0.5] } : { scaleY: 0.3 }}
                            transition={{ duration: 0.5 + i * 0.07, repeat: Infinity, ease: 'easeInOut' }}
                            sx={{
                                width: 2.5,
                                height: '100%',
                                borderRadius: 2,
                                bgcolor: accent,
                                transformOrigin: 'center',
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
