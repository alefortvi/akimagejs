

/********************* conversion modelos de color **********************/



var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');


var img = new Image();
var img1 = new Image();
img.src = './../../images/lenna256.jpg';
img1.src = './../../images/lennaCrop.jpg';


// original
var Ak4 = AkLoadImage(img,LOAD_IMAGE_GRAYSCALE);
//var Ak5 = AkLoadImage(img,1);

//var Ak4 = AkCreateImage([256,256],8,3);


/*
var Xof = 100;
var Yof = 100;

for(var k = Yof;k<106+Yof; k++){
    for(var p = Xof;p<106+Yof;p++){

        AkSet(Ak4,p,k,0,128);

    }

}
*/


AkLoadOnCanvas(Ak4,canvas1);
//AkLoadOnCanvas(Ak5,canvas3);


//var H1 = AkCreateHist([[0,128],[128,256]]);

//var R1=AkCreateROI(0,0,256,256);
//AkSetImageROI(Ak4,R1);



var H1 = AkCreateHist([0,256]);
H1 = AkCalcHist(Ak4,H1,HIST_IND);

var color = [255,255,255];
Ak4 = AkHist2Akimage(H1,HIST_CHANNEL,256,256,true,color);
AkLoadOnCanvas(Ak4,canvas2);

//para intervalos

//var H2 = AkCreateHist([[0,63],[64,128],[128,192],[192,255]]);
//H2 = AkCalcHist(Ak5,H2,HIST_IND);

//Ak5 = AkHist2Akimage(H2,HIST_RED,400,256,true,color);
//AkLoadOnCanvas(Ak5,canvas4);




