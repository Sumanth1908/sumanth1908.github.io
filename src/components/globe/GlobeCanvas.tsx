import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Globe, { type GlobeMode } from './Globe';
import Atmosphere from './Atmosphere';
import LocationPin from './LocationPin';
import CareerTrail from './CareerTrail';
import { latLngToVector3 } from './geo';
import type { JourneyEntry } from '../../data/journey';

interface Props {
    journeyData: JourneyEntry[];
    activeChapterIndex: number;
    onPinClick: (index: number) => void;
    mode?: GlobeMode;
    zoomed?: boolean;
}

const RADIUS = 1;
const TWO_PI = Math.PI * 2;

// ── Tunables ────────────────────────────────────────────────────────────────
/** Fixed axial tilt (radians) — the globe's single, constant rotation axis. */
const AXIS_TILT_X = -0.2;
/** Full revolutions per year of difference between chapters. */
const TURNS_PER_YEAR = 1;
/** Seconds per full revolution while animating. */
const SECONDS_PER_TURN = 0.5;
const MAX_SPIN_DURATION = 3.0;
const MIN_SPIN_DURATION = 0.9;
/** Camera distances for the fly-to-location arc. */
const REST_DIST = 1.9;  // settled / landed framing
const FAR_DIST = 3.3;   // pulled back to show the spin
// ─────────────────────────────────────────────────────────────────────────────

const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Rotation.y (inner spin frame) that brings a location to face the camera. */
function alignedY(lat: number, lng: number) {
    const p = latLngToVector3(lat, lng, RADIUS);
    return -Math.atan2(p.x, p.z);
}

/** World-space direction the active location settles to (after spin + fixed tilt). */
function locationViewDir(lat: number) {
    const r = THREE.MathUtils.degToRad(lat);
    return new THREE.Vector3(0, Math.sin(r), Math.cos(r))
        .applyAxisAngle(new THREE.Vector3(1, 0, 0), AXIS_TILT_X)
        .normalize();
}

/**
 * Drives BOTH the globe spin and a Google-Earth-style camera fly:
 *  - rotates the globe ~N full turns (N = Δyears), direction by sign, landing aligned;
 *  - simultaneously pulls the camera back to show the spin, then descends onto the
 *    settled location (centered), sharing one eased progress value.
 */
function FlyController({
    spinRef,
    controlsRef,
    targetLat,
    targetLng,
    activeYear,
    activeIndex,
}: {
    spinRef: React.RefObject<THREE.Group | null>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    controlsRef: React.RefObject<any>;
    targetLat: number;
    targetLng: number;
    activeYear: number;
    activeIndex: number;
}) {
    const { camera } = useThree();
    const req = useRef({ index: activeIndex, year: activeYear, lat: targetLat, lng: targetLng });
    req.current = { index: activeIndex, year: activeYear, lat: targetLat, lng: targetLng };

    const anim = useRef({
        index: -1, start: 0, end: 0, p: 1, dur: 1, lastYear: activeYear, started: false,
        camStartDir: new THREE.Vector3(0, 0, 1), camStartDist: REST_DIST,
    });

    useFrame((_, delta) => {
        const g = spinRef.current;
        if (!g) return;
        const a = anim.current;
        const r = req.current;

        if (a.index !== r.index) {
            const base = alignedY(r.lat, r.lng);
            const dir = locationViewDir(r.lat);
            if (!a.started) {
                // First mount: snap globe + camera onto the starting location, no fly.
                g.rotation.y = base;
                camera.position.copy(dir).multiplyScalar(REST_DIST);
                if (controlsRef.current) { controlsRef.current.target.set(0, 0, 0); controlsRef.current.update(); }
                anim.current = { ...a, index: r.index, start: base, end: base, p: 1, dur: 1, lastYear: r.year, started: true };
            } else {
                const cur = g.rotation.y;
                const sign = Math.sign(r.year - a.lastYear) || 1;
                const turns = Math.abs(r.year - a.lastYear) * TURNS_PER_YEAR;
                const endApprox = cur + sign * turns * TWO_PI;
                let k = base - endApprox;
                k = ((k + Math.PI) % TWO_PI + TWO_PI) % TWO_PI - Math.PI;
                const end = endApprox + k;
                const dur = Math.min(MAX_SPIN_DURATION, Math.max(MIN_SPIN_DURATION, (Math.abs(end - cur) / TWO_PI) * SECONDS_PER_TURN));
                anim.current = {
                    index: r.index, start: cur, end, p: 0, dur, lastYear: r.year, started: true,
                    camStartDir: camera.position.clone().normalize(),
                    camStartDist: camera.position.length(),
                };
            }
        }

        const a2 = anim.current;
        if (a2.p < 1) {
            a2.p = Math.min(1, a2.p + delta / a2.dur);
            const e = easeInOutCubic(a2.p);

            // Globe rotation
            g.rotation.y = a2.start + (a2.end - a2.start) * e;

            // Camera fly: aim toward the settled location while dollying out → in.
            const dir = a2.camStartDir.clone().lerp(locationViewDir(r.lat), e).normalize();
            let dist: number;
            if (a2.p < 0.45) {
                dist = THREE.MathUtils.lerp(a2.camStartDist, FAR_DIST, easeOutCubic(a2.p / 0.45));
            } else {
                dist = THREE.MathUtils.lerp(FAR_DIST, REST_DIST, easeInOutCubic((a2.p - 0.45) / 0.55));
            }
            camera.position.copy(dir).multiplyScalar(dist);
            if (controlsRef.current) { controlsRef.current.target.set(0, 0, 0); controlsRef.current.update(); }
        } else {
            g.rotation.y = a2.end;
            // Idle: hand the camera back to OrbitControls (no override).
        }
    });

    return null;
}

