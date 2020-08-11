import React from "react";
import { Row, Col, Card, Skeleton, Button, Empty } from "antd";
import CardBody from "./CardBody";
import { Link } from "react-router-dom";
import CardTitle from "../CardTitle";
import { fromNow } from "../../config/fromNow";

const { Meta } = Card;

const AdsSummary = ({ state, uid, deleteAd, editAd }) => {
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

          return (
            <Col id={el._id} key={el._id}>
              {" "}
              <Link to={`/ad-detail/${el._id}`}>
                <Card
                  style={{ width: 240, height: 350 }}
                  hoverable
                  cover={
                    <img
                      style={{ height: "100%", maxHeight: 200, width: "100%" }}
                      alt={el.alt}
                      src={src}
                    />
                  }
                >
                  <Meta
                    title={<CardTitle title={el.title} />}
                    description={
                      <CardBody
                        location={el.location}
                        price={el.price}
                        posted={fromNow(el.createdAt)}
                      />
                    }
                  />
                </Card>
              </Link>
              {uid === el.userId && (
                <div>
                  <Button
                    onClick={() => editAd(el)}
                    style={{ margin: "10px 2px" }}
                    size="small"
                    type="dashed"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteAd(el)}
                    style={{ margin: "10px 2px" }}
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
