import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import { motion } from "framer-motion";
import { heroVariants, svgVariants } from "../config/motion";
import couple from "../images/couple.svg";
import video from "../video/market.mp4";
import Paginate from "../components/Paginate";
import AdsSummary from "../components/ads/AdsSummary";
import Display from "../components/Display";
import HeadingText from "../components/HeadingText";
import Category from "../components/Category";
import SearchBar from "../components/SearchBar";
import SEO from "../components/SEO";
import axios from "axios";
import classes from "./home.module.css";

const Home = (props) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    page: 1,
    length: 0,
  });
  console.log(state);
  useEffect(() => {
    axios
      .get(`/get-ads?page=${state.page}`)
      .then((res) => {
        const doc = res.data;

        let result = doc.data.result.map((el) => el);
        console.log(result);
        setState((prevValue) => {
          return {
            ...prevValue,
            data: result,
            loading: false,
            length: res.data.data.length,
          };
        });
      })
      .catch((err) => console.log(err));
  }, [state.page]);

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
      <SEO
        title="Awe ads | Home page"
        description="free ads posting for london and surrounding area until edinburgh. The whole united kingdom."
      />
      <div>
        <motion.section
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Row justify="center">
            <Col xs={24}>
              <div className={classes.heroContainer}>
                <motion.svg
                  variants={svgVariants}
                  initial="initial"
                  animate="visible"
                  className={classes.brand}
                  width="269"
                  height="121"
                  viewBox="0 0 269 121"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.75 55.625H21.3125L18.1875 65H8.21875L25.1562 19.5H33.8438L50.875 65H40.9062L37.75 55.625ZM23.8438 48.0312H35.2188L29.5 31L23.8438 48.0312ZM82.875 52.7188L87.3125 31.1875H96.0312L87.4062 65H79.8438L73.4375 43.7188L67.0312 65H59.5L50.875 31.1875H59.5938L64 52.6875L70.1875 31.1875H76.7188L82.875 52.7188ZM116.094 65.625C111.135 65.625 107.094 64.1042 103.969 61.0625C100.865 58.0208 99.3125 53.9688 99.3125 48.9062V48.0312C99.3125 44.6354 99.9688 41.6042 101.281 38.9375C102.594 36.25 104.448 34.1875 106.844 32.75C109.26 31.2917 112.01 30.5625 115.094 30.5625C119.719 30.5625 123.354 32.0208 126 34.9375C128.667 37.8542 130 41.9896 130 47.3438V51.0312H108.469C108.76 53.2396 109.635 55.0104 111.094 56.3438C112.573 57.6771 114.438 58.3438 116.688 58.3438C120.167 58.3438 122.885 57.0833 124.844 54.5625L129.281 59.5312C127.927 61.4479 126.094 62.9479 123.781 64.0312C121.469 65.0938 118.906 65.625 116.094 65.625ZM115.062 37.875C113.271 37.875 111.812 38.4792 110.688 39.6875C109.583 40.8958 108.875 42.625 108.562 44.875H121.125V44.1562C121.083 42.1562 120.542 40.6146 119.5 39.5312C118.458 38.4271 116.979 37.875 115.062 37.875ZM177.375 55.625H160.938L157.812 65H147.844L164.781 19.5H173.469L190.5 65H180.531L177.375 55.625ZM163.469 48.0312H174.844L169.125 31L163.469 48.0312ZM192.75 47.8438C192.75 42.5729 193.927 38.375 196.281 35.25C198.656 32.125 201.896 30.5625 206 30.5625C209.292 30.5625 212.01 31.7917 214.156 34.25V17H223.219V65H215.062L214.625 61.4062C212.375 64.2188 209.479 65.625 205.938 65.625C201.958 65.625 198.76 64.0625 196.344 60.9375C193.948 57.7917 192.75 53.4271 192.75 47.8438ZM201.781 48.5C201.781 51.6667 202.333 54.0938 203.438 55.7812C204.542 57.4688 206.146 58.3125 208.25 58.3125C211.042 58.3125 213.01 57.1354 214.156 54.7812V41.4375C213.031 39.0833 211.083 37.9062 208.312 37.9062C203.958 37.9062 201.781 41.4375 201.781 48.5ZM248.531 55.6562C248.531 54.5521 247.979 53.6875 246.875 53.0625C245.792 52.4167 244.042 51.8438 241.625 51.3438C233.583 49.6562 229.562 46.2396 229.562 41.0938C229.562 38.0938 230.802 35.5938 233.281 33.5938C235.781 31.5729 239.042 30.5625 243.062 30.5625C247.354 30.5625 250.781 31.5729 253.344 33.5938C255.927 35.6146 257.219 38.2396 257.219 41.4688H248.188C248.188 40.1771 247.771 39.1146 246.938 38.2812C246.104 37.4271 244.802 37 243.031 37C241.51 37 240.333 37.3438 239.5 38.0312C238.667 38.7188 238.25 39.5938 238.25 40.6562C238.25 41.6562 238.719 42.4688 239.656 43.0938C240.615 43.6979 242.219 44.2292 244.469 44.6875C246.719 45.125 248.615 45.625 250.156 46.1875C254.927 47.9375 257.312 50.9688 257.312 55.2812C257.312 58.3646 255.99 60.8646 253.344 62.7812C250.698 64.6771 247.281 65.625 243.094 65.625C240.26 65.625 237.74 65.125 235.531 64.125C233.344 63.1042 231.625 61.7188 230.375 59.9688C229.125 58.1979 228.5 56.2917 228.5 54.25H237.062C237.146 55.8542 237.74 57.0833 238.844 57.9375C239.948 58.7917 241.427 59.2188 243.281 59.2188C245.01 59.2188 246.312 58.8958 247.188 58.25C248.083 57.5833 248.531 56.7188 248.531 55.6562Z"
                    fill="#0066FE"
                  />
                  <path
                    d="M32.7363 95.2842H24.2988V104H19.9043V82.6719H33.791V86.2314H24.2988V91.7393H32.7363V95.2842ZM44.5869 92.1201C44.0107 92.042 43.5029 92.0029 43.0635 92.0029C41.4619 92.0029 40.4121 92.5449 39.9141 93.6289V104H35.6807V88.1504H39.6797L39.7969 90.04C40.6465 88.585 41.8232 87.8574 43.3271 87.8574C43.7959 87.8574 44.2354 87.9209 44.6455 88.0479L44.5869 92.1201ZM53.6396 104.293C51.3154 104.293 49.4209 103.58 47.9561 102.154C46.501 100.729 45.7734 98.8291 45.7734 96.4561V96.0459C45.7734 94.4541 46.0811 93.0332 46.6963 91.7832C47.3115 90.5234 48.1807 89.5566 49.3037 88.8828C50.4365 88.1992 51.7256 87.8574 53.1709 87.8574C55.3389 87.8574 57.043 88.541 58.2832 89.9082C59.5332 91.2754 60.1582 93.2139 60.1582 95.7236V97.4521H50.0654C50.2021 98.4873 50.6123 99.3174 51.2959 99.9424C51.9893 100.567 52.8633 100.88 53.918 100.88C55.5488 100.88 56.8232 100.289 57.7412 99.1074L59.8213 101.437C59.1865 102.335 58.3271 103.038 57.2432 103.546C56.1592 104.044 54.958 104.293 53.6396 104.293ZM53.1562 91.2852C52.3164 91.2852 51.6328 91.5684 51.1055 92.1348C50.5879 92.7012 50.2559 93.5117 50.1094 94.5664H55.998V94.2295C55.9785 93.292 55.7246 92.5693 55.2363 92.0615C54.748 91.5439 54.0547 91.2852 53.1562 91.2852ZM69.8701 104.293C67.5459 104.293 65.6514 103.58 64.1865 102.154C62.7314 100.729 62.0039 98.8291 62.0039 96.4561V96.0459C62.0039 94.4541 62.3115 93.0332 62.9268 91.7832C63.542 90.5234 64.4111 89.5566 65.5342 88.8828C66.667 88.1992 67.9561 87.8574 69.4014 87.8574C71.5693 87.8574 73.2734 88.541 74.5137 89.9082C75.7637 91.2754 76.3887 93.2139 76.3887 95.7236V97.4521H66.2959C66.4326 98.4873 66.8428 99.3174 67.5264 99.9424C68.2197 100.567 69.0938 100.88 70.1484 100.88C71.7793 100.88 73.0537 100.289 73.9717 99.1074L76.0518 101.437C75.417 102.335 74.5576 103.038 73.4736 103.546C72.3896 104.044 71.1885 104.293 69.8701 104.293ZM69.3867 91.2852C68.5469 91.2852 67.8633 91.5684 67.3359 92.1348C66.8184 92.7012 66.4863 93.5117 66.3398 94.5664H72.2285V94.2295C72.209 93.292 71.9551 92.5693 71.4668 92.0615C70.9785 91.5439 70.2852 91.2852 69.3867 91.2852ZM98.5957 99.6055H90.8906L89.4258 104H84.7529L92.6924 82.6719H96.7646L104.748 104H100.075L98.5957 99.6055ZM92.0771 96.0459H97.4092L94.7285 88.0625L92.0771 96.0459ZM105.803 95.958C105.803 93.4873 106.354 91.5195 107.458 90.0547C108.571 88.5898 110.09 87.8574 112.014 87.8574C113.557 87.8574 114.831 88.4336 115.837 89.5859V81.5H120.085V104H116.262L116.057 102.315C115.002 103.634 113.645 104.293 111.984 104.293C110.119 104.293 108.62 103.561 107.487 102.096C106.364 100.621 105.803 98.5752 105.803 95.958ZM110.036 96.2656C110.036 97.75 110.295 98.8877 110.812 99.6787C111.33 100.47 112.082 100.865 113.068 100.865C114.377 100.865 115.3 100.313 115.837 99.21V92.9551C115.31 91.8516 114.396 91.2998 113.098 91.2998C111.057 91.2998 110.036 92.9551 110.036 96.2656ZM131.95 99.6201C131.95 99.1025 131.691 98.6973 131.174 98.4043C130.666 98.1016 129.846 97.833 128.713 97.5986C124.943 96.8076 123.059 95.2061 123.059 92.7939C123.059 91.3877 123.64 90.2158 124.802 89.2783C125.974 88.3311 127.502 87.8574 129.387 87.8574C131.398 87.8574 133.005 88.3311 134.206 89.2783C135.417 90.2256 136.022 91.4561 136.022 92.9697H131.789C131.789 92.3643 131.594 91.8662 131.203 91.4756C130.812 91.0752 130.202 90.875 129.372 90.875C128.659 90.875 128.107 91.0361 127.717 91.3584C127.326 91.6807 127.131 92.0908 127.131 92.5889C127.131 93.0576 127.351 93.4385 127.79 93.7314C128.239 94.0146 128.991 94.2637 130.046 94.4785C131.101 94.6836 131.989 94.918 132.712 95.1816C134.948 96.002 136.066 97.4229 136.066 99.4443C136.066 100.89 135.446 102.062 134.206 102.96C132.966 103.849 131.364 104.293 129.401 104.293C128.073 104.293 126.892 104.059 125.856 103.59C124.831 103.111 124.025 102.462 123.439 101.642C122.854 100.812 122.561 99.918 122.561 98.9609H126.574C126.613 99.7129 126.892 100.289 127.409 100.689C127.927 101.09 128.62 101.29 129.489 101.29C130.3 101.29 130.91 101.139 131.32 100.836C131.74 100.523 131.95 100.118 131.95 99.6201ZM150.949 96.4854V104H146.555V82.6719H154.875C156.477 82.6719 157.883 82.9648 159.094 83.5508C160.314 84.1367 161.252 84.9717 161.906 86.0557C162.561 87.1299 162.888 88.3555 162.888 89.7324C162.888 91.8223 162.17 93.4727 160.734 94.6836C159.309 95.8848 157.331 96.4854 154.802 96.4854H150.949ZM150.949 92.9258H154.875C156.037 92.9258 156.921 92.6523 157.526 92.1055C158.142 91.5586 158.449 90.7773 158.449 89.7617C158.449 88.7168 158.142 87.8721 157.526 87.2275C156.911 86.583 156.062 86.251 154.978 86.2314H150.949V92.9258ZM164.777 95.9287C164.777 94.3564 165.08 92.9551 165.686 91.7246C166.291 90.4941 167.16 89.542 168.293 88.8682C169.436 88.1943 170.759 87.8574 172.263 87.8574C174.401 87.8574 176.145 88.5117 177.492 89.8203C178.85 91.1289 179.606 92.9062 179.763 95.1523L179.792 96.2363C179.792 98.668 179.113 100.621 177.756 102.096C176.398 103.561 174.577 104.293 172.292 104.293C170.007 104.293 168.181 103.561 166.813 102.096C165.456 100.631 164.777 98.6387 164.777 96.1191V95.9287ZM169.011 96.2363C169.011 97.7402 169.294 98.8926 169.86 99.6934C170.427 100.484 171.237 100.88 172.292 100.88C173.317 100.88 174.118 100.489 174.694 99.708C175.271 98.917 175.559 97.6572 175.559 95.9287C175.559 94.4541 175.271 93.3115 174.694 92.501C174.118 91.6904 173.308 91.2852 172.263 91.2852C171.228 91.2852 170.427 91.6904 169.86 92.501C169.294 93.3018 169.011 94.5469 169.011 96.2363ZM190.983 99.6201C190.983 99.1025 190.725 98.6973 190.207 98.4043C189.699 98.1016 188.879 97.833 187.746 97.5986C183.977 96.8076 182.092 95.2061 182.092 92.7939C182.092 91.3877 182.673 90.2158 183.835 89.2783C185.007 88.3311 186.535 87.8574 188.42 87.8574C190.432 87.8574 192.038 88.3311 193.239 89.2783C194.45 90.2256 195.056 91.4561 195.056 92.9697H190.822C190.822 92.3643 190.627 91.8662 190.236 91.4756C189.846 91.0752 189.235 90.875 188.405 90.875C187.692 90.875 187.141 91.0361 186.75 91.3584C186.359 91.6807 186.164 92.0908 186.164 92.5889C186.164 93.0576 186.384 93.4385 186.823 93.7314C187.272 94.0146 188.024 94.2637 189.079 94.4785C190.134 94.6836 191.022 94.918 191.745 95.1816C193.981 96.002 195.1 97.4229 195.1 99.4443C195.1 100.89 194.479 102.062 193.239 102.96C191.999 103.849 190.397 104.293 188.435 104.293C187.106 104.293 185.925 104.059 184.89 103.59C183.864 103.111 183.059 102.462 182.473 101.642C181.887 100.812 181.594 99.918 181.594 98.9609H185.607C185.646 99.7129 185.925 100.289 186.442 100.689C186.96 101.09 187.653 101.29 188.522 101.29C189.333 101.29 189.943 101.139 190.354 100.836C190.773 100.523 190.983 100.118 190.983 99.6201ZM202.907 84.2539V88.1504H205.617V91.2559H202.907V99.166C202.907 99.752 203.02 100.172 203.244 100.426C203.469 100.68 203.898 100.807 204.533 100.807C205.002 100.807 205.417 100.772 205.778 100.704V103.912C204.948 104.166 204.094 104.293 203.215 104.293C200.246 104.293 198.732 102.794 198.674 99.7959V91.2559H196.359V88.1504H198.674V84.2539H202.907ZM212.443 104H208.195V88.1504H212.443V104ZM207.946 84.0488C207.946 83.4141 208.156 82.8916 208.576 82.4814C209.006 82.0713 209.587 81.8662 210.319 81.8662C211.042 81.8662 211.618 82.0713 212.048 82.4814C212.478 82.8916 212.692 83.4141 212.692 84.0488C212.692 84.6934 212.473 85.2207 212.033 85.6309C211.604 86.041 211.032 86.2461 210.319 86.2461C209.606 86.2461 209.03 86.041 208.591 85.6309C208.161 85.2207 207.946 84.6934 207.946 84.0488ZM219.841 88.1504L219.973 89.9814C221.105 88.5654 222.624 87.8574 224.528 87.8574C226.208 87.8574 227.458 88.3506 228.278 89.3369C229.099 90.3232 229.519 91.7979 229.538 93.7607V104H225.305V93.8633C225.305 92.9648 225.109 92.3154 224.719 91.915C224.328 91.5049 223.679 91.2998 222.771 91.2998C221.579 91.2998 220.686 91.8076 220.09 92.8232V104H215.856V88.1504H219.841ZM232.146 95.958C232.146 93.5264 232.722 91.5684 233.874 90.084C235.036 88.5996 236.599 87.8574 238.562 87.8574C240.3 87.8574 241.652 88.4531 242.619 89.6445L242.795 88.1504H246.633V103.473C246.633 104.859 246.315 106.065 245.681 107.091C245.056 108.116 244.172 108.897 243.029 109.435C241.887 109.972 240.549 110.24 239.016 110.24C237.854 110.24 236.721 110.006 235.617 109.537C234.514 109.078 233.679 108.482 233.112 107.75L234.987 105.172C236.042 106.354 237.321 106.944 238.825 106.944C239.948 106.944 240.822 106.642 241.447 106.036C242.072 105.44 242.385 104.591 242.385 103.487V102.638C241.408 103.741 240.124 104.293 238.532 104.293C236.628 104.293 235.085 103.551 233.903 102.066C232.731 100.572 232.146 98.5947 232.146 96.1338V95.958ZM236.379 96.2656C236.379 97.7012 236.667 98.8291 237.243 99.6494C237.819 100.46 238.61 100.865 239.616 100.865C240.905 100.865 241.828 100.382 242.385 99.415V92.75C241.818 91.7832 240.905 91.2998 239.646 91.2998C238.63 91.2998 237.829 91.7148 237.243 92.5449C236.667 93.375 236.379 94.6152 236.379 96.2656Z"
                    fill="#0B0B0B"
                    fillOpacity="0.48"
                  />
                </motion.svg>

                <img className={classes.hero} src={couple} alt="couple" />
              </div>
            </Col>
          </Row>
        </motion.section>
        <section className={classes.container}>
          <video autoPlay muted loop className={classes.video}>
            <source src={video} type="video/mp4"></source>
          </video>
          <div className={classes.htext}>
            <h1>AWE ADS</h1>
            <p>Free ads posting</p>
          </div>
        </section>

        <SearchBar history={props.history} />
        <HeadingText text="Category" />

        <Category state={state} />

        <HeadingText text="Latest Post" />

        <AdsSummary state={state} />

        {state.length >= 20 && (
          <Paginate changePage={changePage} state={state} />
        )}
      </div>
    </Display>
  );
};

export default Home;
