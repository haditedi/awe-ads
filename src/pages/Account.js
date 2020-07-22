import React from "react";
import Display from "../components/Display";
import Users from "../components/Users";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";

const Account = () => {
  return (
    <Display>
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Users />
      </motion.div>
    </Display>
  );
};

export default Account;
