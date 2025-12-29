import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const GRAD_H = `linear-gradient(90deg,
  hsl(27deg 93% 60%) 0%,
  hsl(200deg 100% 52%) 25%,
  hsl(280deg 100% 60%) 50%,
  hsl(330deg 100% 52%) 75%,
  hsl(27deg 93% 60%) 100%
)`;

const GRAD_V = `linear-gradient(180deg,
  hsl(27deg 93% 60%) 0%,
  hsl(200deg 100% 52%) 25%,
  hsl(280deg 100% 60%) 50%,
  hsl(330deg 100% 52%) 75%,
  hsl(27deg 93% 60%) 100%
)`;

export default function GlowCardMotion({
  children,
  className = "",
}: Props) {
  return (
 <div 
  className={`relative isolate ${className}`}
  style={{
    transform: "translateZ(0)",
    willChange: "opacity, transform"
  }}
>
      {/* OUTER SOFT GLOW (ONLY BLUR LAYER — KEEP JUST ONE) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: 12,
          background: GRAD_H,
          filter: "blur(22px)",
          zIndex: -2,
          pointerEvents: "none",
        }}
      />

      {/* BORDER WRAPPER */}
      <div
        className="relative rounded-xl"
        style={{
          padding: 1,
          borderRadius: 12,
          background: "transparent",
        }}
      >
        {/* BORDER REVEAL (NO CLIP-PATH, NO BLUR) */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.15 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {/* TOP */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 1,
              transformOrigin: "center",
              background: GRAD_H,
            }}
          />

          {/* BOTTOM */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 1,
              transformOrigin: "center",
              background: GRAD_H,
            }}
          />

          {/* LEFT */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.35 }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 1,
              transformOrigin: "center",
              background: GRAD_V,
            }}
          />

          {/* RIGHT */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.35 }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: 1,
              transformOrigin: "center",
              background: GRAD_V,
            }}
          />
        </motion.div>

        {/* INNER CARD PANEL (THIS STOPS THE “GLOW GLOB”) */}
        <div
          className="relative rounded-xl"
          style={{
            borderRadius: 12,
            background: "linear-gradient(135deg, #1e1e24 10%, #050505 60%)",
            zIndex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
