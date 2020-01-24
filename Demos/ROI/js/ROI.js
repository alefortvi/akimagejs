
/**********************************************/
// Split

var canvas1 = document.getElementById('canvas1');
var img = new Image();
img.src = '../../images/lenna256.jpg';






var Ak4 = AkLoadImage(img,1);


var a = 1/9;




var Kernel=[a,a,a,
    a,a,a,
    a,a,a];




var Kernel=[-1,-1,-1,0,0,0,1,1,1];

var R1 = AkCreateROI(50,50,100,100);
Ak4 = AkSetImageROI(Ak4,R1);

var Ak5a = AkFilter2D(Ak4,Kernel,[-1,-1]);



AkLoadOnCanvas(Ak5a,canvas1);
