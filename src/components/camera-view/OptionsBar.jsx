import React, { useRef, useEffect } from "react";

const MODES = ["time-lapse", "slow-mo", "photo", "video", "portrait", "pano"];

const OptionsBar = ({ captureMode, handleModeChange }) => {
  const containerRef = useRef(null);
  const optionRefs = useRef({});

  useEffect(() => {
    if (captureMode && optionRefs.current[captureMode]) {
      const option = optionRefs.current[captureMode];
      const container = containerRef.current;

      const containerCenter = container.offsetWidth / 2;
      const optionCenter = option.offsetLeft + option.offsetWidth / 2;

      const scrollTo = optionCenter - containerCenter;

      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, [captureMode]);

  return (
    <div className="options-bar" ref={containerRef}>
      {MODES.map((mode) => (
        <span
          key={mode}
          ref={(el) => (optionRefs.current[mode] = el)}
          className={`option ${captureMode === mode ? "selected" : ""}`}
          onClick={() => handleModeChange(mode)}
        >
          {mode.toUpperCase()}
        </span>
      ))}
    </div>
  );
};

export default OptionsBar;


