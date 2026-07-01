import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
    radius?: number;
}

export default function RealisticGlobe({ radius = 1 }: Props) {
    const earthRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    // Load textures (only daymap and clouds — normal/specular maps unavailable)
    const [colorMap, cloudsMap] = useTexture([
        '/textures/earth_daymap.jpg',
        '/textures/earth_clouds.jpg',
    ]);

    // Animate the globe and clouds
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (earthRef.current) {
            earthRef.current.rotation.y = t * 0.02; // Slow base rotation
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = t * 0.025; // Clouds move slightly faster
        }
    });

    return (
        <group>
            {/* Base Earth */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshStandardMaterial
                    map={colorMap}
                    roughness={0.7}
                    metalness={0.15}
                />
            </mesh>

            {/* Cloud Layer */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[radius * 1.01, 64, 64]} />
                <meshStandardMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}
