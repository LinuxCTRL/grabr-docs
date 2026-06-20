"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  yOffset?: number;
}

export function FadeIn({ children, delay = 0, yOffset = 20, className, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
