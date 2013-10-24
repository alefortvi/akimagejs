

/********************* Pruebas AkPow **********************/

//lienzo en blanco
var canvas = document.getElementById('micanvasOB_');

var img = new Image();
img.src = 'images/lenna256.jpg'


//objeto medante URL


var Ak1 = AkLoadImage(img,0);


var tam = AkGetSize(Ak1);

canvas.width = tam[0];
canvas.height = tam[1];


	var Ak2 = AkCreateImage([3,3],32,4);
	
	for(var k = 0;k<Ak2.imageData.length;k++){
	
		Ak2.imageData[k*4] = 2;
		Ak2.imageData[(k*4)+1] = 3;
		Ak2.imageData[(k*4)+2] = 4;
		Ak2.imageData[(k*4)+3] = 10;
		
	}
	

	for(var k = 0;k<Ak2.imageData.length;k++){
		
		
		document.getElementById("id1").innerHTML += Ak2.imageData[k]+",   ";
		
	}
	
	Ak2 = AkPow(Ak2,2);

for(var k = 0;k<Ak2.imageData.length;k++){
		
		
		document.getElementById("id2").innerHTML += Ak2.imageData[k]+",   ";
		
	}
