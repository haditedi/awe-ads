import React from "react";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";

const NotFound = () => {
  return (
    <motion.div
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1>Page not Found</h1>
    </motion.div>
  );
};

export default NotFound;
