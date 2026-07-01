import { Box, Container, Grid, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { skillGroups } from '../../data/skills';

export default function Skills() {
    return (
        <Box id="skills" sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 14 } }}>
            <Container maxWidth="lg">
                <SectionHeading
                    prefix="// SYSTEM CAPABILITIES"
                    title="The Toolkit"
                    subtitle="The instruments powering each mission."
                />

                <Grid container spacing={4}>
                    {skillGroups.map((group, gi) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={group.label}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, delay: gi * 0.1 }}
                            >
                                <Box
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        borderRadius: 4,
                                        background: 'rgba(12,12,20,0.5)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontFamily: 'monospace', color: 'secondary.main', mb: 2, fontWeight: 700 }}
                                    >
                                        {group.label}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {group.skills.map((skill) => (
                                            <Chip
                                                key={skill}
                                                label={skill}
                                                sx={{
                                                    fontFamily: 'monospace',
                                                    bgcolor: 'rgba(187,134,252,0.08)',
                                                    color: 'text.primary',
                                                    border: '1px solid rgba(187,134,252,0.25)',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(187,134,252,0.25)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 0 12px rgba(187,134,252,0.4)',
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
