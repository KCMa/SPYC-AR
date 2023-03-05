import React, { useState } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import MindARViewer from "./mindar-viewer";
import $ from "jquery";

// const { JSDOM } = require("jsdom");
// const { window } = new JSDOM("");
// const $ = require("jquery")(window);

function App() {
  const [started, setStarted] = useState(false);
  const takePicture = () => {
    document.querySelector("video").pause();

    const video = document.getElementsByTagName("video")[0];

    const canvas = document.createElement("canvas");

    var window_width = $(window).outerWidth();
    var window_height = $(window).outerHeight();

    var v_width = $(video).outerWidth();
    var v_height = $(video).outerHeight();

    var a_width =
      document.querySelector("a-scene").components.screenshot.data.width * 0.5;
    var a_height =
      document.querySelector("a-scene").components.screenshot.data.height * 0.5;
    canvas.width = $(window).outerWidth();
    canvas.height = $(window).outerHeight();

    canvas
      .getContext("2d")
      .drawImage(
        video,
        0,
        parseFloat($("video").css("top")),
        v_width,
        v_height
      );

    var imgData = document
      .querySelector("a-scene")
      .components.screenshot.getCanvas("perspective");

    canvas
      .getContext("2d")
      .drawImage(imgData, 0, 0, window_width, window_height);

    if (window.navigator.msSaveOrOpenBlob) {
      var blobObject = canvas.msToBlob();
      window.navigator.msSaveOrOpenBlob(blobObject, "download.png");
    } else {
      var a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpeg");
      console.log(a.href);
      a.download = "download.jpeg";
      a.click();
    }
    document.querySelector("video").play();
  };

  return (
    <div className="App">
      <h1>
        SPYC 45th AR
      </h1>

      <div>
        {!started && (
          <button
            onClick={() => {
              setStarted(true);
            }}
          >
            Start
          </button>
        )}
        {started && (
          <button
            onClick={() => {
              setStarted(false);
            }}
          >
            Stop
          </button>
        )}
      </div>

      {started && (
        <div className="container">
          <MindARViewer />
          <video></video>
        </div>
      )}
      <button onClick={takePicture}>Take Picture</button>
    </div>
  );
}

export default App;
