import React, { useEffect, useState, useCallback, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const chars = "*?#&^"

interface ScrambleTextProps {
    text: string;
    className?: string;
    repeatDelay?: number; // delay between scrambles in ms
}

const ScrambleText2 = ({ text, className = "", repeatDelay = 2000 }: ScrambleTextProps) => {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false }); // allow repeat when it re-enters
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = useCallback(() => {
        // Clear any existing timers
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        let iteration = 0;
        intervalRef.current = setInterval(() => {
            setDisplayText(() =>
                text
                   .split("")
                   .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                   .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current!);
                // Wait 2s then scramble again
                timeoutRef.current = setTimeout(() => {
                    scramble();
                }, repeatDelay);
            }

            iteration += 1 / 2; // Character reveal speed
        }, 100); // Interval speed in ms
    }, [text, repeatDelay]);

    useEffect(() => {
        if (isInView) {
            scramble();
        } else {
            // Clean up when out of view
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setDisplayText(text);
        }

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isInView, scramble, text]);

    return (
        <motion.h1
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={isInView? { opacity: 1 } : { opacity: 0 }}
        >
            {displayText}
        </motion.h1>
    );
};

export default ScrambleText2;