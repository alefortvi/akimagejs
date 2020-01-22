
/**********************************************/
// Blanco y negro
function preloader() {

	var canvas1 = document.getElementById('canvas1');
	var img = new Image();
	img.src = '../../images/lenna256.jpg';
	var Ak1 = AkLoadImage(img,LOAD_IMAGE_GRAYSCALE)
	AkLoadOnCanvas(Ak1,canvas1);



	
/**********************************************/	
// RGB
	var canvas2 = document.getElementById('canvas2');
	var imageURL = '../../images/lenna256.jpg';
	var Ak2 = AkLoadImage(imageURL,LOAD_IMAGE_COLOR);
	AkLoadOnCanvas(Ak2,canvas2);




/**********************************************/	
// RGBA	
	var canvas3 = document.getElementById('canvas3');
	var Ak3 = AkLoadImage(imageURL,LOAD_IMAGE_ANYCOLOR);

	for(var i = 0;i<65536;i++){
		Ak3.imageData[3+(i<<2)] = i>>8;
	}
	AkLoadOnCanvas(Ak3,canvas3);


}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
addLoadEvent(preloader);

