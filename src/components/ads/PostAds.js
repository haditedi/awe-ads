import React, { useState } from "react";
import { Input, Button } from "antd";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { postAds } from "../../store/actions/adsActions";
import { Redirect } from "react-router-dom";

const { TextArea } = Input;
const style = {
  marginBottom: "20px",
};

const PostAds = (props) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    tmpUrl: "",
    image: "",
    alt: "",
    loading: false,
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
    let file = e.target.files[0].name;
    file = file.split(".");

    const objectUrl = URL.createObjectURL(e.target.files[0]);

    setState((prevState) => {
      return {
        ...prevState,
        tmpUrl: objectUrl,
        image: e.target.files[0],
        alt: file[0],
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
            <Input type="file" name="files" multiple onChange={handleFiles} />

            {state.tmpUrl && (
              <div style={{ marginTop: "10px", display: "block" }}>
                <img src={state.tmpUrl} alt="preview" />
              </div>
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
