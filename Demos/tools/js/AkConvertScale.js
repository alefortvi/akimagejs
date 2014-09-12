

/********************* conversion modelos de color **********************/



var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');


var img = new Image();
img.src = './../../images/colores.jpg';


// original
var Ak4 = AkLoadImage(img,1);
// gray
var Ak4 = AkConvertScale(Ak4,DEPTH_8S,true);
var Ak4 = AkConvertScale(Ak4,DEPTH_8U,true);

var Ak4 = AkCvtColor(Ak4,RGB2HSV);


AkLoadOnCanvas(Ak4,canvas1);



