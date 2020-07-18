import React from "react";
import { Row, Col } from "antd";
import { Card } from "antd";
import AdsDetail from "../../pages/AdsDetail";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdsSummary = ({ state }) => {
  return (
    <section>
      <Row gutter={[16, 16]}>
        {state.map((el) => {
          let result;
          if (el.description.length > 20) {
            const desc = el.description.split(" ");
            result = desc.slice(0, 20).join(" ") + "...";
          } else {
            result = el.description;
          }

          return (
            <Col key={el._id}>
              <Card
                hoverable
                style={{ width: 240, height: 350 }}
                cover={<img alt={el.alt} src={el.imageUrl} />}
              >
                <Meta title={el.title} description={result} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default AdsSummary;
