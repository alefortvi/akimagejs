

/********************* conversion modelos de color **********************/



var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');


var img = new Image();
img.src = './../../images/colores.jpg';


// original
var Ak4 = AkLoadImage(img,1);

var H1 = AkCreateHist([[0,128],[128,256]]);

AkLoadOnCanvas(Ak4,canvas1);



