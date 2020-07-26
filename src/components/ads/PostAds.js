import React, { useState } from "react";
import { Input, Button, Row, Col, Select, InputNumber, Spin } from "antd";
import { connect } from "react-redux";
import { postAds } from "../../store/actions/adsActions";
import ErrorAlert from "../ErrorAlert";

const { TextArea } = Input;
const { Option } = Select;
const style = {
  marginBottom: "20px",
};

const PostAds = ({ postAds }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    tmpUrl: [],
    image: "",
    loading: false,
    error: "",
    category: "",
    price: 0,
    location: "",
    contact: "",
    radio: "",
  });
  const [numLetter, setNumLetter] = useState(0);

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
  console.log(state);

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
    postAds(state)
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

  console.log(state);

  return (
    <section style={{ marginTop: "50px" }}>
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
            {numLetter > 1 && (
              <div style={{ ...style, color: "blue" }}>
                Maximum 20 letters. {numLetter} left.
              </div>
            )}

            <TextArea
              style={style}
              placeholder="Description"
              name="description"
              value={state.description}
              onChange={handleChange}
              rows={5}
              required
            />

            <InputNumber
              min={0}
              style={style}
              defaultValue={0}
              formatter={(value) =>
                `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\£\s?|(,*)/g, "")}
              onChange={handleNumber}
            />
            <Input
              style={style}
              name="contact"
              placeholder="Contact Detail"
              required
              value={state.contact}
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
            <Input
              required
              type="file"
              name="files"
              multiple
              onChange={handleFiles}
            />

            {state.tmpUrl &&
              state.tmpUrl.map((el) => {
                return (
                  <div
                    style={{ marginTop: "20px" }}
                    key={el.alt}
                    onChange={handleRadio}
                  >
                    <input type="radio" name="radio" value={el.alt} /> Primary
                    Photo
                    <img
                      src={el.tmpUrl}
                      style={{ marginLeft: "10px", maxWidth: "50vw" }}
                      alt="preview"
                    />
                  </div>
                );
              })}

            {state.error && (
              <ErrorAlert style={{ marginTop: "20px" }} error={state.error} />
            )}

            {state.loading ? (
              <Spin style={{ marginTop: "20px" }} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    postAds: (form) => dispatch(postAds(form)),
  };
};

export default connect(null, mapDispatchToProps)(PostAds);
