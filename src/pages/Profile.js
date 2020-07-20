import React, { useState } from "react";
import Display from "../components/Display";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { Button } from "antd";
import PostAds from "../components/ads/PostAds";

const Profile = ({ name }) => {
  const [state, setState] = useState({
    postAds: false,
  });

  const handlePostAds = () => {
    setState((prevState) => {
      return {
        ...prevState,
        postAds: !state.postAds,
      };
    });
  };
  return (
    <Display>
      <Row justify="center">
        <Col>
          <h1 style={{ textTransform: "capitalize", marginTop: "20px" }}>
            Welcome {name}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button type="primary" shape="round" onClick={handlePostAds}>
            Post Ads
          </Button>
        </Col>
      </Row>

      {state.postAds && <PostAds />}
    </Display>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.firebase.auth.displayName || state.auth.name,
  };
};

export default connect(mapStateToProps)(Profile);
