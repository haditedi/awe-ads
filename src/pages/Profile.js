import React, { useState, useEffect, useRef } from "react";
import Display from "../components/Display";
import { connect } from "react-redux";
import { Row, Col, Result, Button } from "antd";
import PostAds from "../components/ads/PostAds";
import AdsSummary from "../components/ads/AdsSummary";
import EditAds from "../components/ads/EditAds";
import { deleteAd, postAds, editAds } from "../store/actions/adsActions";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { heroVariants } from "../config/motion";

const Profile = ({
  name,
  uid,
  message,
  deleteAd,
  adsError,
  postAds,
  editAds,
}) => {
  const [state, setState] = useState({
    showPostAds: false,
    showEditAds: false,
    showAdsSummary: true,
    data: [],
    loading: true,
    localError: "",
    empty: false,
    title: "",
    description: "",
    tmpUrl: [],
    image: "",
    error: "",
    category: "",
    price: 0,
    location: "",
    contact: "",
    radio: "",
    _id: "",
  });
  const [numLetter, setNumLetter] = useState(0);

  const success = useRef(null);

  useEffect(() => {
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
              showAdsSummary: true,
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
              localError: "",
            };
          });
        }, 2000);
      });

    if (message || adsError) {
      success.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [message, adsError, uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      const remainingLetter = 20 - value.length;
      setNumLetter(remainingLetter);
      if (remainingLetter === 0) return;
    } else {
      setNumLetter(0);
    }

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleCategory = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        category: e,
      };
    });
  };

  const handleNumber = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        price: e,
      };
    });
  };

  const handleFiles = (e) => {
    let files = Array.from(e.target.files);

    if (files.length > 3) {
      setState((prevState) => {
        return {
          ...prevState,
          error: "Maximum 3 images allowed",
        };
      });
      return clearError();
    }

    let objectUrl = [];
    let images = files.map((file) => {
      if (file.size > 2000000) {
        setState((prevState) => {
          return {
            ...prevState,
            error: "file too big. Max size is 2 mb / image.",
          };
        });
        return clearError();
      }

      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        setState((prevState) => {
          return {
            ...prevState,
            error: `${file.name} type not supported. Only support .jpg and .png`,
          };
        });
        return clearError();
      }

      let alt = file.name.split(".")[0];
      objectUrl.push({ tmpUrl: URL.createObjectURL(file), alt });

      return { file, alt };
    });

    setState((prevState) => {
      return {
        ...prevState,
        tmpUrl: objectUrl,
        image: images,
      };
    });
  };

  const handleRadio = (e) => {
    e.preventDefault();
    let result = state.image.map((el) => {
      console.log(el);
      if (el.alt === e.target.value) {
        el.primary = true;
      } else {
        el.primary = false;
      }
      return el;
    });
    setState((prevState) => {
      return {
        ...prevState,
        image: result,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setState((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });
    postAds(state);

    setState((prevState) => {
      return {
        ...prevState,
        showPostAds: false,
        data: [],
        empty: false,
        title: "",
        description: "",
        tmpUrl: [],
        image: "",
        error: "",
        category: "",
        price: 0,
        location: "",
        contact: "",
        radio: "",
      };
    });
  };

  const clearError = () => {
    setTimeout(() => {
      setState((prevState) => {
        return {
          ...prevState,
          error: "",
        };
      });
    }, 3000);
  };

  const handleShowPostAds = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPostAds: !state.showPostAds,
        showEditAds: false,
      };
    });
  };

  const handleEditAds = (ads) => {
    console.log(ads);

    setState((prevState) => {
      return {
        ...prevState,
        title: ads.title,
        description: ads.description,
        showEditAds: !state.showEditAds,
        category: ads.category,
        price: ads.price,
        location: ads.location,
        contact: ads.contact,
        _id: ads._id,
        showPostAds: false,
      };
    });
    success.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });
    editAds(state)
      .then((resp) => {
        console.log("SUBMITEDIT", resp);
      })
      .catch((err) => {
        console.log("SUBMITEDIT", err);
      });

    setState((prevState) => {
      return {
        ...prevState,
        loading: false,
        showEditAds: false,
      };
    });
  };

  // console.log(state);
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
            <Button
              style={{ marginRight: "20px" }}
              type="primary"
              shape="round"
              onClick={handleShowPostAds}
            >
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
              key="adsError"
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
              key="localError"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Result status="warning" title={state.localError} />
            </motion.div>
          )}

          {state.showEditAds && (
            <motion.div
              key="postAds"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <EditAds
                state={state}
                handleChange={handleChange}
                handleCategory={handleCategory}
                handleNumber={handleNumber}
                handleFiles={handleFiles}
                handleRadio={handleRadio}
                handleSubmit={handleSubmit}
                clearError={clearError}
                numLetter={numLetter}
                handleEditSubmit={handleEditSubmit}
              />
            </motion.div>
          )}

          {state.showPostAds && (
            <motion.div
              key="postAds"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <PostAds
                handleChange={handleChange}
                handleCategory={handleCategory}
                handleNumber={handleNumber}
                handleFiles={handleFiles}
                handleRadio={handleRadio}
                handleSubmit={handleSubmit}
                clearError={clearError}
                numLetter={numLetter}
                state={state}
              />
            </motion.div>
          )}
          {state.showAdsSummary && (
            <motion.div
              key="summ"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Row style={{ marginTop: "35px" }}>
                <Col>
                  <AdsSummary
                    state={state}
                    uid={uid}
                    editAd={handleEditAds}
                    deleteAd={deleteAd}
                  />
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
    postAds: (form) => dispatch(postAds(form)),
    editAds: (ads) => dispatch(editAds(ads)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
