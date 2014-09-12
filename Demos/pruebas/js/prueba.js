Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};



var canvas = document.getElementById('canvas1');
var canvas1= document.getElementById('canvas2');
var canvas2= document.getElementById('canvas3');
var canvas3= document.getElementById('canvas4');




var img = new Image();
img.src = './../../images/lenna256.jpg';


var Ak = AkLoadImage(img,0);

var kernel = [-1,-1,-1,
             0,0,0,
             1,1,1];

var Ak1 = AkFilter2D(Ak,kernel,[-1,-1]);

AkLoadOnCanvas(Ak1,canvas);

/*

//original image
var Ak = AkLoadImage(img,0);
AkLoadOnCanvas(Ak,canvas);


    var kernel = [

        0,1,2,2,1,0,
        1,1,2,2,1,1,
        2,2,5,5,2,2,
        2,2,5,5,2,2,
        1,1,2,2,1,1,
        0,1,2,2,1,0


    ];

    var A = [];
	var A  = AkFrequencyFilter(Ak,kernel,false);

	
Ak = A[0];
	
	

AkLoadOnCanvas(Ak,canvas1);



*/

//Blurring

var x_ = [];
var y_ = [];

x_[0] = 0;
y_[0] = 0;

for (var k = 1; k<256;k++){

    x_[k] = x_[k-1]+ 0.39; //1/255;
    y_[k] = y_[k-1]+ 0.39; //1/255;
}



//AkNormalizeArray(x_,x_,100,0,1,-1);
//AkNormalizeArray(y_,y_,100,0,1,-1);


//AkNormalizeArray(V,V,100,0,1,-1);


