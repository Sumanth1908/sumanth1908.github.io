import { useMemo, useState } from 'react';
import { Box, Container, Grid, Chip, Stack } from '@mui/material';
import HolographicCard from '../HolographicCard';
import SectionHeading from './SectionHeading';
import { projects } from '../../data/projects';

const ALL = 'All';

export default function ProjectsConstellation() {
    const companies = useMemo(() => {
        const set = new Set<string>();
        projects.forEach((p) => p.company && set.add(p.company));
        return [ALL, ...Array.from(set)];
    }, []);

    const [filter, setFilter] = useState<string>(ALL);

    const visible = filter === ALL ? projects : projects.filter((p) => p.company === filter);

    return (
        <Box id="projects" sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 14 } }}>
            <Container maxWidth="lg">
                <SectionHeading
                    prefix="// COMPILED ASSETS"
                    title="The Constellation"
                    subtitle="A galaxy of systems, platforms and agents shipped across four companies."
                />

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 5 }}>
                    {companies.map((c) => (
                        <Chip
                            key={c}
                            label={c}
                            onClick={() => setFilter(c)}
                            sx={{
                                fontFamily: 'monospace',
                                cursor: 'pointer',
                                bgcolor: filter === c ? 'primary.main' : 'rgba(255,255,255,0.05)',
                                color: filter === c ? '#000' : 'text.secondary',
                                fontWeight: filter === c ? 700 : 400,
                                border: '1px solid rgba(255,255,255,0.1)',
                                '&:hover': { bgcolor: filter === c ? 'primary.light' : 'rgba(187,134,252,0.2)' },
                            }}
                        />
                    ))}
                </Stack>

                <Grid container spacing={5}>
                    {visible.map((project, index) => (
                        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.id}>
                            <HolographicCard project={project} index={index} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
