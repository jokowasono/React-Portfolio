import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextSlideIn2Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextSlideIn2({ 
  text, 
  className, 
  delay = 0 
}: TextSlideIn2Props) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className={cn("flex flex-wrap justify-center", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          className="mr-3 inline-block"
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}