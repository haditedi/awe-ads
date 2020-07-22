import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";
import Display from "../components/Display";
import AdsSummary from "../components/ads/AdsSummary";
import axios from "axios";

const ViewCategory = (props) => {
  const location = props.location.state;
  console.log(location);
  const [state, setState] = useState({
    data: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/get-ads?category=${location.category}`)
      .then((res) => {
        const result = res.data.data.result;
        console.log(result);
        setLoading(false);
        setState((prevState) => {
          return {
            ...prevState,
            data: result,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [location.category]);

  return (
    <Display>
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <AdsSummary state={state.data} loading={loading} />
      </motion.div>
    </Display>
  );
};

export default ViewCategory;
