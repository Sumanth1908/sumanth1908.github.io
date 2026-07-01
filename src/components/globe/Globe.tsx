import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { latLngToVector3 } from './geo';

export type GlobeMode = 'realistic' | 'hologram';

interface Props {
    radius?: number;
    mode?: GlobeMode;
}

// Digital-globe shader: separates land from ocean using the day texture so
// continents glow on a dark planet (a real "digital map" look, not a flat sphere).
const holoVertex = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const holoFragment = /* glsl */ `
uniform sampler2D map;
uniform vec3 landColor;
uniform vec3 oceanColor;
varying vec2 vUv;
void main() {
    vec3 c = texture2D(map, vUv).rgb;
    // Oceans are blue-dominant; land is red/green-dominant.
    float ocean = step(max(c.r, c.g), c.b);
    float land = 1.0 - ocean;
    vec3 col = mix(oceanColor, landColor, land);
    // Lift land brightness a touch with its own luminance for some relief.
    col += landColor * land * (c.r + c.g) * 0.25;
    gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * The planet surface. NOTE: this mesh must NOT self-rotate — it lives inside the
 * single rotating globeGroup in GlobeCanvas so pins/trails stay locked to the texture.
 */
export default function Globe({ radius = 1, mode = 'realistic' }: Props) {
    const cloudsRef = useRef<THREE.Mesh>(null);
    const { gl } = useThree();

    const [colorMap, cloudsMap] = useTexture([
        '/textures/earth_daymap.jpg',
        '/textures/earth_clouds.jpg',
    ]);

    // Sharpen textures for close-up viewing: max anisotropy + correct color space.
    useEffect(() => {
        const maxAniso = gl.capabilities.getMaxAnisotropy();
        [colorMap, cloudsMap].forEach((t) => {
            t.anisotropy = maxAniso; // sharper at oblique/zoomed angles
            t.colorSpace = THREE.SRGBColorSpace;
            t.needsUpdate = true;
        });
    }, [colorMap, cloudsMap, gl]);

    useFrame((_, delta) => {
        if (cloudsRef.current && mode === 'realistic') {
            cloudsRef.current.rotation.y += delta * 0.01;
        }
    });

    const holoUniforms = useMemo(
        () => ({
            map: { value: colorMap },
            landColor: { value: new THREE.Color('#3df0ff') },
            oceanColor: { value: new THREE.Color('#04141f') },
        }),
        [colorMap],
    );

    // Lat/long graticule — the "digital map" grid for hologram mode.
    const graticule = useMemo(() => {
        if (mode !== 'hologram') return null;
        const pts: THREE.Vector3[] = [];
        const r = radius * 1.005;
        const seg = 4;
        for (let lng = -180; lng < 180; lng += 20) {
            for (let lat = -88; lat < 88; lat += seg) {
                pts.push(latLngToVector3(lat, lng, r));
                pts.push(latLngToVector3(lat + seg, lng, r));
            }
        }
        for (let lat = -60; lat <= 60; lat += 20) {
            for (let lng = -180; lng < 180; lng += seg) {
                pts.push(latLngToVector3(lat, lng, r));
                pts.push(latLngToVector3(lat, lng + seg, r));
            }
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: '#4fd8ff', transparent: true, opacity: 0.5 });
        return new THREE.LineSegments(geo, mat);
    }, [mode, radius]);

    if (mode === 'hologram') {
        return (
            <group>
                {/* Digital earth: continents glow, oceans dark (custom shader) */}
                <mesh>
                    <sphereGeometry args={[radius, 96, 96]} />
                    <shaderMaterial
                        vertexShader={holoVertex}
                        fragmentShader={holoFragment}
                        uniforms={holoUniforms}
                        toneMapped={false}
                    />
                </mesh>

                {/* Bright lat/long grid — the defining "digital" element */}
                {graticule && <primitive object={graticule} />}
            </group>
        );
    }

    return (
        <group>
            {/* Base Earth */}
            <mesh>
                <sphereGeometry args={[radius, 96, 96]} />
                <meshStandardMaterial map={colorMap} roughness={0.85} metalness={0.1} />
            </mesh>

            {/* Cloud layer */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[radius * 1.012, 64, 64]} />
                <meshStandardMaterial
                    map={cloudsMap}
                    transparent
                    opacity={0.35}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}
