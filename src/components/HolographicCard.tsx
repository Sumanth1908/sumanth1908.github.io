import { useRef, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, IconButton } from '@mui/material';
import { Github, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Project } from '../data/projects';

interface HolographicCardProps {
    project: Project;
    index: number;
}

const HolographicCard = ({ project, index }: HolographicCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for tracking mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for rotation
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    // Map mouse position to rotation degrees (max 15 degrees tilt)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Highlight effect gradient transform based on mouse
    const backgroundPosition = useTransform(mouseXSpring, [-0.5, 0.5], ["0% 0%", "100% 100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize values between -0.5 and 0.5
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset position on leave
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.15, type: 'spring', bounce: 0.3 }}
            style={{
                perspective: 1000,
                height: '100%',
                width: '100%',
                zIndex: isHovered ? 10 : 1, // Bring to front on hover
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    height: '100%',
                    width: '100%',
                    position: 'relative'
                }}
            >
                <Card
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(10, 10, 10, 0.6)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 4,
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    {/* Dynamic Glare/Glow Effect */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: `radial-gradient(circle at ${isHovered ? backgroundPosition.get() : '50% 50%'}, rgba(187, 134, 252, 0.2), transparent 60%)`,
                            opacity: isHovered ? 1 : 0,
                            pointerEvents: 'none',
                            transition: 'opacity 0.3s ease',
                            zIndex: 1
                        }}
                    />

                    {/* Glowing Border effect when hovered */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 4,
                            padding: '2px', // Border width
                            background: isHovered ? 'linear-gradient(45deg, #bb86fc, #03dac6, #ff0266, #bb86fc)' : 'transparent',
                            backgroundSize: '300% 300%',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            animation: isHovered ? 'gradientMove 3s ease infinite' : 'none',
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}
                    />

                    <Box
                        sx={{
                            height: 220,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            position: 'relative',
                            zIndex: 3,
                            // Parallax for image
                            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                            transition: 'transform 0.3s ease-out'
                        }}
                    >
                        {project.imageUrl ? (
                            <CardMedia
                                component="img"
                                height="220"
                                image={project.imageUrl}
                                alt={project.title}
                                sx={{ objectFit: 'cover', width: '100%', height: '100%', filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'grayscale(30%)' }}
                            />
                        ) : (
                            <Box sx={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(to bottom right, #121212, #1a1a2e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h2" sx={{ opacity: 0.1, fontFamily: 'monospace', fontWeight: 'bold', color: 'primary.main' }}>
                                    {project.title.substring(0, 3).toUpperCase()}
                                </Typography>
                                {/* Decorative code pattern */}
                                <Typography variant="caption" sx={{ position: 'absolute', bottom: 8, right: 8, opacity: 0.3, fontFamily: 'monospace', color: 'secondary.main' }}>
                                    {`[NODE_${project.id.toUpperCase()}]`}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <CardContent
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            zIndex: 3,
                            // Parallax for content
                            transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)',
                            transition: 'transform 0.3s ease-out'
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            <Typography gutterBottom variant="h5" component="h2" fontWeight="bold" sx={{ fontFamily: 'monospace', color: isHovered ? 'primary.light' : 'text.primary', transition: 'color 0.3s' }}>
                                {project.title}
                            </Typography>
                            <Box display="flex" gap={1}>
                                {project.githubUrl && (
                                    <IconButton size="small" href={project.githubUrl} target="_blank" color="inherit" sx={{ '&:hover': { color: '#fff', transform: 'scale(1.2)' }, transition: 'all 0.2s' }}>
                                        <Github size={20} />
                                    </IconButton>
                                )}
                                {project.liveUrl && (
                                    <IconButton size="small" href={project.liveUrl} target="_blank" color="primary" sx={{ '&:hover': { color: 'secondary.main', transform: 'scale(1.2)' }, transition: 'all 0.2s' }}>
                                        <ExternalLink size={20} />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, lineHeight: 1.6 }}>
                            {project.description}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                            {project.tags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={`<${tag} />`} // Code styling
                                    size="small"
                                    sx={{
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        color: 'text.secondary',
                                        fontFamily: 'monospace',
                                        bgcolor: 'rgba(0,0,0,0.3)',
                                        backdropFilter: 'blur(4px)',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                            color: '#fff',
                                            borderColor: 'primary.main'
                                        }
                                    }}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default HolographicCard;
