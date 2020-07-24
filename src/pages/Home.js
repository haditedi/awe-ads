import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";
import awAds from "../images/aw-ads.svg";
import couple from "../images/couple.svg";
import { Row, Col, Skeleton } from "antd";
import AdsSummary from "../components/ads/AdsSummary";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import Category from "../components/Category";
import axios from "axios";
import classes from "./home.module.css";

const Home = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(state);
  useEffect(() => {
    axios
      .get("/get-ads")
      .then((res) => {
        const doc = res.data;

        doc.data.result.forEach((el) => {
          setState((prevValue) => [...prevValue, el]);
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Display>
      <div>
        <motion.section
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Row justify="center">
            <Col xs={24}>
              <div className={classes.heroContainer}>
                <motion.img
                  variants={heroVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={classes.brand}
                  src={awAds}
                  alt="brand name"
                />
                <img className={classes.hero} src={couple} alt="couple" />
              </div>
            </Col>
          </Row>
        </motion.section>

        {loading && <Skeleton active />}

        <HeadingText text="Category" />
        <Category state={state} />

        <HeadingText text="Latest Post" />
        <AdsSummary state={state} loading={loading} />
      </div>
    </Display>
  );
};

export default Home;