export default function GlobeCanvas({ journeyData, activeChapterIndex, onPinClick, mode = 'realistic', zoomed = false }: Props) {
    const spinRef = useRef<THREE.Group>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controlsRef = useRef<any>(null);
    const isHologram = mode === 'hologram';

    // Fan out pins sharing identical coordinates (multiple Hyderabad roles).
    const coords = useMemo(() => {
        const groups: Record<string, number[]> = {};
        journeyData.forEach((e, i) => {
            const key = `${e.lat.toFixed(2)},${e.lng.toFixed(2)}`;
            (groups[key] ??= []).push(i);
        });
        const out = journeyData.map((e) => ({ lat: e.lat, lng: e.lng }));
        Object.values(groups).forEach((idxs) => {
            if (idxs.length > 1) {
                idxs.forEach((idx, n) => {
                    const ang = (n / idxs.length) * TWO_PI;
                    const spread = 2.4;
                    out[idx] = {
                        lat: journeyData[idx].lat + Math.sin(ang) * spread,
                        lng: journeyData[idx].lng + Math.cos(ang) * spread,
                    };
                });
            }
        });
        return out;
    }, [journeyData]);

    const active = coords[activeChapterIndex] ?? coords[0];
    const activeYear = journeyData[activeChapterIndex]?.startYear ?? 0;

    return (
        <Canvas camera={{ position: [0, 0.9, 1.7], fov: 45 }} frameloop="always">
            <color attach="background" args={['#05060d']} />
            <ambientLight intensity={isHologram ? 0.9 : 0.35} />
            <directionalLight position={[5, 3, 5]} intensity={1.4} color="#ffffff" />
            <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#4f8aff" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={!zoomed}
                minDistance={1.4}
                maxDistance={5}
                rotateSpeed={0.5}
            />

            <FlyController
                spinRef={spinRef}
                controlsRef={controlsRef}
                targetLat={active.lat}
                targetLng={active.lng}
                activeYear={activeYear}
                activeIndex={activeChapterIndex}
            />

            {/* Static atmosphere halo (view-space glow) */}
            <Atmosphere radius={RADIUS} color={isHologram ? '#38bdf8' : '#3a7ebf'} />

            {/* Outer group = the single FIXED axis. Inner group spins around it. */}
            <group rotation={[AXIS_TILT_X, 0, 0]}>
                <group ref={spinRef}>
                    <Globe radius={RADIUS} mode={mode} />

                    {journeyData.map((entry, idx) => (
                        <LocationPin
                            key={entry.id}
                            lat={coords[idx].lat}
                            lng={coords[idx].lng}
                            color={entry.color}
                            label={entry.title}
                            radius={RADIUS}
                            active={idx === activeChapterIndex}
                            onClick={() => onPinClick(idx)}
                        />
                    ))}

                    {journeyData.map((entry, idx) => {
                        if (idx === 0) return null;
                        const progress = activeChapterIndex >= idx ? 1 : 0;
                        return (
                            <CareerTrail
                                key={`trail-${idx}`}
                                start={coords[idx - 1]}
                                end={coords[idx]}
                                color={entry.color}
                                radius={RADIUS}
                                progress={progress}
                            />
                        );
                    })}
                </group>
            </group>
        </Canvas>
    );
}
