import WorldMap from "./world-map";
import { motion } from "framer-motion";

export function ImHere3() {
  return (
    <div className="flex justify-center items-center py-24">
      <div className="w-[300px] relative flex flex-col items-center">

        {/* Frame Bercahaya I'm Here */}
        <motion.div
          className="absolute z-20 font-sans"
          style={{ top: "-55px", left: "66%", transform: "translateX(-50%)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="
            px-3 py-1.5 rounded-xl whitespace-nowrap
            border border-sky-500/40
            bg-background/80 backdrop-blur-md
            shadow-[0_0_20px_rgba(14,165,233,0.3)]
            flex flex-col items-center
          ">
            <span className="text-[14px] tracking-[0.2em] font-bold text-sky-500">
              I'm here
            </span>
          </div>
        </motion.div>

        <WorldMap
          dots={[]}
          className="w-[300px] aspect-[2/1]"
        />

      </div>
    </div>
  );
}