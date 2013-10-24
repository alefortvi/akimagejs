
/**********************************************/
// 8 bits

	var canvas1 = document.getElementById('canvas1');

	
	var Ak1 = AkCreateImage([256,256],DEPTH_8U,1);
	
	for(var i = 0;i<65536;i++){	
		Ak1.imageData[(i<<2)] = i>>8;
	}
	
	
	AkLoadOnCanvas(Ak1,canvas1);

	
/**********************************************/	
// RGB

var canvas2 = document.getElementById('canvas2');
	
var Ak2 = AkCreateImage([256,256],DEPTH_32F,3);
	
	for(var i = 0;i<65536;i++){	
		Ak2.imageData[(i<<2)] = i;
		Ak2.imageData[(i<<2)+1] = i * (-1);
		Ak2.imageData[(i<<2)+2] = i;
	}
	
	
	AkLoadOnCanvas(Ak2,canvas2);

	
/**********************************************/	
// RGBA	
	var canvas3 = document.getElementById('canvas3');


var Ak3 = AkCreateImage([256,256],DEPTH_64F,4);
	
	for(var i = 0;i<65536;i++){	
		Ak3.imageData[(i<<2)] = i;
		Ak3.imageData[(i<<2)+1] = i * (-1);
		Ak3.imageData[(i<<2)+2] = i;
		Ak3.imageData[(i<<2)+3] = i>>8;
		
		
	}
	
	AkLoadOnCanvas(Ak3,canvas3);
  
  
