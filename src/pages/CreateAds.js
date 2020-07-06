import React from "react";
import { Form, Input, Button } from "antd";
import { Row, Col } from "antd";
import Display from "../components/Display";
import { connect } from "react-redux";
import { createAds } from "../store/actions/adsActions";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const CreateAds = (props) => {
  const onFinish = (e) => {
    console.log(e);
    //props.create(form);
  };
  return (
    <Display>
      <section>
        <Row justify="center">
          <Col xs={24} sm={16}>
            <Form {...layout} onFinish={onFinish}>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <h1 style={{ marginBottom: "0" }}>Create Ads</h1>
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
                <Input onChange={handleChange} value={form.title} />
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
                <Input.TextArea
                  onChange={handleChange}
                  value={form.description}
                />
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
    create: (form) => dispatch(createAds(form)),
  };
};

export default connect(null, mapDispatchToProps)(CreateAds);
