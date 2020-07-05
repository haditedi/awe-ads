import React from "react";
import Display from "../components/Display";
import { motion } from "framer-motion";
import couple from "../images/couple.svg";
import { Row, Col } from "antd";
import AdsSummary from "../components/ads/AdsSummary";
import SmoothImage from "react-smooth-image";

const Home = () => {
  return (
    <Display>
      <section>
        <Row justify="center">
          <Col xs={24} style={{ maxWidth: "800px" }}>
            <SmoothImage
              style={{ paddingBottom: "0" }}
              src={couple}
              alt="couple"
            />
          </Col>
        </Row>
      </section>
      <section>
        <Row>
          <Col>
            <h1>For Sale</h1>
          </Col>
        </Row>
      </section>
      <AdsSummary />
    </Display>
  );
};

export default Home;
