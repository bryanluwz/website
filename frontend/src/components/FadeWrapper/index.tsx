import React from "react";
import { motion, useInView } from "framer-motion";

interface FadeWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export const FadeWrapper: React.FC<FadeWrapperProps> = ({
  children,
  delay = 0,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }} // initial opacity (before the fade) and start from slightly above
      animate={isInView ? { opacity: 1, y: 0 } : {}} // final opacity (after fade) and settle to normal position
      transition={{ duration: 0.5, delay: delay }} // fade duration and motion duration
    >
      {children}
    </motion.div>
  );
};
