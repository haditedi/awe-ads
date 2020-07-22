import React from "react";
import { Row, Col, Card, Skeleton, Button } from "antd";
import CardBody from "./CardBody";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const { Meta } = Card;

const AdsSummary = ({ state, loading, uid, deleteAd }) => {
  return (
    <section>
      {loading && <Skeleton active />}
      <Row gutter={[16, 16]}>
        {state.map((el) => {
          let now = dayjs();
          return (
            <Col key={el._id}>
              {" "}
              <Link
                to={{
                  pathname: `/ad-detail/${el._id}`,
                  state: { ...el, uid },
                }}
              >
                <Card
                  style={{ width: 240, height: 350 }}
                  hoverable
                  cover={<img alt={el.alt} src={el.imageUrl[0].url} />}
                >
                  <Meta
                    title={el.title}
                    description={
                      <CardBody
                        location={el.location}
                        price={el.price}
                        posted={now.from(el.createdAt, true)}
                      />
                    }
                  />
                </Card>
              </Link>
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
          );
        })}
      </Row>
    </section>
  );
};

export default AdsSummary;
