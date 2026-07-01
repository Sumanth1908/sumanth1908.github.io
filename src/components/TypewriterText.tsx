import { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    delay?: number;
    speed?: number;
}

// Types a string in one character at a time. Shared by the VFX page and the portfolio.
const TypewriterText = ({ text, delay = 0, speed = 50 }: TypewriterTextProps) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        setDisplayText('');
        let i = 0;
        let interval: ReturnType<typeof setInterval>;
        const timer = setTimeout(() => {
            interval = setInterval(() => {
                i++;
                setDisplayText(text.substring(0, i));
                if (i >= text.length) clearInterval(interval);
            }, speed);
        }, delay);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [text, delay, speed]);

    return <span>{displayText}</span>;
};

export default TypewriterText;
