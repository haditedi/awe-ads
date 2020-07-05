import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

const Display = ({ children, location }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
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
          <Menu.Item key="/create-ads">
            <NavLink to="/create-ads">Create Ads</NavLink>
          </Menu.Item>
        </Menu>
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

export default withRouter(Display);
