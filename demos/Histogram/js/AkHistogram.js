

/********************* conversion modelos de color **********************/



var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');


var img = new Image();
img.src = './../../images/colores.jpg';


// original
var Ak4 = AkLoadImage(img,0);

//var H1 = AkCreateHist([[0,128],[128,256]]);


var H1 = AkCreateHist([0,256]);
H1 = AkCalcHist(Ak4,H1,HIST_IND);
Ak4 = AkHist2Akimage(H1,1,256,256);
AkLoadOnCanvas(Ak4,canvas1);



