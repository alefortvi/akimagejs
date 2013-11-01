

/********************* conversion modelos de color **********************/



var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');


var img = new Image();
img.src = './../../images/colores.jpg';


// original
var Ak4 = AkLoadImage(img,1);

//var Ak4 = AkCreateImage([256,256],8,3);
AkLoadOnCanvas(Ak4,canvas2);

/*
for(var k = 0;k<204800;k++){

    Ak4.imageData[k]=200;

}

AkLoadOnCanvas(Ak4,canvas2);
*/

//var H1 = AkCreateHist([[0,128],[128,256]]);


var H1 = AkCreateHist([0,256]);
H1 = AkCalcHist(Ak4,H1,HIST_IND);
var color = [255,0,0];
Ak4 = AkHist2Akimage(H1,HIST_BLUE,256,256,true,color);
AkLoadOnCanvas(Ak4,canvas1);



