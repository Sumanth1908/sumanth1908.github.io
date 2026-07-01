import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';
import { Group, Quaternion, Vector3 } from 'three';
import { latLngToVector3 } from './geo';
import { experiences } from '../../data/experience';
import GlobePins from './GlobePins';
import GlobeArcs from './GlobeArcs';

const RADIUS = 2;
const FACING = new Vector3(0.25, 0.15, 1).normalize();

interface SceneProps {
    activeIndex: number;
}

function GlobeScene({ activeIndex }: SceneProps) {
    const groupRef = useRef<Group>(null);

    const targetQuat = useMemo(() => {
        const exp = experiences[Math.min(activeIndex, experiences.length - 1)];
        const cityDir = latLngToVector3(exp.lat, exp.lng, 1).normalize();
        return new Quaternion().setFromUnitVectors(cityDir, FACING);
    }, [activeIndex]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.quaternion.slerp(targetQuat, 0.05);
        }
        // Gentle breathing tilt of the whole rig for life.
        state.camera.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
        state.camera.lookAt(0, 0, 0);
    });

    const activeCity = experiences[Math.min(activeIndex, experiences.length - 1)].city;

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1.4} color="#bb86fc" />
            <pointLight position={[-5, -3, 4]} intensity={0.8} color="#03dac6" />

            <Stars radius={50} depth={30} count={1500} factor={3} saturation={0} fade speed={0.5} />

            <group ref={groupRef}>
                {/* Solid core */}
                <mesh>
                    <sphereGeometry args={[RADIUS * 0.99, 48, 48]} />
                    <meshStandardMaterial color="#0a0a1a" emissive="#150a2e" emissiveIntensity={0.4} roughness={0.9} />
                </mesh>
                {/* Digital wireframe shell */}
                <mesh>
                    <sphereGeometry args={[RADIUS, 32, 32]} />
                    <meshBasicMaterial color="#03dac6" wireframe transparent opacity={0.18} />
                </mesh>
                {/* Latitude rings for an instrument look */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[RADIUS * 1.002, 0.004, 8, 100]} />
                    <meshBasicMaterial color="#bb86fc" transparent opacity={0.3} />
                </mesh>

                <Sparkles count={40} scale={RADIUS * 2.4} size={2} speed={0.3} color="#bb86fc" opacity={0.6} />

                <GlobeArcs radius={RADIUS} activeIndex={activeIndex} />
                <GlobePins radius={RADIUS} activeCity={activeCity} />
            </group>

            {/* Atmosphere glow */}
            <mesh>
                <sphereGeometry args={[RADIUS * 1.18, 48, 48]} />
                <meshBasicMaterial color="#bb86fc" transparent opacity={0.06} side={1} />
            </mesh>
        </>
    );
}

interface CareerGlobeProps {
    activeIndex: number;
}

export default function CareerGlobe({ activeIndex }: CareerGlobeProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ width: '100%', height: '100%' }}
        >
            <GlobeScene activeIndex={activeIndex} />
        </Canvas>
    );
}
