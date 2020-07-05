import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const SignIn = ({ handleClick }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item>
        <h1>Login</h1>
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
        Don't have an account? Sign up{" "}
        <Button style={{ marginLeft: "5px" }} onClick={handleClick}>
          here
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
