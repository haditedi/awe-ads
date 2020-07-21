import React from "react";
import { Row, Col } from "antd";

const HeadingText = (props) => {
  return (
    <section style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <h1 style={props.style}>{props.text}</h1>
        </Col>
      </Row>
    </section>
  );
};

export default HeadingText;
