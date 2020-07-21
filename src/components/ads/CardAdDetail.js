import React from "react";

const CardAdDetail = ({ title, location, price, description }) => {
  return (
    <div>
      <h3>Location: {location}</h3>
      <h3>Price: {price}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardAdDetail;

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
// tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
// veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
// commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
// velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
// occaecat cupidatat non proident, sunt in culpa qui officia deserunt
// mollit anim id est laborum.
