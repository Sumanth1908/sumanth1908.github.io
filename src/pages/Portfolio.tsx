import { Box } from '@mui/material';
import { lazy, Suspense } from 'react';
import Navbar, { type NavLink } from '../components/Navbar';
import Footer from '../components/Footer';
import WebGLErrorBoundary from '../components/WebGLErrorBoundary';
import Hero from '../components/sections/Hero';
import CareerJourney from '../components/sections/CareerJourney';
import ProjectsConstellation from '../components/sections/ProjectsConstellation';
import Skills from '../components/sections/Skills';
import Education from '../components/sections/Education';
import Awards from '../components/sections/Awards';
import Contact from '../components/sections/Contact';

// Calm cosmic backdrop for the portfolio (the full switcher lives on /vfx).
const CosmicBackground = lazy(() => import('../components/CosmicBackground'));

const navLinks: NavLink[] = [
    { label: 'journey', targetId: 'journey' },
    { label: 'projects', targetId: 'projects' },
    { label: 'skills', targetId: 'skills' },
    { label: 'education', targetId: 'education' },
];

export default function Portfolio() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                color: 'text.primary',
                position: 'relative',
                overflowX: 'hidden',
            }}
        >
            <WebGLErrorBoundary fallbackBackground={<Box sx={{ position: 'fixed', inset: 0, zIndex: -1, bgcolor: '#07070f' }} />}>
                <Suspense fallback={<Box sx={{ position: 'fixed', inset: 0, zIndex: -1, bgcolor: '#07070f' }} />}>
                    <CosmicBackground />
                </Suspense>
            </WebGLErrorBoundary>

            <Navbar links={navLinks} />

            <Box component="main" sx={{ flexGrow: 1 }}>
                <Hero />
                <CareerJourney />
                <ProjectsConstellation />
                <Skills />
                <Education />
                <Awards />
                <Contact />
            </Box>

            <Footer />
        </Box>
    );
}
