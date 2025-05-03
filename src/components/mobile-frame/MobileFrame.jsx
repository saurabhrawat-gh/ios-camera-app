import React from "react";
import "./mobileFrame.css";

const MobileFrame = ({ children }) => {
  return (
    <div className="mobile-frame-wrapper">
      <div className="mobile-frame">
        <div className="mobile-screen">{children}</div>
      </div>
    </div>
  );
};

export default MobileFrame;
