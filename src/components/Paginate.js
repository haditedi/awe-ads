import React from "react";
import { Row, Col, Pagination } from "antd";

const Paginate = ({ changePage, state }) => {
  return (
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col>
        <Pagination
          onChange={changePage}
          defaultPageSize={2}
          defaultCurrent={1}
          total={state.length}
        />
      </Col>
    </Row>
  );
};

export default Paginate;
