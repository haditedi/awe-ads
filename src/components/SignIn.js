import React, { useState } from "react";
import { Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { signIn } from "../store/actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Row, Col } from "antd";
import ErrorAlert from "./ErrorAlert";

const style = {
  bottom: {
    marginBottom: "20px",
  },
  top: {
    marginTop: "20px",
  },
};

const SignIn = ({ authError, login, handleClick, history }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });
    login(state, history);
    setState((prevState) => {
      return {
        ...prevState,
        loading: false,
      };
    });
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={18} lg={16} xl={14}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Input
            type="email"
            style={style.bottom}
            prefix={<MailOutlined style={{ paddingRight: "5px" }} />}
            placeholder="Email"
            name="email"
            required
            value={state.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            style={style.bottom}
            prefix={<LockOutlined style={{ paddingRight: "5px" }} />}
            placeholder="Password"
            name="password"
            required
            value={state.password}
            onChange={handleChange}
          />
          <div style={style.bottom}>
            Don't have an account? Sign up{" "}
            <Button style={{ marginLeft: "5px" }} onClick={handleClick}>
              here
            </Button>
          </div>

          <ErrorAlert error={authError} />

          {state.loading ? (
            <Button style={style.top} loading="true">
              Log in
            </Button>
          ) : (
            <Button style={style.top} type="primary" htmlType="submit">
              Log in
            </Button>
          )}
        </form>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials, history) => dispatch(signIn(credentials, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
