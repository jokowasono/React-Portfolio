import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  className?: string;
  lightColors?: string[];
  darkColors?: string[];
  colors?: string[];
  speed?: number;
}

export default function ShinyText2({ 
  text, 
  className = "", 
  // lightColors = ["#4d4d4d", "#B63E96", "#4d4d4d"],
  // darkColors = ["#6b6b6b", "#58E6D9", "#6b6b6b"],
  colors, 
  speed = 3 
}: ShinyTextProps) {

  const gradientColors = colors 
    ? `${colors[0]}, 45%, ${colors[1]}, 55%, ${colors[2]}`
    : null;

  return (
    <span
      style={{
        animationDuration: `${speed}s`,
        ...(gradientColors && { backgroundImage: `linear-gradient(110deg, ${gradientColors})` })
      }}
      className={cn(
        `
        inline-block
        font-bold
        bg-[length:200%_100%] 
        bg-clip-text 
        text-transparent 
        animate-shine
        `,
        !colors && [
          'bg-[linear-gradient(110deg,var(--shiny-light-1),45%,var(--shiny-light-2),55%,var(--shiny-light-1))]',
          'dark:bg-[linear-gradient(110deg,var(--shiny-dark-1),45%,var(--shiny-dark-2),55%,var(--shiny-dark-1))]'
        ],
        className
      )}
    >
      {text}
    </span>
  );
}