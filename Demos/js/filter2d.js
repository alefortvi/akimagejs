

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

/********************* Pruebas FFT **********************/
/*


// Imagen original de muestra 

var canvas1 = document.getElementById('canvas1');

var img = new Image();
img.src = 'images/lenna248.jpg'
	
//RGB
var Ak4 = AkLoadImage(img,1);
// cargo en canvas
AkLoadOnCanvas(Ak4,canvas1);


// FFT
var canvas2 = document.getElementById('canvas2');
var img = new Image();
img.src = 'images/lenna256.jpg'
var Ak1 = AkLoadImage(img,0);
var tam = AkGetSize(Ak1);
canvas2.width = tam[0];
canvas2.height = tam[1];
var Ak2 = AkCreateImage(tam,32,3);
Ak2 = AkDFT(Ak1,0,true);


//Separar los dos primeros canales
var _real = [],
	_imag = [];

var Arrays=[];

Arrays = AkSplit(Ak2);
 _real = Arrays[0];
 _imag = Arrays[1];

var _i=0;	

//hago magnitud
for (var k = 0;k<_real.length;k++){
	 _real[k] = Math.log(
			 		Math.sqrt(
			 				(_real[k]*_real[k] + _imag[k]*_imag[k])
			 		)
			 	)/Math.log(10);
}

// mezclo en un objeto Akimage
Ak2 = AkMerge(_real,_real,_real,0,Ak2);

//canrgo en canvas
AkLoadOnCanvas(Ak2,canvas2);


//INVERSA
var canvas3 = document.getElementById('canvas3');
var Ak3 = AkCreateImage(tam,32,3);
Ak3 = AkDFT(Ak1,0,false);
//INVERSA
Ak3 = AkDFT(Ak3,1,false);

var Arrays1=[];
Arrays1 = AkSplit(Ak3);




Ak3 = AkMerge(Arrays1[0],Arrays1[0],Arrays1[0],0,Ak3);

AkLoadOnCanvas(Ak3,canvas3);

*/

/********************* Scaling **********************/


/*

// Imagen original de muestra 

var canvas1 = document.getElementById('canvas1');

var img = new Image();
img.src = 'images/lenna256.jpg'
	
//RGB
var Ak4 = AkLoadImage(img,1);
// cargo en canvas
AkLoadOnCanvas(Ak4,canvas1);


// FFT
var canvas2 = document.getElementById('canvas2');
var img = new Image();
img.src = 'images/lenna256.jpg'
var Ak1 = AkLoadImage(img,0);
var tam = AkGetSize(Ak1);
canvas2.width = tam[0];
canvas2.height = tam[1];
var Ak2 = AkCreateImage(tam,32,3);
Ak2 = AkDFT(Ak1,2,false);


//Separar los dos primeros canales
var _real = [],
	_imag = [];

var Arrays=[];

Arrays = AkSplit(Ak2);
 _real = Arrays[0];
 _imag = Arrays[1];

 
 // COINCIDE CON LAS PRUEBAS DE OPENCV!!!
 alert(Math.min.apply(null, _real))
  alert(Math.max.apply(null, _real))
 
var _i=0;	

//hago magnitud
for (var k = 0;k<_real.length;k++){
	 _real[k] = Math.log(
			 		Math.sqrt(
			 				(_real[k]*_real[k] + _imag[k]*_imag[k])
			 		)
			 	)/Math.log(10);
}

// mezclo en un objeto Akimage
Ak2 = AkMerge(_real,_real,_real,0,Ak2);

//canrgo en canvas
AkLoadOnCanvas(Ak2,canvas2);

*/


/********************* DXT_ROWS **********************/
/*



//Imagen original de muestra 

var canvas1 = document.getElementById('canvas1');

var img = new Image();
img.src = 'images/lenna256.jpg'
	
//RGB
var Ak4 = AkLoadImage(img,1);
//cargo en canvas
AkLoadOnCanvas(Ak4,canvas1);


//FFT
var canvas2 = document.getElementById('canvas2');
var img = new Image();
img.src = 'images/lenna256.jpg'
var Ak1 = AkLoadImage(img,0);
var tam = AkGetSize(Ak1);
canvas2.width = tam[0];
canvas2.height = tam[1];

var Ak2 = AkCreateImage(tam,32,3);
Ak2 = AkDFT(Ak1,4,true);


//Separar los dos primeros canales
var _real = [],
	_imag = [];

var Arrays=[];

Arrays = AkSplit(Ak2);
_real = Arrays[0];
_imag = Arrays[1];


// COINCIDE CON LAS PRUEBAS DE OPENCV!!!

var _i=0;	

//hago magnitud
for (var k = 0;k<_real.length;k++){
	 _real[k] = Math.log(
			 		Math.sqrt(
			 				(_real[k]*_real[k] + _imag[k]*_imag[k])
			 		)+0.01
			 	)/Math.log(10);
}

//mezclo en un objeto Akimage
Ak2 = AkMerge(_real,_real,_real,0,Ak2);

//canrgo en canvas
AkLoadOnCanvas(Ak2,canvas2);
*/

