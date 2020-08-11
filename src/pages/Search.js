import React, { useState, useEffect } from "react";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import SearchBar from "../components/SearchBar";
import AdsSummary from "../components/ads/AdsSummary";
import Paginate from "../components/Paginate";
import { Skeleton, Result } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { heroVariants } from "../config/motion";

const Search = ({ location, history }) => {
  const [state, setState] = useState({
    data: [],
    empty: false,
    loading: true,
    localError: false,
    length: 0,
    page: 1,
  });
  console.log(state);
  useEffect(() => {
    axios
      .get(`/search-ads${location.search}&page=${state.page}`)
      .then((res) => {
        const result = res.data.data.result;
        console.log(result);
        if (result.length > 0) {
          setState((prevValue) => {
            return {
              ...prevValue,
              loading: false,
              data: result,
              length: res.data.data.length,
            };
          });
        } else {
          setState((prevValue) => {
            return {
              ...prevValue,
              loading: false,
              empty: true,
            };
          });
        }
      })
      .catch((err) => {
        setState((prevValue) => {
          return {
            ...prevValue,
            loading: false,
            localError: "Sorry something went wrong",
          };
        });
      });
  }, [location.search, state.page]);

  const changePage = (e) => {
    console.log(e);
    setState((prevValue) => {
      return {
        ...prevValue,
        page: e,
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
        <SearchBar history={history} />
        <HeadingText text="Search Result" />

        {state.loading && <Skeleton />}

        {state.localError && (
          <Result status="warning" title={state.localError} />
        )}
        <AdsSummary state={state} />

        {state.length >= 20 && (
          <Paginate changePage={changePage} state={state} />
        )}
      </motion.div>
    </Display>
  );
};

export default Search;
