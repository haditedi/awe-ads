import React, {useState} from "react";
import { Form, Input, Button } from "antd";
import { Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { signUp } from "../store/actions/authActions";
import { withRouter } from "react-router"

const SignUp = (props) => {
  
  const [state, setState] = useState({loading:false})

  const onFinish = async (values) => {
    setState({loading:true})
    await props.create(values).then(() => {     
      return props.history.push("/profile")
    }).catch(err => {
      console.log(err)
      setState({loading:false})
    })
   
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
          prefix={<UserOutlined style={{paddingRight:"5px"}} className="site-form-item-icon" /> }
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
          prefix={<MailOutlined style={{paddingRight:"5px"}} className="site-form-item-icon" />}
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
          prefix={<LockOutlined style={{paddingRight:"5px"}} className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        Already have an account? Sign in{" "}
        <Button style={{ marginLeft: "5px" }} onClick={props.handleClick}>
          here
        </Button>
      </Form.Item>
      {props.auth.authError && (
        <Form.Item>
          <p style={{ color: "red" }}>{props.auth.authError}</p>
        </Form.Item>
      )}
      <Form.Item>
      {state.loading ? <Spin size="large" /> :
        <Button
          animate={{ scale: 2 }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Sign Up
        </Button> }
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.auth,
    isAuth: state.firebase.auth.displayName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: (credentials) => dispatch(signUp(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
