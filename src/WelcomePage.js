function WelcomePage() {
  return (
    <div className="WelcomePage">
      <h1>Welcome to SPYC AR App</h1>
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
        <a-asset-item
          id="avatarModel"
          src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
        ></a-asset-item>
      </a-scene>
      <button>Start</button>
    </div>
  );
}

export default WelcomePage;
