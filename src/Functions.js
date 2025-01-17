if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
  // Firefox 38+ seems having support of enumerateDevicesx
  navigator.enumerateDevices = function (callback) {
    navigator.mediaDevices.enumerateDevices().then(callback);
  };
}

var MediaDevices = [];
var isHTTPs = true;
// location.protocol === "https:";
var canEnumerate = false;

if (
  typeof MediaStreamTrack !== "undefined" &&
  "getSources" in MediaStreamTrack
) {
  canEnumerate = true;
} else if (
  navigator.mediaDevices &&
  !!navigator.mediaDevices.enumerateDevices
) {
  canEnumerate = true;
}

var hasMicrophone = false;
var hasSpeakers = false;
var hasWebcam = false;

var isMicrophoneAlreadyCaptured = false;
var isWebcamAlreadyCaptured = false;

export function checkDeviceSupport(callback) {
  if (!canEnumerate) {
    return;
  }

  if (
    !navigator.enumerateDevices &&
    window.MediaStreamTrack &&
    window.MediaStreamTrack.getSources
  ) {
    navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(
      window.MediaStreamTrack
    );
  }

  if (!navigator.enumerateDevices && navigator.enumerateDevices) {
    navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
  }

  if (!navigator.enumerateDevices) {
    if (callback) {
      callback();
    }
    return;
  }

  MediaDevices = [];
  navigator.enumerateDevices(function (devices) {
    devices.forEach(function (_device) {
      var device = {};
      for (var d in _device) {
        device[d] = _device[d];
      }

      if (device.kind === "audio") {
        device.kind = "audioinput";
      }

      if (device.kind === "video") {
        device.kind = "videoinput";
      }

      var skip;
      MediaDevices.forEach(function (d) {
        if (d.id === device.id && d.kind === device.kind) {
          skip = true;
        }
      });

      if (skip) {
        return;
      }

      if (!device.deviceId) {
        device.deviceId = device.id;
      }

      if (!device.id) {
        device.id = device.deviceId;
      }

      if (!device.label) {
        device.label = "Please invoke getUserMedia once.";
        if (!isHTTPs) {
          device.label =
            "HTTPs is required to get label of this " +
            device.kind +
            " device.";
        }
      } else {
        if (device.kind === "videoinput" && !isWebcamAlreadyCaptured) {
          isWebcamAlreadyCaptured = true;
        }

        if (device.kind === "audioinput" && !isMicrophoneAlreadyCaptured) {
          isMicrophoneAlreadyCaptured = true;
        }
      }

      if (device.kind === "audioinput") {
        hasMicrophone = true;
      }

      if (device.kind === "audiooutput") {
        hasSpeakers = true;
      }

      if (device.kind === "videoinput") {
        hasWebcam = true;
      }

      // there is no 'videoouput' in the spec.

      MediaDevices.push(device);
    });

    if (callback) {
      alert(hasWebcam);
    }
  });
}

// // check for microphone/camera support!
// checkDeviceSupport(function() {
//     document.write('hasWebCam: ', hasWebcam, '<br>');
//     document.write('hasMicrophone: ', hasMicrophone, '<br>');
//     document.write('isMicrophoneAlreadyCaptured: ', isMicrophoneAlreadyCaptured, '<br>');
//     document.write('isWebcamAlreadyCaptured: ', isWebcamAlreadyCaptured, '<br>');
// });
