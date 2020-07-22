import React from "react";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import CardAdDetail from "../components/ads/CardAdDetail";
import { Row, Col, Card } from "antd";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";

const { Meta } = Card;

const AdsDetail = (props) => {
  const state = props.location.state;
  console.log(props);
  return (
    <Display>
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <HeadingText
          style={{ textDecoration: "underline", textTransform: "capitalize" }}
          text={state.title}
        />
        <section>
          <Row>
            <Col>
              <Card>
                <Meta
                  description={
                    <CardAdDetail
                      location={state.location}
                      price={state.price}
                      description={state.description}
                    />
                  }
                />
              </Card>
            </Col>
          </Row>
        </section>
        <section>
          <Row>
            {state.imageUrl.map((el) => {
              return (
                <Col key={el.url} style={{ marginTop: "20px" }}>
                  <img
                    style={{
                      boxShadow: "0 0 2px 2px #ddd",

                      width: "100%",
                      maxWidth: "900px",
                    }}
                    src={el.url}
                    alt={el.alt}
                  />
                </Col>
              );
            })}
          </Row>
        </section>
      </motion.div>
    </Display>
  );
};

export default AdsDetail;
