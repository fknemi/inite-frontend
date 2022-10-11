import React from "react";

const Cube = () => {
  return (
    <svg
      width="100"
      height="101"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="20" height="20" rx="5" fill="#FEFEFE" />
      <rect y="40.5" width="20" height="20" rx="5" fill="#FEFEFE" />
      <rect y="80.5" width="20" height="20" rx="5" fill="#FEFEFE" />
      <rect x="40" y="0.5" width="20" height="20" rx="5" fill="#FEFEFE" />
      <rect x="40" y="40.5" width="20" height="20" rx="5" fill="#FEFEFE" />
      <rect x="40" y="80.5" width="20" height="20" rx="5" fill="#FEFEFE" />
      <rect x="80" y="0.5" width="20" height="20" rx="5" fill="#FEFEFE" />
      <rect x="80" y="40.5" width="20" height="20" rx="5" fill="#FEFEFE" />
      <rect x="80" y="80.5" width="20" height="20" rx="5" fill="#FEFEFE" />
    </svg>
  );
};

export default Cube;
