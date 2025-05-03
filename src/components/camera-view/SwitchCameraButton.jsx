// /components/CameraView/SwitchCameraButton.jsx

import React from "react";
import { ArrowsClockwise, ArrowsCounterClockwise } from "phosphor-react";

const SwitchCameraButton = ({ flip, setFlip }) => {
  return (
    <span className="icon switch-camera" onClick={() => setFlip(!flip)}>
      {flip ? (
        <ArrowsCounterClockwise size={24} color="#ffffff" />
      ) : (
        <ArrowsClockwise size={24} color="#ffffff" />
      )}
    </span>
  );
};

export default SwitchCameraButton;
