
var OriginalCanvas1 = document.getElementById('canvas1');
var OriginalCanvas2 = document.getElementById('canvas2');
var AddingResult = document.getElementById('canvas3');




var img = new Image();
img.src = './../../images/lenna256.jpg';
var img1 = new Image();
img1.src = './../../images/colores.jpg';

//first image
var Ak1 = AkLoadImage(img,LOAD_IMAGE_COLOR);
AkLoadOnCanvas(Ak1,OriginalCanvas1);
//second image
var Ak2 = AkLoadImage(img1,LOAD_IMAGE_COLOR);
AkLoadOnCanvas(Ak2,OriginalCanvas2);

//ROI for the first image
var R1 = AkCreateROI(100,100,100,100);
//ROI for the second image
var R2 = AkCreateROI(50,150,100,100);

AkSetImageROI(Ak1,R1);
AkSetImageROI(Ak2,R2);

//weights
var w1 = 0.3;
var w2 = 0.7;

var AkResult = AkAddWeighted(Ak1,w1,Ak2,w2);

AkLoadOnCanvas(AkResult,AddingResult);





