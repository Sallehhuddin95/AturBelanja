import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div style={{ textAlign: "center" }}>
      <Spinner
        animation="border"
        role="status"
        style={{
          height: "5rem",
          width: "5rem",
          margin: "auto",
          display: "block",
          zIndex: 9999,
        }}
      />
      <span>Loading...</span>
    </div>
  );
}

export default Loader;
