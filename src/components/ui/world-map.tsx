import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

interface MapDot {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
}

interface WorldMapProps {
  dots?: MapDot[];
  lineColor?: string;
  className?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  className = ""
}: WorldMapProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;
  const warnaDaratan = currentTheme === "dark" ? "#A1A1AA" : "#27272A";

  const map = new DottedMap({ height: 60, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.4,
    color: warnaDaratan,
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const rippleConfigs = [
    { rxMax: 140, ryMax: 35, begin: "0s", opacityStart: 0.35 },
    { rxMax: 100, ryMax: 25, begin: "1s", opacityStart: 0.3 },
    { rxMax: 60, ryMax: 15, begin: "2s", opacityStart: 0.25 },
  ];

  if (!mounted) return <div className="w-full aspect-[2/1] bg-transparent" />;

  return (
    <div
      key={currentTheme}
      className={`relative font-sans overflow-visible transition-colors duration-500 z-0 ${className}`}
    >
      <div
        className="h-full w-full pointer-events-none select-none opacity-100"
        dangerouslySetInnerHTML={{ __html: svgMap }}
      />

      <svg
        viewBox="0 0 800 400"
        style={{ overflow: 'visible' }}
        className="w-full h-full absolute inset-0 pointer-events-none select-none overflow-visible"
      >
        {(() => {
          const basePoint = projectPoint(-6.2088, 106.8456);

          const horizontalShift = 20;
          const adjustedX = basePoint.x + horizontalShift;

          const extraLengthDown = 50;
          const adjustedYStart = basePoint.y + extraLengthDown;

          const targetY = -145;

          return (
            <g key="jakarta-marker">
              <motion.line
                x1={adjustedX}
                y1={adjustedYStart}
                x2={adjustedX}
                y2={targetY}
                stroke={lineColor}
                strokeWidth="3"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {rippleConfigs.map((cfg, i) => (
                <ellipse
                  key={i}
                  cx={adjustedX}
                  cy={adjustedYStart}
                  rx="3"
                  ry="3"
                  fill={lineColor}
                  opacity={cfg.opacityStart}
                >
                  <animate
                    attributeName="rx"
                    from="3"
                    to={cfg.rxMax}
                    dur="3s"
                    begin={cfg.begin}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="ry"
                    from="3"
                    to={cfg.ryMax}
                    dur="3s"
                    begin={cfg.begin}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from={cfg.opacityStart}
                    to="0"
                    dur="3s"
                    begin={cfg.begin}
                    repeatCount="indefinite"
                  />
                </ellipse>
              ))}

              <circle
                cx={adjustedX}
                cy={adjustedYStart}
                r="2"
                fill={lineColor}
                style={{ filter: `drop-shadow(0 0 5px ${lineColor})` }}
              />
            </g>
          );
        })()}
      </svg>
    </div>
  );
}