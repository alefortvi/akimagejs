

/*****************+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/** Constructor por ID ***/

// Creo una imagen y la referencio
 // la asigno al canvas
 // Creo el objeto AKimage y paso el parametro al constructor el ID

  //


//			var canvas = document.getElementById('micanvasOB_');
//			var img = new Image();
//			img.src = 'images/lenna1024.jpg';
//			var ctx = canvas.getContext('2d');
//			canvas.width = 1024;
//			canvas.height = 1024;

//			ctx.drawImage(img, 0, 0);




	//		objImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);






//var aa = AkLoadImage("micanvasID_",1);//"micanvasID"
//AkLoadImage("My_image");//"My_image" imageId

//var aa= AkLoadImage("images/lenna256.jpg",1);//"images/lenna256.jpg"
//AkLoadImage(document.getElementById("micanvasID_"));
//AkLoadImage(document.getElementById("My_image"));


//canvas = AkLoadOnCanvas(aa,canvas);

/**********************+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var tam = 1024;



/*
      var img = new Image();
			img.src = 'images/lenna1024.jpg';


      var canvas = document.createElement("CANVAS");
      var _Actx = canvas.getContext('2d');



var _AKcanvas = document.createElement("CANVAS");






	_Actx.drawImage(img, 0, 0);





							_AKcanvas.getContext('2d').createImageData(img.width, img.height);

								_AKcanvas.getContext('2d').putImageData(
										canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height),
										0,
										0
										);





       aaaa= new Uint8ClampedArray(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data.length);

			 aaaa.set(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data,0);
*/

//		var bb = AkCreateImage([tam,tam],DEPTH_64F,4);



				//		var aa = AkLoadImage("images/lenna1024.jpg",4);

//			var canvas = document.getElementById('micanvasOB_');
	//		var img = new Image();
	//		img.src = 'images/lenna1024.jpg';
	//		var ctx = canvas.getContext('2d');
	//		canvas.width = 1024;
	//		canvas.height = 1024;

//			ctx.drawImage(img, 0, 0);

//			console.profile("t1");
//			console.time("ttt");

//			var aa = AkLoadImage('images/lenna1024.jpg',0);//		//15
//			var aa = AkLoadImage("images/lenna1024.jpg",4);		//20ms

	//		console.timeEnd("ttt");
	//		console.profileEnd("t1");


//			var aa = AkLoadImage("micanvasOB_",4);//		//15
	//		var ab = new Date();
	//		var aa= AkLoadImage("images/lenna256.jpg",4);
			//var aa = AkLoadImage(document.getElementById("micanvasID_"));
	//		var aa= AkLoadImage(document.getElementById("My_image"));
	//		var aa= AkLoadImage("images/lenna256.jpg",0);

//			var bb = AkcreateImage([5,5],2147483664,1);
//			linea1(bb.imageData);
//			linea(bb.imageData);
//			var bb = AkcreateImage([256,256],2147483680,3);
//			cuadrado(bb.imageData);
//			var bb = AkcreateImage([5,2],2147483664,1);
//			cuadradoColor(bb.imageData);
//			canvas = AkLoadOnCanvas(aa,canvas);



		//	alert(normalize(7500,0,255,0,200));
		//	alert(normalize(7500,0,255,0,7500));
	//		var ac = new Date();

	//		var time = Math.abs(ac.getMilliseconds()-ab.getSeconds())+Math.abs((ac.getSeconds() - ab.getSeconds())*1000);

	//		console.log(time);
//			console.timeEnd("ttt");
//			console.profileEnd();

////////////////////////////////CHASQUIBUM/////////////////////////////////////////////////////



	//alert(Math.min(15,20,35,5));

	function cuadrado(arr){

		for(var n=100;n<150;n++){


			for(var nn=20;nn<50;nn++){

				arr[(256*4*nn)+(4*n)+0] = n*nn;
				arr[(256*4*nn)+(4*n)+1] = n*nn;
				arr[(256*4*nn)+(4*n)+2] = n*nn;



	//			arr[(256*4*p)+(4*k)+3] = 255;
			}
		}}

