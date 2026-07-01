import { useState, type RefObject } from 'react';
import { useScroll, useMotionValueEvent, type MotionValue } from 'framer-motion';

interface CareerProgress {
    scrollYProgress: MotionValue<number>;
    activeIndex: number;
    progress: number;
}

/**
 * Maps scroll through the career-journey section to an active role index (0..count-1)
 * and a 0..1 overall progress value. Used to drive the globe + timeline + avatar in sync.
 */
export function useCareerProgress(
    ref: RefObject<HTMLElement | null>,
    count: number,
): CareerProgress {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end'],
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        setProgress(v);
        // Clamp so the final role stays active through the tail of the section.
        const idx = Math.min(count - 1, Math.max(0, Math.floor(v * count - 0.0001)));
        setActiveIndex(idx);
    });

    return { scrollYProgress, activeIndex, progress };
}
