
var OriginalCanvas = document.getElementById('canvas1');
var NewSizeCanvas= document.getElementById('canvas2');





var img = new Image();
img.src = './../../images/lenna256.jpg';



//original image
var Ak = AkLoadImage(img,LOAD_IMAGE_COLOR);
AkLoadOnCanvas(Ak,OriginalCanvas);

AkErrorEnable = false;

var Ak1 = AkResize(Ak,320);
console.log("error "+AKLastError);

var Ak1 = AkResize(Ak,320,320);
AkLoadOnCanvas(Ak1,NewSizeCanvas);





