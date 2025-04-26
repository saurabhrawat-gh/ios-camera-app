import React, { useEffect } from "react";
import CameraView from "./components/CameraView";
import MobileFrame from "./components/MobileFrame";

function App() {
  return (
    <MobileFrame>
      <CameraView />
    </MobileFrame>
  );
}

export default App;
