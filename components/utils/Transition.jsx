"use client"

import {motion as anim, AnimatePresence} from "framer-motion"

import ScrollTop from "./ScrollTop";

const Transition = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <anim.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: [0, 0, 1], y: -5, rotate: 0 }}
        exit={{ opacity: 0, y: 0, rotate: -0 }}
        transition={{
          duration: .5,
          times: [0, 0.5, 1],
          delay: 0.05,
          ease: "easeInOut",
        }}
        className="overflow-hidden"
      >
        {children}
      </anim.div>
      <ScrollTop />
    </AnimatePresence>
  )
}

export default Transition;