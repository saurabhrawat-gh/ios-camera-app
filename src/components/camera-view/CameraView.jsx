import React, { useEffect, useRef, useState } from "react";
import { saveImageBlob, getSavedImages } from "../../utilities/storage";
import "./cameraView.css";
import { useCamera } from "../../hooks/useCamera";
import TopBar from "./TopBar";
import BottomActions from "./BottomActions";

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
  const [clearStorage, setClearStorage] = useState(null);

  useCamera(videoRef);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.type === "storage") {
        const images = getSavedImages();
        const lastImage = images.length > 0 ? images[images.length - 1] : null;
        setLatestImage(lastImage);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
  };

  const handleZoomChange = (z) => {
    setZoom(z);
  };

  const handleClearStorage = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    setClearStorage(null);
  };

  return (
    <div className="camera-view">
      <video ref={videoRef} className="camera-feed" playsInline muted />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="mobile-notch"></div>

      <div className="camera-overlay">
        <TopBar
          flash={flash}
          setFlash={setFlash}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
        />
        <BottomActions
          latestImage={latestImage}
          flip={flip}
          setFlip={setFlip}
          zoom={zoom}
          handleZoomChange={handleZoomChange}
          captureMode={captureMode}
          handleModeChange={handleModeChange}
          handleCapture={handleCapture}
          setClearStorage={setClearStorage}
        />
      </div>
      {flashMessage && <div className="flash-message">{flashMessage}</div>}
      {clearStorage !== null && (
        <div className="delete-overlay">
          <p>Clear storage?</p>
          <button onClick={handleClearStorage}>Yes, Clear</button>
          <button onClick={() => setClearStorage(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CameraView;
