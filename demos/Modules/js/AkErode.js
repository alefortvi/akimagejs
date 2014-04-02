

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
	

	
//RGB
//
var Ak4 = AkLoadImage(img,0);

//var Ak4 = AkCreateImage([4,5],8,1);



var L = [];

for (var k =0;k<256;k++){


    L[k]=((k/128)^0)*255;

}

Ak4 = AkLUT(Ak4,L,false);

AkLoadOnCanvas(Ak4,canvas1);



var Kernel=[0,1,0,1,1,1,0,1,0];

var Ak5a = AkDilate(Ak4,Kernel,[-1,-1]); //prueba de git


var Ak5a = AkFilter2D(Ak5a,Kernel,[-2,-2]);


AkLoadOnCanvas(Ak5a,canvas2);

var Ak5b = AkErode(Ak4,Kernel,[-1,-1]);
AkLoadOnCanvas(Ak5b,canvas3);