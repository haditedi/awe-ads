import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const SignUp = ({ handleClick }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item>
        <h1>Sign Up</h1>
      </Form.Item>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Name"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        Already have an account? Sign in{" "}
        <Button style={{ marginLeft: "5px" }} onClick={handleClick}>
          here
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          animate={{ scale: 2 }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
