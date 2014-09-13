
/**********************************************/
// Split

	var canvas1 = document.getElementById('canvas1');
	var img = new Image();
	img.src = '../../images/lenna256.jpg';

	
	var Ak1 = AkLoadImage(img,1);
	AkLoadOnCanvas(Ak1,canvas1);
	var Channels = AkSplit(Ak1);

//Channel is an array with 4 array in it. One for channel


/**********************************************/	
// Each channel
	
	var R = document.getElementById('canvas2');
	var G = document.getElementById('canvas3');
	var B = document.getElementById('canvas4');
	
	
/**********************************************/	
// Merge


	var R = AkMerge(Channels[0],Channels[0],Channels[0],0,Ak1);
	var G = AkMerge(Channels[1],Channels[1],Channels[1],0,Ak1);
	var B = AkMerge(Channels[2],Channels[2],Channels[2],0,Ak1);

	
	
	AkLoadOnCanvas(R,canvas2);
	AkLoadOnCanvas(G,canvas3);
	AkLoadOnCanvas(B,canvas4);

  
