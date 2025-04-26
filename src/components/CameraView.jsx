import React, { useEffect, useMemo, useRef, useState } from "react";
import useCamera from "../hooks/useCamera";
import { saveImageBlob, getSavedImages } from "../utilities/storage";
import "../styles/cameraView.css";
import {
  ArrowsClockwise,
  ArrowsCounterClockwise,
  CaretDown,
  CaretUp,
  CircleDashed,
  Lightning,
} from "phosphor-react";

const CameraView = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const optionRefs = useRef([]);
  const [flashMessage, setFlashMessage] = useState("");
  const [captureMode, setCaptureMode] = useState("photo");
  const [zoom, setZoom] = useState("0.5");
  const [latestImage, setLatestImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [flash, setFlash] = useState(false);
  const [flip, setFlip] = useState(false);

  useCamera(videoRef);
  useEffect(() => {
    const images = getSavedImages();
    if (images.length > 0) {
      setLatestImage(images[images.length - 1]);
    }
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    canvas.toBlob((blob) => {
      saveImageBlob(blob);
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        setLatestImage(reader.result);
      };
      setFlashMessage("Image has been taken!");
      setTimeout(() => setFlashMessage(""), 2000);
    }, "image/jpeg");
  };

  const handleModeChange = (mode) => {
    setCaptureMode(mode);
    const selectedEl = optionRefs.current[mode];
    if (selectedEl) {
      selectedEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleZoomChange = (z) => {
    setZoom(z);
  };

  const zoomUI = (
    <>
      {["0.5", "1"].map((z) => (
        <span
          key={z}
          className={`zoom ${zoom === z ? "selected" : ""}`}
          onClick={() => handleZoomChange(z)}
        >
          {z}x
        </span>
      ))}
    </>
  );

  const modeUI = (
    <>
      {["time-lapse", "slow-mo", "photo", "video", "portrait", "pano"].map(
        (mode) => (
          <span
            key={mode}
            ref={(el) => (optionRefs.current[mode] = el)}
            className={`option ${captureMode === mode ? "selected" : ""}`}
            onClick={() => handleModeChange(mode)}
          >
            {mode.toUpperCase()}
          </span>
        )
      )}
    </>
  );

  const captureButtonUI = (
    <button className="shutter-button" onClick={handleCapture}>
      <div></div>
    </button>
  );

  const baseActionWrapperUI = (
    <>
      <div className={`${latestImage ? "image-preview" : "hide-preview"}`}>
        {latestImage && <img src={latestImage} alt="Latest capture" />}
      </div>
      {captureButtonUI}
      <span className="icon switch-camera" onClick={() => setFlip(!flip)}>
        {flip ? (
          <ArrowsCounterClockwise size={28} color="#ffffff" />
        ) : (
          <ArrowsClockwise size={28} color="#ffffff" />
        )}
      </span>
    </>
  );

  return (
    <div className="camera-view">
      <video ref={videoRef} className="camera-feed" playsInline muted />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="mobile-notch"></div>

      <div className="camera-overlay">
        <div className="top-bar">
          <span className="icon flash-icon" onClick={() => setFlash(!flash)}>
            {flash ? (
              <Lightning size={24} color="#ffa500" weight="fill" />
            ) : (
              <Lightning size={24} />
            )}
          </span>
          <span
            className="icon up-arrow"
            onClick={() => setShowOptions(!showOptions)}
          >
            {showOptions ? <CaretUp size={24} /> : <CaretDown size={24} />}
          </span>
          <span className="icon settings">
            <CircleDashed size={24} />
          </span>
        </div>
        <div className="bottom-actions">
          <div className="zoom-ui">{zoomUI}</div>
          <div className="options-bar">{modeUI}</div>
          <div className="base-action-wrapper">{baseActionWrapperUI}</div>
        </div>
      </div>

      {flashMessage && <div className="flash-message">{flashMessage}</div>}
    </div>
  );
};

export default CameraView;
