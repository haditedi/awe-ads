import React from "react";
import { Row, Col, Button } from "antd";
import Display from "../components/Display";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";

const Message = () => {
  return (
    <Display>
      <motion.section
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <Button
              style={{
                color: "#817f7f",
                borderColor: "#817f7f",
              }}
              shape="round"
              ghost
            >
              Message Received
            </Button>
            <Button
              style={{
                marginLeft: "10px",
                color: "#817f7f",
                borderColor: "#817f7f",
              }}
              shape="round"
              ghost
            >
              Message Sent
            </Button>
          </Col>
        </Row>
      </motion.section>
    </Display>
  );
};

export default Message;
