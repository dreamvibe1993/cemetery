import React from "react";

export const Logo = ({ color, onClick = () => {} }) => (
  <svg
    width="159"
    height="186"
    viewBox="0 0 159 186"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M9 181L112.427 35H9L112.427 181H58.6853L63.7552 5H154V77"
      stroke={color || "black"}
      strokeWidth="9"
    />
  </svg>
);
