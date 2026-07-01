import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { latLngToVector3 } from './geo';

interface Props {
    lat: number;
    lng: number;
    color: string;
    label: string;
    radius?: number;
    onClick?: () => void;
    active?: boolean;
}

export default function LocationPin({ lat, lng, color, label, radius = 1, onClick, active }: Props) {
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const pos = latLngToVector3(lat, lng, radius);
    const [hovered, setHovered] = useState(false);

    const surfacePos = pos.clone().normalize().multiplyScalar(radius + 0.005);

    // Only the ACTIVE pin pulses — keeps the map calm instead of every dot flashing.
    useFrame(({ clock }) => {
        if (glowRef.current && active) {
            const pulse = 1 + Math.sin(clock.getElapsedTime() * 2.5) * 0.35;
            glowRef.current.scale.setScalar(pulse);
        } else if (glowRef.current) {
            glowRef.current.scale.setScalar(1);
        }
    });

    return (
        <group
            ref={groupRef}
            position={surfacePos}
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Invisible enlarged hit target — keeps clicks reliable */}
            <mesh>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* Core dot — small for inactive, slightly larger for active */}
            <mesh>
                <sphereGeometry args={[active ? 0.022 : 0.013, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Glow — only meaningful on the active pin */}
            {active && (
                <mesh ref={glowRef}>
                    <sphereGeometry args={[0.035, 16, 16]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.45}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>
            )}

            {/* Active ring */}
            {active && (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.045, 0.055, 32]} />
                    <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
                </mesh>
            )}

            {/* Compact fixed-size hover label (no distanceFactor → no giant text) */}
            {hovered && (
                <Html position={[0, 0.06, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
                    <div style={{
                        background: 'rgba(8, 11, 22, 0.92)',
                        padding: '3px 8px',
                        borderRadius: '5px',
                        border: `1px solid ${color}`,
                        color: '#fff',
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '10px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        transform: 'translateY(-4px)',
                        userSelect: 'none',
                    }}>
                        {label}
                    </div>
                </Html>
            )}
        </group>
    );
}
