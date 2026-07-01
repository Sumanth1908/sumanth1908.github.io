import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
    prefix: string;
    title: string;
    subtitle?: string;
}

export default function SectionHeading({ prefix, title, subtitle }: SectionHeadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, type: 'spring' }}
        >
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
                <Typography
                    sx={{ fontFamily: 'monospace', color: 'secondary.main', letterSpacing: 2, fontSize: '0.9rem', mb: 1 }}
                >
                    {prefix}
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 800,
                        fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' },
                        color: '#fff',
                        textShadow: '0 0 20px rgba(255,255,255,0.25)',
                        wordBreak: 'break-word',
                    }}
                >
                    {title}
                    <Box component="span" sx={{ color: 'secondary.main' }}>_</Box>
                </Typography>
                {subtitle && (
                    <Typography variant="h6" color="text.secondary" sx={{ mt: 1.5, fontWeight: 300, maxWidth: 720 }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </motion.div>
    );
}
