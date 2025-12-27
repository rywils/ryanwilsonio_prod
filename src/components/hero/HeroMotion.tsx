import { motion } from "framer-motion";

export type TechIconProps = {
  icon: string;
  color: string;
  x: number;
  y: number;
  delay: number;
};

export function TechIcon({
  icon,
  color,
  x,
  y,
  delay
}: TechIconProps) {
  return (
    /* CENTERING WRAPPER — NOT ANIMATED */
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
      }}
    >
      {/* ANIMATED ELEMENT — PIXELS ONLY */}
      <motion.div
        initial={{
          opacity: 0,
          x: 600,
          y: 0,
          scale: 15,
          rotate: 180
        }}
        animate={{
          opacity: 1,
          x,
          y,
          scale: 1,
          rotate: 0
        }}
        transition={{
          duration: 1.4,
          delay,
          ease: [0.4, -0.1, 0.8, 1]
        }}
        style={{
          filter: `drop-shadow(0 0 10px ${color})`
        }}
      >
        <motion.img
          src={`https://api.iconify.design/${icon}.svg`}
          alt={icon}
          width={36}
          height={36}
          decoding="sync"
          draggable={false}
          style={{
            display: "block",
            padding: 6,
            background: "rgba(0,0,0,0.7)",
            borderRadius: 8,
            border: `2px solid ${color}`
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}
