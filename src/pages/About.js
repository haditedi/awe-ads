import React from "react";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import { Row, Col } from "antd";
import newborn from "../images/newborn.jpg";

const About = () => {
  return (
    <Display>
      <HeadingText text="About Page" />

      <Row justify="center">
        <Col xs={24} sm={24}>
          <img
            style={{ width: "80vw", maxWidth: "900px" }}
            src={newborn}
            alt="newborn baby"
          />

          <p style={{ marginTop: "20px" }}>
            Hi, Iam newly born. Please support :)
          </p>
        </Col>
      </Row>
    </Display>
  );
};

export default About;
