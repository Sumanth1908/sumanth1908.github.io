import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { greatCircleArc } from './geo';

interface Props {
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
    color: string;
    radius?: number;
    progress?: number; // 0 to 1
}

export default function CareerTrail({ start, end, color, radius = 1, progress = 1 }: Props) {
    const points = useMemo(() => greatCircleArc(start, end, radius, 64), [start, end, radius]);

    // Build the three.js Line imperatively — rendering it via <primitive> avoids the
    // JSX collision between React's built-in SVG <line> and three's Line element.
    const lineObject = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity: 0.85,
        });
        return new THREE.Line(geometry, material);
    }, [points, color]);

    const objRef = useRef(lineObject);
    objRef.current = lineObject;

    useFrame(() => {
        const count = Math.floor(points.length * progress);
        objRef.current.geometry.setDrawRange(0, count);
    });

    return <primitive object={lineObject} />;
}
