

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
img.src = './../../images/lenna256.jpg';
	


var Ak4 = AkLoadImage(img,0);

var R1 = AkCreateROI(70,70,100,100);
AkSetImageROI(Ak4,R1);

L = [];
for(var t=0;t<256;t++){

    L[t] = ((t/128)^0)*255;
    //L[t] = 255-t;
}

var Ak5 = AkLUT(Ak4,L,false);

AkLoadOnCanvas(Ak5,canvas1);

//var Ak6 = AkCrop(Ak4);
//AkLoadOnCanvas(Ak6,canvas2);
