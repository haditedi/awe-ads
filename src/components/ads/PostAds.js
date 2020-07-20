import React, { useState } from "react";
import { Input, Button, Row, Col, Select } from "antd";
import { connect } from "react-redux";
import { postAds } from "../../store/actions/adsActions";
import { Redirect } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;
const style = {
  marginBottom: "20px",
};

const PostAds = (props) => {
  const history = useHistory();
  const [state, setState] = useState({
    title: "",
    description: "",
    tmpUrl: [],
    image: "",
    loading: false,
    error: "",
    category: "",
    price: "",
    location: "",
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
  const handleCategory = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        category: e,
      };
    });
  };

  const handleFiles = (e) => {
    let files = Array.from(e.target.files);

    let objectUrl = [];
    let images = files.map((file) => {
      if (file.size > 2000000) {
        setState((prevState) => {
          return {
            ...prevState,
            error: "file too big. Max size is 2 mb / image.",
          };
        });
        clearError();
        return console.log("file too big");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(history);
    setState((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });
    props
      .postAds(state)
      .then(() => {
        console.log("ads posted");
        setState((prevState) => {
          return {
            ...prevState,
            loading: false,
          };
        });
      })
      .catch((err) => console.log(err));
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

  return (
    <section style={{ marginTop: "50px" }}>
      {props.ads.imageUrl && <Redirect to="/" />}
      <Row justify="center" align="bottom">
        <Col xs={24} sm={18} lg={12} xl={8}>
          <form onSubmit={handleSubmit}>
            <h3 style={style}>Post Ads</h3>

            <Select
              name="category"
              style={{ width: 150, marginBottom: "20px" }}
              placeholder="Category"
              onChange={handleCategory}
            >
              <Option value="car">Car</Option>
              <Option value="others">Other Stuffs</Option>
            </Select>
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
              rows={5}
              required
            />
            <Input
              prefix="£ "
              style={style}
              name="price"
              placeholder="Price"
              required
              value={state.price}
              onChange={handleChange}
            />
            <Input
              style={style}
              name="location"
              placeholder="Location"
              required
              value={state.location}
              onChange={handleChange}
            />
            <span>
              Use "Ctrl + Click" to select multiple images. Max 3 images with
              less than 2 mb each.
            </span>
            <Input type="file" name="files" multiple onChange={handleFiles} />

            {state.tmpUrl &&
              state.tmpUrl.map((el) => {
                return (
                  <div
                    key={el.tmpUrl}
                    style={{
                      marginTop: "10px",
                      display: "block",
                    }}
                  >
                    <img
                      src={el.tmpUrl}
                      style={{ maxWidth: "50vw" }}
                      alt="preview"
                    />
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
