

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};


function mode(arr){

    arr.sort();

    var k = 1;

    var currentvalue = arr[0];
    var cantMax = 1;
    var maxValue = arr[0];
    var cantCurrent = 1;

    while(k < arr.length){


        if(arr[k] == currentvalue){

            cantCurrent++;

            if(cantCurrent>cantMax){

                cantMax = cantCurrent;
                maxValue = arr[k];
            }

        }

        else{

            cantCurrent = 1;
            currentvalue = arr[k];

        }

        k++;

    }

    return([maxValue,cantMax]);

}


/********************* Convolucion **********************/



//Imagen original de muestra 



var canvas1 = document.getElementById('canvas1');

var img = new Image();
img.src = './../../images/lenna256.jpg';
	

	
//RGB
//
var Ak4 = AkLoadImage(img,0);

//var Ak4 = AkCreateImage([4,5],8,1);



/*for (var k =0;k<80;k++){

    Ak4.imageData[k] = k;

}
*/



//AkLoadOnCanvas(Ak4,canvas1);


var a = 1/9;


/*var Kernel=[a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a,
            a,a,a,a,a];
*/

var Kernel=[a,a,a,
            a,a,a,
            a,a,a];




var Kernel=[-1,-1,-1,0,0,0,1,1,1];

//console.profile("t1");
//console.time("Lineal");

var Ak5a = AkNonLinealFilter(Ak4,Kernel,[-1,-1],MODEFILTER);

//console.timeEnd("Lineal");



//var Ak5b = AkFilter2D(Ak4,Kernel,[-2,-2]);


AkLoadOnCanvas(Ak5a,canvas1);
