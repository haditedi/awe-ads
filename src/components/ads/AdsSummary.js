import React from "react";
import { Row, Col } from "antd";
import { Card } from "antd";

const { Meta } = Card;

const AdsSummary = ({ state }) => {
  return (
    <section>
      <Row gutter={[16, 16]}>
        {state.map((el) => {
          const desc = el.description.split(" ");
          const result = desc.slice(0, 20).join(" ") + "...";

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
