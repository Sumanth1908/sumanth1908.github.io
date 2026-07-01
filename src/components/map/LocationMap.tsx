import { useEffect, useRef } from 'react';
import maplibregl, { type StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface Props {
    lat: number;
    lng: number;
    color?: string;
    label?: string;
}

// Free, key-less satellite imagery (Esri World Imagery) + a place/boundary label
// overlay so it reads like a Google-Maps satellite view. Attribution is required.
const SATELLITE_STYLE: StyleSpecification = {
    version: 8,
    sources: {
        satellite: {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            attribution: 'Imagery © Esri, Maxar, Earthstar Geographics, and the GIS User Community',
        },
        places: {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
        },
    },
    layers: [
        { id: 'satellite', type: 'raster', source: 'satellite' },
        { id: 'places', type: 'raster', source: 'places', paint: { 'raster-opacity': 0.85 } },
    ],
};

export default function LocationMap({ lat, lng, color = '#38bdf8', label }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: SATELLITE_STYLE,
            center: [lng, lat],
            zoom: 3,
            attributionControl: { compact: true },
        });

        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

        // Glowing marker in the chapter accent color.
        const el = document.createElement('div');
        el.style.cssText = `width:16px;height:16px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 0 4px ${color}55, 0 0 14px ${color};`;
        const marker = new maplibregl.Marker({ element: el }).setLngLat([lng, lat]);
        if (label) {
            marker.setPopup(new maplibregl.Popup({ offset: 18, closeButton: false }).setText(label));
        }
        marker.addTo(map);

        // Cinematic descent from orbit to city level once tiles are ready.
        map.once('load', () => {
            map.resize(); // guard against 0-size container at mount
            map.flyTo({ center: [lng, lat], zoom: 11, speed: 0.7, curve: 1.6, essential: true });
        });

        return () => map.remove();
    }, [lat, lng, color, label]);

    return <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />;
}
