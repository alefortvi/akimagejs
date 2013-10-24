
/**********************************************/
// Split

	var canvas1 = document.getElementById('canvas1');
	var img = new Image();
	img.src = '../../images/mario2.png';

	
	var Ak1 = AkLoadImage(img,4);
	AkLoadOnCanvas(Ak1,canvas1);
	var Canales = AkSplit(Ak1);
	
/**********************************************/	
// Genero cada canal
	
	var canvas2 = document.getElementById('canvas2');
	var canvas3 = document.getElementById('canvas3');
	var canvas4 = document.getElementById('canvas4');
	var canvas5 = document.getElementById('canvas5');
	
	
/**********************************************/	
// Merge
	
	var R = AkMerge(Canales[0],Canales[0],Canales[0],Canales[3],Ak1);
	var G = AkMerge(Canales[1],Canales[1],Canales[1],Canales[3],Ak1);
	var B = AkMerge(Canales[2],Canales[2],Canales[2],Canales[3],Ak1);
	var A = AkMerge(Canales[3],Canales[3],Canales[3],Canales[3],Ak1);
	
	
	
	AkLoadOnCanvas(R,canvas2);
	AkLoadOnCanvas(G,canvas3);
	AkLoadOnCanvas(B,canvas4);
	AkLoadOnCanvas(A,canvas5);
  
  
