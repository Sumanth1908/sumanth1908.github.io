import { useState } from 'react';
import { Box } from '@mui/material';
import GlobeCanvas from '../components/globe/GlobeCanvas';
import TimelineScrubber from '../components/timeline/TimelineScrubber';
import Navbar from '../components/Navbar';
import ZoomedExperience from '../components/avatar/ZoomedExperience';
import CinematicIntro from '../components/sections/CinematicIntro';
import { journey } from '../data/journey';
import type { GlobeMode } from '../components/globe/Globe';
import { AnimatePresence } from 'framer-motion';

export default function GlobePortfolio() {
    const [showIntro, setShowIntro] = useState(true);
    // Start on the present-day chapter (journey is sorted oldest → newest).
    const [activeChapterIndex, setActiveChapterIndex] = useState(journey.length - 1);
    const [isZoomed, setIsZoomed] = useState(false);
    const [globeMode, setGlobeMode] = useState<GlobeMode>('realistic');

    return (
        <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', bgcolor: '#05060d' }}>
            <AnimatePresence>
                {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}
            </AnimatePresence>

            {!showIntro && (
                <>
                    <Navbar mode={globeMode} onModeChange={setGlobeMode} />

                    <GlobeCanvas
                        journeyData={journey}
                        activeChapterIndex={activeChapterIndex}
                        onPinClick={setActiveChapterIndex}
                        mode={globeMode}
                        zoomed={isZoomed}
                    />

                    {!isZoomed && (
                        <TimelineScrubber
                            journeyData={journey}
                            activeIndex={activeChapterIndex}
                            onChange={setActiveChapterIndex}
                            onZoom={() => setIsZoomed(true)}
                        />
                    )}

                    <AnimatePresence>
                        {isZoomed && (
                            <ZoomedExperience
                                entry={journey[activeChapterIndex]}
                                onClose={() => setIsZoomed(false)}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}
        </Box>
    );
}
