import React from "react";
import { Row, Col, Divider } from "antd";

const CardAdDetail = ({ state }) => {
  return (
    <div>
      <Row>
        <Col>
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
            }}
          >
            <Divider orientation="left">
              <h3 style={{ textTransform: "capitalize", margin: "0" }}>
                {state.title}
              </h3>
            </Divider>
            <h4>{state.description}</h4>
            <p>Price: {state.price}</p>
            <p style={{ textTransform: "capitalize" }}>
              Location: {state.location}
            </p>
            <p style={{ textTransform: "capitalize" }}>
              Contact: {state.contact}
            </p>
            <p>Date Posted: {state.datePosted}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardAdDetail;
