import { Box, Typography, Container, Button, Grid, IconButton } from '@mui/material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HolographicCard from './components/HolographicCard';
import CosmicBackground from './components/CosmicBackground';
import { projects } from './data/projects';
import { ArrowDown, Code, Terminal, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';

// Typing effect component
const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayText}</span>;
}

function App() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { scrollYProgress } = useScroll();
  // Smooth out scroll progress for parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const yHero = useTransform(smoothProgress, [0, 1], [0, 600]);
  const opacityHero = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const scaleHero = useTransform(smoothProgress, [0, 0.3], [1, 0.8]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'text.primary',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      <CosmicBackground />
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* The Event Horizon (Hero Section) */}
        <Box
          component={motion.div}
          style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
          sx={{
            py: { xs: 12, md: 24 },
            display: 'flex',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 1,
            pointerEvents: 'none' // allow clicks to pass through to canvas
          }}
        >
          <Container maxWidth="lg" sx={{ pointerEvents: 'auto' }}>
            <Box sx={{ position: 'relative' }}>

              {/* Floating decorative tech icons */}
              <motion.div
                animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: -100, right: '10%', opacity: 0.2 }}
              >
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Cpu size={120} color="#bb86fc" />
                </Box>
              </motion.div>

              <motion.div
                animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', bottom: -50, left: '-5%', opacity: 0.15 }}
              >
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Terminal size={150} color="#03dac6" />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: [0.175, 0.885, 0.32, 1.275] }}
              >

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Code size={30} color="#03dac6" />
                  <Typography variant="h6" sx={{ fontFamily: 'monospace', color: 'secondary.main', letterSpacing: { xs: 1, md: 2 }, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    <TypewriterText text="SYSTEM.INITIALIZE();" />
                  </Typography>
                </Box>

                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '3rem', sm: '5rem', md: '7rem' },
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    position: 'relative',
                    // Outline/Hollow text effect for a cooler look
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(255,255,255,0.8)',
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
                        '100%': { filter: 'blur(2px) brightness(2)', opacity: 1 }
                      }
                    }}
                  >
                    Sumanth
                  </Box>
                </Typography>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Typography variant="h4" color="text.secondary" paragraph sx={{ mb: 6, fontWeight: 300, maxWidth: { xs: '100%', md: '80%' }, fontFamily: 'monospace', fontSize: { xs: '1.2rem', md: '2.125rem' } }}>
                    <TypewriterText text="> Executing physical simulations and architecting mathematical networks..." delay={1500} />
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.5, type: 'spring', stiffness: 200 }}
                  style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
                >
                  <Button
                    variant="contained"
                    onClick={scrollToProjects}
                    endIcon={<ArrowDown size={20} />}
                    sx={{
                      py: 2, px: { xs: 3, md: 5 },
                      fontFamily: 'monospace',
                      fontSize: { xs: '0.9rem', md: '1.1rem' },
                      fontWeight: 'bold',
                      background: 'rgba(187,134,252,0.1)',
                      border: '1px solid #bb86fc',
                      color: '#bb86fc',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 0 20px rgba(187,134,252,0.2), inset 0 0 20px rgba(187,134,252,0.1)',
                      '&:hover': {
                        background: 'rgba(187,134,252,0.2)',
                        boxShadow: '0 0 40px rgba(187,134,252,0.4), inset 0 0 20px rgba(187,134,252,0.2)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s'
                    }}
                  >
                    EXPLORE_NODES
                  </Button>

                  <IconButton
                    sx={{
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 2,
                      width: { xs: 48, md: 60 }, height: { xs: 48, md: 60 },
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    <Cpu size={24} />
                  </IconButton>
                </motion.div>
              </motion.div>
            </Box>
          </Container>
        </Box>

        {/* The Constellation (Projects Section) */}
        <Box id="projects" sx={{ py: { xs: 8, md: 16 }, position: 'relative', zIndex: 2 }}>
          {/* Fading gradient separator removed for full transparency, or kept very subtle */}

          <Container maxWidth="lg" sx={{ position: 'relative', p: { xs: 3, md: 8 } }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <Typography
                variant="h2"
                mb={8}
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                  position: 'relative',
                  display: 'inline-block',
                  color: '#fff',
                  textShadow: '0 0 20px rgba(255,255,255,0.3)',
                  wordBreak: 'break-word'
                }}
              >
                // COMPILED_ASSETS
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ display: 'inline-block', marginLeft: '10px', color: '#03dac6' }}
                >
                  _
                </motion.span>
              </Typography>
            </motion.div>

            <Grid container spacing={6}>
              {projects.map((project, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={project.id}>
                  <HolographicCard project={project} index={index} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box >
  );
}

export default App;
