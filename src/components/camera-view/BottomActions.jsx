import React from "react";
import ZoomSelector from "./ZoomSelector";
import OptionsBar from "./OptionsBar";
import CaptureButton from "./CaptureButton";
import ImagePreview from "./ImagePreview";
import SwitchCameraButton from "./SwitchCameraButton";

const BottomActions = ({
  latestImage,
  flip,
  setFlip,
  zoom,
  captureMode,
  handleZoomChange,
  handleModeChange,
  handleCapture,
  setClearStorage
}) => {
  return (
    <div className="bottom-actions">
      <ZoomSelector zoom={zoom} handleZoomChange={handleZoomChange} />
      <OptionsBar
        captureMode={captureMode}
        handleModeChange={handleModeChange}
      />
      <div className="base-action-wrapper">
        <ImagePreview latestImage={latestImage} setClearStorage={setClearStorage} />
        <CaptureButton handleCapture={handleCapture} />
        <SwitchCameraButton flip={flip} setFlip={setFlip} />
      </div>
    </div>
  );
};

export default BottomActions;
