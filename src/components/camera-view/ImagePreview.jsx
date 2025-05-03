import React from "react";

const ImagePreview = ({ latestImage, setClearStorage }) => {
  return (
    <div
      className={`${latestImage ? "image-preview" : "hide-preview"}`}
      onClick={() => setClearStorage(true)}
    >
      {latestImage ? (
        <img src={latestImage} alt="Latest capture" />
      ) : (
        <img className="hide-preview" src={latestImage} alt="img" />
      )}
    </div>
  );
};

export default ImagePreview;
