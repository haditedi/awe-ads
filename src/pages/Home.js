import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";
import awAds from "../images/aw-ads.svg";
import couple from "../images/couple.svg";
import { Row, Col } from "antd";
import AdsSummary from "../components/ads/AdsSummary";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import Category from "../components/Category";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import classes from "./home.module.css";

const Home = (props) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });
  console.log(state);
  useEffect(() => {
    axios
      .get("/get-ads")
      .then((res) => {
        const doc = res.data;
        let result = doc.data.result.map((el) => el);
        console.log(result);
        setState((prevValue) => {
          return {
            ...prevValue,
            data: result,
            loading: false,
          };
        });
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
        <SearchBar history={props.history} />
        <HeadingText text="Category" />
        <Category state={state} />

        <HeadingText text="Latest Post" />

        <AdsSummary state={state} />
      </div>
    </Display>
  );
};

export default Home;
