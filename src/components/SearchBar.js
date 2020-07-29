import React from "react";
import { Input, Row, Col } from "antd";

const { Search } = Input;

const SearchBar = ({ history }) => {
  const handleSearch = (param) => {
    history.push({
      pathname: "/search",
      search: `?title=${param}`,
    });
  };
  return (
    <section style={{ marginTop: "40px" }}>
      <Row justify="center">
        <Col xs={24} sm={16} lg={14} xl={10}>
          <Search
            size="large"
            placeholder="input search text"
            onSearch={(value) => handleSearch(value)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </section>
  );
};

export default SearchBar;