function linea(arr){

for(var rr=50;rr<150;rr++){




				arr[(256*4*200)+(4*rr)+0] = 200;
				arr[(256*4*200)+(4*rr)+1] = 200;
				arr[(256*4*200)+(4*rr)+2] = 200;

	//
		}

	}

function linea1(arr){

	for(var rr=0;rr<arr.length;rr++){




					arr[rr] = 128;


		//
			}

		}


function cuadradoColor(arr){

	for(var n=0;n<5;n++){


		for(var nn=0;nn<2;nn++){

			arr[(5*4*nn)+(4*n)+0] = n*nn;
			arr[(5*4*nn)+(4*n)+1] = n*nn;
			arr[(5*4*nn)+(4*n)+2] = n*nn;



//			arr[(256*4*p)+(4*k)+3] = 255;
		}

	}

		}

function normalize (maxV,minV,nMaxV,nMinV,value){

	return ((value - minV)*((nMaxV-nMinV)/(maxV-minV))+nMinV);

}






/********************* Pruebas FFT **********************/





//lienzo en blanco
var canvas = document.getElementById('micanvasOB_');

var img = new Image();
img.src = 'images/lenna256.jpg';

var interval = 200;


if(!img.width){
cont = 3;
      function delay(interval){
        setTimeout(
              function(){
                             if(!img.width && cont){
                            	 cont--;
                                  delay(interval);
                             }
              }
          ,interval);
      }

  delay(interval);
}


//objeto medante URL


var Ak1 = AkLoadImage(img,0);


var tam = AkGetSize(Ak1);

canvas.width = tam[0];
canvas.height = tam[1];




//cuelgo el objeto
//canvas = AkLoadOnCanvas(Ak1,canvas);
canvasCtx= canvas.getContext("2d");
//canvasCtx.fillStyle = '#ffffff';
//canvasCtx.fillRect(0, 0, Ak1.width, Ak1.height);

//AkLoadOnCanvas(Ak1,canvas);

// la FFT







try {
	var Ak2 = AkCreateImage(tam,32,3);
		Ak2 = AkDFT(Ak1,0,0,true);
		
		// Separar los dos primeros canales
		var _real = [],
			_imag = [];
		
		var Arrays=[];
		
		Arrays = AkSplit(Ak2);
		 _real = Arrays[0];
		 _imag = Arrays[1];
		
		var _i=0;		
	
		
		for (var k = 0;k<_real.length;k++){
			 _real[k] = Math.log(
					 		Math.sqrt(
					 				(_real[k]*_real[k] + _imag[k]*_imag[k])
					 		)
					 	)/Math.log(10);
		}
		
		Ak2 = AkMerge(_real,_real,_real,0,Ak2);
		
		
		AkLoadOnCanvas(Ak2,canvas);

  } catch(e) {
    alert(e);
  }
  

  




  // extraigo un canal solo
  

  
  /*
  
i=0;		
		for(var y=0; y<imageHeight; y++) {
	          i = y*imageWidth;


	          for(var x=0; x<imageWidth; x++) {

	            re[i + x] = Ak1.imageData[(i << 2) + (x << 2)];
	            im[i + x] = 0.0;




	          }
	        }
	
	*/
		
	//	  FFT.fft2d(re, im);
	//	  FrequencyFilter.swap(re, im); //centrado

		
		  
		  
	            
	//	  SpectrumViewer.render(re, im, false);
		  
		  
		  
	/*  var TFF = AkCreateImage(AkGetSize(Ak1),32,1);
		  
		  for(var y=0; y<imageHeight; y++) {
	          i = y*imageWidth;


	          for(var x=0; x<imageWidth; x++) {
				
			//	TFF.imageData[((i + x)<<2)    ]= 
				//TFF.imageData[((i + x)<<2) + 1]= 
				TFF.imageData[((i + x)<<2) + 0]= Math.log(re[i + x]*re[i + x]+im[i + x]*im[i + x]);
			//	TFF.imageData[((i + x)<<2) + 3]= 255;

			}

		  }
		  
		*/  
		  
	
 
  
  
