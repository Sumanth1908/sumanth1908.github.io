import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import type { Vector3 } from 'three';
import { greatCircleArc } from './geo';
import { experiences } from '../../data/experience';

interface ArcProps {
    points: Vector3[];
    color: string;
    active: boolean;
}

// An arc that "draws" itself in when activated and retracts when not.
function Arc({ points, color, active }: ArcProps) {
    const reveal = useRef(0);
    const lastCount = useRef(0);
    const [shown, setShown] = useState<Vector3[]>([]);

    useFrame(() => {
        const target = active ? 1 : 0;
        reveal.current += (target - reveal.current) * 0.07;
        const count = reveal.current < 0.02 ? 0 : Math.max(2, Math.ceil(points.length * reveal.current));
        if (count !== lastCount.current) {
            lastCount.current = count;
            setShown(count === 0 ? [] : points.slice(0, count));
        }
    });

    if (shown.length < 2) return null;

    return (
        <Line
            points={shown}
            color={color}
            lineWidth={2.5}
            transparent
            opacity={0.85}
        />
    );
}

interface GlobeArcsProps {
    radius: number;
    activeIndex: number;
}

export default function GlobeArcs({ radius, activeIndex }: GlobeArcsProps) {
    // One arc between each consecutive role; skip zero-length (same-city) hops.
    const arcs = useMemo(() => {
        const result: { points: Vector3[]; color: string; index: number }[] = [];
        for (let i = 0; i < experiences.length - 1; i++) {
            const a = experiences[i];
            const b = experiences[i + 1];
            if (a.city === b.city) continue;
            const points = greatCircleArc(
                { lat: a.lat, lng: a.lng },
                { lat: b.lat, lng: b.lng },
                radius * 1.01,
            );
            result.push({ points, color: b.accent, index: i });
        }
        return result;
    }, [radius]);

    return (
        <>
            {arcs.map((arc) => (
                <Arc key={arc.index} points={arc.points} color={arc.color} active={activeIndex > arc.index} />
            ))}
        </>
    );
}
