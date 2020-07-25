import React from "react";
import { Row, Col, Card } from "antd";
import carCategory from "../images/category/carCategory.png";
import otherStuffs from "../images/category/otherStuffs.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Category = () => {
  return (
    <section>
      <Row gutter={[16, 16]}>
        <Col>
          <Link
            to={{
              pathname: `/view-category/car`,
              state: { category: "car" },
            }}
          >
            <Card
              style={{ width: 300, height: 270 }}
              hoverable
              cover={<img alt="car category" src={carCategory} />}
            >
              <Meta title="CAR" />
            </Card>
          </Link>
        </Col>

        <Col>
          <Link
            to={{
              pathname: `/view-category/others`,
              state: { category: "others" },
            }}
          >
            <Card
              style={{ width: 300, height: 270 }}
              hoverable
              cover={<img alt="other stuffs" src={otherStuffs} />}
            >
              <Meta title="OTHER STUFFS" />
            </Card>
          </Link>
        </Col>
      </Row>
    </section>
  );
};

export default Category;
