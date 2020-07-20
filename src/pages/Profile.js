import React, { useState, useEffect } from "react";
import Display from "../components/Display";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { Button } from "antd";
import PostAds from "../components/ads/PostAds";
import AdsUser from "../components/ads/AdsUser";
import axios from "axios";

const Profile = ({ name, uid }) => {
  const [state, setState] = useState({
    postAds: false,
    data: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/get-ads/${uid}`)
      .then((res) => {
        const doc = res.data;

        setState((prevValue) => {
          return {
            ...prevValue,
            data: doc.data.result,
          };
        });

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
      {state.postAds ? (
        <PostAds />
      ) : (
        <Row style={{ marginTop: "35px" }}>
          <Col>
            <AdsUser state={state.data} loading={loading} />
          </Col>
        </Row>
      )}
    </Display>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.firebase.auth.displayName || state.auth.name,
    uid: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(Profile);
