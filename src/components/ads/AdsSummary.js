import React from "react";
import { Row, Col, Card, Skeleton, Button } from "antd";
import CardBody from "./CardBody";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdsSummary = ({ state, loading, uid, deleteAd }) => {
  return (
    <section>
      {loading && <Skeleton active />}
      <Row gutter={[16, 16]}>
        {state.map((el, i) => {
          return (
            <Link
              key={el._id}
              to={{
                pathname: `/ad-detail/${el._id}`,
                state: { ...el, uid },
              }}
            >
              <Col>
                <Card
                  style={{ width: 240, height: 350 }}
                  hoverable
                  cover={<img alt={el.alt} src={el.imageUrl[0].url} />}
                >
                  <Meta
                    title={el.title}
                    description={
                      <CardBody location={el.location} price={el.price} />
                    }
                  />
                </Card>
                {uid === el.userId && (
                  <Button
                    onClick={() => deleteAd(el)}
                    style={{ margin: "10px" }}
                    size="small"
                    type="dashed"
                    danger
                  >
                    Delete
                  </Button>
                )}
              </Col>
            </Link>
          );
        })}
      </Row>
    </section>
  );
};

export default AdsSummary;
