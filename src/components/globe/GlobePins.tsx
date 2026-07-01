import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import { latLngToVector3 } from './geo';
import { experiences } from '../../data/experience';

interface PinProps {
    position: [number, number, number];
    color: string;
    active: boolean;
}

function Pin({ position, color, active }: PinProps) {
    const haloRef = useRef<Mesh>(null);
    const coreRef = useRef<Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (haloRef.current) {
            const pulse = active ? 1 + Math.sin(t * 3) * 0.35 : 0.6;
            haloRef.current.scale.setScalar(pulse);
            const mat = haloRef.current.material as MeshBasicMaterial;
            mat.opacity = active ? 0.45 + Math.sin(t * 3) * 0.2 : 0.15;
        }
        if (coreRef.current) {
            const mat = coreRef.current.material as MeshStandardMaterial;
            mat.emissiveIntensity = active ? 2.5 + Math.sin(t * 3) * 1.2 : 0.8;
        }
    });

    return (
        <group position={position}>
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
            </mesh>
            <mesh ref={haloRef}>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

interface GlobePinsProps {
    radius: number;
    activeCity: string;
}

export default function GlobePins({ radius, activeCity }: GlobePinsProps) {
    // Cities repeat across roles (Hyderabad x3) — render one pin per unique location.
    const pins = useMemo(() => {
        const seen = new Map<string, { position: [number, number, number]; color: string; city: string }>();
        for (const exp of experiences) {
            if (!seen.has(exp.city)) {
                const v = latLngToVector3(exp.lat, exp.lng, radius * 1.01);
                seen.set(exp.city, { position: [v.x, v.y, v.z], color: exp.accent, city: exp.city });
            }
        }
        return Array.from(seen.values());
    }, [radius]);

    return (
        <>
            {pins.map((pin) => (
                <Pin key={pin.city} position={pin.position} color={pin.color} active={pin.city === activeCity} />
            ))}
        </>
    );
}
