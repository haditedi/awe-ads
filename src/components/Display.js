import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";
import {
  DownCircleOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Display = ({ children, location, history, isAuth, logout, name }) => {

  const handleLogout = () => {
    logout(history);
   
  }
  let routes;
  if (isAuth) {
    routes = (
      <Menu
        triggerSubMenuAction="click"
        theme="dark"
        mode="horizontal"
        overflowedIndicator={<MenuUnfoldOutlined />}
        defaultSelectedKeys={["/"]}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/">
          {" "}
          <NavLink to="/">Home </NavLink>
        </Menu.Item>

        <Menu.Item key="/about">
          <NavLink to="/about">About</NavLink>
        </Menu.Item>
        <Menu.Item key="/contact">
          <NavLink to="/contact">Contact</NavLink>
        </Menu.Item>


        <Menu.Item key="/profile">
          <NavLink to="/profile">
            <Avatar style={{ marginRight: "5px" }} icon={<UserOutlined />} />{" "}
            <span style={{ textTransform: "capitalize" }}>{name}</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/logout">
          <NavLink onClick={handleLogout} to="/">
            Log Out
          </NavLink>
        </Menu.Item>
      </Menu>
      
    );
  } else {
    routes = (
      
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["/"]}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/">
          {" "}
          <NavLink to="/">Home </NavLink>
        </Menu.Item>

        <Menu.Item key="/about">
          <NavLink to="/about">About</NavLink>
        </Menu.Item>
        <Menu.Item key="/contact">
          <NavLink to="/contact">Contact</NavLink>
        </Menu.Item>
        <Menu.Item key="/account">
          <NavLink to="/account">Login/Sign Up</NavLink>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        {routes}
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 15px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>made by Hadi Tedi</Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  
  return {
    isAuth: state.firebase.auth.uid,
    name: state.auth.name || state.firebase.auth.displayName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => dispatch(signOut(history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Display));
