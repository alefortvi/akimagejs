/**********************************************/
// Crop

var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');

var img = new Image();


img.src = './../../images/lenna256.jpg';



var Ak1 = AkLoadImage(img,1);
var Ak2 = AkLoadImage(img,1);



AkLoadOnCanvas(Ak1,canvas1);

var R1 = AkCreateROI(100,100,150,120);


Ak2 = AkSetImageROI(Ak2,R1);

Ak2 = AkCrop(Ak2);


AkLoadOnCanvas(Ak2,canvas2);

  
