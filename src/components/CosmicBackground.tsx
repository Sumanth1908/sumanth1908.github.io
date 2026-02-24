import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const CosmicBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Mouse interaction positioning
        let mouse = { x: -1000, y: -1000 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseSize: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.baseSize = Math.random() * 2 + 0.5;
                this.size = this.baseSize;
                // Randomly assign a tech/math neon color
                const colors = ['#bb86fc', '#03dac6', '#ff0266', '#00e5ff'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                // Basic movement
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls
                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

                // Interaction with mouse (Gravity / Repulsion effect)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Singularity effect: When mouse is nearby, particles get pulled slightly and speed up,
                // but if too close they get repelled (simulating an orbit/event horizon)
                const maxDistance = 150;
                if (distance < maxDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (maxDistance - distance) / maxDistance;

                    const acceleration = force * 2;
                    // Pulse size when near mouse
                    this.size = this.baseSize + (force * 3);

                    if (distance < 50) {
                        // Repel if very close
                        this.vx -= forceDirectionX * acceleration * 0.1;
                        this.vy -= forceDirectionY * acceleration * 0.1;
                    } else {
                        // Attract
                        this.vx += forceDirectionX * acceleration * 0.05;
                        this.vy += forceDirectionY * acceleration * 0.05;
                    }
                } else {
                    this.size = this.baseSize;
                }

                // Apply friction to prevent infinite acceleration
                this.vx *= 0.99;
                this.vy *= 0.99;

                // Minimum speed enforcement so they never truly stop
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed < 0.2) {
                    this.vx *= 1.1;
                    this.vy *= 1.1;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                // Add a slight glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0; // reset
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000); // 1 particle per 10k pixels
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const drawLines = () => {
            if (!ctx) return;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Connect particles if they are close (Constellation effect)
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(187, 134, 252, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse pointer
                const dxMouse = particles[i].x - mouse.x;
                const dyMouse = particles[i].y - mouse.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distMouse < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(3, 218, 198, ${(1 - distMouse / 150) * 0.8})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trailing effect instead of hard clear
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            drawLines();
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Prevent particles from clumping when mouse leaves window
        window.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                bgcolor: '#000000', // Absolute black space
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ display: 'block', width: '100%', height: '100%' }}
            />
        </Box>
    );
};

export default CosmicBackground;
