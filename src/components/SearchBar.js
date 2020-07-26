import React from "react";
import { Input, Row, Col } from "antd";

const { Search } = Input;

const SearchBar = ({ history }) => {
  console.log(history);
  const handleSearch = (param) => {
    history.push({
      pathname: "/search",
      search: `?title=${param}`,
    });
  };
  return (
    <section style={{ marginTop: "40px" }}>
      <Row justify="center">
        <Col>
          <Search
            size="large"
            placeholder="input search text"
            onSearch={(value) => handleSearch(value)}
            style={{ width: 300 }}
          />
        </Col>
      </Row>
    </section>
  );
};

export default SearchBar;
