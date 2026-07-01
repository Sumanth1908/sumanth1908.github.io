import { Vector3 } from 'three';

/**
 * Convert latitude/longitude (degrees) to a 3D point on a sphere of the given radius.
 * Uses the standard geographic convention so longitude 0 / lat 0 faces +Z.
 */
export function latLngToVector3(lat: number, lng: number, radius: number): Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new Vector3(x, y, z);
}

/**
 * Generate points along a great-circle-ish arc between two lat/lng points.
 * The arc bows outward from the sphere surface (peak height scales with distance)
 * so trails read as travel paths rather than chords through the planet.
 */
export function greatCircleArc(
    from: { lat: number; lng: number },
    to: { lat: number; lng: number },
    radius: number,
    segments = 64,
): Vector3[] {
    const start = latLngToVector3(from.lat, from.lng, radius);
    const end = latLngToVector3(to.lat, to.lng, radius);
    const angle = start.angleTo(end);
    // Lift the midpoint proportionally to how far apart the points are.
    const lift = 1 + Math.min(angle, Math.PI) * 0.4;

    const points: Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        // Spherical interpolation between the two surface points.
        const point = new Vector3().copy(start).lerp(end, t);
        if (start.angleTo(end) > 0.0001) {
            // Slerp for a smoother curve along the surface.
            const sinAngle = Math.sin(angle);
            if (sinAngle > 0.0001) {
                const a = Math.sin((1 - t) * angle) / sinAngle;
                const b = Math.sin(t * angle) / sinAngle;
                point.copy(start).multiplyScalar(a).add(end.clone().multiplyScalar(b));
            }
        }
        // Bow the arc outward: highest at the midpoint.
        const heightFactor = Math.sin(t * Math.PI) * (lift - 1);
        point.multiplyScalar(1 + heightFactor);
        points.push(point);
    }
    return points;
}
