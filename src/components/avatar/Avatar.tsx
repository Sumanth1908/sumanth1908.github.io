import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface Props {
    color?: string;
    isTalking?: boolean;
    /** Optional real photo — if provided, renders instead of the illustrated SVG. */
    photoSrc?: string;
}

/**
 * Illustrated holographic persona. Renders an SVG character bust tinted by the
 * chapter accent color, with a blink + mouth "talking" animation. Drop in a
 * `photoSrc` later to swap the illustration for a real photo with no refactor.
 */
export default function Avatar({ color = '#38bdf8', isTalking = false, photoSrc }: Props) {
    return (
        <Box sx={{
            width: { xs: '170px', md: '210px' },
            height: { xs: '170px', md: '210px' },
            borderRadius: '50%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `radial-gradient(circle at 50% 40%, ${color}22, transparent 70%)`,
            border: `2px solid ${color}55`,
            boxShadow: `0 0 40px ${color}30, inset 0 0 30px ${color}15`,
            overflow: 'hidden',
        }}>
            {/* Talking pulse ring */}
            {isTalking && (
                <motion.div
                    animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        inset: -14,
                        borderRadius: '50%',
                        border: `2px solid ${color}`,
                    }}
                />
            )}

            {photoSrc ? (
                <Box component="img" src={photoSrc} alt="avatar" sx={{
                    width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%',
                }} />
            ) : (
                <svg viewBox="0 0 200 200" width="86%" height="86%" style={{ position: 'relative', zIndex: 1 }}>
                    <defs>
                        <linearGradient id="avHair" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} />
                            <stop offset="100%" stopColor="#0b0e1a" />
                        </linearGradient>
                        <linearGradient id="avBody" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="0.55" />
                            <stop offset="100%" stopColor={color} stopOpacity="0.12" />
                        </linearGradient>
                    </defs>

                    {/* Shoulders / torso */}
                    <path d="M40 200 C40 150 70 132 100 132 C130 132 160 150 160 200 Z" fill="url(#avBody)" stroke={color} strokeWidth="1.5" />
                    {/* Neck */}
                    <rect x="88" y="112" width="24" height="28" rx="10" fill="#e9c9a8" />
                    {/* Head */}
                    <ellipse cx="100" cy="84" rx="34" ry="38" fill="#f0d2b0" stroke={color} strokeWidth="1" />

                    {/* Stubble along the jaw for a masculine, lived-in look */}
                    <path
                        d="M68 92 C70 112 84 128 100 128 C116 128 130 112 132 92 C126 108 114 118 100 118 C86 118 74 108 68 92 Z"
                        fill="#3a2a20"
                        opacity="0.3"
                    />

                    {/* Hair — short, cropped cut with defined sides (not covering the ears) */}
                    <path
                        d="M66 76 C66 50 80 33 100 32 C120 33 134 50 134 76 C134 58 118 51 100 51 C82 51 66 58 66 76 Z"
                        fill="url(#avHair)"
                    />
                    {/* Sideburns */}
                    <path d="M67 66 C65 74 65 82 68 88 C70 80 70 72 71 66 Z" fill="url(#avHair)" />
                    <path d="M133 66 C135 74 135 82 132 88 C130 80 130 72 129 66 Z" fill="url(#avHair)" />
                    {/* Side part shading */}
                    <path d="M92 35 C86 42 80 48 76 58" stroke="#0b0e1a" strokeWidth="2.2" strokeLinecap="round" opacity="0.4" fill="none" />
                    {/* Short textured crop — a few spiky strand tufts on top */}
                    <path d="M88 33 L86 26 L92 32 Z" fill="#0b0e1a" opacity="0.4" />
                    <path d="M100 32 L99 24 L104 31 Z" fill="#0b0e1a" opacity="0.35" />
                    <path d="M112 33 L112 26 L117 33 Z" fill="#0b0e1a" opacity="0.3" />
                    {/* Strand highlights for texture */}
                    <path d="M108 36 C112 42 113 47 110 52" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.35" fill="none" />
                    <path d="M118 41 C122 46 122 52 118 56" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.3" fill="none" />

                    {/* Eyebrows — thicker, straighter brow for a more masculine expression */}
                    <motion.g
                        animate={{ y: [0, -1, 0] }}
                        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                    >
                        <path d="M75 75 Q83 70 92 73" stroke="#5b4636" strokeWidth="4" strokeLinecap="round" fill="none" />
                        <path d="M108 73 Q117 70 125 75" stroke="#5b4636" strokeWidth="4" strokeLinecap="round" fill="none" />
                    </motion.g>

                    {/* Eyes — blink */}
                    <motion.g
                        animate={{ scaleY: [1, 1, 0.1, 1] }}
                        transition={{ repeat: Infinity, duration: 4, times: [0, 0.92, 0.96, 1] }}
                        style={{ transformOrigin: '100px 84px' }}
                    >
                        <ellipse cx="85" cy="84" rx="5" ry="6" fill="#22303f" />
                        <ellipse cx="115" cy="84" rx="5" ry="6" fill="#22303f" />
                        <circle cx="86.5" cy="82" r="1.5" fill="#fff" />
                        <circle cx="116.5" cy="82" r="1.5" fill="#fff" />
                    </motion.g>
                    {/* Nose */}
                    <path d="M100 88 L96 100 L104 100 Z" fill="#dcb189" />

                    {/* Mouth — idle smile, opens up when talking */}
                    {isTalking ? (
                        <motion.ellipse
                            cx="100" cy="110"
                            rx="10"
                            animate={{ ry: [1.5, 6, 2.5, 5, 1.5] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            fill="#8a3b3b"
                        />
                    ) : (
                        <motion.path
                            d="M87 104 Q100 114 113 104"
                            stroke="#8a3b3b"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    )}
                </svg>
            )}

            {/* Hologram scanlines */}
            <Box sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
                background: `repeating-linear-gradient(to bottom, transparent, transparent 4px, ${color}0c 4px, ${color}0c 5px)`,
                mixBlendMode: 'screen',
            }} />
        </Box>
    );
}
