import React, { useEffect, useRef } from "react";
//import 'aframe';
//import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-image-system"];
    sceneEl.addEventListener("renderstart", () => {
      arSystem.start(); // start AR
    });
    return () => {
      arSystem.stop();
    };
  }, []);

  const examplePlane = document.querySelector("#example-plane");
  console.log(examplePlane);
  // examplePlane.addEventListener("click", (event) => {
  //   console.log("plane click");
  // });

  return (
    // <div id="AR-container">
    //   <div id="message-box">This is a message box</div>
    <a-scene
      ref={sceneRef}
      mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      arjs="sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960;"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <a-asset-item
          id="bearModel"
          src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/image-tracking/assets/band-example/bear/scene.gltf"
        ></a-asset-item>
        <a-asset-item
          id="raccoonModel"
          src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/image-tracking/assets/band-example/raccoon/scene.gltf"
        ></a-asset-item>
      </a-assets>

      <a-camera
        position="0 0 0"
        look-controls="enabled: false"
        cursor="fuse: false; rayOrigin: mouse;"
        raycaster="far: ${customFields.libVersion}; objects: .clickable"
      ></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-plane
          id="example-plane"
          src="#card"
          position="0 0 0"
          height="0.552"
          width="1"
          rotation="0 0 0"
          class="clickable"
          color="blue"
        ></a-plane>
        <a-gltf-model
          rotation="0 0 0 "
          position="0 0 0.1"
          scale="0.005 0.005 0.005"
          src="#avatarModel"
          animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>
      </a-entity>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-plane
          src="#card"
          position="0 0 0"
          height="0.552"
          width="1"
          rotation="0 0 0"
        ></a-plane>
        <a-gltf-model
          rotation="0 0 0 "
          position="0 -0.25 0"
          scale="0.05 0.05 0.05"
          src="#raccoonModel"
          animation-mixer
        ></a-gltf-model>
      </a-entity>
      <a-entity mindar-image-target="targetIndex: 1">
        <a-plane
          src="#card"
          position="0 0 0"
          height="0.552"
          width="1"
          rotation="0 0 0"
        ></a-plane>
        <a-gltf-model
          rotation="0 0 0 "
          position="0 -0.25 0"
          scale="0.05 0.05 0.05"
          src="#bearModel"
          animation-mixer
        ></a-gltf-model>
      </a-entity>
    </a-scene>
    // </div>
  );
};
