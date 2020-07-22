import React, { useState } from "react";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import { Input, Button, Row, Col, Alert } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";

const style = {
  marginBottom: "20px",
};

const { TextArea } = Input;

const Contact = () => {
  const [state, setState] = useState({
    email: "",
    name: "",
    message: "",
    error: "",
    success: "",
    loading: false,
    sendStatus: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });

    axios
      .post("/send-email", state)
      .then((resp) => {
        console.log("success", resp);
        setState((prevState) => {
          return {
            ...prevState,
            success:
              "Thank you for your message. We will respond as soon as possible",
            sendStatus: true,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        setState((prevState) => {
          return {
            ...prevState,
            error: "Sorry, something went wrong",
          };
        });
        setTimeout(() => {
          setState((prevState) => {
            return {
              ...prevState,
              error: "",
            };
          });
        }, 3000);
      });

    setState((prevState) => {
      return {
        ...prevState,
        loading: false,
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
          <Col xs={24} sm={18} lg={16} xl={14} className="tilt">
            {!state.sendStatus ? (
              <form onSubmit={handleSubmit}>
                <HeadingText text="Contact Us" />
                <Input
                  type="text"
                  style={style}
                  prefix={<UserOutlined style={{ paddingRight: "5px" }} />}
                  placeholder="Name"
                  name="name"
                  required
                  value={state.name}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  style={style}
                  prefix={<MailOutlined style={{ paddingRight: "5px" }} />}
                  placeholder="Email"
                  name="email"
                  required
                  value={state.email}
                  onChange={handleChange}
                />

                <TextArea
                  style={style}
                  placeholder="Message"
                  name="message"
                  value={state.message}
                  onChange={handleChange}
                  rows={7}
                  required
                />

                {state.error && (
                  <Alert message={state.error} type="error" showIcon />
                )}

                {state.loading ? (
                  <Button style={{ marginTop: "20px" }} loading="true">
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
            ) : (
              <Alert
                style={style}
                message={state.success}
                type="success"
                showIcon
              />
            )}
          </Col>
        </Row>
      </motion.div>
    </Display>
  );
};

export default Contact;
