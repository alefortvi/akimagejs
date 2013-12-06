

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


var kernel = [

    0,1,2,2,1,0,
    1,1,2,2,1,1,
    2,2,5,5,2,2,
    2,2,5,5,2,2,
    1,1,2,2,1,1,
    0,1,2,2,1,0
];

//RGB
//

var Ak4 = AkLoadImage(img,0);



AkLoadOnCanvas(Ak4,canvas1);

var Ak5 = AkFrequencyFilter(Ak4,kernel,false);



AkLoadOnCanvas(Ak5[0],canvas2);

