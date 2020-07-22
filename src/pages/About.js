import React from "react";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import { Row, Col } from "antd";
import newborn from "../images/newborn.jpg";
import { heroVariants } from "../config/motion";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Display>
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
