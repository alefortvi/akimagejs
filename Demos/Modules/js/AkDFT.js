

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};


/********************* Convolucion **********************/



//Imagen original de muestra



var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');

var img = new Image();
img.src = './../../images/lenna256.jpg';

var ak = AkLoadImage(img,LOAD_IMAGE_GRAYSCALE);
//Grey Scale
AkLoadOnCanvas(ak,canvas1);


//Separar los dos primeros canales

var AkFFT= AkDFT(ak,DXT_FORWARD,false);


Arrays = AkSplit(AkFFT);

var _real = Arrays[0];
var _imag = Arrays[1];

for (var k = 0;k<_real.length;k++){
    _real[k] = Math.log(
        Math.sqrt(
            (_real[k]*_real[k] + _imag[k]*_imag[k])
        )+0.1
    )/Math.log(10);
}

var Magnitud = AkCreateImage([256,256],DEPTH_32F,1);

AkMerge(_real,_real,_real,0,Magnitud);
AkLoadOnCanvas(Magnitud,canvas2);


AkFFT= AkDFT(AkFFT,DXT_INVERSE,false);

var Arrays = AkSplit(AkFFT);
_real = Arrays[0];
var Ak_inverted = AkCreateImage([256,256],32,1);

AkMerge(_real,_real,_real,0,Ak_inverted);


//RGB
//


AkLoadOnCanvas(Ak_inverted,canvas3);

