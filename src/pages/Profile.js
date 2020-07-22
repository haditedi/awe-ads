import React, { useState, useEffect, useRef } from "react";
import Display from "../components/Display";
import { connect } from "react-redux";
import { Row, Col, Result, Button } from "antd";
import PostAds from "../components/ads/PostAds";
import AdsSummary from "../components/ads/AdsSummary";
import { clearMessage, deleteAd } from "../store/actions/adsActions";
import axios from "axios";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";

const Profile = ({ name, uid, message, clearMessage, deleteAd }) => {
  const [state, setState] = useState({
    postAds: false,
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const success = useRef(null);

  useEffect(() => {
    setLoading(true);
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
    }
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
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
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
              <AdsSummary
                state={state.data}
                loading={loading}
                uid={uid}
                deleteAd={deleteAd}
              />
            </Col>
          </Row>
        )}
      </motion.div>
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
    deleteAd: (item) => dispatch(deleteAd(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
