import React from "react";
import { Row, Col, Card } from "antd";
import carCategory from "../images/category/carCategory.png";
import otherStuffs from "../images/category/otherStuffs.jpg";

const { Meta } = Card;

const Category = ({ state }) => {
  console.log(state);
  return (
    <section>
      <Row gutter={[16, 16]}>
        <Col>
          <Card
            style={{ width: 300, height: 270 }}
            hoverable
            cover={
              <img
                //style={{ width: "80%" }}
                alt="car category"
                src={carCategory}
              />
            }
          >
            <Meta title="CAR" />
          </Card>
        </Col>
        <Col>
          <Card
            style={{ width: 300, height: 270 }}
            hoverable
            cover={
              <img
                //style={{ width: "80%" }}
                alt="car category"
                src={otherStuffs}
              />
            }
          >
            <Meta title="OTHER STUFFS" />
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Category;
