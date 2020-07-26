import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import AdsSummary from "../components/ads/AdsSummary";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Result } from "antd";

const ViewCategory = () => {
  const { category } = useParams();
  console.log(category);
  const [state, setState] = useState({
    data: [],
    empty: false,
    loading: true,
    error: false,
  });

  useEffect(() => {
    axios
      .get(`/get-ads?category=${category}`)
      .then((res) => {
        const result = res.data.data.result;
        console.log(result);

        if (result.length > 0) {
          setState((prevState) => {
            return {
              ...prevState,
              empty: false,
              data: result,
              loading: false,
            };
          });
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              empty: true,
              data: result,
              loading: false,
            };
          });
        }
      })
      .catch(() => {
        setState((prevState) => {
          return {
            ...prevState,
            loading: false,
            error: true,
          };
        });
      });
  }, [category]);

  return (
    <Display>
      {state.error && (
        <Result status="warning" title="Sorry something went wrong,,," />
      )}

      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <HeadingText
          style={{ textTransform: "capitalize" }}
          text={`Category ${category}`}
        />
        <AdsSummary state={state} />
      </motion.div>
    </Display>
  );
};

export default ViewCategory;
