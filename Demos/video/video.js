var video = document.querySelector("#videoElement");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true, audio: false}, handleVideo, videoError);
}

function handleVideo(stream) {
    video.srcObject = stream;

}



function videoError(e) {
    alert(e)
}
