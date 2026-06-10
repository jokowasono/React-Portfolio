import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  pause?: number;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
}

export const Typewriter2 = ({
  text,
  speed = 100,
  delay = 0,
  pause = 2000,
  className = "",
  highlightWords = [],
  highlightClass = "text-blue-500 dark:text-cyan-400",
}: TypewriterProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isStarted, text, speed, pause]);

  const letterVariants: Variants = {
    initial: {
      opacity: 0,
      y: 15,
      filter: "blur(10px)"
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };

  return (
    <div className={`${className} inline-flex items-baseline flex-wrap!overflow-visible`}>
      <AnimatePresence mode="popLayout">
        {text.split("").slice(0, currentIndex).map((char, index) => {
          const isHighlighted = highlightWords.some(word => {
            const wordStart = text.indexOf(word);
            const wordEnd = wordStart + word.length;
            return index >= wordStart && index < wordEnd;
          });

          return (
            <motion.span
              key={`${char}-${index}`}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              className={`${char === " "? "whitespace-pre" : "inline-block"} ${
                isHighlighted? highlightClass : ""
              }`}
              style={{ willChange: "transform, opacity, filter" }}
            >
              {char}
            </motion.span>
          );
        })}
      </AnimatePresence>

      {/* FIX: tambahin nilai h- sama translate-y- */}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block w-3 h- bg-blue-500 dark:bg-cyan-400 translate-y-"
      />
    </div>
  );
};