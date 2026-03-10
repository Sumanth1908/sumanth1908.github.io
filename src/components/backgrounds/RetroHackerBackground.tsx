import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box } from '@mui/material';
import { GridHelper, Timer, Vector3 } from 'three';
import { Sparkles } from '@react-three/drei';

const MovingGrid = () => {
    const gridRef = useRef<GridHelper>(null);
    const { mouse } = useThree();
    const timer = useMemo(() => new Timer(), []);

    useFrame((state) => {
        if (gridRef.current) {
            timer.update();
            const time = timer.getElapsed();
            
            // Move grid towards camera
            gridRef.current.position.z = (time * 2) % 1;
            
            // Camera Parallax
            state.camera.position.lerp(new Vector3(mouse.x * 2, 2 + mouse.y * 0.5, 5), 0.05);
            state.camera.lookAt(0, 0, -10);
        }
    });

    return (
        <group position={[0, -2, 0]}>
            <gridHelper 
                ref={gridRef} 
                args={[100, 100, '#ff0266', '#bb86fc']} 
                position={[0, 0, 0]} 
            />
            {/* Fade out grid in distance */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial color="#000" transparent opacity={0.6} />
            </mesh>
        </group>
    );
};

const RetroSun = () => {
    return (
        <mesh position={[0, 5, -25]}>
            <circleGeometry args={[10, 64]} />
            <meshBasicMaterial color="#ffaa00" fog={false} />
            {/* The sun is a flat object in the distance */}
        </mesh>
    );
};

const RetroHackerBackground = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                bgcolor: '#050014', // Deep synthwave night
                background: 'linear-gradient(180deg, #050014 0%, #1a0033 50%, #2d004d 100%)'
            }}
        >
            <Canvas 
                camera={{ position: [0, 2, 5], fov: 75 }} 
                gl={{ antialias: true }}
                style={{ width: '100%', height: '100%', display: 'block' }}
                eventSource={document.body}
            >
                <color attach="background" args={['#050014']} />
                <fog attach="fog" args={['#050014', 10, 40]} />
                
                <MovingGrid />
                <RetroSun />
                
                {/* Synthwave dust/stars */}
                <Sparkles count={500} scale={30} size={2} color="#03dac6" position={[0, 5, -10]} speed={0.2} opacity={0.5} />
                
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 10, -10]} intensity={2} color="#ff0266" />
            </Canvas>
        </Box>
    );
};

export default RetroHackerBackground;
