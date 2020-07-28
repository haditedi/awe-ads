import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </div>
  );
};

export default SEO;
