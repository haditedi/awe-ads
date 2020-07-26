import React from "react";
import { Row, Col, Card, Skeleton, Button, Empty } from "antd";
import CardBody from "./CardBody";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CardTitle from "../CardTitle";

dayjs.extend(relativeTime);

const { Meta } = Card;

const AdsSummary = ({ state, uid, deleteAd }) => {
  return (
    <section>
      {state.loading && <Skeleton active />}
      <Row gutter={[16, 16]}>
        {state.empty && (
          <Empty
            style={{ marginTop: "20px" }}
            description="No posting at the moment"
          />
        )}
        {state.data.map((el) => {
          let src = el.imageUrl[0].url;
          if (el.imageUrl.length > 1) {
            el.imageUrl.forEach((main) => {
              if (main.primary) {
                src = main.url;
              }
            });
          }
          let now = dayjs(el.createdAt);
          return (
            <Col key={el._id}>
              {" "}
              <Link
                to={{
                  pathname: `/ad-detail/${el._id}`,
                  state: { ...el, uid, datePosted: now.fromNow() },
                }}
              >
                <Card
                  style={{ width: 240, height: 350 }}
                  hoverable
                  cover={<img alt={el.alt} src={src} />}
                >
                  <Meta
                    title={<CardTitle title={el.title} />}
                    description={
                      <CardBody
                        location={el.location}
                        price={el.price}
                        posted={now.fromNow()}
                      />
                    }
                  />
                </Card>
              </Link>
              {uid === el.userId && (
                <div>
                  <Button style={{ margin: "10px" }} size="small" type="dashed">
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteAd(el)}
                    style={{ margin: "10px" }}
                    size="small"
                    type="dashed"
                    danger
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default AdsSummary;
