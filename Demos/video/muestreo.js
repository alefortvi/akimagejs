
function drawVideo(v,c,bc,w,h) {
	if(v.paused || v.ended)	return false;
	// First, draw it into the backing canvas
	try{bc.drawImage(v,0,0,w,h);
	// Grab the pixel data from the backing canvas

        var ROI = false;
        var rx = (document.getElementById("Rx").value)^0;
        var ry = (document.getElementById("Ry").value)^0;
        var rw = (document.getElementById("Rw").value)^0;
        var rh =((document.getElementById("Rh").value)*1.33)^0;

        document.getElementById("asd").innerHTML = rh;

        var R1 = AkCreateROI(rx,ry,rw,rh);


        if(document.getElementById("ROI").checked) ROI = true;

    switch(tipo) {




        case 1:
            var KernelS1=[-1,-2,-1,0,0,0,1,2,1];

            Aki_ = AkLoadImage(backa,0);

            if(ROI)
                Aki_ = AkSetImageROI(Aki_,R1);

            Aki_ = AkFilter2D(Aki_,KernelS1,[-1,-1]);

            break;

        case 9:

            var KernelS2=[-1,0,1,-2,0,2,-1,0,1];

            Aki_ = AkLoadImage(backa,0);

            if(ROI)
                Aki_ = AkSetImageROI(Aki_,R1);

            Aki_ = AkFilter2D(Aki_,KernelS2,[-1,-1]);

            break;

        case 10:
            Aki_ = AkLoadImage(backa,0);

            if(ROI)
                Aki_ = AkSetImageROI(Aki_,R1);

            var KernelS1=[-1,-2,-1,0,0,0,1,2,1];
            var KernelS2=[-1,0,1,-2,0,2,-1,0,1];
            var KernelS3=[0,-1,2,1,0,-1,2,1,0];
            var KernelS4=[0,1,2,-1,0,1,-2,-1,0];

            var Aki_1 = AkFilter2D(Aki_,KernelS1,[-1,-1]);
            var Aki_2 = AkFilter2D(Aki_,KernelS2,[-1,-1]);
            var Aki_3 = AkFilter2D(Aki_,KernelS3,[-1,-1]);
            var Aki_4 = AkFilter2D(Aki_,KernelS4,[-1,-1]);

            var H  = AkAddWeighted(Aki_1,0.5,Aki_2,0.5,0);
            var O = AkAddWeighted(Aki_3,0.5,Aki_4,0.5,0);

            //if(ROI)
            //    Aki_ = AkSetImageROI(Aki_,R1);


            Aki_ = AkAddWeighted(H,0.5,O,0.5,0);

            break;

        case 11:
            Aki_ = AkLoadImage(backa,0);

            if(ROI)
                AkSetImageROI(Aki_,R1);

            var Sobel_LUT = [];

            var val = document.getElementById("US").value;
            for(var k = 0;k<256;k++){

                if(k>val){
                    Sobel_LUT[k] = 255;
                }
                else {
                    Sobel_LUT[k] = 0;
                }
            }

            var KernelS1=[-1,-2,-1,0,0,0,1,2,1];
            var KernelS2=[-1,0,1,-2,0,2,-1,0,1];
            var KernelS3=[0,-1,2,1,0,-1,2,1,0];
            var KernelS4=[0,1,2,-1,0,1,-2,-1,0];



            var Aki_1 = AkFilter2D(Aki_,KernelS1,[-1,-1]);
            var Aki_2 = AkFilter2D(Aki_,KernelS2,[-1,-1]);
            var Aki_3 = AkFilter2D(Aki_,KernelS3,[-1,-1]);
            var Aki_4 = AkFilter2D(Aki_,KernelS4,[-1,-1]);

            var H  = AkAddWeighted(Aki_1,0.5,Aki_2,0.5,0);
            var O = AkAddWeighted(Aki_3,0.5,Aki_4,0.5,0);



            Aki_ = AkAddWeighted(H,0.5,O,0.5,0);

            //When you add, the image resulting do not have any ROI defined.
            // That is because of the Add method is implemented.
            // Because you can add a image with a roi defined with another one
            // without roi defined.



            if(ROI)
                AkSetImageROI(Aki_,R1);

            Aki_ = AkLUT(Aki_,Sobel_LUT,false);

            break;

        case 2:
            Aki_ = AkLoadImage(backa,0);

            if(ROI)
                Aki_ = AkSetImageROI(Aki_,R1);

            Aki_ = AkFilter2D(Aki_,KernelB,[-2,-2]);
            break;
        case 3:
            Aki_ = AkLoadImage(backa,0);

            if(ROI)
                Aki_ = AkSetImageROI(Aki_,R1);

            var val = document.getElementById("UBW").value;

            var _LUT_bw = [];

            for(var k = 0;k<256;k++){

                if(k>val){
                    _LUT_bw[k] = 255;
                }
                else {
                    _LUT_bw[k] = 0;
                }
            }

            Aki_ = AkLUT(Aki_,_LUT_bw,false);

            break;
        case 4:

            Aki_ = AkLoadImage(backa,0);



            break;
        case 5:
            Aki_ = AkLoadImage(backa,1);
            break;
        case 6:

            Aki_ = AkLoadImage(backa,0);

            if(ROI)
                Aki_ = AkSetImageROI(Aki_,R1);

            Aki_ = AkLUT(Aki_,_LUT_inv,false);
            break;
        case 7:

            Aki_ = AkLoadImage(backa,0);



            var A = AkFrequencyFilter(Aki_,kernelFF,false);
            Aki_ = A[0];

            break;

        case 8:

            Aki_ = AkLoadImage(backa,0);


            var A = AkFrequencyFilter(Aki_,kernelFFPB,true);
            Aki_ = A[0];

            break;

}



        //Aki_ = AkResize(Aki_,256,200);
        AkLoadOnCanvas(Aki_,rep);





        /*

            var idata = bc.getImageData(0,0,w,h);
            var data = idata.data;
            // Loop through the pixels, turning them grayscale


            idata.data = data;
            // Draw the pixels onto the visible canvas
            c.putImageData(idata,0,0);
            // Start over!
        */
    }
    catch(e){}

    fps = document.getElementById("fps").value;
    fps = (1000/fps)^1;
	setTimeout(drawVideo,fps,v,c,bc,w,h);
}

