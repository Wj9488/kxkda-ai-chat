"use client";

import { motion } from "framer-motion";

const AnimatedHeader = () => {
  const mainHeaderAnimation = {
    initial: {
      y: 50,
      //   opacity: 0.5,
      // transform: "rotateX(-90deg)",
        rotate: "0.25deg"
      // perspective: "240px"
    },
    animate: {
      y: 0,
      //   opacity: 1,
      // perspective: "0px",
      // transform: "rotateX(-0deg)",
        rotate: "0deg",
      transition: {
        // ease: "linear",
        duration: 0.75,
      },
    },
  };

  return (
    <header className="flex items-center justify-center min-h-[85vh] lg:min-h-[82dvh] 2xl:min-h-[85dvh]">
      <div className="relative overflow-hidden block">
        <motion.h1
          variants={mainHeaderAnimation}
          animate="animate"
          initial="initial"
          className="xl:text-[16rem] lg:text-[10rem] text-8xl text-center leading-none"
        >
          KXKDA
        </motion.h1>
      </div>
    </header>
  );
};

export default AnimatedHeader;
