import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";
const { Header, Content, Footer } = Layout;

const Display = ({ children, location, isAuth, logout }) => {
  let routes;
  if (isAuth) {
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

        <Menu.Item key="/create-ads">
          <NavLink to="/create-ads">Create Ads</NavLink>
        </Menu.Item>
        <Menu.Item key="/logout">
          <NavLink onClick={logout} to="/logout">
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
          <NavLink to="/account">Account</NavLink>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />

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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Display));
