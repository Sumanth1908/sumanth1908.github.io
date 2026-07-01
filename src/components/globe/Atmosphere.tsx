import { useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec3 vNormal;
varying vec3 vPositionNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec3 glowColor;
uniform float coefficient;
uniform float power;
varying vec3 vNormal;
varying vec3 vPositionNormal;

void main() {
  float intensity = pow(coefficient - dot(vNormal, vec3(0, 0, 1.0)), power);
  gl_FragColor = vec4(glowColor, 1.0) * intensity;
}
`;

export default function Atmosphere({ radius = 1, color = '#3a7ebf' }: { radius?: number; color?: string }) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    return (
        <mesh>
            <sphereGeometry args={[radius * 1.15, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    glowColor: { value: new THREE.Color(color) },
                    coefficient: { value: 0.5 },
                    power: { value: 3.5 },
                }}
                transparent={true}
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide}
                depthWrite={false}
            />
        </mesh>
    );
}
