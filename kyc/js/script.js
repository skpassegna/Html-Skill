const selfieoutputer = document.getElementById('selfiebox');

const currentScriptPath = document.currentScript.src;
const currentDirectoryPath = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/'));


// Load models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(currentDirectoryPath + '/../models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri(currentDirectoryPath + '/../models'),
  faceapi.nets.faceLandmark68Net.loadFromUri(currentDirectoryPath + '/../models'),
  faceapi.nets.faceRecognitionNet.loadFromUri(currentDirectoryPath + '/../models')
])
  .then(startWebcam)
  .catch(error => {
    console.error('Error loading models:', error);
  });

function startWebcam() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  })
    .then((stream) => {
      selfieoutputer.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
}
