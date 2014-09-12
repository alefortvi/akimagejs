

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};


/********************* Convolucion **********************/



//Imagen original de muestra 



var canvas1 = document.getElementById('canvas1');

var img = new Image();
img.src = './../../images/lenna256.jpg';
	

	
//RGB
//
var Ak4 = AkLoadImage(img,1);

//var Ak4 = AkCreateImage([4,5],8,1);



/*for (var k =0;k<80;k++){

    Ak4.imageData[k] = k;

}
*/



//AkLoadOnCanvas(Ak4,canvas1);


var a = -1;


/*var Kernel=[a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a];
*/

var Kernel=[a,a,a,
            a,9,a,
            a,a,a];




//var Kernel=[-1,-1,-1,0,0,0,1,1,1];

//console.profile("t1");
//console.time("Lineal");

var Ak5a = AkFilter2D(Ak4,Kernel,[-1,-1]);

//console.timeEnd("Lineal");



//var Ak5b = AkFilter2D(Ak4,Kernel,[-2,-2]);


AkLoadOnCanvas(Ak5a,canvas1);