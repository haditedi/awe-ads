import React from "react";
import { Row, Col } from "antd";
import { Card } from "antd";

const { Meta } = Card;

const AdsSummary = () => {
  return (
    <section>
      <Row>
        <Col>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default AdsSummary;
