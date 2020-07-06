import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { signIn } from "../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const SignIn = ({ authError, login, isAuth, handleClick }) => {
  const onFinish = (values) => {
    login(values);
    console.log("Received values of form: ", values);
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      {isAuth && <Redirect to="/" />}
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
      {authError && <p style={{ color: "red" }}>{authError}</p>}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    authError: state.auth.authError,
    isAuth: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(signIn(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
