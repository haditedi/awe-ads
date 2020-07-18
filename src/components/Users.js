import React, { useState } from "react";
import SignIn from "./SignIn";
import { Row, Col } from "antd";
import SignUp from "./SignUp";

const Users = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Row style={{ marginTop: "15vh" }} justify="center">
      <Col className="tilt">
        {show ? (
          <SignUp handleClick={handleClick} />
        ) : (
          <SignIn handleClick={handleClick} />
        )}
      </Col>
    </Row>
  );
};

export default Users;
