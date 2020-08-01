import React from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { connect } from "react-redux";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import newlogo from "../images/newlogo.svg";

const { Header, Content, Footer } = Layout;

const Display = ({ children, location, isAuth, name }) => {
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
        <Menu.Item>
          <img
            style={{ width: "50px", display: "inline" }}
            src={newlogo}
            alt="logo"
          />
        </Menu.Item>
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
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <NavLink to="/profile">Ads</NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/message">Message</NavLink>
                </Menu.Item>
              </Menu>
            }
          >
            <Link to="#" onClick={(e) => e.preventDefault()}>
              {" "}
              <Avatar style={{ marginRight: "5px" }} icon={<UserOutlined />} />
              <span style={{ textTransform: "capitalize" }}> {name}</span>
            </Link>
          </Dropdown>
        </Menu.Item>

        <Menu.Item key="/logout">
          <NavLink to="/logout">Log Out</NavLink>
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
        <Menu.Item key="brand">
          <NavLink to="/">
            {" "}
            <img
              style={{
                width: "50px",
                display: "inline",
                textTransform: "rotate(22deg)",
              }}
              src={newlogo}
              alt="logo"
            />
          </NavLink>
        </Menu.Item>
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
      <Footer style={{ textAlign: "center" }}>
        made by{" "}
        <a
          href="https://www.it-tedi.tech"
          target="_blank"
          rel="noreferrer noopener"
        >
          Hadi Tedi
        </a>
      </Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.firebase.auth.uid,
    name: state.auth.name || state.firebase.auth.displayName,
  };
};

export default connect(mapStateToProps)(withRouter(Display));
