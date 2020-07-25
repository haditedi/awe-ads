import React, { useState, useEffect, useRef } from "react";
import Display from "../components/Display";
import { connect } from "react-redux";
import { Row, Col, Result, Button } from "antd";
import PostAds from "../components/ads/PostAds";
import AdsSummary from "../components/ads/AdsSummary";
import { deleteAd } from "../store/actions/adsActions";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { heroVariants } from "../config/motion";

const Profile = ({ name, uid, message, deleteAd, adsError }) => {
  const [state, setState] = useState({
    postAds: false,
    data: [],
    loading: true,
    localError: "",
    empty: false,
  });

  const success = useRef(null);

  useEffect(() => {
    console.log("EFFECT");
    axios
      .get(`/get-ads/${uid}`)
      .then((res) => {
        const doc = res.data;
        if (doc.data.result.length === 0) {
          setState((prevValue) => {
            return {
              ...prevValue,
              empty: true,
              loading: false,
              postAds: false,
            };
          });
        } else {
          setState((prevValue) => {
            return {
              ...prevValue,
              data: doc.data.result,
              loading: false,
              empty: false,
              postAds: false,
            };
          });
        }
      })
      .catch(() => {
        setState((prevValue) => {
          return {
            ...prevValue,
            postAds: false,
            loading: false,
            localError: "Sorry, something went wrong...",
          };
        });
        setTimeout(() => {
          setState((prevValue) => {
            return {
              ...prevValue,
              postAds: false,
              loading: false,
              localError: "",
            };
          });
        }, 2000);
      });

    if (message || adsError) {
      success.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [message, adsError, uid]);

  const handlePostAds = () => {
    setState((prevState) => {
      return {
        ...prevState,
        postAds: !state.postAds,
      };
    });
  };
  console.log(state);
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
        <AnimatePresence>
          {message && (
            <motion.div
              key="result"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Result status="success" title={message} />
            </motion.div>
          )}
          {adsError && (
            <motion.div
              key="error"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Result status="error" title={adsError} />
            </motion.div>
          )}
          {state.localError && (
            <motion.div
              key="error"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Result status="warning" title={state.localError} />
            </motion.div>
          )}

          {state.postAds ? (
            <motion.div
              key="postAds"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <PostAds />
            </motion.div>
          ) : (
            <motion.div
              key="summ"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Row style={{ marginTop: "35px" }}>
                <Col>
                  <AdsSummary state={state} uid={uid} deleteAd={deleteAd} />
                </Col>
              </Row>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Display>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.firebase.auth.displayName || state.auth.name,
    uid: state.firebase.auth.uid,
    message: state.ads.message,
    adsError: state.ads.adsError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAd: (item) => dispatch(deleteAd(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
