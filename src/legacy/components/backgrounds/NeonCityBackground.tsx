import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box } from '@mui/material';
import { Group, Timer, PCFShadowMap, Vector3, MeshStandardMaterial } from 'three';

const count = 150;

// Component to handle individual drones/traffic
const DroneTraffic = ({ timer }: { timer: Timer }) => {
    const dronesCount = 20;
    const droneRefs = useRef<Group[]>([]);

    const drones = useMemo(() => Array.from({ length: dronesCount }).map(() => ({
        // eslint-disable-next-line react-hooks/purity
        speed: Math.random() * 0.1 + 0.05,
        // eslint-disable-next-line react-hooks/purity
        offset: Math.random() * 100,
        // eslint-disable-next-line react-hooks/purity
        lane: (Math.random() - 0.5) * 40,
        // eslint-disable-next-line react-hooks/purity
        axis: Math.random() > 0.5 ? 'x' : 'z' as 'x' | 'z',
        // eslint-disable-next-line react-hooks/purity
        color: Math.random() > 0.5 ? '#03dac6' : '#ff0266'
    })), []);

    useFrame(() => {
        const time = timer.getElapsed();
        droneRefs.current.forEach((drone, i) => {
            if (!drone) return;
            const config = drones[i];
            const travel = ((time * 15 * config.speed + config.offset) % 40) - 20;
            
            if (config.axis === 'x') {
                drone.position.set(travel, -1.8, config.lane);
                drone.rotation.y = Math.PI / 2;
            } else {
                drone.position.set(config.lane, -1.8, travel);
                drone.rotation.y = 0;
            }
        });
    });

    return (
        <group>
            {drones.map((d, i) => (
                <group key={i} ref={(el) => { if (el) droneRefs.current[i] = el; }}>
                    <mesh>
                        <boxGeometry args={[0.2, 0.1, 0.5]} />
                        <meshStandardMaterial 
                            color={d.color} 
                            emissive={d.color}
                            emissiveIntensity={5}
                        />
                    </mesh>
                    <pointLight distance={2} intensity={2} color={d.color} />
                </group>
            ))}
        </group>
    );
};

const CityBlocks = () => {
    const groupRef = useRef<Group>(null);
    const { mouse } = useThree();
    const timer = useMemo(() => new Timer(), []);
    
    // Create random building heights and positions
    const buildings = useMemo(() => Array.from({ length: count }).map(() => {
        // eslint-disable-next-line react-hooks/purity
        const height = Math.random() * 5 + 1;
        // eslint-disable-next-line react-hooks/purity
        const x = (Math.random() - 0.5) * 40;
        // eslint-disable-next-line react-hooks/purity
        const z = (Math.random() - 0.5) * 40;
        
        // eslint-disable-next-line react-hooks/purity
        const color = Math.random() > 0.8 ? '#03dac6' : '#1a0033';
        // eslint-disable-next-line react-hooks/purity
        const emissive = Math.random() > 0.9 ? '#ff0266' : '#000000';

        // Keep center somewhat clear
        if (Math.abs(x) < 5 && Math.abs(z) < 5) return null;
        return { 
            position: [x, height / 2 - 2, z] as [number, number, number], 
            height,
            color,
            emissive
        };
    }).filter(Boolean), []);

    const meshRefs = useRef<(MeshStandardMaterial | null)[]>([]);

    useFrame((state) => {
        timer.update();
        const time = timer.getElapsed();

        if (groupRef.current) {
            // Slow continuous rotation
            const baseRotation = time * 0.05;
            // Mouse interactive tilt/rotation
            groupRef.current.rotation.y = baseRotation + mouse.x * 0.1;
            groupRef.current.rotation.x = mouse.y * 0.1;
        }

        // Pulse the emissive lights
        meshRefs.current.forEach((mat) => {
            if (mat && mat.emissive.getHex() !== 0x000000) {
                mat.emissiveIntensity = 2 + Math.sin(time * 3) * 1.5;
            }
        });

        // Parallax camera movement
        state.camera.position.lerp(new Vector3(15 + mouse.x * 5, 15 + mouse.y * 5, 15), 0.05);
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group ref={groupRef}>
            {buildings.map((b, i) => b && (
                <mesh key={i} position={b.position} castShadow receiveShadow>
                    <boxGeometry args={[1.5, b.height, 1.5]} />
                    <meshStandardMaterial 
                        ref={(el) => { meshRefs.current[i] = el; }}
                        color={b.color} 
                        emissive={b.emissive}
                        emissiveIntensity={2}
                        roughness={0.1}
                        metalness={0.9}
                    />
                </mesh>
            ))}
            
            <DroneTraffic timer={timer} />
            
            {/* Base Grid Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#0a001a" roughness={0.05} metalness={0.9} />
            </mesh>
            <gridHelper args={[100, 50, '#ff0266', '#4a0072']} position={[0, -1.99, 0]} />
        </group>
    );
};

const NeonCityBackground = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                bgcolor: '#0a001a',
                background: 'linear-gradient(180deg, #ff0266 0%, #bb86fc 30%, #0a001a 100%)'
            }}
        >
            <Canvas
                shadows={{ type: PCFShadowMap }}
                camera={{ position: [15, 15, 15], fov: 45 }}
                style={{ width: '100%', height: '100%', display: 'block' }}
                gl={{ antialias: true, alpha: true }}
                eventSource={document.body}
            >
                <fog attach="fog" args={['#bb86fc', 10, 60]} />
                
                <ambientLight intensity={0.4} color="#bb86fc" />
                <directionalLight 
                    position={[10, 20, 5]} 
                    intensity={2.5} 
                    color="#03dac6" 
                    castShadow 
                    shadow-mapSize={[1024, 1024]} 
                />
                <pointLight position={[-10, 10, -10]} intensity={1.5} color="#ff0266" />
                
                <CityBlocks />
            </Canvas>
        </Box>
    );
};

export default NeonCityBackground;
