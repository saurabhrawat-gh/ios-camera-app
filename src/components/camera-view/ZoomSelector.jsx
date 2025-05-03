import React from "react";

const ZoomSelector = ({ zoom, handleZoomChange }) => {
  const zoomLevels = ["0.5", "1.0"];

  return (
    <div className="zoom-ui">
      {zoomLevels.map((level) => (
        <span
          key={level}
          className={`zoom ${zoom === level ? "selected" : ""}`}
          onClick={() => handleZoomChange(level)}
        >
          {level}
          {zoom === level && "x"}
        </span>
      ))}
    </div>
  );
};

export default ZoomSelector;
