import React from "react";
import Display from "../components/Display";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { Button } from "antd";


const Profile = ({ name }) => {
  return (
    <Display>
    <Row justify="center">
    <Col>
    <h1 style={{ textTransform: "capitalize" }}>Welcome {name}</h1>
    </Col>
    </Row>
    <Row>
      <Col>
        <Button shape="round">Post Ads</Button>
      </Col>
    </Row>

      
       
      
    </Display>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    name: state.firebase.auth.displayName || state.auth.name,
  };
};

export default connect(mapStateToProps)(Profile);
