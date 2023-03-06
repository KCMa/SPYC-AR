function WelcomePage() {
  const takeScreenshot = () => {
    document
      .querySelector("a-scene")
      .components.screenshot.capture("perspective");
  };

  return (
    <div className="WelcomePage">
      <a-scene physics>
        <a-box
          position="-1 4 -3"
          rotation="0 45 0"
          color="#4CC3D9"
          dynamic-body
        ></a-box>

        <a-box
          color="red"
          position="0 2 -5"
          rotation="0 45 45"
          scale="2 2 2"
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
    </div>
  );
}

export default WelcomePage;
