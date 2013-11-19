
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

    AkLoadOnCanvas(Ak1,canvas1);
    var Ak3 = AkResize(Ak1,100,100);
	AkLoadOnCanvas(Ak3,canvas2);

  
