import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';

interface Props {
    onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: Props) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Boot text, then land on "Orbit of Experience" carrying the profile
        // summary — booting the globe only fires once the viewer clicks
        // through, not on a timer.
        const timer1 = setTimeout(() => setStep(1), 1600);
        return () => clearTimeout(timer1);
    }, []);

    useEffect(() => {
        if (step !== 2) return;
        const timer = setTimeout(onComplete, 1400);
        return () => clearTimeout(timer);
    }, [step, onComplete]);

    const advance = () => {
        if (step === 1) setStep(2);
    };

    return (
        <Box
            onClick={advance}
            sx={{
                position: 'fixed',
                inset: 0,
                bgcolor: '#050510',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                px: 3,
                cursor: step === 1 ? 'pointer' : 'default',
            }}
        >
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 1 }}
                    >
                        <Typography variant="h3" sx={{ fontFamily: 'monospace', color: '#fff', letterSpacing: 4, fontSize: { xs: '1.6rem', md: '3rem' }, textAlign: 'center' }}>
                            ESTABLISHING UPLINK
                            <motion.span
                                animate={{ opacity: [1, 1, 0, 0] }}
                                transition={{ repeat: Infinity, duration: 0.9, times: [0, 0.5, 0.51, 1] }}
                                style={{ color: '#38bdf8', display: 'inline-block' }}
                            >
                                _
                            </motion.span>
                        </Typography>

                        {/* Signal-strength bars pulsing while the uplink "establishes" */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6px', mt: 3, height: '28px' }}>
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ scaleY: [0.25, 1, 0.25] }}
                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.12, ease: 'easeInOut' }}
                                    style={{
                                        width: 5,
                                        height: 28,
                                        borderRadius: 2,
                                        background: '#38bdf8',
                                        transformOrigin: 'bottom',
                                    }}
                                />
                            ))}
                        </Box>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 1.5 }}
                        style={{ textAlign: 'center', maxWidth: 640 }}
                    >
                        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#fff', mb: 1, fontSize: { xs: '2.2rem', md: '3.75rem' } }}>
                            Orbit of Experience
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary', fontFamily: 'monospace', mb: 4, fontSize: { xs: '0.9rem', md: '1.25rem' } }}>
                            A decade of building, scaling &amp; shipping — mapped to the planet.
                        </Typography>

                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                            {profile.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#38bdf8', fontFamily: 'monospace', mb: 2.5, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                            {profile.title} · {profile.yearsOfExperience} yrs experience
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#d0d0d0', lineHeight: 1.8, mb: 5, fontSize: { xs: '0.88rem', md: '1rem' } }}>
                            {profile.summary}
                        </Typography>

                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.6 }}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                color: '#38bdf8', fontFamily: 'monospace', letterSpacing: 2, fontSize: '0.85rem',
                            }}
                        >
                            CLICK TO CONTINUE <ArrowRight size={18} />
                        </motion.div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center' }}
                    >
                        <Typography variant="h5" sx={{ fontFamily: 'monospace', color: '#38bdf8', letterSpacing: 3 }}>
                            BOOTING GLOBE
                        </Typography>
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                            style={{ marginTop: 16, color: '#8a93a8', fontFamily: 'monospace', letterSpacing: 6 }}
                        >
                            ● ● ●
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}
