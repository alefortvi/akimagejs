
/**********************************************/
// Split

	var canvas1 = document.getElementById('canvas1');
    var canvas2 = document.getElementById('canvas2');
    var canvas3 = document.getElementById('canvas3');

	var img = new Image();
    var img2 = new Image();

	img.src = './../../images/lenna256.jpg';
    img2.src = './../../images/colores.jpg';

	
	var Ak1 = AkLoadImage(img,1);
    var Ak2 = AkLoadImage(img2,1);



    AkLoadOnCanvas(Ak1,canvas1);
    AkLoadOnCanvas(Ak2,canvas2);

    //var R1 = AkCreateROI(50,50,100,100);

    //Ak1 = AkSetImageROI(Ak1,R1);

    var Ak3 = AkAddWeighted(Ak1,0.5,Ak2,0.5,0);


	AkLoadOnCanvas(Ak3,canvas3);

  
