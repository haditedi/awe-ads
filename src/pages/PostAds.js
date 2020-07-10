import React from "react";
import { Form, Input, Button } from "antd";
import { Row, Col } from "antd";
import Display from "../components/Display";
import { connect } from "react-redux";
import { postAds } from "../store/actions/adsActions";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const PostAds = (props) => {
  
  const onFinish = (e) => {
    //console.log({ ...e, userId: props.userId });
    props.postAds(e);
    props.history.push("/profile");
  };
  return (
    <Display>
      <section style={{ marginTop: "15vh" }}>
        <Row justify="center" align="bottom">
          <Col xs={24} sm={16}>
            <Form {...layout} onFinish={onFinish}>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <h1 style={{ marginBottom: "0" }}>Post Ads</h1>
              </Form.Item>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input Title",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input description",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </section>
    </Display>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    postAds: (form) => dispatch(postAds(form)),
  };
};

export default connect(null, mapDispatchToProps)(PostAds);
