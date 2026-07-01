import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowDown, Globe, Mail, Linkedin } from 'lucide-react';
import { profile } from '../../data/profile';
import TypewriterText from '../TypewriterText';

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Hero() {
    return (
        <Box
            id="home"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
                pt: { xs: 12, md: 0 },
            }}
        >
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: [0.175, 0.885, 0.32, 1.275] }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Globe size={28} color="#03dac6" />
                        <Typography
                            variant="h6"
                            sx={{ fontFamily: 'monospace', color: 'secondary.main', letterSpacing: { xs: 1, md: 2 }, fontSize: { xs: '0.9rem', md: '1.2rem' } }}
                        >
                            <TypewriterText text="MISSION.LOG &gt; BOOTING CAREER ORBIT..." />
                        </Typography>
                    </Box>

                    <Typography
                        variant="h1"
                        gutterBottom
                        sx={{
                            fontSize: { xs: '3rem', sm: '5rem', md: '7rem' },
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.05,
                            textTransform: 'uppercase',
                            position: 'relative',
                            color: 'transparent',
                            WebkitTextStroke: '2px rgba(255,255,255,0.85)',
                        }}
                    >
                        Sumanth
                        <Box
                            component="span"
                            sx={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                background: 'linear-gradient(90deg, #bb86fc 0%, #03dac6 50%, #ff0266 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'pulseGlow 4s ease-in-out infinite alternate',
                                '@keyframes pulseGlow': {
                                    '0%': { filter: 'blur(8px) brightness(1.5)', opacity: 0.5 },
                                    '100%': { filter: 'blur(2px) brightness(2)', opacity: 1 },
                                },
                            }}
                        >
                            Sumanth
                        </Box>
                    </Typography>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                color: 'text.primary',
                                fontWeight: 400,
                                fontFamily: 'monospace',
                                fontSize: { xs: '1.1rem', md: '1.8rem' },
                                mb: 2,
                            }}
                        >
                            {profile.title}
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ maxWidth: { xs: '100%', md: '70%' }, fontWeight: 300, mb: 5, lineHeight: 1.7 }}
                        >
                            {profile.tagline}. {profile.yearsOfExperience} years across Infosys, Teradata, Amazon &amp; Electronic Arts.
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.4, type: 'spring', stiffness: 180 }}
                    >
                        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                            <Button
                                variant="contained"
                                onClick={() => scrollToId('journey')}
                                endIcon={<ArrowDown size={20} />}
                                sx={{
                                    py: 1.8,
                                    px: { xs: 3, md: 4 },
                                    fontFamily: 'monospace',
                                    fontWeight: 'bold',
                                    background: 'rgba(187,134,252,0.1)',
                                    border: '1px solid #bb86fc',
                                    color: '#bb86fc',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 0 20px rgba(187,134,252,0.2), inset 0 0 20px rgba(187,134,252,0.1)',
                                    '&:hover': {
                                        background: 'rgba(187,134,252,0.2)',
                                        boxShadow: '0 0 40px rgba(187,134,252,0.4)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s',
                                }}
                            >
                                BEGIN THE JOURNEY
                            </Button>
                            <Button
                                variant="outlined"
                                href={`mailto:${profile.contact.email}`}
                                startIcon={<Mail size={18} />}
                                sx={{ py: 1.8, px: 3, fontFamily: 'monospace', borderColor: 'rgba(3,218,198,0.5)', color: 'secondary.main' }}
                            >
                                Email
                            </Button>
                            <Button
                                variant="outlined"
                                href={profile.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<Linkedin size={18} />}
                                sx={{ py: 1.8, px: 3, fontFamily: 'monospace', borderColor: 'rgba(255,255,255,0.2)', color: 'text.primary' }}
                            >
                                LinkedIn
                            </Button>
                        </Stack>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Scroll cue */}
            <Box
                component={motion.div}
                animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                sx={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}
            >
                <ArrowDown size={24} color="#03dac6" />
            </Box>
        </Box>
    );
}
