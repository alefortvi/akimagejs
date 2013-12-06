

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

var img = new Image();
img.src = './../../images/lenna_dispar.jpg';
	

	
//RGB
//
var Ak4 = AkLoadImage(img,0);

AkLoadOnCanvas(Ak4,canvas1);

var max = Ak4.width;
if(Ak4.height>max){
    max = Ak4.height;
}

var newSize = AkGetOptimalDFTSize(max);
var Ak5 = AkPaddingZero(Ak4,newSize);


AkLoadOnCanvas(Ak5,canvas2);