import React from "react";
import MobileFrame from "./components/mobile-frame/MobileFrame";
import CameraView from "./components/camera-view/CameraView";

function App() {
  return (
    <MobileFrame>
      <CameraView />
    </MobileFrame>
  );
}

export default App;
