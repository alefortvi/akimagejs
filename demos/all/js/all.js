

/********************* conversion modelos de color **********************/



var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');
var canvas5 = document.getElementById('canvas5');
var canvas6 = document.getElementById('canvas6');
var canvas7 = document.getElementById('canvas7');
var canvas8 = document.getElementById('canvas8');
var canvas9 = document.getElementById('canvas9');
var canvas10 = document.getElementById('canvas10');
var canvas11 = document.getElementById('canvas11');
var canvas12 = document.getElementById('canvas12');
var canvas13 = document.getElementById('canvas13');
var canvas14 = document.getElementById('canvas14');
var canvas15 = document.getElementById('canvas15');
var canvas16 = document.getElementById('canvas16');

var img = new Image();
img.src = './../../images/lenna256.jpg';


// original
var Ak4 = AkLoadImage(img,1);
// gray
var Ak8 = AkLoadImage(img,0);
// one Channel
var OneC = AkCreateImage([Ak4.width,Ak4.height],8,1);

AkLoadOnCanvas(Ak4,canvas1);

// RGB

var RGB = AkSplit(Ak4);

var R = RGB[0];
var G = RGB[1];
var B = RGB[2];

R = AkMerge(R,0,0,0,OneC);
G = AkMerge(G,0,0,0,OneC);
B = AkMerge(B,0,0,0,OneC);

AkLoadOnCanvas(R,canvas2);
AkLoadOnCanvas(G,canvas3);
AkLoadOnCanvas(B,canvas4);


// HSV
var Ak5 = AkCvtColor(Ak4,RGB2HSV);

var HSV = AkSplit(Ak5);

var H = HSV[0];
var S = HSV[1];
var V = HSV[2];

H = AkMerge(H,0,0,0,OneC);
S = AkMerge(S,0,0,0,OneC);
V = AkMerge(V,0,0,0,OneC);

AkLoadOnCanvas(H,canvas5);
AkLoadOnCanvas(S,canvas6);
AkLoadOnCanvas(V,canvas7);



// FOURIER

var Ak2 = AkDFT(Ak8,0,true);



//Separar los dos primeros canales
var _real = [],
    _imag = [];

var Arrays=[];

Arrays = AkSplit(Ak2);
_real = Arrays[0];
_imag = Arrays[1];

var _i=0;

for (var k = 0;k<_real.length;k++){
    _real[k] = Math.log(
        Math.sqrt(
            (_real[k]*_real[k] + _imag[k]*_imag[k])
        )+0.1
    )/Math.log(10);
}

//mezclo en un objeto Akimage
Ak2 = AkMerge(_real,_real,_real,0,Ak2);


AkLoadOnCanvas(Ak2,canvas8);


// filter

// Blur

a = 1/25;

var Kernel=[a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a];


var Ak9 = AkFilter2D(Ak4,Kernel,[-2,-2]);

AkLoadOnCanvas(Ak9,canvas9);

// AF

var Kernel=[-1,-1,-1,
            -1,9,-1,
            -1,-1,-1];


var Ak10 = AkFilter2D(Ak4,Kernel,[-1,-1]);


AkLoadOnCanvas(Ak10,canvas10);


// SOBEL H



var Kernel=[-2,-2,-2,
            0,0,0,
            2,2,2];


var Ak11 = AkFilter2D(Ak4,Kernel,[-1,-1]);

AkLoadOnCanvas(Ak11,canvas11);

// SOBEL V


var Kernel=[-2,0,2,
            -2,0,2,
            -2,0,2];


var Ak12 = AkFilter2D(Ak4,Kernel,[-1,-1]);

AkLoadOnCanvas(Ak12,canvas12);


// ROI MASK

var Ak13 = AkLoadImage(img,1);

var Kernel=[-1,-1,-1,0,0,0,1,1,1];

var R1 = AkCreateROI(50,50,100,100);

Ak13 = AkSetImageROI(Ak13,R1);

var Ak13 = AkFilter2D(Ak13,Kernel,[-1,-1]);

AkLoadOnCanvas(Ak13,canvas13);

//Croping

var Ak14 = AkLoadImage(img,1);


var R1 = AkCreateROI(50,50,100,100);

Ak14 = AkSetImageROI(Ak14,R1);

var Ak14 = AkCrop(Ak14);


AkLoadOnCanvas(Ak14,canvas14);

