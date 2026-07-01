import { Box, Container, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { education } from '../../data/education';

export default function Education() {
    return (
        <Box id="education" sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 14 } }}>
            <Container maxWidth="md">
                <SectionHeading prefix="// ORIGIN STORY" title="Education" />

                <Box sx={{ position: 'relative', pl: { xs: 3, md: 4 } }}>
                    {/* Vertical rail */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: { xs: 6, md: 7 },
                            top: 8,
                            bottom: 8,
                            width: 2,
                            background: 'linear-gradient(180deg, #03dac6, #bb86fc)',
                            opacity: 0.5,
                        }}
                    />
                    {education.map((edu, i) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <Box sx={{ position: 'relative', mb: 5 }}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: { xs: -22, md: -27 },
                                        top: 2,
                                        width: 16,
                                        height: 16,
                                        borderRadius: '50%',
                                        bgcolor: 'secondary.main',
                                        boxShadow: '0 0 12px #03dac6',
                                    }}
                                />
                                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
                                    <GraduationCap size={20} color="#bb86fc" />
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                                        {edu.institution}
                                    </Typography>
                                </Stack>
                                <Typography sx={{ color: 'secondary.main', fontWeight: 600 }}>{edu.degree}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                                    {edu.period} · {edu.location}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
                                    {edu.detail}
                                </Typography>
                            </Box>
                        </motion.div>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
