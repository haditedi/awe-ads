import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { signUp } from "../store/actions/authActions";
import { withRouter } from "react-router";
import ErrorAlert from "./ErrorAlert";

const style = {
  bottom: {
    marginBottom: "20px",
  },
  top: {
    marginTop: "20px",
  },
};

const SignUp = ({ handleClick, create, authError, history }) => {
  const [state, setState] = useState({
    name: "",
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
    create(state, history);
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
          <h1>Sign Up</h1>
          <Input
            type="text"
            style={style.bottom}
            prefix={<UserOutlined style={{ paddingRight: "5px" }} />}
            placeholder="Name"
            name="name"
            required
            value={state.name}
            onChange={handleChange}
          />
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
            Already have an account? Sign In{" "}
            <Button style={{ marginLeft: "5px" }} onClick={handleClick}>
              here
            </Button>
          </div>

          <ErrorAlert error={authError} />

          {state.loading ? (
            <Button style={style.top} loading="true">
              Sign Up
            </Button>
          ) : (
            <Button style={style.top} type="primary" htmlType="submit">
              Sign Up
            </Button>
          )}
        </form>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: (credentials, history) => dispatch(signUp(credentials, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
