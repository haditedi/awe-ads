import React, { useState, useEffect, useRef } from "react";
import Display from "../components/Display";
import { connect } from "react-redux";
import { Row, Col, Result, Button } from "antd";
import PostAds from "../components/ads/PostAds";
import AdsSummary from "../components/ads/AdsSummary";
import { clearMessage } from "../store/actions/adsActions";
import axios from "axios";

const Profile = ({ name, uid, message, clearMessage }) => {
  const [state, setState] = useState({
    postAds: false,
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const success = useRef(null);

  useEffect(() => {
    setState((prevValue) => {
      return {
        ...prevValue,
        postAds: false,
      };
    });

    if (message) {
      success.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        clearMessage();
      }, 3000);
    } else {
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
    }
  }, [message, uid, clearMessage]);

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
          <h1
            ref={success}
            style={{ textTransform: "capitalize", marginTop: "20px" }}
          >
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
      {message && <Result status="success" title={message} />}
      {state.postAds ? (
        <PostAds />
      ) : (
        <Row style={{ marginTop: "35px" }}>
          <Col>
            <AdsSummary state={state.data} loading={loading} />
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
    message: state.ads.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(clearMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
