import React, {useState} from "react";
import { Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { signIn } from "../store/actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Row, Col } from "antd";

 const style = {
    marginBottom: "20px"
  }

const SignIn = ({ authError, login, isAuth, handleClick, history }) => {
  const [state, setState] = useState({email:"", password:"", loading:false})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {
        ...prevState,
        [name] : value
      }
    })
  }
 
 
  // const onFinish = (values) => {
  //  login(values);
  //   history.push("/profile")
  //   console.log("Received values of form: ", values);  onFinish={onFinish}
  // };

  const handleSubmit =(e) => {
    e.preventDefault()
    setState(prevState => {
      return {
        ...prevState,
        loading : true
      }
    })
    login(state, history)
  }

  return (
    <Row justify="center">
      <Col xs={24} sm={18}>
         <form onSubmit={handleSubmit} >
        <h1>Login</h1>
        <Input style={style}
          prefix={<MailOutlined style={{paddingRight:"5px"}} />}
          placeholder="Email"
          type="email"
          name="email"
          required
          value={state.email} onChange={handleChange}
        />
       
        <Input style={style}
          prefix={<LockOutlined style={{paddingRight:"5px"}} />}
          type="password"
          placeholder="Password"
          name="password"
          required
          value={state.password} onChange={handleChange}
        />
        <div style={style}>Don't have an account? Sign up{" "}
        <Button style={{ marginLeft: "5px" }} onClick={handleClick}>
          here
        </Button></div>
     
      {authError && <p style={{ color: "red" }}>{authError}</p>}
     
       {state.loading ? <Button loading="true" >
          Log in
        </Button>  : <Button type="primary" htmlType="submit" >
          Log in
        </Button> } 
      
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
    login: (credentials, history) => dispatch(signIn(credentials,history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));


 // <form name="normal_login" className="login-form" onSubmit={handleSubmit} >
      
 //      <Form.Item>
 //        <h1>Login</h1>
 //      </Form.Item>
 //      <Form.Item
 //        name="email"
 //        rules={[
 //          {
 //            required: true,
 //            message: "Please input your email!",
 //          },
 //        ]}
 //      >
 //        <Input
 //          prefix={<MailOutlined style={{paddingRight:"5px"}} className="site-form-item-icon" />}
 //          placeholder="Email"
 //        />
 //      </Form.Item>
 //      <Form.Item
 //        name="password"
 //        rules={[
 //          {
 //            required: true,
 //            message: "Please input your Password!",
 //          },
 //        ]}
 //      >
 //        <Input
 //          prefix={<LockOutlined style={{paddingRight:"5px"}} className="site-form-item-icon" />}
 //          type="password"
 //          placeholder="Password"
 //        />
 //      </Form.Item>
 //      <Form.Item>
 //        Don't have an account? Sign up{" "}
 //        <Button style={{ marginLeft: "5px" }} onClick={handleClick}>
 //          here
 //        </Button>
 //      </Form.Item>
 //      {authError && <p style={{ color: "red" }}>{authError}</p>}
 //      <Form.Item>
 //        <Button type="primary" htmlType="submit" className="login-form-button">
 //          Log in
 //        </Button>
 //      </Form.Item>
 //    </form>
 //  );