import React from "react";
import { Row, Col, Divider } from "antd";
import { fromNow } from "../../config/fromNow";

const CardAdDetail = ({ state }) => {
  console.log(state);
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
            <h4>{state.description}</h4>
            <Divider />
            <p>Price: £ {state.price}</p>
            <p style={{ textTransform: "capitalize" }}>
              Location: {state.location}
            </p>
            <p style={{ textTransform: "capitalize" }}>
              Contact: {state.contact}
            </p>
            <p>Date Posted: {fromNow(state.createdAt)}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardAdDetail;
