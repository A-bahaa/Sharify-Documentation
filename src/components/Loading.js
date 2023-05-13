import React from "react";
import LoadingBody from "./LoadingBody";

const Loading = ({ LSB }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
      }}
    >
      {LSB}
      <LoadingBody />
    </div>
  );
};

export default Loading;