var Aki_;
var AK = document.getElementById('c');
var rep = document.getElementById('repuesto');
var Kernel=[-1-2-1,0,0,0,1,2,1];
var backa = document.createElement('canvas');


document.addEventListener('DOMContentLoaded', function(){
	var v = document.getElementById('videoElement');


    var canvas = document.getElementById('c');
	var context = canvas.getContext('2d');
	var backcontext = backa.getContext('2d');

	var cw,ch;
 
	v.addEventListener('play', function(){
		cw = v.clientWidth;
		ch = v.clientHeight;
		canvas.width = cw;
		canvas.height = ch;
		backa.width = cw;
		backa.height = ch;



		drawVideo(v,context,backcontext,cw,ch);

	},false);
 
},false);


/********* position **************/

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left)^1,
        y: (evt.clientY - rect.top)^1
    };
}



rep.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(rep, evt);

    //document.getElementById('Texto').innerHTML =  'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    var c = document.getElementById('colorDIV');
    var r, g, b,ch;

    //document.getElementById('Texto').innerHTML = Aki_.nChannels;
    ch = Aki_.nChannels;
    if(ch == 1)
        {r = AkGet(Aki_,mousePos.x,mousePos.y,0);
         g = r;
         b = r;

        }

    else{
        r = AkGet(Aki_,mousePos.x,mousePos.y,0);
        g = AkGet(Aki_,mousePos.x,mousePos.y,1);
        b = AkGet(Aki_,mousePos.x,mousePos.y,2);


    }
    c.style.backgroundColor = "rgb("+r+","+g+","+b+")";
    document.getElementById('Texto').innerHTML = "RGB: "+r+", "+g+", "+b+
    "</br>"+"los valores de estos canales son internos al objeto";



    var vv = document.getElementById('videoElement');

}, false);

if (SNAP === null || SNAP === undefined){
    SNAP = document.getElementById("snap");
}
SNAP.addEventListener('click', function(){

    SnapCANVAS = document.getElementById("snapCANVAS");
    var SN = AkLoadImage(rep,1);
    AkLoadOnCanvas(SN,SnapCANVAS);



});


