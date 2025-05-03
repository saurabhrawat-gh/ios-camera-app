import React from "react";

const CaptureButton = ({ handleCapture }) => {
  return (
    <button className="shutter-button" onClick={handleCapture}>
      <div></div>
    </button>
  );
};

export default CaptureButton;
