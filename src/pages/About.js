import React from "react";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import SEO from "../components/SEO";
import { Row, Col } from "antd";
import newborn from "../images/newborn.jpg";
import { heroVariants } from "../config/motion";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Display>
      <SEO
        title="Awe ads | About page"
        description="Founded in July 2020. We aim to be one of the best ads posting provider"
      />
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Row justify="center">
          <Col>
            <HeadingText text="About Page" />
            <div
              style={{
                height: "50vw",
                maxHeight: "300px",
                maxWidth: "500px",
              }}
            >
              <img
                style={{
                  height: "50vw",
                  maxHeight: "300px",
                  maxWidth: "500px",
                }}
                src={newborn}
                alt="newborn baby"
              />
            </div>

            <p style={{ marginTop: "20px" }}>
              Hi, Iam newly born. Please support :)
            </p>
          </Col>
        </Row>
      </motion.div>
    </Display>
  );
};

export default About;
