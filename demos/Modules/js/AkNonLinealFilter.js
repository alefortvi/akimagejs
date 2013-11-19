

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
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');

var img = new Image();
img.src = './../../images/lenna256.jpg';
	

	
//RGB
//
var Ak4 = AkLoadImage(img,0);

AkLoadOnCanvas(Ak4,canvas1);



var Ak5a = AkNonLinealFilter(Ak4,7,[-3,-3],MODEFILTER);

AkLoadOnCanvas(Ak5a,canvas2);