import { useState, useEffect } from 'react';

/**
 * Custom hook to track the user's scroll position.
 * @returns {number} The current vertical scroll position (window.scrollY)
 */
export const useScrollPosition = (): number => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.scrollY);
        }

        window.addEventListener('scroll', updatePosition);
        updatePosition();

        return () => window.removeEventListener('scroll', updatePosition);
    }, []);

    return scrollPosition;
};
