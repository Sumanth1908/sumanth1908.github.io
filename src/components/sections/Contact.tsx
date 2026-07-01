import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import { profile } from '../../data/profile';
import TypewriterText from '../TypewriterText';

export default function Contact() {
    return (
        <Box id="contact" sx={{ position: 'relative', zIndex: 2, py: { xs: 10, md: 16 }, textAlign: 'center' }}>
            <Container maxWidth="md">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7 }}
                >
                    <Typography sx={{ fontFamily: 'monospace', color: 'secondary.main', letterSpacing: 2, mb: 2 }}>
                        <TypewriterText text="// ESTABLISH UPLINK" />
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            fontSize: { xs: '2.2rem', md: '3.4rem' },
                            color: '#fff',
                            mb: 2,
                        }}
                    >
                        Let’s build something
                        <Box component="span" sx={{ color: 'primary.main' }}> stellar</Box>.
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300, mb: 5, maxWidth: 600, mx: 'auto' }}>
                        Open to conversations about agentic AI, distributed systems, and ambitious engineering. Reach out — I reply.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            size="large"
                            href={`mailto:${profile.contact.email}`}
                            startIcon={<Mail size={20} />}
                            sx={{
                                py: 1.8,
                                px: 4,
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                background: 'rgba(187,134,252,0.12)',
                                border: '1px solid #bb86fc',
                                color: '#bb86fc',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 0 20px rgba(187,134,252,0.2)',
                                '&:hover': { background: 'rgba(187,134,252,0.22)', boxShadow: '0 0 40px rgba(187,134,252,0.4)' },
                            }}
                        >
                            {profile.contact.email}
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            href={profile.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<Linkedin size={20} />}
                            sx={{ py: 1.8, px: 4, fontFamily: 'monospace', borderColor: 'rgba(3,218,198,0.5)', color: 'secondary.main' }}
                        >
                            LinkedIn
                        </Button>
                    </Stack>
                </motion.div>
            </Container>
        </Box>
    );
}
