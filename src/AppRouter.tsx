import { Routes, Route } from 'react-router-dom';
import GlobePortfolio from './pages/GlobePortfolio';
import LegacyHome from './pages/LegacyHome';
import Vfx from './pages/Vfx';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<GlobePortfolio />} />
            {/* Backups of earlier designs, kept reachable but out of the main flow. */}
            <Route path="/legacy" element={<LegacyHome />} />
            <Route path="/vfx" element={<Vfx />} />
        </Routes>
    );
}
