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
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
      }}
    >
      <motion.div
        initial={{
          opacity: 1,
          x: 400,  
          y: y + 100
        }}
        animate={{
          opacity: 1,
          x,
          y
        }}
        transition={{
          duration: 3.0,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <motion.img
          src={`https://api.iconify.design/${icon}.svg`}
          alt=""
          width={36}
          height={36}
          decoding="async"
          draggable={false}
          style={{
            display: "block",
            padding: 6,
            background: "rgba(10, 10, 10, 0.65)",
            borderRadius: 8,
            border: `1.5px solid ${color}`,
            boxShadow: `0 0 10px ${color}33`
          }}
          animate={{ y: [0, -5, 0] }}
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