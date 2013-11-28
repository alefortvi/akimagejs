

/********************* conversion modelos de color **********************/





function init(){
	var canvas1 = document.getElementById('canvas1');
	var canvas2 = document.getElementById('canvas2');
	var canvas3 = document.getElementById('canvas3');
	var canvas4 = document.getElementById('canvas4');
	var canvas5 = document.getElementById('canvas5');
	var canvas6 = document.getElementById('canvas6');
	var canvas7 = document.getElementById('canvas7');
	var canvas8 = document.getElementById('canvas8');
	var canvas9 = document.getElementById('canvas9');
	var canvas10 = document.getElementById('canvas10');
	var canvas11 = document.getElementById('canvas11');
	var canvas12 = document.getElementById('canvas12');
	var canvas13 = document.getElementById('canvas13');
	var canvas14 = document.getElementById('canvas14');
	var canvas15 = document.getElementById('canvas15');
    var canvas16 = document.getElementById('canvas16');
    var canvas17 = document.getElementById('canvas17');
    var canvas18 = document.getElementById('canvas18');
    var canvas19 = document.getElementById('canvas19');
    var canvas20 = document.getElementById('canvas20');
    var canvas21 = document.getElementById('canvas21');
    var canvas22 = document.getElementById('canvas22');
    var canvas23 = document.getElementById('canvas23');
    var canvas24 = document.getElementById('canvas24');
    var canvas25 = document.getElementById('canvas25');
    var canvas26 = document.getElementById('canvas26');
    var canvas27 = document.getElementById('canvas27');
    var canvas28 = document.getElementById('canvas28');
    var canvas29 = document.getElementById('canvas29');
    var canvas30 = document.getElementById('canvas30');
    var canvas31 = document.getElementById('canvas31');
    var canvas32 = document.getElementById('canvas32');
    var canvas33 = document.getElementById('canvas33');
    var canvas34 = document.getElementById('canvas34');
    var canvas35 = document.getElementById('canvas35');
    var canvas36 = document.getElementById('canvas36');



    var img = new Image();
	img.src = './../../images/lenna256.jpg';
    var img1 = new Image();
    img1.src = './../../images/colores.jpg';


	// original
	var Original = AkLoadImage(img,1);
	// gray
	var GRAY = AkLoadImage(img,0);
	// one Channel
	var OneC = AkCreateImage([GRAY.width,GRAY.height],8,1);
    // original
    var Imagen2 = AkLoadImage(img1,1);


	AkLoadOnCanvas(Original,canvas1);

	// RGB

	var RGB = AkSplit(Original);

	var R = RGB[0];
	var G = RGB[1];
	var B = RGB[2];

	R = AkMerge(R,0,0,0,OneC);
	G = AkMerge(G,0,0,0,OneC);
	B = AkMerge(B,0,0,0,OneC);

	AkLoadOnCanvas(R,canvas2);
	AkLoadOnCanvas(G,canvas3);
	AkLoadOnCanvas(B,canvas4);


	// HSV
	var Ak5 = AkCvtColor(Original,RGB2HSV);

	var HSV = AkSplit(Ak5);

	var H = HSV[0];
	var S = HSV[1];
	var V = HSV[2];

	H = AkMerge(H,0,0,0,OneC);
	S = AkMerge(S,0,0,0,OneC);
	V = AkMerge(V,0,0,0,OneC);

	AkLoadOnCanvas(H,canvas5);
	AkLoadOnCanvas(S,canvas6);
	AkLoadOnCanvas(V,canvas7);



	// FOURIER

	var Ak8 = AkDFT(GRAY,0,true);



	//Separar los dos primeros canales
	var _real = [],
		_imag = [];

	var Arrays=[];

	Arrays = AkSplit(Ak8);
	_real = Arrays[0];
	_imag = Arrays[1];

	var _i=0;

	for (var k = 0;k<_real.length;k++){
		_real[k] = Math.log(
			Math.sqrt(
				(_real[k]*_real[k] + _imag[k]*_imag[k])
			)+0.1
		)/Math.log(10);
	}

	//mezclo en un objeto Akimage
	Ak8 = AkMerge(_real,_real,_real,0,Ak8);


	AkLoadOnCanvas(Ak8,canvas8);



    //FOURIER UNIDIMENSiONAL

    var Ak9 = AkDFT(GRAY,DXT_ROWS,true);



    //Separar los dos primeros canales
    var _real = [],
        _imag = [];

    var Arrays=[];

    Arrays = AkSplit(Ak9);
    _real = Arrays[0];
    _imag = Arrays[1];

    var _i=0;

    for (var k = 0;k<_real.length;k++){
        _real[k] = Math.log(
            Math.sqrt(
                (_real[k]*_real[k] + _imag[k]*_imag[k])
            )+0.1
        )/Math.log(10);
    }

    //mezclo en un objeto Akimage
    Ak9 = AkMerge(_real,_real,_real,0,Ak8);


    AkLoadOnCanvas(Ak9,canvas9);





    //Filtrado frecuencia PA


    var kernel = [

        0,1,2,2,1,0,
        1,1,2,2,1,1,
        2,2,5,5,2,2,
        2,2,5,5,2,2,
        1,1,2,2,1,1,
        0,1,2,2,1,0


    ];

    var A  = AkFrequencyFilter(GRAY,kernel,false);

    AkLoadOnCanvas(A[0],canvas10);



    //Filtrado frecuencia PB


    var kernel = [

        0,0,0,0,0,0,
        0,0,0,0,0,0,
        0,0,5,5,0,0,
        0,0,5,5,0,0,
        0,0,0,0,0,0,
        0,0,0,0,0,0


    ];

    var A  = AkFrequencyFilter(GRAY,kernel,true);

    AkLoadOnCanvas(A[0],canvas11);



	// Filtro espacial

	// PB

	a = 1/25;

	var Kernel=[a,a,a,a,a,
				a,a,a,a,a,
				a,a,a,a,a,
				a,a,a,a,a,
				a,a,a,a,a];


	var Ak12 = AkFilter2D(Original,Kernel,[-2,-2]);

	AkLoadOnCanvas(Ak12,canvas12);


	// PA

	var Kernel=[-1,-1,-1,
				-1,9,-1,
				-1,-1,-1];


	var Ak13 = AkFilter2D(Original,Kernel,[-1,-1]);


	AkLoadOnCanvas(Ak13,canvas13);


	// SOBEL H



	var Kernel=[-2,-2,-2,
				0,0,0,
				2,2,2];


	var Ak14 = AkFilter2D(Original,Kernel,[-1,-1]);

	AkLoadOnCanvas(Ak14,canvas14);

	// SOBEL V


	var Kernel=[-2,0,2,
				-2,0,2,
				-2,0,2];


	var Ak15 = AkFilter2D(Original,Kernel,[-1,-1]);

	AkLoadOnCanvas(Ak15,canvas15);


	// ROI MASK


	var Kernel=[-1,-1,-1,0,0,0,1,1,1];

	var R1 = AkCreateROI(50,50,100,100);
    var Ak16 = AkLoadImage(img,1);
	 Ak16 = AkSetImageROI(Ak16,R1);

	Ak16 = AkFilter2D(Ak16,Kernel,[-1,-1]);

	AkLoadOnCanvas(Ak16,canvas16);



	//Croping


	var R1 = AkCreateROI(50,50,100,100);
    var Ak17 = AkLoadImage(img,1);
	Ak17 = AkSetImageROI(Ak17,R1);

	Ak17 = AkCrop(Ak17);

	AkLoadOnCanvas(Ak17,canvas17);


    //Histogram

    // Hisgrama de los 3 canales

    var H1 = AkCreateHist([0,256]);
    H1 = AkCalcHist(Original,H1,HIST_ALLIN1);
    var color = [128,128,128];
    var Ak18 = AkHist2Akimage(H1,HIST_CHANNEL,256,256,true,color);
    AkLoadOnCanvas(Ak18,canvas18);

    //Histogram

    // Hisgrama canal rojo

    var H1 = AkCreateHist([0,256]);
    H1 = AkCalcHist(Original,H1,HIST_IND);
    var color = [255,0,0];
    var Ak19 = AkHist2Akimage(H1,HIST_RED,256,256,true,color);
    AkLoadOnCanvas(Ak19,canvas19);


    // Hisgrama canal rojo

    var H1 = AkCreateHist([[0,63],[64,128],[128,192],[192,256]]);
    H1 = AkCalcHist(Original,H1,HIST_IND);
    var color = [0,255,0];
    var Ak20 = AkHist2Akimage(H1,HIST_GREEN,256,256,true,color);
    AkLoadOnCanvas(Ak20,canvas20);



    // Hisgrama ROI

    var R1 = AkCreateROI(50,50,100,100);
    var Ak21 = AkLoadImage(img,1);
    Ak21 = AkSetImageROI(Ak21,R1);

    var H1 = AkCreateHist([0,256]);
    H1 = AkCalcHist(Ak21,H1,HIST_IND);
    var color = [0,255,255];
    var Ak21 = AkHist2Akimage(H1,HIST_GREEN,256,256,true,color);
    AkLoadOnCanvas(Ak21,canvas21);


    // Suma ponderada


    var Ak22 = AkAddWeighted(Original,0.5,Imagen2,0.5,0);

    AkLoadOnCanvas(Ak22,canvas22);


    // Suma ponderada

    var R1 = AkCreateROI(100,100,100,100);

    var R2 = AkCreateROI(50,150,100,100);

    var Ak23_ = AkLoadImage(img,1);
    var Ak24_ = AkLoadImage(img1,1);


    Ak23_ = AkSetImageROI(Ak23_,R1);
    Ak24_ = AkSetImageROI(Ak24_,R2);

    var Ak23 = AkAddWeighted(Ak23_,0.3,Ak24_,.7,0);

    AkLoadOnCanvas(Ak23,canvas23);


    // LUT (quatificado 4 niveles)


    var L = [];
    var Q = 64; // 4 niveles

    for(var t=0;t<256;t++){

        L[t] = ((t/Q)^0);
        //L[t] = 255-t;
    }

    var Ak24 = AkLUT(Original,L,true);

    AkLoadOnCanvas(Ak24,canvas24);

    // LUT (invertir)


    var L = [];

    var R1 = AkCreateROI(50,50,100,100);
    var Ak25 = AkClone(Original);
    Ak25 = AkSetImageROI(Ak25,R1);

    for(var t=0;t<256;t++){

        L[t] = 255-t;
        //L[t] = 255-t;
    }

    var Ak25 = AkLUT(Ak25,L,false);

    AkLoadOnCanvas(Ak25,canvas25);


    // LUT (Resalto de Rango)


    var L = [];

    for(var t=0;t<256;t++){

        if(t<50 || t>200)
            L[t] = 0;
        else
            L[t] = t;

    }

    var Ak26 = AkLUT(GRAY,L,false);

    AkLoadOnCanvas(Ak26,canvas26);

    // LUT (Correccion gama)

    var L = [];
    var gama = 2.5;
    for(var t=0;t<256;t++){
        L[t] = Math.pow(t,gama);

    }
    var Ak27 = AkLUT(GRAY,L,true);
    AkLoadOnCanvas(Ak27,canvas27);

    // Filter no lineal moda

    var Ak28 = AkNonLinealFilter(Original,5,[-2,-2],MAXFILTER);
    AkLoadOnCanvas(Ak28,canvas28);

    // Filter no lineal moda con ROI

    var R1 = AkCreateROI(100,100,100,100);
    var Ak29 = AkClone(GRAY);
    Ak29 = AkSetImageROI(Ak29,R1);
    Ak29 = AkNonLinealFilter(Ak29,5,[-2,-2],MODEFILTER);
    AkLoadOnCanvas(Ak29,canvas29);


    // Filter no lineal mediana

    var Ak30 = AkNonLinealFilter(Original,7,[-3,-3],MEDIANFILTER);
    AkLoadOnCanvas(Ak30,canvas30);

    // Filter Dilate


    var L = [];
    for (var k =0;k<256;k++){
        L[k]=((k/128)^0)*255;
    }





    var BN  = AkLUT(GRAY,L,false);
    AkLoadOnCanvas(BN,canvas31);

    var Kernel=[0,1,0,1,1,1,0,1,0];


    var Ak32 = AkDilate(BN,Kernel,[-1,-1]);
    AkLoadOnCanvas(Ak32,canvas32);

    // Filter Erode

    var Ak33 = AkErode(BN,Kernel,[-1,-1]);
    AkLoadOnCanvas(Ak33,canvas33);

    var R1 = AkCreateROI(100,100,100,100);
    var Ak34 = AkClone(GRAY);
    Ak34 = AkSetImageROI(Ak34,R1);
    var Kernel=[0,1,0,1,1,1,0,1,0];
    var Ak34 = AkDilate(Ak34,Kernel,[-1,-1]);
    AkLoadOnCanvas(Ak34,canvas34);

    // Resize

    var Ak35 = AkResize(Original,300,300);
    AkLoadOnCanvas(Ak35,canvas35);

    // Resize

    var Ak36 = AkResize(Original,200,200);
    AkLoadOnCanvas(Ak36,canvas36);

}

//preloader

		// Create the loader and queue our 3 images. Images will not 
		// begin downloading until we tell the loader to start. 
	var loader = new PxLoader(); 
    //var ima1 = loader.addImage('../../images/lenna128.jpg'); 
	var ima2 = loader.addImage('../../images/lenna256.jpg');
	//var ima3 = loader.addImage('../../images/lenna512.jpg');
	//var ima4 = loader.addImage('../../images/lenna1024.jpg');
	//var ima5 = loader.addImage('../../images/lennaRec.jpg');
	//var ima6 = loader.addImage('../../images/mario2.png');
	var ima7 = loader.addImage('../../images/colores.jpg');
 
// callback that will be run once images are ready 

// callback that runs every time an image loads 

/*loader.addProgressListener(function(e) { 
 
 //e.completedCount -> imagenes cargadas
 //e.totalCount -> total
 //e.resource.imageNumber -> ultima imagen cargada
 //document.getElementById("preloader").innerHTML = e.totalCount;

}); 
*/

loader.addCompletionListener(function() { 
    document.getElementById("preloader").innerHTML = "";
	
	init();
	
	
}); 
 
// begin downloading images 
loader.start();
