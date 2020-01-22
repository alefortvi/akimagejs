var S = document.getElementById("1");
var B = document.getElementById("2");
var BW = document.getElementById("3");
var G = document.getElementById("4");
var RGB = document.getElementById("5");
var LUT = document.getElementById("6");
var FF = document.getElementById("7");
var FFPB = document.getElementById("8");
var S1 = document.getElementById("9");
var S2 = document.getElementById("10");
var S3 = document.getElementById("11");
SNAP = document.getElementById("snap");

var tipo = 1;

var fps = 33;


S.addEventListener('click', function(){tipo = 1;},false);
B.addEventListener('click', function(){tipo = 2;},false);
BW.addEventListener('click', function(){tipo = 3;},false);
G.addEventListener('click', function(){tipo = 4;},false);
RGB.addEventListener('click', function(){tipo = 5;},false);
LUT.addEventListener('click', function(){tipo = 6;},false);
FF.addEventListener('click', function(){tipo = 7;},false);
FFPB.addEventListener('click', function(){tipo = 8;},false);
S1.addEventListener('click', function(){tipo = 9;},false);
S2.addEventListener('click', function(){tipo = 10;},false);
S3.addEventListener('click', function(){tipo = 11;},false);


/* Sobel*/




/* Sobel_LUT */



/* Blur*/


var KernelB= [];

for(var k = 0; k<(5*5); k++){

    KernelB[k] = (1/25);;
}


/* B_W */

var _LUT_bw = [];

for(var k = 0;k<256;k++){

    _LUT_bw[k] = (k>>7)*255;
}

/* Inv */

var _LUT_inv = [];

for(var k = 0;k<256;k++){

    _LUT_inv[k] = 255 - k;
}


/**filtrado frecuencia PA*/


var kernelFF = [

    0,1,2,2,1,0,
    1,1,2,2,1,1,
    2,5,5,5,5,2,
    2,5,5,5,5,2,
    1,1,5,5,1,1,
    0,1,2,2,1,0


];





var kernelFFPB = [

    0,0,0,0,0,0,
    0,0,0,0,0,0,
    0,0,5,5,0,0,
    0,0,5,5,0,0,
    0,0,0,0,0,0,
    0,0,0,0,0,0


];

