import React from "react";
import { Alert } from "antd";
import { motion, AnimatePresence } from "framer-motion";

const variantsContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 2 },
  },
};

const ErrorButton = (props) => {
  return (
    <AnimatePresence>
      {props.error && (
        <motion.div
          style={props.style}
          key="error"
          variants={variantsContainer}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Alert type="error" message={props.error} showIcon />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorButton;
