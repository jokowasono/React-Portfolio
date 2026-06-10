import { motion } from 'framer-motion';
import { SiHtml5, SiTailwindcss, SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si';
import { useEffect, useState } from 'react';

const MotionLogo = ({ size = 30, color = "#FACC15" }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 80L27 35H42L25 80H10Z" fill={color} />
        <path d="M31 80L48 35H63L46 80H31Z" fill={color} />
        <path d="M52 80L69 35H84L67 80H52Z" fill={color} />
        <circle cx="88" cy="42" r="8" fill={color} />
    </svg>
);

const DualOrbit = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // ✅ Scale responsif: mobile 0.6, desktop 1.2
    const scale = isMobile? 0.55 : 1.2;
    const orbitGap = isMobile? 30 : 50;

    // ✅ Ball size responsif
    const ballWidth = isMobile? 50 : 70;
    const ballHeight = isMobile? 35 : 50;
    const iconSize = isMobile? 18 : 25;

    const orbit1Icons = [
        { Icon: SiHtml5, color: "#E34F26", label: "HTML" },
        { Icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS" },
        { Icon: SiNextdotjs, color: "#FFFFFF", label: "Next.js" },
    ];

    const orbit2Icons = [
        { Icon: SiReact, color: "#61DAFB", label: "React" },
        { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
        { Icon: MotionLogo, color: "#FACC15", label: "Motion" },
    ];

    const radius1X = (176 + orbitGap) * scale;
    const radius1Y = (112 + orbitGap) * scale;
    const duration1 = 20;

    const radius2X = 120 * scale;
    const radius2Y = 76 * scale;
    const duration2 = 15;

    const maxRadiusX = Math.max(radius1X, radius2X);
    const maxRadiusY = Math.max(radius1Y, radius2Y);
    const containerPadding = isMobile? 40 : 100;

    // ✅ Bola pusat responsif
    const centerWidth = isMobile? 70 : 120;
    const centerHeight = isMobile? 55 : 90;
    const centerFontSize = isMobile? 7 : 10;

    return (
        <div
            className="relative flex items-center justify-center w-full dark:bg-dark/5 bg-light/5 overflow-visible" // ← ganti overflow-hidden
            style={{ minHeight: (maxRadiusY + containerPadding) * 2 }}
        >
            <div
                className="relative flex items-center justify-center"
                style={{
                    width: (maxRadiusX + containerPadding) * 2,
                    height: (maxRadiusY + containerPadding) * 2
                }}
            >
                {/* Visual Panduan Orbit 1 */}
                <div
                    className="absolute border dark:border-white/20 border-dark/30 rounded-[50%]"
                    style={{ width: radius1X * 2, height: radius1Y * 2 }}
                />

                {/* Visual Panduan Orbit 2 */}
                <div
                    className="absolute border dark:border-white/20 border-dark/30 rounded-[50%]"
                    style={{ width: radius2X * 2, height: radius2Y * 2 }}
                />

                {/* Bola Pusat */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-900 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.3)]"
                    style={{
                        width: centerWidth,
                        height: centerHeight,
                        borderRadius: "50%"
                    }}
                >
                    <span
                        className="text-white font-extrabold text-center tracking-widest leading-tight"
                        style={{ fontSize: centerFontSize }}
                    >
                        WEB<br />DEVELOPMENT
                    </span>
                </motion.div>

                {/* Orbit 1 */}
                {orbit1Icons.map((item, index) => {
                    const startAngle = (index / orbit1Icons.length) * (2 * Math.PI);

                    return (
                        <motion.div
                            key={`orbit1-${index}`}
                            className="absolute flex flex-col items-center gap-1 md:gap-2"
                            animate={{
                                x: Array.from({ length: 61 }, (_, i) =>
                                    Math.cos(startAngle + (i / 60) * 2 * Math.PI) * radius1X
                                ),
                                y: Array.from({ length: 61 }, (_, i) =>
                                    Math.sin(startAngle + (i / 60) * 2 * Math.PI) * radius1Y
                                ),
                            }}
                            transition={{
                                duration: duration1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <div
                                className="bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center"
                                style={{
                                    width: ballWidth,
                                    height: ballHeight,
                                    borderRadius: "50%"
                                }}
                            >
                                <item.Icon size={iconSize} color={item.color} />
                            </div>

                            <div
                                className="bg-black/60 border border-white/10 backdrop-blur-sm shadow-lg flex items-center justify-center px-2"
                                style={{
                                    width: ballWidth + 10,
                                    height: isMobile? 18 : 24,
                                    borderRadius: "50%"
                                }}
                            >
                                <span
                                    className="text-white font-bold whitespace-nowrap tracking-tighter"
                                    style={{ fontSize: isMobile? 8 : 10 }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Orbit 2 */}
                {orbit2Icons.map((item, index) => {
                    const startAngle = (index / orbit2Icons.length) * (2 * Math.PI);

                    return (
                        <motion.div
                            key={`orbit2-${index}`}
                            className="absolute flex flex-col items-center gap-1 md:gap-2"
                            animate={{
                                x: Array.from({ length: 61 }, (_, i) =>
                                    Math.cos(startAngle - (i / 60) * 2 * Math.PI) * radius2X
                                ),
                                y: Array.from({ length: 61 }, (_, i) =>
                                    Math.sin(startAngle - (i / 60) * 2 * Math.PI) * radius2Y
                                ),
                            }}
                            transition={{
                                duration: duration2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <div
                                className="bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center"
                                style={{
                                    width: ballWidth,
                                    height: ballHeight,
                                    borderRadius: "50%"
                                }}
                            >
                                <item.Icon size={iconSize} color={item.color} />
                            </div>

                            <div
                                className="bg-black/60 border border-white/10 backdrop-blur-sm shadow-lg flex items-center justify-center px-2"
                                style={{
                                    width: ballWidth + 10,
                                    height: isMobile? 18 : 24,
                                    borderRadius: "50%"
                                }}
                            >
                                <span
                                    className="text-white font-bold whitespace-nowrap tracking-tighter"
                                    style={{ fontSize: isMobile? 8 : 10 }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}

            </div>
        </div>
    );
};

export default DualOrbit;