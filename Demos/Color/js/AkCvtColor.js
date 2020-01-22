

/********************* conversion modelos de color **********************/



var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');

var img = new Image();
img.src = './../../images/lenna256.jpg';
	

	
//RGB
//
var Ak4 = AkLoadImage(img,1);

var Ak = AkCreateImage([Ak4.width,Ak4.height],8,0);



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


var Ak4 = AkCvtColor(Ak4,RGB2HSV);

var HSV = AkSplit(Ak4);

var H_ = HSV[0];
var S_ = HSV[1];
var V_ = HSV[2];

var H = AkCreateImage([256,256],DEPTH_8U,1);
var S = AkCreateImage([256,256],DEPTH_8U,1);
var V = AkCreateImage([256,256],DEPTH_8U,1);

AkMerge(H_,0,0,0,H);
AkMerge(S_,0,0,0,S);
AkMerge(V_,0,0,0,V);

AkLoadOnCanvas(H,canvas1);
AkLoadOnCanvas(S,canvas2);
AkLoadOnCanvas(V,canvas3);


// Ak4 = AkCvtColor(Ak4,HSV2RGB);




