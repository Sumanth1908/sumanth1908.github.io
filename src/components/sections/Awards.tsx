import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { awards } from '../../data/awards';

export default function Awards() {
    return (
        <Box id="awards" sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 14 } }}>
            <Container maxWidth="lg">
                <SectionHeading prefix="// COMMENDATIONS" title="Awards & Honors" />

                <Grid container spacing={4}>
                    {awards.map((award, i) => (
                        <Grid size={{ xs: 12, md: 6 }} key={award.id}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, delay: i * 0.1, type: 'spring' }}
                            >
                                <Box
                                    sx={{
                                        p: 3.5,
                                        height: '100%',
                                        borderRadius: 4,
                                        background: 'rgba(12,12,20,0.5)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255,180,3,0.2)',
                                        boxShadow: '0 0 24px rgba(255,180,3,0.06)',
                                    }}
                                >
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'radial-gradient(circle, rgba(255,180,3,0.25), transparent)',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Trophy size={24} color="#ffb403" />
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                                                {award.title}
                                            </Typography>
                                            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'secondary.main' }}>
                                                {award.issuer} · {award.year}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                        {award.detail}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
