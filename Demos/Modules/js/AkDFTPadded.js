

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
img.src = './../../images/lenna_alto.jpg';

var ak = AkLoadImage(img,0);




AkLoadOnCanvas(ak,canvas1);


//Separar los dos primeros canales
var _real = [],
    _imag = [];

var Ak8= AkDFTPadded(ak,0,false);

Arrays = AkSplit(Ak8);
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

var Akk = AkCreateImage([256,256],32,1);

AkMerge(_real,_real,_real,0,Akk);
AkLoadOnCanvas(Akk,canvas2);


var Ak9= AkDFTPadded(Ak8,1,false);

var Arrays = AkSplit(Ak9);
_real = Arrays[0];
var Akk = AkCreateImage([256,256],32,1);

AkMerge(_real,_real,_real,0,Akk);


//RGB
//


AkLoadOnCanvas(Akk,canvas3);

