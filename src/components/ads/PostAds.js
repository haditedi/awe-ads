import React, { useState } from "react";
import { Input, Button } from "antd";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { postAds } from "../../store/actions/adsActions";
import { Redirect } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

const { TextArea } = Input;
const style = {
  marginBottom: "20px",
};

const PostAds = (props) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    tmpUrl: [],
    image: "",
    loading: false,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleFiles = (e) => {
    let files = Array.from(e.target.files);

    let objectUrl = [];
    let images = files.map((el) => {
      if (el.size > 2000000) {
        setState((prevState) => {
          return {
            ...prevState,
            error: "file too big. Max size is 2 mb / image.",
          };
        });
        clearError();
        return console.log("file too big");
      }

      if (el.type !== "image/png" && el.type !== "image/jpg") {
        setState((prevState) => {
          return {
            ...prevState,
            error: `${el.name} type not supported. Only support .jpg and .png`,
          };
        });
        return clearError();
      }
      objectUrl.push(URL.createObjectURL(el));
      let alt = el.name.split(".")[0];
      return { name: el.name, size: el.size, type: el.type, alt };
    });

    setState((prevState) => {
      return {
        ...prevState,
        tmpUrl: objectUrl,
        image: images,
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
    props
      .postAds(state)
      .then(() => {
        setState((prevState) => {
          return {
            ...prevState,
            loading: false,
          };
        });
      })
      .catch((err) => console.log(err));
  };
  console.log(state);

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

  return (
    <section style={{ marginTop: "50px" }}>
      {props.ads.imageUrl && <Redirect to="/" />}
      <Row justify="center" align="bottom">
        <Col xs={24} sm={18} lg={12} xl={8}>
          <form onSubmit={handleSubmit}>
            <h3 style={style}>Post Ads</h3>
            <Input
              style={style}
              name="title"
              placeholder="Title"
              required
              value={state.title}
              onChange={handleChange}
            />
            <TextArea
              style={style}
              placeholder="Description"
              name="description"
              value={state.description}
              onChange={handleChange}
              required
            />
            <span>
              Use "Ctrl + Click" to select multiple images. Max 3 images with
              less than 2 mb each.
            </span>
            <Input type="file" name="files" multiple onChange={handleFiles} />

            {state.tmpUrl &&
              state.tmpUrl.map((el) => {
                return (
                  <div key={el} style={{ marginTop: "10px", display: "block" }}>
                    <img src={el} alt="preview" />
                  </div>
                );
              })}
            {state.error && (
              <ErrorAlert style={{ marginTop: "20px" }} error={state.error} />
            )}
            {state.loading ? (
              <Button
                loading="true"
                style={{ marginTop: "20px" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            ) : (
              <Button
                style={{ marginTop: "20px" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            )}
          </form>
        </Col>
      </Row>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    ads: state.ads,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postAds: (form) => dispatch(postAds(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostAds);
