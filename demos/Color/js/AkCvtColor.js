

/********************* conversion modelos de color **********************/



var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');

var img = new Image();
img.src = './../../images/colores.jpg';
	

	
//RGB
//
var Ak4 = AkLoadImage(img,1);

var Ak = AkCreateImage([Ak4.width,Ak4.height],8,1);



/*for (var k =0;k<80;k++){

    Ak4.imageData[k] = k;

}
*/



//AkLoadOnCanvas(Ak4,canvas1);


//var a = 1/9;


/*var Kernel=[a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a];
*/

/*var Kernel=[a,a,a,
            a,a,a,
            a,a,a];

*/


//var Kernel=[-1,-1,-1,0,0,0,1,1,1];


//var Ak5a = AkFilter2D(Ak4,Kernel,[-2,-2]);

//console.timeEnd("Lineal");



//var Ak5b = AkFilter2D(Ak4,Kernel,[-2,-2]);


Ak4 = AkCvtColor(Ak4,RGB2HSV);

/*
var V = AkSplit(Ak4);

var H = V[0];
var S = V[1];
var I = V[2];

H = AkMerge(H,0,0,0,Ak);
S = AkMerge(S,0,0,0,Ak);
I = AkMerge(I,0,0,0,Ak);
*/

AkLoadOnCanvas(Ak4,canvas1);

Ak4 = AkCvtColor(Ak4,HSV2RGB);


AkLoadOnCanvas(Ak4,canvas2);




