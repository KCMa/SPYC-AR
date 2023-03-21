import React, { useState } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "./App.css";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import MindARViewer from "./mindar-viewer";
import { checkDeviceSupport } from "./Functions";

function App() {
  const [started, setStarted] = useState(null);

  const takePicture = () => {
    const video = document.getElementsByTagName("video")[1];
    console.log(video);
    video.pause();

    const canvas = document.createElement("canvas");
    let v_width = video.clientWidth;
    console.log(video.clientWidth);

    let v_height = video.clientHeight;
    console.log(video.clientHeight);

    canvas.width = v_width;
    canvas.height = v_height;

    // let element = document.querySelector("video"),
    let style = window.getComputedStyle(video),
      top = style.getPropertyValue("top");

    canvas
      .getContext("2d")
      .drawImage(video, 0, parseFloat(top), v_width, v_height);

    let imgData = document
      .querySelector("a-scene")
      .components.screenshot.getCanvas("perspective");

    canvas.getContext("2d").drawImage(imgData, 0, 0, v_width, v_height);

    if (window.navigator.msSaveOrOpenBlob) {
      var blobObject = canvas.msToBlob();
      window.navigator.msSaveOrOpenBlob(blobObject, "SPYC45th.png");
    } else {
      var a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpeg");
      a.download = "SPYC45th.jpeg";
      a.click();
    }
    video.play();
  };

  return (
    <div className="App">
      <div className="control-buttons">
        {started === null && (
          <button
            onClick={() => {
              setStarted(true);
            }}
          >
            Start
          </button>
        )}
        {/* {!started  && (
          <button
            onClick={() => {
              setStarted(false);
            }}
          >
            Stop
          </button>
        )} */}
      </div>

      {started && (
        <div className="container">
          <MindARViewer />
          <video></video>
        </div>
      )}
      {started && (
        <button className="control-buttons" onClick={checkDeviceSupport}>
          Take a picture
        </button>
      )}
    </div>
  );
}

export default App;
