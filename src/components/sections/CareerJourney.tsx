import { useRef, Suspense, lazy } from 'react';
import { Box, Container, Typography, Chip, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { experiences } from '../../data/experience';
import { useCareerProgress } from '../../hooks/useCareerProgress';
import TimelineScrubber from '../timeline/TimelineScrubber';
import MissionAvatar from '../avatar/MissionAvatar';
import SectionHeading from './SectionHeading';
import WebGLErrorBoundary from '../WebGLErrorBoundary';

const CareerGlobe = lazy(() => import('../globe/CareerGlobe'));

function GlobeFallback() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 40% 35%, #1a1030, #07070f)',
                border: '1px solid rgba(187,134,252,0.2)',
            }}
        >
            <Typography sx={{ fontFamily: 'monospace', color: 'secondary.main', opacity: 0.6 }}>
                ◍ ORBIT
            </Typography>
        </Box>
    );
}

export default function CareerJourney() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { activeIndex, progress } = useCareerProgress(sectionRef, experiences.length);
    const active = experiences[activeIndex];

    const jumpTo = (index: number) => {
        document.getElementById(`role-${experiences[index].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <Box id="journey" ref={sectionRef} sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 14 } }}>
            <Container maxWidth="lg">
                <SectionHeading
                    prefix="// ORBITAL CAREER JOURNEY"
                    title="The Trajectory"
                    subtitle="Scroll to travel through the years — the globe rotates to each city, drops a beacon, and traces the path between missions."
                />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 8 }, alignItems: 'flex-start' }}>
                    {/* Sticky globe + timeline panel */}
                    <Box
                        sx={{
                            flex: 1,
                            width: '100%',
                            position: { md: 'sticky' },
                            top: { md: '10vh' },
                            alignSelf: 'flex-start',
                        }}
                    >
                        <Box sx={{ position: 'relative', width: '100%', height: { xs: '46vh', md: '60vh' } }}>
                            <WebGLErrorBoundary fallbackBackground={<GlobeFallback />}>
                                <Suspense fallback={<GlobeFallback />}>
                                    <CareerGlobe activeIndex={activeIndex} />
                                </Suspense>
                            </WebGLErrorBoundary>

                            {/* Active location readout */}
                            <Box
                                component={motion.div}
                                key={active.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                sx={{
                                    position: 'absolute',
                                    bottom: 8,
                                    left: 0,
                                    right: 0,
                                    textAlign: 'center',
                                    pointerEvents: 'none',
                                }}
                            >
                                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                    <MapPin size={18} color={active.accent} />
                                    <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, color: '#fff' }}>
                                        {active.city}, {active.country}
                                    </Typography>
                                </Stack>
                                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'text.secondary' }}>
                                    {active.company} · {active.start} – {active.end}
                                </Typography>
                            </Box>
                        </Box>

                        <TimelineScrubber activeIndex={activeIndex} progress={progress} onSelect={jumpTo} />
                    </Box>

                    {/* Scrolling mission-log cards */}
                    <Box sx={{ flex: 1, width: '100%' }}>
                        {experiences.map((exp, i) => (
                            <Box
                                key={exp.id}
                                id={`role-${exp.id}`}
                                component={motion.div}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: '-40% 0px -40% 0px' }}
                                transition={{ duration: 0.5 }}
                                sx={{
                                    mb: { xs: 5, md: 10 },
                                    p: { xs: 2.5, md: 3.5 },
                                    borderRadius: 4,
                                    background: 'rgba(12,12,20,0.55)',
                                    backdropFilter: 'blur(14px)',
                                    border: `1px solid ${i === activeIndex ? exp.accent + '88' : 'rgba(255,255,255,0.08)'}`,
                                    boxShadow: i === activeIndex ? `0 0 30px ${exp.accent}33` : '0 4px 24px rgba(0,0,0,0.4)',
                                    transition: 'border-color 0.4s, box-shadow 0.4s',
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                    <MissionAvatar accent={exp.accent} speaking={i === activeIndex} />
                                    <Box>
                                        <Typography variant="h5" sx={{ fontFamily: 'monospace', fontWeight: 800, color: '#fff' }}>
                                            {exp.company}
                                        </Typography>
                                        <Typography sx={{ color: exp.accent, fontWeight: 600 }}>{exp.role}</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                                            {exp.start} – {exp.end} · {exp.city}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                                    {exp.blurb}
                                </Typography>

                                <Stack spacing={1.2} sx={{ mb: 2.5 }}>
                                    {exp.highlights.map((h, hi) => (
                                        <Stack key={hi} direction="row" spacing={1.2} alignItems="flex-start">
                                            <Box sx={{ mt: '3px', flexShrink: 0 }}>
                                                <CheckCircle2 size={16} color={exp.accent} />
                                            </Box>
                                            <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
                                                {h}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {exp.tech.map((t) => (
                                        <Chip
                                            key={t}
                                            label={t}
                                            size="small"
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontSize: '0.7rem',
                                                bgcolor: 'rgba(0,0,0,0.4)',
                                                color: 'text.secondary',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
