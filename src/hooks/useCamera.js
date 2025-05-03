import { useEffect } from "react";

export const useCamera = (videoRef) => {
  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    startCamera();

    return () => {

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoRef]);
};

