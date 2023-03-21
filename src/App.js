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




  const takeScreenshot = () => {
    document
      .querySelector("a-scene")
      .components.screenshot.capture("perspective");
  };



  return (
    <div className="App">
      <h1>
        SPYC 45th AR
      </h1>


 

      <a-scene physics style={{zIndex: 0}}>
        <a-box
          position="-1 4 -3"
          rotation="0 45 0"
          color="#4CC3D9"
          dynamic-body
        ></a-box>


        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="#7BC8A4"
          static-body
        ></a-plane>
        <a-sky color="#ECECEC"></a-sky>

        <a-assets>
          <a-asset-item
            id="tree"
            src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
          ></a-asset-item>
        </a-assets>

        {/* <!-- Using the asset management system. --> */}
        <a-gltf-model
          src="#tree"
          position="0 2 -5"
          rotation="0 0 0"
          scale="0.02 0.02 0.02"
        ></a-gltf-model>

      </a-scene>
      <h1>Welcome to SPYC AR App</h1>
      <button
        style={{ "z-index": 9999, position: "absolute" }}
        onClick={takeScreenshot}
      >
        Take a screenshot
      </button>


      {!started && (
        <button
        style={{ "z-index": 9999, position: "absolute" }}
            onClick={() => {
              setStarted(true);
            }}
          >
            Start
          </button>
        )}
        {started && (
          <button
        style={{ "z-index": 9999, position: "absolute" }}

            onClick={() => {
              setStarted(false);
            }}
          >
            Stop
          </button>
        )}

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
