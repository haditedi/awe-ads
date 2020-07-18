import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import awAds from "../images/aw-ads.svg";
import couple from "../images/couple.svg";
import { Row, Col } from "antd";
import AdsSummary from "../components/ads/AdsSummary";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import axios from "axios";
import classes from "./home.module.css";

const Home = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get("https://dazzling-zion-41313.herokuapp.com/get-ads")
      .then((res) => {
        const doc = res.data;

        doc.data.result.forEach((el) => {
          setState((prevValue) => [...prevValue, el]);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Display>
      <section>
        <Row justify="center">
          <Col xs={24}>
            <div className={classes.heroContainer}>
              <motion.img
                variants={heroVariants}
                initial="hidden"
                animate="visible"
                className={classes.brand}
                src={awAds}
                alt="brand name"
              />
              <img className={classes.hero} src={couple} alt="couple" />
            </div>
          </Col>
        </Row>
      </section>
      <HeadingText text="For Sale" />
      <AdsSummary state={state} />
    </Display>
  );
};

export default Home;

const heroVariants = {
  hidden: {
    y: "-100vw",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};
