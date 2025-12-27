import { motion } from "framer-motion";

export default function HeroLampMotion() {
  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
      <div className="relative w-full flex justify-center">
        {/* BEAM LINE */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          style={{
            transformOrigin: "center",
            marginTop: 20,
            height: 2,
            width: "70%",
            borderRadius: 999,
            background:
              "linear-gradient(90deg,#F88F3A,#DB9350,#A29A80,#5AA3BD,#49A5CA,#1DAAF0,#5778FE,#646EFF,#8C53FF,#B734FF,#D722CC,#EF11A0,#FD2972,#F96D4C,#F88F3A)",
            boxShadow:
              "0 0 25px rgba(248,143,58,.7), 0 0 25px rgba(100,110,255,.55), 0 0 25px rgba(253,41,114,.55)",
          }}
        />

        {/* DOWN GLOW */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.35 }}
          style={{
            position: "absolute",
            top: 22,
            width: "66%",
            height: 240,
            transformOrigin: "top",
            background:
              "linear-gradient(180deg, rgba(248,143,58,0.45) 0%, rgba(100,110,255,0.25) 45%, rgba(253,41,114,0.12) 75%, transparent 100%)",
            filter: "blur(60px)",
          }}
        />
      </div>
    </div>
  );
}
