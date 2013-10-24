
/**********************************************/
// Split

	var canvas1 = document.getElementById('canvas1');
    var canvas2 = document.getElementById('canvas2');

	var img = new Image();
	img.src = './../../images/lenna256.jpg';

	
	var Ak1 = AkLoadImage(img,1);



    AkLoadOnCanvas(Ak1,canvas1);

    var R1 = AkCreateROI(50,50,100,100);

    Ak1 = AkSetImageROI(Ak1,R1);

    var Ak2 = AkCrop(Ak1);


	AkLoadOnCanvas(Ak2,canvas2);

  
