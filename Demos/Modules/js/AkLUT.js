

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};


/********************* Convolucion **********************/



//Imagen original de muestra 



var OriginalCanvas = document.getElementById('canvas1');
var LutCanvas = document.getElementById('canvas2');

var img = new Image();
img.src = './../../images/lenna256.jpg';
	


var Ak = AkLoadImage(img,LOAD_IMAGE_COLOR);

AkLoadOnCanvas(Ak,OriginalCanvas);

var R1 = AkCreateROI(70,70,100,100);
AkSetImageROI(Ak,R1);


//2 levels quantification
L = [];
for(var t=0;t<256;t++){

    L[t] = ((t/128)^0)*255;

}
//Lut method, don't need normalization
var Ak = AkLUT(Ak,L,false);

AkLoadOnCanvas(Ak,LutCanvas);