/********************* Padding **********************/



//Imagen original de muestra 

var canvas1 = document.getElementById('canvas1');

var img = new Image();
img.src = 'images/lenna248.jpg';
	
	
	
//RGB
var Ak4 = AkLoadImage(img,1);

AkLoadOnCanvas(Ak4,canvas1);


var canvas2 = document.getElementById('canvas2');
var newS = AkGetOptimalDFTSize(Ak4.width);

var Ak8 = AkPaddingZero(Ak4,newS);

AkLoadOnCanvas(Ak8,canvas2);


//FFT
var canvas3 = document.getElementById('canvas3');
var img = new Image();



var Ak2 = AkDFT(Ak8,0,true);


//Separar los dos primeros canales
var _real = [],
	_imag = [];

var Arrays=[];

Arrays = AkSplit(Ak2);
_real = Arrays[0];
_imag = Arrays[1];

var _i=0;	

//hago magnitud
for (var k = 0;k<_real.length;k++){
	 _real[k] = Math.log(
			 		Math.sqrt(
			 				(_real[k]*_real[k] + _imag[k]*_imag[k])
			 		)
			 	)/Math.log(10);
}

//mezclo en un objeto Akimage
Ak2 = AkMerge(_real,_real,_real,0,Ak2);

//canrgo en canvas
AkLoadOnCanvas(Ak2,canvas3);


//INVERSA
var canvas4 = document.getElementById('canvas4');
var Ak3 = AkCreateImage([Ak2.width,Ak2.height],32,3);
Ak3 = AkDFT(Ak8,0,false);
//INVERSA
Ak3 = AkDFT(Ak3,1,false);

var Arrays1=[];
Arrays1 = AkSplit(Ak3);




Ak3 = AkMerge(Arrays1[0],Arrays1[0],Arrays1[0],0,Ak3);



AkLoadOnCanvas(Ak3,canvas4);



/********************* Convolucion **********************/



//Imagen original de muestra 

/*

var canvas1 = document.getElementById('canvas1');

var img = new Image();
img.src = 'images/lenna248.jpg';
	
	
	
//RGB
var Ak4 = AkLoadImage(img,1);





//var Ak4 = AkCreateImage([13,13],32,3);

//for(var k =0; k<13*13;k++){
	
//	Ak4.imageData[k*4]=k;
//}


var Arrays1 = AkFilter2D(Ak4,[0.11,0.11,0.11,0.11,0.11,0.11,0.11,0.11,0.11]);



var _real = Arrays1[0];
var _imag = Arrays1[1];

var _i=0;	

//hago magnitud
for (var k = 0;k<_real.length;k++){
	 _real[k] = Math.log(
			 		Math.sqrt(
			 				(_real[k]*_real[k] + _imag[k]*_imag[k])
			 		)
			 	)/Math.log(10);
}

var Ak4 = AkCreateImage([256,256],32,3);

//mezclo en un objeto Akimage
Ak4 = AkMerge(_real,_real,_real,0,Ak4);

//canrgo en canvas
AkLoadOnCanvas(Ak4,canvas1);



/*
var canvas2 = document.getElementById('canvas2');
var newS = AkGetOptimalDFTSize(Ak4.width);

var Ak8 = AkPaddingZero(Ak4,newS);

AkLoadOnCanvas(Ak8,canvas2);


//FFT
var canvas3 = document.getElementById('canvas3');
var img = new Image();



var Ak2 = AkDFT(Ak8,0,true);


//Separar los dos primeros canales
var _real = [],
	_imag = [];

var Arrays=[];

Arrays = AkSplit(Ak2);
_real = Arrays[0];
_imag = Arrays[1];

var _i=0;	

//hago magnitud
for (var k = 0;k<_real.length;k++){
	 _real[k] = Math.log(
			 		Math.sqrt(
			 				(_real[k]*_real[k] + _imag[k]*_imag[k])
			 		)
			 	)/Math.log(10);
}

//mezclo en un objeto Akimage
Ak2 = AkMerge(_real,_real,_real,0,Ak2);

//canrgo en canvas
AkLoadOnCanvas(Ak2,canvas3);


//INVERSA
var canvas4 = document.getElementById('canvas4');
var Ak3 = AkCreateImage([Ak2.width,Ak2.height],32,3);
Ak3 = AkDFT(Ak8,0,false);
//INVERSA
Ak3 = AkDFT(Ak3,1,false);

var Arrays1=[];
Arrays1 = AkSplit(Ak3);




Ak3 = AkMerge(Arrays1[0],Arrays1[0],Arrays1[0],0,Ak3);



AkLoadOnCanvas(Ak3,canvas4);

*/