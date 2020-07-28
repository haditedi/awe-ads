import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";
import Display from "../components/Display";
import { Row, Col } from "antd";
import ThankYou from "../images/thankYou.jpg";

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

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
            <h1>Thank you for your visit :)</h1>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <img
              style={{ width: "100%", maxWidth: "900px" }}
              src={ThankYou}
              alt="cute dog"
            />
          </Col>
        </Row>
      </motion.div>
    </Display>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
