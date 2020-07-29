import React from "react";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import CardAdDetail from "../components/ads/CardAdDetail";
import { Row, Col, Card, Skeleton, Result, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";
import useGetOneAds from "../components/hooks/useGetOneAds";

const { Meta } = Card;

const AdsDetail = (props) => {
  const adsId = props.match.params;
  console.log(props)
  
  const { data:state, loading, error } = useGetOneAds(adsId.id);
 
  const goBack = () => {
    props.history.goBack();
  };

  return (
    <Display>
      {loading && <Skeleton />}
      {error && (
        <Result status="warning" title="Sorry something went wrong,,," />
      )}
      {!loading && (
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Button onClick={goBack} icon={<LeftOutlined />}>
            Go Back
          </Button>
          <HeadingText
            style={{ textDecoration: "underline", textTransform: "capitalize" }}
            text={state.title}
          />
          <section>
            <Row>
              <Col>
                <Card style={{ paddingBottom: "20px" }}>
                  <Meta description={<CardAdDetail state={state} />} />
                </Card>
              </Col>
            </Row>
          </section>
          <section>
            <Row style={{ marginTop: "20px" }}>
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
      )}
    </Display>
  );
};

export default AdsDetail;
