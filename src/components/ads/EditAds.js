import React from "react";
import { Row, Col, Input, InputNumber, Select, Spin, Button } from "antd";
import ErrorAlert from "../ErrorAlert";

const { TextArea } = Input;
const { Option } = Select;
const style = {
  marginBottom: "20px",
};

const EditAds = ({
  state,
  handleChange,
  handleCategory,
  handleNumber,
  handleEditSubmit,
  numLetter,
}) => {
  console.log(state);
  return (
    <section style={{ marginTop: "50px" }}>
      <Row justify="center" align="bottom">
        <Col xs={24} sm={18} lg={12} xl={8}>
          <form onSubmit={handleEditSubmit}>
            <h3 style={style}>Edit Ads</h3>
            <Select
              name="category"
              style={{ width: 150, marginBottom: "20px" }}
              placeholder="Category"
              onChange={handleCategory}
              defaultValue={state.category}
            >
              <Option selected value="car">
                Car
              </Option>
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
              defaultValue={state.price}
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
                Update Ads
              </Button>
            )}
          </form>
        </Col>
      </Row>
    </section>
  );
};

export default EditAds;
