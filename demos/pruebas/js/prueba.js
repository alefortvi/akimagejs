
var canvas = document.getElementById('canvas1');
var canvas1= document.getElementById('canvas2');
var canvas2= document.getElementById('canvas3');
var canvas3= document.getElementById('canvas4');




var img = new Image();
img.src = './../../images/lenna256.jpg';



//original image
var Ak = AkLoadImage(img,LOAD_IMAGE_GRAYSCALE);


AkErrorEnable = false;

var k1 = [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9];
var k2 = [-1,-1,-1,-1,8,-1,-1,-1,-1];
var k3 = [-1,-1,-1,-1,9,-1,-1,-1,-1];


var Ak1 = AkFilter2D(Ak,k1,[-1,-1]);
var Ak2 = AkFilter2D(Ak,k2,[-1,-1]);
var Ak3 = AkFilter2D(Ak,k3,[-1,-1]);

AkLoadOnCanvas(Ak,canvas);
AkLoadOnCanvas(Ak1,canvas1);
AkLoadOnCanvas(Ak2,canvas2);
AkLoadOnCanvas(Ak3,canvas3);







