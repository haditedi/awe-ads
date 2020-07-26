import React from "react";

const CardBody = ({ location, price, description, posted }) => {
  return (
    <div>
      <h5 style={{ textTransform: "capitalize" }}>Location: {location}</h5>
      <h5>Price: £ {price}</h5>
      <h5 style={{ fontStyle: "italic" }}>Posted: {posted}</h5>
      <p>{description}</p>
    </div>
  );
};

export default CardBody;
