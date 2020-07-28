import React from "react";
import { Input, Button, Row, Col, Select, InputNumber, Spin } from "antd";
import ErrorAlert from "../ErrorAlert";

const { TextArea } = Input;
const { Option } = Select;
const style = {
  marginBottom: "20px",
};

const PostAds = ({
  state,
  handleChange,
  handleCategory,
  handleNumber,
  handleFiles,
  handleRadio,
  handleSubmit,
  numLetter,
}) => {
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

export default PostAds;
