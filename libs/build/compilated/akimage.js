
/**
 * Akimage. A JavaScript image processing library
 * autor Ake
 * last compilated version: 2014_05_19
 *
 * **/



/*
 *
 * namespace Akimage
 *
 *
 */

var Akimage = Akimage || {};



Akimage.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = Akimage,
        i;

    // strip redundant leading global
    if (parts[0] === "Akimage") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

/**
 @AKontrol {An GUI for manage and debug errors}
 @AIROI {Class Region Of Interest}
 @AImage {Main objects}

 **/



Akimage.namespace('Akimage.Constants');

/*** Constants ****/

(function (_Akontext) {


    /*
     * Constants Depth
     * */


    // 0 - 255 (integer)
    _Akontext.DEPTH_8U = 8;
    // -128 - 127 (integer)
    _Akontext.DEPTH_8S = 2147483656;
    // -32768 10 ^-3 - 32767 10 ^-3 (integer)
    _Akontext.DEPTH_16S = 2147483664;
    // -2147483648 10 ^-9 - 2147483647 10 ^-9 (integer)
    _Akontext.DEPTH_32S = 2147483680;
    // 1.18e-38 - 3.40e38   (float)
    _Akontext.DEPTH_32F = 32;
    //  2.23e-308 - 1.79e308  (long)
    _Akontext.DEPTH_64F = 64;

    /*
     * Constants Color load
     * */

    //  RGB default
    _Akontext.LOAD_IMAGE_COLOR = 1;
    //  GREY scale
    _Akontext.LOAD_IMAGE_GRAYSCALE = 0;
    //  RGBA default
    _Akontext.LOAD_IMAGE_ANYCOLOR = 4;

    /*
     * Constants DFT
     * */

    //  Foward transformation
    _Akontext.DXT_FORWARD = 0;
    //  Inverse transformation
    _Akontext.DXT_INVERSE = 1;
    //  Scale Result
    _Akontext.DXT_SCALE = 2;
    //  Transform a row
    _Akontext.DXT_ROWS = 4;


    /*
     * Constants AkCvtColor
     * */


    _Akontext.RGB2RGBA = 0;
    _Akontext.RGB2GRAY = 7;
    _Akontext.RGB2HSV = 41;

    _Akontext.RGBA2RGB = 1;
    _Akontext.RGBA2GRAY = 11;

    _Akontext.GRAY2RGB = 8;
    _Akontext.GRAY2RGBA = 9;

    _Akontext.HSV2RGB = 55;


    /*
     * Constants AkNonLinealFilter
     * */


    _Akontext.MAXFILTER = 1;
    _Akontext.MINFILTER = 2;
    _Akontext.MODEFILTER = 4;
    _Akontext.MEDIANFILTER = 8;
    _Akontext.ERODEFILTER = 16;
    _Akontext.DILATEFILTER = 17;


    /*
     * Constants AkHistogram
     * */


    _Akontext.HIST_IND = 1;     //single channel
    _Akontext.HIST_ALLIN1 = 0;  // channel accumulation

    _Akontext.HIST_CHANNEL = 1; //gray level imagen
    _Akontext.HIST_RED = 1;
    _Akontext.HIST_GREEN = 2;
    _Akontext.HIST_BLUE = 4;


})(this);


/**
 @AKontrol {An GUI for manage and debug errors}
 @AIROI {Class Region Of Interest}
 @AImage {Main objects}

 **/







/*
 * @AKontrol
 * Akimage controls variables
 * */

Akimage.namespace('Akimage.AKontrol');


(function (_Akontext) {


    /*** Akimage controls variables ****/

    _Akontext.AkErrorEnable = true;

    _Akontext.AKerrors = [];

    _Akontext.AKLastError = "";




})(this);




/*
 /*
 *
 * @components
 *
 * AImage
 */


Akimage.namespace('Akimage.AImage');

(function (_Akontext) {

    /* AIROI, similar a IPLROI  */

    Akimage.AIROI = function(){

        this.AIROI = {

            xOffset : 0,

            yOffset : 0,

            height: 1,

            width : 1,

            coi : 1

        };
    };




    Akimage.AImage = function(){

        /* AImage, similar a IPLimage  */
        /*** private members ***/

        /*** private methods ***/

        /*	function metodo(atributo){

         return variable;
         }
         */
        /*** public members ***/


        this.AImage = {


            //sizeof(AImage)
            nSize : 0,
            //Version, always equals 0
            ID : 0,
            //Number of channels. 1-4 channels.
            nChannels: 1,

            alphaChannel : 1,
            /*
             * 	AI_DEPTH_8U - unsigned 8-bit integer. Equivalent to CV_8U in matrix types.
             AI_DEPTH_8S - signed 8-bit integer. Equivalent to CV_8S in matrix types.
             AI_DEPTH_16U - unsigned 16-bit integer. Equivalent to CV_16U in matrix types.
             AI_DEPTH_16S - signed 8-bit integer. Equivalent to CV_16S in matrix types.
             AI_DEPTH_32S - signed 32-bit integer. Equivalent to CV_32S in matrix types.
             AI_DEPTH_32F - single-precision floating-point number. Equivalent to CV_32F in matrix types.
             AI_DEPTH_64F - double-precision floating-point number. Equivalent to CV_64F in matrix types
             */
            depth : 8,

            colorModel: [0,0,0,0],

            channelSeq: [0,0,0,0],

            dataOrder : 0,
            //0 - top-left origin, 1 - bottom-left origin (Windows bitmap style)
            origin: 0,
            //Alignment of image rows (4 or 8). OpenCV ignores this and uses widthStep instead.
            align : 4,
            //Image width in pixels
            width : 0,
            //Image height in pixels
            height : 0,

            roi : null,

            //		maskROI : (new Akimage.AImage()).AImage,
            //Image data size in bytes. For interleaved data, this equals {image->height} * {image->widthStep}
            imageSize : 0,
            //A pointer to the aligned image data. Do not assign imageData directly. Use SetData()
            imageData : [],
            //The size of an aligned image row, in bytes.
            widthStep: 0,
            //Border completion mode, ignored by OpenCV
            BorderMode: [0,0,0,0],
            //Constant border value, ignored by OpenCV
            BorderConst: [0,0,0,0]
        };
    };


    /*
     * AKHistogram
     * */


    Akimage.AkHistogram = function(){

        this.AkHistogram = {

            type : 0,

            bins : [],

            thresh: null,

            thresh2: null,

            maxBins : [],

            widthBins:1,

            fullMax : 0,

            intervals : 0
        };
    };



})(this);





/**
 * 	   Input methods
 *
 * 		@Methods
 {AkLoadImage}
 */

/**	 * @loadImage
 * @param {Imagereference}{isColor} object reference, color model
 **/

(function (_Akontext) {

    /* Metodos */
    /**
     * 	   @Methods
     */
    /**	 * @function AkLoadImage
     * @param {object} ImageReference: Object
     * @param  {number} isColor: Color code
     * @return {AImage}
     * @autor Ake
     **/

    /*
     * ImageReference can be
     * 		Image URL source file
     * 		CanvasHTML reference objetc
     * 		ImageHTML reference object
     * 		CanvasHTML ID object
     * 		ImageHTML ID object
     *
     * */

    /*
     *      isColor
     * 		0: Grey Scale
     * 		1: rgb model
     * 		4: rgba
     *
     * */



    _Akontext.AkLoadImage = function(ImageReference,isColor) {

        if (arguments.length<=0 || arguments.length>2) {AKerrors[5]= true; AKLastError=5;return false;}

        isColor = (isColor==undefined) ? 1 : isColor;

        var _Atype = -1;

        var _AIm = (new Akimage.AImage).AImage;

        var _AKcanvas = document.createElement("CANVAS");


        // _Atype = 0	Image URL source file
        // _Atype = 1 	CanvasHTML reference objetc
        // _Atype = 2	ImageHTML reference object
        // _Atype = 3	CanvasHTML ID object
        // _Atype = 4	ImageHTML ID object

        // TYPE 0 (Image URL)

        try{
            var _AKimage = new Image();
            _AKimage.src = ImageReference;

            if(_AKimage.width >0 || _AKimage.height >0){

                _Atype= 0;

                _AIm.width  = _AKimage.width;
                _AIm.height = _AKimage.height;

                _AKcanvas.width=_AKimage.width;
                _AKcanvas.height= _AKimage.height;

                var _Actx = _AKcanvas.getContext('2d');
                _Actx.drawImage(_AKimage, 0, 0);


            }
        }catch(e){AKerrors[2]= true; AKLastError=2;}

        // TYPE 1 (Canvas reference object)

        try{
            if(ImageReference.nodeName == "CANVAS") {

                _Atype= 1;

                //		AKcanvas = ImageReference;

                //		if(AKcanvas.getAttribute("id"))
                //			AKid = AKcanvas.getAttribute("id");

                _AIm.width  = ImageReference.width;
                _AIm.height = ImageReference.height;

                _AKcanvas.width= ImageReference.width;
                _AKcanvas.height= ImageReference.height;

                _AKcanvas.getContext('2d').createImageData(ImageReference.width, ImageReference.height);

                _AKcanvas.getContext('2d').putImageData(
                    ImageReference.getContext('2d').getImageData(0, 0, ImageReference.width, ImageReference.height),
                    0,
                    0
                );

            }



        }catch(e){AKerrors[1]= true; AKLastError=1;}

        //TYPE 2 (Image Object reference)

        try{
            if(ImageReference.nodeName == "IMG") {

                _Atype= 2;

                _AKcanvas.width = ImageReference.width;
                _AKcanvas.height = ImageReference.height;


                _AIm.width  = ImageReference.width;
                _AIm.height = ImageReference.height;


                var _Actx = _AKcanvas.getContext('2d');
                _Actx.drawImage(ImageReference, 0, 0);

            }

        }catch(e){AKerrors[12]= true; AKLastError=12;}

        //TYPE 3 (Canvas ID Object reference)

        try{
            if(document.getElementById(ImageReference).nodeName == "CANVAS"){

                _Atype= 3;

                _AIm.width  = document.getElementById(ImageReference).width;
                _AIm.height = document.getElementById(ImageReference).height;

                _AKcanvas.width= document.getElementById(ImageReference).width;
                _AKcanvas.height= document.getElementById(ImageReference).height;

                _AKcanvas.getContext('2d').createImageData(
                    document.getElementById(ImageReference).width,
                    document.getElementById(ImageReference).height
                );

                _AKcanvas.getContext('2d').putImageData(
                    document.getElementById(ImageReference).getContext('2d').
                        getImageData(
                            0,
                            0,
                            document.getElementById(ImageReference).width,
                            document.getElementById(ImageReference).height
                        ),
                    0,
                    0
                );


            }
        }catch(e){AKerrors[13]= true; AKLastError=13;}

        //TYPE 4 (IMG ID Object reference)

        try{
            if(document.getElementById(ImageReference).nodeName == "IMG"){

                _Atype= 4;

                _AKcanvas.width = document.getElementById(ImageReference).width;
                _AKcanvas.height = document.getElementById(ImageReference).height;


                _AIm.width  = document.getElementById(ImageReference).width;
                _AIm.height = document.getElementById(ImageReference).height;


                var _Actx = _AKcanvas.getContext('2d');
                _Actx.drawImage(document.getElementById(ImageReference), 0, 0);


            }
        }catch(e){AKerrors[14]= true; AKLastError=13;}

        if(_Atype == -1)
        {AKerrors[4]= true; AKLastError=4;}



        /**
         *
         *
         * **/

            // Extracting the ImageData



        _AIm.imageData = new Uint8ClampedArray(_AKcanvas.getContext('2d').getImageData(0, 0, _AKcanvas.width, _AKcanvas.height).data.length);

        _AIm.imageData.set(_AKcanvas.getContext('2d').getImageData(0, 0, _AKcanvas.width, _AKcanvas.height).data,0);

        // managing the color channels


        //isColor:
        /* 1: forced rgb
         * 0: forced gray
         * 4: normal channel (4 channels)
         *
         * */



        switch (isColor){
            case 0:
                _AIm.nChannels = 1;


                ///////////////////
                _coef = [0.3,0.58,0.114];

                var k = _AIm.imageData.length;




                do{
                    _AIm.imageData[k-=4] = (_AIm.imageData[k]*_coef[0])+(_AIm.imageData[k+1]*_coef[1])+(_AIm.imageData[k+2]*_coef[2]);

                }while (k);

//////////////////


                break;
            case 4:
                _AIm.nChannels = 4;

                break;
            default:
                _AIm.nChannels = 3;

                break;
        }


        return (_AIm);

    };



    /**	 * @function {AkCreateImage} size, depth, channels
     *
     **/
    /**
     * 		@param {array} size: Image Size array
     * 		@param {number} depth: bit depth
     * 		@param {number} channels: number of channels
     *      @return {AImage}
     *      @autor Ake
     * */

    _Akontext.AkCreateImage = function(size,depth,channels) {
        // Nro de parametros equivocados
        if (arguments.length<=0 || arguments.length>3) {AKerrors[5]= true; AKLastError=5;return false;}
        //size no es un array
        if (!(Object.prototype.toString.apply(size) === '[object Array]')) {AKerrors[4]= true; AKLastError=4;return false;}
        //parametros indefinidos o nulos

        if(!size || !depth || !channels){AKerrors[4]= true; AKLastError=4;return false;}

        if(channels<1 || channels>4 || channels==2){AKerrors[4]= true; AKLastError=4;return false;}

        if(size[0] <1 || size[1] <1){AKerrors[4]= true; AKLastError=4;return false;}



        var _AIm = (new Akimage.AImage).AImage;

        _AIm.width  = size[0];
        _AIm.height = size[1];
        _AIm.nChannels = channels;
        _AIm.depth = depth;

        switch (depth){
            case (8):
                _AIm.imageData = new Uint8ClampedArray(size[0]*size[1]<<2);

                break;
            case (2147483656):
                _AIm.imageData = new Int8Array(size[0]*size[1]<<2);

                break;
            case (2147483664):
                _AIm.imageData = new Int16Array(size[0]*size[1]<<2);

                break;
            case (2147483680):
                _AIm.imageData = new Int32Array(size[0]*size[1]<<2);

                break;
            case (32):
                _AIm.imageData = new Float32Array(size[0]*size[1]<<2);

                break;
            case (64):
                _AIm.imageData = new Float64Array(size[0]*size[1]<<2);

                break;
            default:
                AKerrors[3]= true; AKLastError=3;return false;
                break;
        }



        /*				_t=_AIm.imageData.length;

         do{
         _AIm.imageData[_t-=4]=0;
         _AIm.imageData[_t+1]=0;
         _AIm.imageData[_t+2]=0;
         _AIm.imageData[_t+3]=0;


         }while (_t);
         */

        return (_AIm);

    };



    /**	 * @function {AkCreateROI} Create a ROI rectangle
     *
     **/
    /**
     * 		@param {number} _xOffset X offset
     * 	@param {number} _yOffset X offset
     * 	@param {number} _Width X offset
     * 	@param {number} _Height X offset
     *      @return {AIROI}
     *      @autor Ake
     * */


    _Akontext.AkCreateROI = function(_xOffset,_yOffset, _Width, _Height) {

        if (arguments.length!=4) {AKerrors[5]= true; AKLastError=5; if(AkErrorEnable) throw "invalid number of arguments";return false;}

        if (_xOffset < 0 || _yOffset <0|| _Width <1|| _Height<1) {AKerrors[4]= true; AKLastError=4; if(AkErrorEnable) throw "invalid value of argument" ;return false;}



        var _AROI = (new Akimage.AIROI).AIROI;

        _AROI.xOffset = _xOffset;
        _AROI.yOffset = _yOffset;
        _AROI.width = _Width;
        _AROI.height = _Height;

        return (_AROI);

    };





    /**	 * @function {AkCreateHist} Create a ROI rectangle
     *
     **/
    /**
     *  @param {number} _xOffset X offset
     * 	@param {number} _yOffset X offset
     * 	@param {number} _Width X offset
     * 	@param {number} _Height X offset
     *      @return {AIROI}
     *      @autor Ake
     * */


    _Akontext.AkCreateHist = function(_bins){

        if (arguments.length!=1) {AKerrors[5]= true; AKLastError=5; if(AkErrorEnable) throw "invalid number of arguments";return false;}
        if (!(Object.prototype.toString.apply(_bins) === '[object Array]')) {AKerrors[19]= true; if(AkErrorEnable) throw "In Histogram array expeted"; AKLastError=19; return false;}

        var multi = false;
        if(_bins[0][0] != undefined) {multi = true;}




        var _Histogram = (new Akimage.AkHistogram()).AkHistogram;




        if(!multi){

            if(_bins[1]<_bins[0])
            {AKerrors[20]= true; AKLastError=20; if(AkErrorEnable) throw "in Histogram invalid hight value is low than low value";return false;}


            // desde primer valor hasta segundo

            for(var k = _bins[0]; k<_bins[1];k++){


                _Histogram.bins[k] = k;

            }

            _Histogram.intervals = _bins[1];

        }



        if(multi){

            var _i = 0;

            _Histogram.intervals = _bins.length;

            // por la cantidad de invervalos

            for(var p= 0; p<_bins.length;p++){


                if(_bins[p][1]<_bins[p][0])
                {AKerrors[20]= true; AKLastError=20; if(AkErrorEnable) throw "in Histogram invalid hight value is low than low value";return false;}

                //dentro del invervalor, desde el primer valor hasta el segundo
                for(var k = _bins[p][0]; k<_bins[p][1];k++){


                    _Histogram.bins[_i] = p;

                    _i++;
                }

            }

        }


        return (_Histogram);

    };

})(this);






/**
 * 	   ROI methods
 *
 */

/* Metodos */
/**
 * 	   @Methods
 */

(function (_Akontext) {

    /**	 * @function AkSetImageROI set a ROI in the Akimage passed by arguments
     * @param {Akimage} ImageReference Object
     * @param  {AROI} Region of interest
     * @autor Ake
     **/


    _Akontext.AkSetImageROI = function(_ImIn, _ROI) {

        _ImIn.roi = _ROI;

        return (_ImIn);

    };


})(this);






/**
 * 	   ROI methods
 *
 */

/* Metodos */
/**
 * 	   @Methods
 */

(function (_Akontext) {

    /**	 * @function AkCalcHist set a ROI in the Akimage passed by arguments
     * @param {Akimage} _ImIn Object
     * @param  {AkHistogram} _Hist Histogram object
     * @param  {number} _Hcode if 3 channel
     * @return {AkHistrogram}
     * @autor Ake
     **/


    _Akontext.AkCalcHist = function(_ImIn, _Hist,_Hcode) {


        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}
        if(!_ImIn.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "expeted Akimage object in arguments"; return false;}
        if(!_Hist.bins){AKerrors[22]= true; AKLastError=22;if(AkErrorEnable) throw "expeted AkHistogram object in arguments"; return false;}



        _Hcode = _Hcode | 0;





        var newYEnd = _ImIn.height;
        var newXEnd = _ImIn.width<<2;
        var newXinit = 0;
        var newYinit = 0;
        //var xOff = 0;



        if(_ImIn.roi != null){


            newYEnd = _ImIn.roi.height+_ImIn.roi.yOffset;
            newXEnd = (_ImIn.roi.width+_ImIn.roi.xOffset)<<2;
            newXinit = (_ImIn.roi.xOffset)<<2;
            newYinit = _ImIn.roi.yOffset;
            //xOff = AImageRefence.roi.xOffset;



        }



        _Hist.maxBins[0] = [];



        if(_ImIn.nChannels==1){

            var k = 0;



            while(k<_Hist.intervals){ // relleno con ceros

                _Hist.maxBins[0][k++]=0;

            }

            var k = newYinit;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_ImIn.width)<<2;
                //var _y1 = (k1*_Owidth)<<2;

                var n = newXinit;
                //var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO
                    _Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n]]]=
                        (_Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n]]]^0)+1;

                    n+=4;

                }
                k+=1;
            }

        }

        if(_ImIn.nChannels>2){


            _Hist.maxBins[0] = [];
            _Hist.maxBins[1] = [];
            _Hist.maxBins[2] = [];

            var k = 0;

            while(k<_Hist.intervals){ // relleno con ceros

                _Hist.maxBins[0][k]   = 0;
                _Hist.maxBins[1][k]   = 0;
                _Hist.maxBins[2][k++] = 0;

            }
            var k = 0;

            if(_Hcode == HIST_IND){



                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;
                    //var _y1 = (k1*_Owidth)<<2;

                    var n = newXinit;
                    //var n1 = xOff<<2;

                    while(n < newXEnd){ // PARA ANCHO
                        _Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n]]]=
                            (_Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n]]]^0)+1;
                        _Hist.maxBins[1][_Hist.bins[_ImIn.imageData[_y+n+1]]]=
                            (_Hist.maxBins[1][_Hist.bins[_ImIn.imageData[_y+n+1]]]^0)+1;
                        _Hist.maxBins[2][_Hist.bins[_ImIn.imageData[_y+n+2]]]=
                            (_Hist.maxBins[2][_Hist.bins[_ImIn.imageData[_y+n+2]]]^0)+1;


                        n+=4;

                    }
                    k+=1;
                }

            }


            if(_Hcode == HIST_ALLIN1){


                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;
                    //var _y1 = (k1*_Owidth)<<2;

                    var n = newXinit;
                    //var n1 = xOff<<2;

                    while(n < newXEnd){ // PARA ANCHO
                        _Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n]]]=
                            (_Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n]]]^0)+1;
                        _Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n+1]]]=
                            (_Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n+1]]]^0)+1;
                        _Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n+2]]]=
                            (_Hist.maxBins[0][_Hist.bins[_ImIn.imageData[_y+n+2]]]^0)+1;

                        n+=4;

                    }
                    k+=1;
                }

            }






        }
        /*if(_ImIn.nChannels==4){


         }
         */


        return (_Hist);

    };


    /**	 * @function AkHist2Akimage: Prepair the Histogram to be showed in a Akimage Object
     * @param {AkHistogram} AkHist Akimage reference,Canvas object reference
     * @param {number} _channels Html Canvas object Reference
     * @param {number} _height Html Canvas object Reference
     * @param {number} _width Html Canvas object Reference
     * @param {boolean} _fill Fill the histogram bar
     * @param {array} _color 3x1 array with the color of the histogram bar
     *
     *
     * @return Akimage object with a AkHistogram
     * @autor Ake
     **/



    _Akontext.AkHist2Akimage = function(AkHist,_channels,_width,_height,_fill,_color) {


        if (arguments.length!=6){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}
        if(!AkHist.bins){AKerrors[22]= true; AKLastError=22;if(AkErrorEnable) throw "expeted AkHistogram object in arguments"; return false;}




        var fullMax = AkHist.maxBins[0][0];

        // _channels
        // 1 : r
        // 2 : g
        // 3 : rg
        // 4 : b
        // 5 : rb
        // 6 : gb
        // 7 :rgb


        var c1=0;
        //var c2=1;

        /*
         * preparo las constantes para acumular
         *
         * */

        switch (_channels){
            case (1):c1 = 0;break;
            case (2):c1 = 1;break;
            // case (3):c1 = 0;c2 = 1;break;
            case (4):c1 = 2;break;
            // case (5):c1 = 0;c2 = 2;break;
            //case (6):c1 = 1;c2 = 2;break;
        };



        /*
         * busco mayor
         *
         * */

        switch (_channels){
            // R,G,B
            case (1):case (2):case (4):

            var k = AkHist.maxBins[c1].length;

            do{
                k-=1;
                if(AkHist.maxBins[c1][k]>fullMax)
                {fullMax = AkHist.maxBins[c1][k]}

            }while(k);

            break;

            /*           //Para 2 canales RG,RB,GB
             case (3):case (5):case (6):

             var k = AkHist.maxBins[c1].length;

             do{
             k-=1;
             if(AkHist.maxBins[c1][k]>fullMax)
             {fullMax = AkHist.maxBins[c1][k]}
             if(AkHist.maxBins[c2][k]>fullMax)
             {fullMax = AkHist.maxBins[c2][k]}


             }while(k);


             break;

             //RGB
             case (7):


             var k = AkHist.maxBins[0].length;

             do{
             k-=1;
             if(AkHist.maxBins[0][k]>fullMax)
             {fullMax = AkHist.maxBins[0][k]}
             if(AkHist.maxBins[1][k]>fullMax)
             {fullMax = AkHist.maxBins[1][k]}
             if(AkHist.maxBins[2][k]>fullMax)
             {fullMax = AkHist.maxBins[2][k]}


             }while(k);

             break;

             */
        }

        /*
         * pinto las barras
         *
         * */



        switch (_channels){
            // R,G,B
            case (1):case (2):case (4):

            var _Q = (_height / fullMax);

            var ancho = AkHist.maxBins[0].length;

            var ImS = AkCreateImage([ancho,_height],8,3);


            //var k = AkHist.maxBins[c1].length;




            if  (_fill){


                var k =0;

                while(k<ancho){ //ALTO


                    //var _y = (k*_height)<<2;
                    var _esquina = (_height-1)*ancho<<2;

                    //var _y1 = (k1*_Owidth)<<2;


                    //var n1 = xOff<<2;

                    var n = 0;

                    var p = (k<<2);

                    //El bins contiene el mayor, de ahi completo para abajo

                    var _max = (AkHist.maxBins[c1][k]*_Q)^0;

                    while(n < _max){ // PARA ANCHO


                        ImS.imageData[_esquina+p] = _color[0];
                        ImS.imageData[_esquina+p+1] = _color[1];
                        ImS.imageData[_esquina+p+2] = _color[2];
                        ImS.imageData[_esquina+p+3] = 255;



                        n++;
                        _esquina-=(ancho<<2);

                    }
                    k+=1;
                }
            }

            if(!_fill){


                var p = AkHist.maxBins[0].length-1;
                var k = 0;


                do{

                    var _h =  (_height - (AkHist.maxBins[c1][k] *_Q))^0;

                    p--;
                    ImS.imageData[((_h*ancho)<<2) + (k<<2)] = _color[0];
                    ImS.imageData[((_h*ancho)<<2) + (k<<2)+1] = _color[1];
                    ImS.imageData[((_h*ancho)<<2) + (k<<2)+2] = _color[2];
                    ImS.imageData[((_h*ancho)<<2) + (k<<2)+3] = 255;

                    k++;


                }while(p);


            }



            break;
        }



        //hasta aca el histograma tiene el ancho del Maxbins

        //escalar y rotar

        //crear CANVAS

        var _AKcanvasOld = document.createElement("CANVAS");
        var _AKcanvasNew = document.createElement("CANVAS");


        _AKcanvasNew.width = _width;
        _AKcanvasNew.height = _height;

        _AKcanvasOld.width = ancho;
        _AKcanvasOld.height = _height;

        var objImageData= _AKcanvasOld.getContext('2d').createImageData(ancho, _height);

        objImageData.data.set(ImS.imageData);

        _AKcanvasOld.getContext('2d').putImageData(objImageData, 0, 0);

        _AKcanvasNew.getContext("2d").drawImage(_AKcanvasOld,0,0,_width,_height);

        var _ImS = AkCreateImage([_width,_height],8,3);
        _ImS.imageData =_AKcanvasNew.getContext('2d').getImageData(0, 0,_width,_height).data;



        return _ImS;




    };








})(this);


Akimage.namespace('Akimage.Modules');




/* Tools */
/**
 * 	   @Modules
 */




(function (_Akontext) {


    /*
     Local functions for non linear filters
     */
/**
    @autor Ake
 **/

    var _maxF = function (Arr){
        return Math.max.apply( Math, Arr )

    };

    /**
     @autor Ake
     **/

    var _minF = function (Arr){
        return Math.min.apply( Math, Arr )

    };

    /**
     @autor Ake
     **/

    var _modeF = function (Arr){
        Arr.sort();
        var k = 1;
        var currentValue = Arr[0];
        var cantMax = 1;
        var maxValue = Arr[0];
        var cantCurrent = 1;

        while(k < Arr.length){


            switch(Arr[k]){
                case (currentValue):
                    cantCurrent++;
                    if(cantCurrent>cantMax){
                        cantMax = cantCurrent;
                        maxValue = Arr[k];
                    }
                break;
                default :
                    cantCurrent = 1;
                    currentValue = Arr[k];
                break;

            }
            k++;
        }
        return(maxValue);
    };

    /**
     @autor Ake
     **/

    var _medianF = function (Arr){
        Arr.sort();
        return (Arr[(Arr.length*.5)^0]);

    };

    /**
     @autor Ake
     **/

    var _dilateF = function (Arr,_K){

        var _Max = Number.MIN_VALUE;
        var k = 0;
        while(k<Arr.length){
            if((_K[k] && Arr[k])>_Max){
                _Max = Arr[k];
            }
            k++;
        }

        return (_Max);

    };

    /**
     @autor Ake
     **/

    var _erodeF = function (Arr,_K){

        var _min = Number.MAX_VALUE;
        var k = 0;
        while(k<Arr.length){
            if((_K[k] && Arr[k])<_min){
                _min = Arr[k];
            }
            k++;
        }

        return (_min);

    };



    /*Generic filter*/

    /**
     @autor Ake
     **/

    var _genericFilter = function(AImageRefence,_KernelWidth,_KernelHeight,_Anchor,ToFilter,_kernel){

        var _filter;

        switch(ToFilter){

            case MAXFILTER :_filter = _maxF; break;
            case MINFILTER : _filter = _minF; break;
            case MODEFILTER : _filter = _modeF; break;
            case MEDIANFILTER : _filter = _medianF; break;
            case DILATEFILTER : _filter = _dilateF; break;
            case ERODEFILTER : _filter = _erodeF; break;
            default :AKerrors[24]= true; AKLastError=24;if(AkErrorEnable) throw "AkNon Lineal Filter:  Invalid Filter Code"; break;

        }


        var ImS = AkCreateImage([AImageRefence.width, AImageRefence.height], AImageRefence.depth, AImageRefence.nChannels);
        var ImP = AkCreateImage([AImageRefence.width+(_KernelWidth<<1), AImageRefence.height+(_KernelWidth<<1)], AImageRefence.depth, AImageRefence.nChannels);

        var _Nwidth =  AImageRefence.width+(_KernelWidth<<1);
        var _Nheight = AImageRefence.height+(_KernelHeight<<1);
        var _Owidth =  AImageRefence.width;
        var _Oheight = AImageRefence.height;

        //ancla incluye la multiplicacion por 4

        var _ancla = ((_Nwidth*_Anchor[0])+_Anchor[1])<<2;


        var k = 0;



        // Get the global positions of the kernel values in the image
        var _GlobalPostions = [];

        while(k<(_KernelWidth*_KernelHeight)){

            _GlobalPostions[_GlobalPostions.length] =
                ((Math.floor(k/_KernelWidth)*_Nwidth)+(k%_KernelWidth))<<2;


            k++;
        }
        // variables x4

        var _b = ((_Nwidth+1)*_KernelWidth<<2);

        var _Ow = _Owidth<<2;
        var _Nw = _Nwidth<<2;
        var _Kw = _KernelWidth<<2;
        var _c =  _Owidth*(_Oheight-_KernelHeight)<<2;
        var _d =  _c + _Ow;
        var _e = (((_Nheight - 1) * _Nwidth) + _KernelWidth)<<2;
        var _f = _Kw + _Ow;


        //lets convolve

        //detectar canales


        var _ind = 0;

        if(AImageRefence.nChannels==1){ // SI CANAL 1


            // Periodic boundary conditions
            /* PADDING */


            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));
            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelHeight;k++){


                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);
            }

            // DERECHA IZQUIERDA

            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                }


            }


            var newYEnd = _Oheight+_KernelHeight;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelHeight;
            var xOff = 0;



            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelHeight;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelHeight;
                xOff = AImageRefence.roi.xOffset;

            }


            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelHeight;

            //for(var k = _KernelWidth; k<_Oheight+_KernelWidth; k++){

            while(k<newYEnd){ //PARA ALTO
                //Suma global

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;


                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    //arreglo de elemetos de la mascara
                    var _temp = [];

                    var m = 0;


                    // push in _temp the local value for the mask

                    while(m < _GlobalPostions.length){ //Local mask

                        _temp.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m++]]);
                    }

                    //filter conditions

                    //////// HERE IS THE STATISTICAL FUNCTION ////////

                    var _M = _filter(_temp,_kernel);

                    // TO HERE


                    if(AImageRefence.roi != null){
                        ImS.imageData[_y1+n1] = _M;
                    }

                    if(AImageRefence.roi == null){
                        ImS.imageData[_ind] = _M;
                    }

                    _ind+=4;
                    n+=4;
                    n1+=4;

                } // FIN PARA ANCHO


                k++;
                k1++;

            } // FIN PARA ALTO



        } // FIN SI CANAL 1

        if(AImageRefence.nChannels == 3){ // SI RGB



            /* PADDING */

            // Periodic boundary conditions
            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));

            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelHeight;k++){


                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);


            }

            // DERECHA IZQUIERDA


            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                    //GREEN
                    ImP.imageData[(k*_Nw)+_Kw - j - 3] = ImP.imageData[(k*_Nw)+_Kw + j +1];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 1] = ImP.imageData[(k*_Nw)+(_f) - j-3];

                    //BLUE
                    ImP.imageData[(k*_Nw)+_Kw - j - 2] = ImP.imageData[(k*_Nw)+_Kw + j +2];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 2] = ImP.imageData[(k*_Nw)+(_f) - j-2];

                }


            }

            var newYEnd = _Oheight+_KernelHeight;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelHeight;
            var xOff = 0;

            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelHeight;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelHeight;
                xOff = AImageRefence.roi.xOffset;


            }

            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelHeight;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;

                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    var _tempR = [];
                    var _tempG = [];
                    var _tempB = [];

                    var m = 0;

                    while(m < _GlobalPostions.length){ //Local mask

                        _tempR.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m]]);
                        _tempG.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m]+1]);
                        _tempB.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m++]+2]);

                    }

                    //filter conditions

                    //////// HERE IS THE STATISTICAL FUNCTION ////////

                    var _MR = _filter(_tempR,_kernel);
                    var _MG = _filter(_tempG,_kernel);
                    var _MB = _filter(_tempB,_kernel);


                    // TO HERE

                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _MR;
                        ImS.imageData[_y1+n1+1] = _MG;
                        ImS.imageData[_y1+n1+2] = _MB;
                    }


                    if(AImageRefence.roi == null){
                        //asignacion de pixel
                        ImS.imageData[_ind]     = _MR;
                        ImS.imageData[_ind+1]   = _MG;
                        ImS.imageData[_ind+2]   = _MB;
                    }

                    _ind+=4;
                    n+=4;
                    n1+=4;
                } // FIN PARA ANCHO

                k++;
                k1++;


            } // FIN PARA ALTO


        }//FIN SI RGB



        if(AImageRefence.nChannels == 4){ //SI RGBA



            /* PADDING */

            // Periodic boundary conditions
            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));

            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelHeight;k++){


                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);


            }

            // DERECHA IZQUIERDA


            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                    //GREEN
                    ImP.imageData[(k*_Nw)+_Kw - j - 3] = ImP.imageData[(k*_Nw)+_Kw + j +1];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 1] = ImP.imageData[(k*_Nw)+(_f) - j-3];

                    //BLUE
                    ImP.imageData[(k*_Nw)+_Kw - j - 2] = ImP.imageData[(k*_Nw)+_Kw + j +2];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 2] = ImP.imageData[(k*_Nw)+(_f) - j-2];

                }


            }

            var newYEnd = _Oheight+_KernelHeight;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelHeight;
            var xOff = 0;

            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelHeight;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelHeight;
                xOff = AImageRefence.roi.xOffset;


            }

            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelWidth;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;

                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    var _tempR = [];
                    var _tempG = [];
                    var _tempB = [];

                    var m = 0;


                    while(m < _GlobalPostions.length){ //Local mask

                        _tempR.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m]]);
                        _tempG.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m]+1]);
                        _tempB.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m++]+2]);

                    }

                    //filter conditions

                    //////// HERE IS THE STATISTICAL FUNCTION ////////

                    var _MR = _filter(_tempR,_kernel);
                    var _MG = _filter(_tempG,_kernel);
                    var _MB = _filter(_tempB,_kernel);

                    // TO HERE

                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _MR;
                        ImS.imageData[_y1+n1+1] = _MG;
                        ImS.imageData[_y1+n1+2] = _MB;
                        ImS.imageData[_y1+n1+3] = ImP.imageData[_y1+n1+3];
                    }


                    if(AImageRefence.roi == null){
                        //asignacion de pixel
                        ImS.imageData[_ind]     = _MR;
                        ImS.imageData[_ind+1]   = _MG;
                        ImS.imageData[_ind+2]   = _MB;
                        ImS.imageData[_ind+3]   = ImP.imageData[_ind+3];
                    }

                    _ind+=4;
                    n1+=4;
                    n+=4;

                } // FIN PARA ANCHO
                k1++;
                k++

            } // FIN PARA ALTO


        } // FIN SI RGBA


        return  (ImS);
    }; // END FUNCTION

    /* Private FFT */

    /**
     * @autor wellflat
     * @link https://github.com/wellflat/javascript-labs/tree/master/cv/fft
     *
     * **/

    var _FFT = function(re,im,_nn,inv,swap){


        var FFT;           // top-level namespace
        var _root = this;  // reference to 'window' or 'global'

        if(typeof exports !== 'undefined') {
            FFT = exports;   // for CommonJS
        } else {
            FFT = _root.FFT = {};
        }
        FFT.toString = function() {
            return "version " + version.release + ", released " + version.date;
        };

        // core operations
        var _n = 0,          // order
            _bitrev = null,  // bit reversal table
            _cstb = null;    // sin/cos table
        var core = {
            init : function(n) {
                if(n !== 0 && (n & (n - 1)) === 0) {
                    _n = n;
                    core._initArray();
                    core._makeBitReversalTable();
                    core._makeCosSinTable();
                } else {
                    if(AkErrorEnable) throw new Error("init: radix-2 required");
                }
            },
            // 1D-FFT
            fft1d : function(re, im) {
                core.fft(re, im, 1);
            },
            // 1D-IFFT
            ifft1d : function(re, im) {
                var n = 1/_n;
                core.fft(re, im, -1);
                for(var i=0; i<_n; i++) {
                    re[i] *= n;
                    im[i] *= n;
                }
            },
            // 2D-FFT
            fft2d : function(re, im) {
                var tre = [],
                    tim = [],
                    i = 0;
                // x-axis
                for(var y=0; y<_n; y++) {
                    i = y*_n;
                    for(var x1=0; x1<_n; x1++) {
                        tre[x1] = re[x1 + i];
                        tim[x1] = im[x1 + i];
                    }
                    core.fft1d(tre, tim);
                    for(var x2=0; x2<_n; x2++) {
                        re[x2 + i] = tre[x2];
                        im[x2 + i] = tim[x2];
                    }
                }
                // y-axis
                for(var x=0; x<_n; x++) {
                    for(var y1=0; y1<_n; y1++) {
                        i = x + y1*_n;
                        tre[y1] = re[i];
                        tim[y1] = im[i];
                    }
                    core.fft1d(tre, tim);
                    for(var y2=0; y2<_n; y2++) {
                        i = x + y2*_n;
                        re[i] = tre[y2];
                        im[i] = tim[y2];
                    }
                }
            },
            // 2D-IFFT
            ifft2d : function(re, im) {
                var tre = [],
                    tim = [],
                    i = 0;
                // x-axis
                for(var y=0; y<_n; y++) {
                    i = y*_n;
                    for(var x1=0; x1<_n; x1++) {
                        tre[x1] = re[x1 + i];
                        tim[x1] = im[x1 + i];
                    }
                    core.ifft1d(tre, tim);
                    for(var x2=0; x2<_n; x2++) {
                        re[x2 + i] = tre[x2];
                        im[x2 + i] = tim[x2];
                    }
                }
                // y-axis
                for(var x=0; x<_n; x++) {
                    for(var y1=0; y1<_n; y1++) {
                        i = x + y1*_n;
                        tre[y1] = re[i];
                        tim[y1] = im[i];
                    }
                    core.ifft1d(tre, tim);
                    for(var y2=0; y2<_n; y2++) {
                        i = x + y2*_n;
                        re[i] = tre[y2];
                        im[i] = tim[y2];
                    }
                }
            },
            // core operation of FFT
            fft : function(re, im, inv) {
                var d, h, ik, m, tmp, wr, wi, xr, xi,
                    n4 = _n >> 2;
                // bit reversal
                for(var l=0; l<_n; l++) {
                    m = _bitrev[l];
                    if(l < m) {
                        tmp = re[l];
                        re[l] = re[m];
                        re[m] = tmp;
                        tmp = im[l];
                        im[l] = im[m];
                        im[m] = tmp;
                    }
                }
                // butterfly operation
                for(var k=1; k<_n; k<<=1) {
                    h = 0;
                    d = _n/(k << 1);
                    for(var j=0; j<k; j++) {
                        wr = _cstb[h + n4];
                        wi = inv*_cstb[h];
                        for(var i=j; i<_n; i+=(k<<1)) {
                            ik = i + k;
                            xr = wr*re[ik] + wi*im[ik];
                            xi = wr*im[ik] - wi*re[ik];
                            re[ik] = re[i] - xr;
                            re[i] += xr;
                            im[ik] = im[i] - xi;
                            im[i] += xi;
                        }
                        h += d;
                    }
                }
            },
            // initialize the array (supports TypedArray)
            _initArray : function() {
                if(typeof Uint8Array !== 'undefined') {
                    _bitrev = new Uint8Array(_n);
                } else {
                    _bitrev = [];
                }
                if(typeof Float64Array !== 'undefined') {
                    _cstb = new Float64Array(_n*1.25);
                } else {
                    _cstb = [];
                }
            },
            // makes bit reversal table
            _makeBitReversalTable : function() {
                var i = 0,
                    j = 0,
                    k = 0;
                _bitrev[0] = 0;
                while(++i < _n) {
                    k = _n >> 1;
                    while(k <= j) {
                        j -= k;
                        k >>= 1;
                    }
                    j += k;
                    _bitrev[i] = j;
                }
            },
            // makes trigonometiric function table
            _makeCosSinTable : function() {
                var n2 = _n >> 1,
                    n4 = _n >> 2,
                    n8 = _n >> 3,
                    n2p4 = n2 + n4,
                    t = Math.sin(Math.PI/_n),
                    dc = 2*t*t,
                    ds = Math.sqrt(dc*(2 - dc)),
                    c = _cstb[n4] = 1,
                    s = _cstb[0] = 0;
                t = 2*dc;
                for(var i=1; i<n8; i++) {
                    c -= dc;
                    dc += t*c;
                    s += ds;
                    ds -= t*s;
                    _cstb[i] = s;
                    _cstb[n4 - i] = c;
                }
                if(n8 !== 0) {
                    _cstb[n8] = Math.sqrt(0.5);
                }
                for(var j=0; j<n4; j++) {
                    _cstb[n2 - j]  = _cstb[j];
                }
                for(var k=0; k<n2p4; k++) {
                    _cstb[k + n2] = -_cstb[k];
                }
            },
            //Swap function
            swap : function(re, im) {
                var xn, yn, i, j, k, l, tmp,
                    len = _n >> 1;
                for(var y=0; y<len; y++) {
                    yn = y + len;
                    for(var x=0; x<len; x++) {
                        xn = x + len;
                        i = x + y*_n;
                        j = xn + yn*_n;
                        k = x + yn*_n;
                        l = xn + y*_n;
                        tmp = re[i];
                        re[i] = re[j];
                        re[j] = tmp;
                        tmp = re[k];
                        re[k] = re[l];
                        re[l] = tmp;
                        tmp = im[i];
                        im[i] = im[j];
                        im[j] = tmp;
                        tmp = im[k];
                        im[k] = im[l];
                        im[l] = tmp;
                    }
                }
            }




        };
        // aliases (public APIs)
        var apis = ['init', 'fft1d', 'ifft1d', 'fft2d', 'ifft2d','Scalefft2d'];
        for(var i=0; i<apis.length; i++) {
            FFT[apis[i]] = core[apis[i]];
        }
        FFT.fft = core.fft1d;
        FFT.ifft = core.ifft1d;
        FFT.swap = core.swap;

        /*******************/

            //Lets start


        FFT.init(_nn);
        if(!inv){
            FFT.fft2d(re, im);
            if(swap){
                FFT.swap(re, im);
            }
            return([re,im]);
        }
        if(swap){
            FFT.swap(re,im);
        }
        FFT.ifft2d(re, im);

        return([re,im]);

    };


    /**	 * @function AkDFT return the fourier transformation
     * @param {Akimage} Object (This object has in the 0 (Red) channel the real values
     * and in the 1 (green) channel the imaginary values
     * @param {number} Options:
     *  	  		DXT_FORWARD transformacion hacia adelante:0
     *  			DXT_INVERSE transformacion hacia atras:1
     *  			DXT_SCALE escala el resultado por 1/NN:2
     *  			DXT_ROWS  transforma N dft de 1D:4
     * @param {boolean}	shift  true: image shifted, false: image normal
     * @return Akimage Object( This Akimage Object (This object has in the 0 (Red) channel the real values
     * and in the 1 (green) channel the imaginary values
     * @autor Ake & Wellflat
     **/


    _Akontext.AkDFT = function (_ImE,_flag,shift){

        // Nro de parametros equivocados
        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incomplete parameters";}

        /**
         *
         * FFT function autor Ryo Wellflat
         * @author  Ryo Wellflat
         * @link https://github.com/wellflat
         *
         * */

        /**
         * Fast Fourier Transform module
         * 1D-FFT/IFFT, 2D-FFT/IFFT (radix-2)
         */
        (function() {
            var FFT;           // top-level namespace
            var _root = this;  // reference to 'window' or 'global'

            if(typeof exports !== 'undefined') {
                FFT = exports;   // for CommonJS
            } else {
                FFT = _root.FFT = {};
            }

            var version = {
                release: '0.3.0',
                date: '2013-03'
            };
            FFT.toString = function() {
                return "version " + version.release + ", released " + version.date;
            };

            // core operations
            var _n = 0,          // order
                _bitrev = null,  // bit reversal table
                _cstb = null;    // sin/cos table
            var core = {
                init : function(n) {
                    if(n !== 0 && (n & (n - 1)) === 0) {
                        _n = n;
                        core._initArray();
                        core._makeBitReversalTable();
                        core._makeCosSinTable();
                    } else {
                        if(AkErrorEnable) throw new Error("init: radix-2 required");
                    }
                },
                // 1D-FFT
                fft1d : function(re, im) {
                    core.fft(re, im, 1);
                },
                // 1D-IFFT
                ifft1d : function(re, im) {
                    var n = 1/_n;
                    core.fft(re, im, -1);
                    for(var i=0; i<_n; i++) {
                        re[i] *= n;
                        im[i] *= n;
                    }
                },
                // 2D-FFT
                fft2d : function(re, im) {
                    var tre = [],
                        tim = [],
                        i = 0;
                    // x-axis
                    for(var y=0; y<_n; y++) {
                        i = y*_n;
                        for(var x1=0; x1<_n; x1++) {
                            tre[x1] = re[x1 + i];
                            tim[x1] = im[x1 + i];
                        }
                        core.fft1d(tre, tim);
                        for(var x2=0; x2<_n; x2++) {
                            re[x2 + i] = tre[x2];
                            im[x2 + i] = tim[x2];
                        }
                    }
                    // y-axis
                    for(var x=0; x<_n; x++) {
                        for(var y1=0; y1<_n; y1++) {
                            i = x + y1*_n;
                            tre[y1] = re[i];
                            tim[y1] = im[i];
                        }
                        core.fft1d(tre, tim);
                        for(var y2=0; y2<_n; y2++) {
                            i = x + y2*_n;
                            re[i] = tre[y2];
                            im[i] = tim[y2];
                        }
                    }
                },
                // 2D-IFFT
                ifft2d : function(re, im) {
                    var tre = [],
                        tim = [],
                        i = 0;
                    // x-axis
                    for(var y=0; y<_n; y++) {
                        i = y*_n;
                        for(var x1=0; x1<_n; x1++) {
                            tre[x1] = re[x1 + i];
                            tim[x1] = im[x1 + i];
                        }
                        core.ifft1d(tre, tim);
                        for(var x2=0; x2<_n; x2++) {
                            re[x2 + i] = tre[x2];
                            im[x2 + i] = tim[x2];
                        }
                    }
                    // y-axis
                    for(var x=0; x<_n; x++) {
                        for(var y1=0; y1<_n; y1++) {
                            i = x + y1*_n;
                            tre[y1] = re[i];
                            tim[y1] = im[i];
                        }
                        core.ifft1d(tre, tim);
                        for(var y2=0; y2<_n; y2++) {
                            i = x + y2*_n;
                            re[i] = tre[y2];
                            im[i] = tim[y2];
                        }
                    }
                },
                // Scaled 2D-FFT
                Scalefft2d : function(re, im) {
                    var tre = [],
                        tim = [],
                        i = 0,
                        _Scale = Math.sqrt(1/re.length);

                    // x-axis
                    for(var y=0; y<_n; y++) {
                        i = y*_n;
                        for(var x1=0; x1<_n; x1++) {
                            tre[x1] = re[x1 + i];
                            tim[x1] = im[x1 + i];
                        }
                        core.fft1d(tre, tim);
                        for(var x2=0; x2<_n; x2++) {
                            re[x2 + i] = tre[x2]* _Scale;
                            im[x2 + i] = tim[x2]* _Scale;
                        }
                    }
                    // y-axis
                    for(var x=0; x<_n; x++) {
                        for(var y1=0; y1<_n; y1++) {
                            i = x + y1*_n;
                            tre[y1] = re[i];
                            tim[y1] = im[i];
                        }
                        core.fft1d(tre, tim);
                        for(var y2=0; y2<_n; y2++) {
                            i = x + y2*_n;
                            re[i] = tre[y2]* _Scale;
                            im[i] = tim[y2]* _Scale;
                        }
                    }
                },
                // core operation of FFT
                fft : function(re, im, inv) {
                    var d, h, ik, m, tmp, wr, wi, xr, xi,
                        n4 = _n >> 2;
                    // bit reversal
                    for(var l=0; l<_n; l++) {
                        m = _bitrev[l];
                        if(l < m) {
                            tmp = re[l];
                            re[l] = re[m];
                            re[m] = tmp;
                            tmp = im[l];
                            im[l] = im[m];
                            im[m] = tmp;
                        }
                    }
                    // butterfly operation
                    for(var k=1; k<_n; k<<=1) {
                        h = 0;
                        d = _n/(k << 1);
                        for(var j=0; j<k; j++) {
                            wr = _cstb[h + n4];
                            wi = inv*_cstb[h];
                            for(var i=j; i<_n; i+=(k<<1)) {
                                ik = i + k;
                                xr = wr*re[ik] + wi*im[ik];
                                xi = wr*im[ik] - wi*re[ik];
                                re[ik] = re[i] - xr;
                                re[i] += xr;
                                im[ik] = im[i] - xi;
                                im[i] += xi;
                            }
                            h += d;
                        }
                    }
                },
                // initialize the array (supports TypedArray)
                _initArray : function() {
                    if(typeof Uint8Array !== 'undefined') {
                        _bitrev = new Uint8Array(_n);
                    } else {
                        _bitrev = [];
                    }
                    if(typeof Float64Array !== 'undefined') {
                        _cstb = new Float64Array(_n*1.25);
                    } else {
                        _cstb = [];
                    }
                },
                // makes bit reversal table
                _makeBitReversalTable : function() {
                    var i = 0,
                        j = 0,
                        k = 0;
                    _bitrev[0] = 0;
                    while(++i < _n) {
                        k = _n >> 1;
                        while(k <= j) {
                            j -= k;
                            k >>= 1;
                        }
                        j += k;
                        _bitrev[i] = j;
                    }
                },
                // makes trigonometiric function table
                _makeCosSinTable : function() {
                    var n2 = _n >> 1,
                        n4 = _n >> 2,
                        n8 = _n >> 3,
                        n2p4 = n2 + n4,
                        t = Math.sin(Math.PI/_n),
                        dc = 2*t*t,
                        ds = Math.sqrt(dc*(2 - dc)),
                        c = _cstb[n4] = 1,
                        s = _cstb[0] = 0;
                    t = 2*dc;
                    for(var i=1; i<n8; i++) {
                        c -= dc;
                        dc += t*c;
                        s += ds;
                        ds -= t*s;
                        _cstb[i] = s;
                        _cstb[n4 - i] = c;
                    }
                    if(n8 !== 0) {
                        _cstb[n8] = Math.sqrt(0.5);
                    }
                    for(var j=0; j<n4; j++) {
                        _cstb[n2 - j]  = _cstb[j];
                    }
                    for(var k=0; k<n2p4; k++) {
                        _cstb[k + n2] = -_cstb[k];
                    }
                },
                //Swap function
                swap : function(re, im) {
                    var xn, yn, i, j, k, l, tmp,
                        len = _n >> 1;
                    for(var y=0; y<len; y++) {
                        yn = y + len;
                        for(var x=0; x<len; x++) {
                            xn = x + len;
                            i = x + y*_n;
                            j = xn + yn*_n;
                            k = x + yn*_n;
                            l = xn + y*_n;
                            tmp = re[i];
                            re[i] = re[j];
                            re[j] = tmp;
                            tmp = re[k];
                            re[k] = re[l];
                            re[l] = tmp;
                            tmp = im[i];
                            im[i] = im[j];
                            im[j] = tmp;
                            tmp = im[k];
                            im[k] = im[l];
                            im[l] = tmp;
                        }
                    }
                }




            };
            // aliases (public APIs)
            var apis = ['init', 'fft1d', 'ifft1d', 'fft2d', 'ifft2d','Scalefft2d','swap'];
            for(var i=0; i<apis.length; i++) {
                FFT[apis[i]] = core[apis[i]];
            }
            FFT.fft = core.fft1d;
            FFT.ifft = core.ifft1d;
            FFT.swap = core.swap;

        }).call(this);


        /****/

        //entrada, bandera, FilaNonzero
        /**
         *  _ImE: Akimage Object (This object has in the 0 (Red) channel the real values
         * and in the 1 (green) channel the imaginary values
         *  flag: Options:
         *  	  		DXT_FORWARD transformacion hacia adelante:0
         *  			DXT_INVERSE transformacion hacia atras:1
         *  			DXT_SCALE escala el resultado por 1/NN:2
         *  			DXT_ROWS  transforma N dft de 1D:4
         *  			swaped  true: image shifted, false: image normal
         *  Akimage Object( This Akimage Object (This object has in the 0 (Red) channel the real values
         * and in the 1 (green) channel the imaginary values
         * */



        // variables a usar



        var imageHeight = _ImE.height,
            imageWidth = _ImE.width;


        // Creo el objeto Akimage

        var ImS = AkCreateImage([_ImE.width, _ImE.height], 32, 3);
//	var	re = [],
//		im = [];

        var re = new Int32Array   (_ImE.width*_ImE.width),
            im = new Int32Array   (_ImE.width*_ImE.width);





        //DXT_FORWARD
        switch(_flag){

            case DXT_FORWARD:


                // extraigo canal 0 - Real y canal 1 - Imag


                var _i=0;
                for(var y=0; y<imageHeight; y++) {
                    _i = y*imageWidth;


                    for(var x=0; x<imageWidth; x++) {

                        re[_i + x] = _ImE.imageData[(_i << 2) + (x << 2)];
                        im[_i + x] = 0.0;

                    }
                }


                // prepair the re and im arrays

                FFT.init(_ImE.width);
                FFT.fft2d(re, im);

                if(shift){FFT.swap(re,im);}


                // prepair the struc to return



                for(var y=0; y<imageHeight; y++) {
                    var i = y*imageWidth;


                    for(var x=0; x<imageWidth; x++) {

                        ImS.imageData[(i << 2) + (x << 2)] = re[i + x];
                            ImS.imageData[(i << 2) + (x << 2)+1] = im[i + x];

                    }
                }


                return ImS;
                break; //END DXT_FORWARD



            //DXT_INVERSE
            case DXT_INVERSE:

                // extraigo canal 0 - Real y canal 1 - Imag


                var _i=0;
                for(var y=0; y<imageHeight; y++) {
                    _i = y*imageWidth;


                    for(var x=0; x<imageWidth; x++) {

                        re[_i + x] = _ImE.imageData[(_i << 2) + (x << 2)];
                        im[_i + x] = _ImE.imageData[(_i << 2) + (x << 2)+1];

                    }
                }


                // prepair the re and im arrays

                FFT.init(_ImE.width);
                FFT.ifft2d(re, im);


                // prepair the struc to return



                for(var y=0; y<imageHeight; y++) {
                    var i = y*imageWidth;


                    for(var x=0; x<imageWidth; x++) {

                        ImS.imageData[(i << 2) + (x << 2)] = re[i + x];
                            ImS.imageData[(i << 2) + (x << 2)+1] = im[i + x];

                    }
                }


                return ImS;
                break;
            //END DXT_INVERSE


            //DXT_SCALE
            case DXT_SCALE:

                // Beta


                var _i=0;
                for(var y=0; y<imageHeight; y++) {
                    _i = y*imageWidth;


                    for(var x=0; x<imageWidth; x++) {

                        re[_i + x] = _ImE.imageData[(_i << 2) + (x << 2)];
                        im[_i + x] = 0;

                    }
                }


                // prepair the re and im arrays

                FFT.init(_ImE.width);
                FFT.Scalefft2d(re, im);

                if(shift){FFT.swap(re,im);}


                // prepair the struc to return



                for(var y=0; y<imageHeight; y++) {
                    var i = y*imageWidth;


                    for(var x=0; x<imageWidth; x++) {

                        ImS.imageData[(i << 2) + (x << 2)] = re[i + x];
                            ImS.imageData[(i << 2) + (x << 2)+1] = im[i + x];

                    }
                }


                return ImS;
                break;
            //END CV_DXT_SCALE

            case DXT_ROWS:


                // extraigo canal 0 - Real y canal 1 - Imag


                var _i=0;
                for(var y=0; y<imageHeight; y++) {
                    _i = y*imageWidth;


                    for(var x=0; x<imageWidth; x++) {

                        re[_i + x] = _ImE.imageData[(_i << 2) + (x << 2)];
                        im[_i + x] = 0.0;

                    }
                }


                // prepair the re and im arrays

                FFT.init(_ImE.width);


                var tre = [],
                    tim = [],
                    i = 0,
                    _n = _ImE.width;

                // y-axis
                for(var x=0; x<_n; x++) {
                    i = x*_n;
                    for(var y1=0; y1<_n; y1++) {

                        tre[y1] = re[i+ y1];
                        tim[y1] = im[i+ y1];
                    }
                    FFT.fft1d(tre, tim);

                    for(var y2=0; y2<_n; y2++) {

                        re[i+ y2] = tre[y2];
                        im[i+ y2] = tim[y2];

                    }
                }

                if(shift){FFT.swap(re,im);}


                // prepair the struc to return



                for(var y=0; y<imageHeight; y++) {
                    var i = y*imageWidth;


                    for(var x=0; x<imageWidth; x++) {

                        ImS.imageData[(i << 2) + (x << 2)] = re[i + x],
                            ImS.imageData[(i << 2) + (x << 2)+1] = im[i + x];

                    }
                }


                return ImS;
                break; //END DXT_ROWS
        }; //End switch


        /**	 @function AkGetOptimalDFTSize: Get the near optimal value size
         * @param {number}_Adimension: Dimension of the Akimage objeto (width or height)
         * @return {number} optimal Dft value
         * @autor Ake
         **/
    };//End Context

    _Akontext.AkGetOptimalDFTSize = function(_Adimension) {

        if(!(_Adimension & (_Adimension -1 ))){return _Adimension;}

        if(!_Adimension){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}


        while (_Adimension & (_Adimension-1)) {
            _Adimension = _Adimension & (_Adimension-1);
        }

        _Adimension = _Adimension << 1;

        return _Adimension;
    };


    /**	 @function {AkPaddingZero} Fill with zero to complete the size
     * @param {Akimage}_AIn  Dimension of the Akimage objeto (width or height)
     * @param {number}_ANewSize  Dimension of the Akimage objeto (width or height)
     * @return {Akimage} optimal Dft value
     * @autor Ake
     **/

    _Akontext.AkPaddingZero = function(_AIn, _ANewSize) {



        // Nro de parametros equivocados
        if (arguments.length!=2){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incomplete parameters";}
        if(!_AIn.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}
        if(!_ANewSize){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}
        if(_ANewSize<_AIn.width){AKerrors[8]= true; AKLastError=8;if(AkErrorEnable) throw "new size is lower than old size";}
        //if(_AIn.width != _AIn.height){AKerrors[9]= true; AKLastError=9;if(AkErrorEnable) throw "Image must be square";}

        //if(_ANewSize==_AIn.width) {return _AIn;}


        var ImS = AkCreateImage([_ANewSize,_ANewSize], _AIn.depth, _AIn.nChannels);

        for(var k = 0; k<_ANewSize;k++){

            var a = (k*_AIn.width)<<2;
            var b = a+(_AIn.width<<2);

            ImS.imageData.set(_AIn.imageData.subarray(a,b),(k*_ANewSize)<<2);

        }

        return ImS;
    };

    /**	 @function AkFrequencyFilter Return the convolution of the input image by the kernel
     * @param {Akimage}_AIn Input Akimage
     * @param {Array}_AKernel Kernel
     * @param {boolean}_swap swap kernel
     * @return {Akimage}:Convolute image
     * @autor Ake
     **/



    _Akontext.AkFrequencyFilter = function(_AIn, _AKernel,_swap) {



        // Nro de parametros equivocados
        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incomplete parameters"; }
        if(!_AIn.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters"; }
        if(Math.sqrt(_AKernel.length)!=Math.sqrt(_AKernel.length)^0){AKerrors[10]= true; AKLastError=10;if(AkErrorEnable) throw "Kernel must be square";}


        /* Padding Ain
         * Padding kernel
         * Transform Ain
         * Tranform Kernel
         * IxK
         * Invert
         * Unpadding
         *
         */



        // busco la dimension mas grande por si no es cuadrado

        var max = _AIn.height;

        if(_AIn.width>_AIn.height){
            max = _AIn.width;
        }


        /***
         *
         *
         * Experimental, en vez de trabajar con un kernel y tranformar, expando el kernel en el tamano de la imagen
         * con funciones nativas
         *
         * ***/


        /**
         *
         * Kernel oparations
         *
         * */


        /*
         * swap kernel
         *
         * */

        if(_swap){

            var Arr = new Float32Array(_AKernel.length);
            var tam = Math.sqrt(_AKernel.length);
            var M = Math.ceil(Math.sqrt(_AKernel.length)*0.5);
            var m = Math.sqrt(_AKernel.length)>>1;

            for(var k = 0;k < M; k++){
                var y = k * tam;
                var ArrT = new Float32Array(tam);

                for(var p = 0; p < tam; p++){
                    if(p<M){
                        ArrT[m+p] = _AKernel[y+p];
                    }
                    else{
                        ArrT[p-M] = _AKernel[y+p];
                    }

                }

                Arr.set(ArrT,(m+k)*tam)

            }

            for(var k = M;k < tam; k++){
                var y = k * tam;
                var ArrT = new Float32Array(tam);

                for(var p = 0; p < tam; p++){
                    if(p<M){
                        ArrT[m+p] = _AKernel[y+p];
                    }
                    else{
                        ArrT[p-M] = _AKernel[y+p];
                    }

                }

                Arr.set(ArrT,(k-M)*tam);

            }

            _AKernel = Arr;

        }
        //scaling

        var _M_temp = Math.max.apply( Math, _AKernel );
        var _m_temp = Math.min.apply( Math, _AKernel );

        if (!(_M_temp - _m_temp)){_M_temp = 255; _m_temp = 0;}

        var C1 = 255 /(_M_temp - _m_temp);
        var C0 = _m_temp*C1;

        var H = Math.sqrt(_AKernel.length);

        var _tempData = new Uint8ClampedArray((H*H)<<2);

        var _AKcanvasOld = document.createElement("CANVAS");
        var _AKcanvasNew = document.createElement("CANVAS");

        var k = _tempData.length;


        do{
            _tempData[k-=4]=(_AKernel[k>>2]*C1)-C0;
            _tempData[k+1]=(_AKernel[(k>>2)+1]*C1)-C0;
            _tempData[k+2]=(_AKernel[(k>>2)+2]*C1)-C0;
            _tempData[k+3]=255;


        }
        while (k>0);



        _AKcanvasOld.width = H;
        _AKcanvasOld.height = H;

        var objImageData= _AKcanvasOld.getContext('2d').createImageData(Math.sqrt(_AKernel.length), Math.sqrt(_AKernel.length));

        objImageData.data.set(_tempData);


        _AKcanvasOld.getContext('2d').putImageData(objImageData, 0, 0);

        _AKcanvasNew.width = max;
        _AKcanvasNew.height = max;

        //Magic magic
        _AKcanvasNew.getContext("2d").drawImage(_AKcanvasOld,0,0,max,max);

        var _newTempData;// = new Uint8ClampedArray(H*H);

        _newTempData =_AKcanvasNew.getContext('2d').getImageData(0, 0, max,max).data;





        //extraigo un canal


        var _i;
        var reK = new Float32Array(max*max);

        for(var y=0; y<max; y++) {
            _i = y*max;


            for(var x=0; x<max; x++) {

                reK[_i + x] = _newTempData[(_i << 2) + (x << 2)];

            }
        }



        /**
         *
         * Image oparations
         *
         * */

        // extraigo un canal

        var _i=0;
        var _temp = new Float32Array(_AIn.imageData.length>>2);

        for(var y=0; y<_AIn.height; y++) {
            _i = y*_AIn.width;


            for(var x=0; x<_AIn.width; x++) {

                _temp[_i + x] = _AIn.imageData[(_i << 2) + (x << 2)];

            }
        }




        // padding para hacerla cuadrada

        /* Getting the new dimension */



        if(max & (max -1 )){

            while (max & (max-1)) {
                max = max & (max-1);
            }

            max = max << 1;
        }

        /* padding Image*/

        var re = new Float32Array(max*max);
        var im = new Float32Array(max*max);


        // Padding
        var padding = false;

        if (_AIn.imageData.length>>2 < re.length){

            //si hay padding
            for(var k = 0; k<_AIn.height;k++){
                re.set(_temp.subarray(k*_AIn.width,(k+1)*_AIn.width),(k*max));
            };
        }
        //si no hay padding
        else{
            re.set(_temp);
        }




        //return ([reK,reK]);

        /**********///



        var imK = new Float32Array(max*max);


        // transforming image






        var _Tim = _FFT(re,im,max,false,false);



        //return(_Tim);


        var _Tke = [reK,imK];

        var Fre = [];
        var Fim = [];

        // product



        for(var kk=0;kk<_Tke[0].length;kk++){
            Fre[kk] = (_Tim[0])[kk]*(_Tke[0])[kk];
            Fim[kk] = (_Tim[1])[kk]*(_Tke[0])[kk];
            //Fim[kk] = (_Tim[1])[kk]*(_Tke[1])[kk];
        }



        //return ([Fre,Fim])
        //inverse;

        _Tim = _FFT(Fre,Fim,max,true,false);

        //return _Tim;


        var ImS0 = AkCreateImage([_AIn.width, _AIn.height], 32, 1);
        var ImS1 = AkCreateImage([_AIn.width, _AIn.height], 32, 3);




        //unpadding


        var dif = max - _AIn.width;



        for(var y=0; y<ImS0.height; y++) {
            var i_0 = y*(ImS0.width + dif);
            var i_1 = y*ImS0.width;


            for(var x=0; x<ImS0.width; x++) {

                ImS0.imageData[(i_1 << 2) + (x << 2)] =
                    ImS1.imageData[(i_1 << 2) + (x << 2)] = (_Tim[0])[i_0 + x];
                ImS1.imageData[(i_1 << 2) + (x << 2)+1] = (_Tim[1])[i_0 + x];

            }
        }




        return([ImS0,ImS1]);

    };



    /**	 @function AkFilter2D Return the convolution of the input image by the kernel (ROI supported)
     *
     * @param {Akimage} AImageRefence Input Akimage
     * @param {Array} _AKernel Kernel
     * @param {Array} _Anchor Array Coordenades anchor
     * @return {Akimage} ImS Convolute image
     * @autor Ake
     **/
    _Akontext.AkFilter2D = function(AImageRefence,_AKernel,_Anchor) {



        /*
         *
         * Salidas rapidas
         *
         * */

        var _KernelWidth = Math.sqrt(_AKernel.length);

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; ;}
        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters"; ;}
        if(_KernelWidth != (_KernelWidth^0)){AKerrors[10]= true; AKLastError=10;if(AkErrorEnable) throw "Kernel must be square"; ;};
        if((Object.prototype.toString.apply(_Anchor) != '[object Array]') || (_Anchor.length != 2)){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a 2 elements array"; AKLastError=11;;}
        if(_Anchor[0] * _Anchor[0] >= _KernelWidth*_KernelWidth || _Anchor[1] * _Anchor[1] >= _KernelWidth*_KernelWidth){AKerrors[14]= true; AKLastError=14;if(AkErrorEnable) throw "Anchor bigger than Kernel"; ;};

        //SI EL ANCLA SE VA DEL KERNEL




        var _AK = new Float32Array(_AKernel);

        var _coef = [];
        var _pos = [];

        var ImS = AkCreateImage([AImageRefence.width, AImageRefence.height], AImageRefence.depth, AImageRefence.nChannels);
        var ImP = AkCreateImage([AImageRefence.width+(_KernelWidth<<1), AImageRefence.height+(_KernelWidth<<1)], AImageRefence.depth, AImageRefence.nChannels);

        var _Nwidth =  AImageRefence.width+(_KernelWidth<<1);
        var _Nheight = AImageRefence.height+(_KernelWidth<<1);
        var _Owidth =  AImageRefence.width;
        var _Oheight = AImageRefence.height;

        //ancla incluye la multiplicacion por 4

        var _ancla = ((_Nwidth*_Anchor[0])+_Anchor[1])<<2;

        _AKernel.sort();

        var value = undefined;
        var _delta = 0.01;

        //Busco cantidad de elementos distintos


        var k = 0;

        while(k<_AKernel.length){
            //for(var k = 0; k<_AKernel.length;k++){


            if(_AKernel[k] != value){

                value = _AKernel[k];

                var A = [];
                var p=0;

                while(p<_AK.length){
                    //for(var p = 0;p<_AK.length;p++){

                    if(Math.abs(_AK[p]-value)<_delta){
                        A[A.length] =
                            ((Math.floor(p/_KernelWidth)*_Nwidth)+(p%_KernelWidth))<<2;
                    }
                    p++;
                }

                _pos.push(A);


                _coef[_coef.length] =

                    value = _AKernel[k];



            }

            k++;
        }



        // variables x4

        var _b = ((_Nwidth+1)*_KernelWidth<<2);

        var _Ow = _Owidth<<2;
        var _Nw = _Nwidth<<2;
        var _Kw = _KernelWidth<<2;
        var _c =  _Owidth*(_Oheight-_KernelWidth)<<2;
        var _d =  _c + _Ow;
        var _e = (((_Nheight - 1) * _Nwidth) + _KernelWidth)<<2;
        var _f = _Kw + _Ow;


        //lets convolve

        //detectar canales


        var _ind = 0;

        if(AImageRefence.nChannels==1){ // SI CANAL 1



            /* PADDING */
            // Periodic boundary conditions

            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));


            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelWidth;k++){
                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);
            }

            // DERECHA IZQUIERDA

            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                }


            }


            var newYEnd = _Oheight+_KernelWidth;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelWidth;
            var xOff = 0;



            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelWidth;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelWidth;
                xOff = AImageRefence.roi.xOffset;

            }


            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelWidth;

            //for(var k = _KernelWidth; k<_Oheight+_KernelWidth; k++){

            while(k<newYEnd){ //PARA ALTO
                //Suma global

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;


                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    //for( var n = _KernelWidth<<2; n < (_Owidth + _KernelWidth)<<2; n+=4){

                    var _globalSum = 0;

                    //por coeficiente

                    var p=0;

                    while(p<_coef.length){ // PARA COEFICIENTE
                        //for(var p=0;p<_coef.length;p++ ){

                        var _localSum = 0;

                        // SI coef nonZero

                        if(_coef[p]!=0){

                            // for coeficientes

                            var m = 0;

                            //for(var m = 0; m < _pos[p].length; m++){  /

                            while(m < _pos[p].length){ //BARRIDA COEFICIENTE

                                _localSum += ImP.imageData[_y + n +_ancla  + _pos[p][m++]];


                            }

                            //    //producto por coeficiente
                            //    _localSum*=_coef[p];

                            //suma global
                            _globalSum += (_localSum*_coef[p]);
                        }

                        p++;

                    }

                    //asignacion de pixel

                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _globalSum;
                    }

                    if(AImageRefence.roi == null){

                        ImS.imageData[_ind] = _globalSum;
                    }

                    _ind+=4;

                    n+=4;
                    n1+=4;

                } // FIN PARA ANCHO


                k++;
                k1++;

            } // FIN PARA ALTO



        } // FIN SI CANAL 1


        if(AImageRefence.nChannels == 3){ // SI RGB

            /* PADDING */
            // Periodic boundary conditions

            //padding

            for(var k=0;k<_Oheight;k++){
                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));
            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelWidth;k++){
                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);
            }

            // DERECHA IZQUIERDA


            for(var k=0;k<_Nheight;k++){
                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                    //GREEN
                    ImP.imageData[(k*_Nw)+_Kw - j - 3] = ImP.imageData[(k*_Nw)+_Kw + j +1];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 1] = ImP.imageData[(k*_Nw)+(_f) - j-3];

                    //BLUE
                    ImP.imageData[(k*_Nw)+_Kw - j - 2] = ImP.imageData[(k*_Nw)+_Kw + j +2];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 2] = ImP.imageData[(k*_Nw)+(_f) - j-2];

                }

            }

            var newYEnd = _Oheight+_KernelWidth;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelWidth;
            var xOff = 0;

            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelWidth;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelWidth;
                xOff = AImageRefence.roi.xOffset;
            }






            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelWidth;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;

                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    var _globalSumR = 0;
                    var _globalSumG = 0;
                    var _globalSumB = 0;


                    //por coeficiente

                    var p=0;

                    while(p<_coef.length){ // PARA COEFICIENTE


                        var _localSumR = 0;
                        var _localSumG = 0;
                        var _localSumB = 0;

                        // SI coef nonZero

                        if(_coef[p]!=0){

                            var m = 0;

                            //for(var m = 0; m < _pos[p].length; m++){  /

                            while(m < _pos[p].length){ //BARRIDA COEFICIENTE

                                _localSumR += ImP.imageData[_y + n +_ancla  + _pos[p][m]];
                                _localSumG += ImP.imageData[_y + n +_ancla  + _pos[p][m]+1];
                                _localSumB += ImP.imageData[_y + n +_ancla  + _pos[p][m++]+2];

                            }



                            //suma global
                            _globalSumR += (_localSumR*_coef[p]);
                            _globalSumG += (_localSumG*_coef[p]);
                            _globalSumB += (_localSumB*_coef[p]);
                        }

                        p++;
                    }


                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _globalSumR;
                        ImS.imageData[_y1+n1+1] = _globalSumG;
                        ImS.imageData[_y1+n1+2] = _globalSumB;
                    }


                    if(AImageRefence.roi == null){
                        //asignacion de pixel
                        ImS.imageData[_ind]     = _globalSumR;
                        ImS.imageData[_ind+1]   = _globalSumG;
                        ImS.imageData[_ind+2]   = _globalSumB;
                    }

                    _ind+=4;

                    n+=4;
                    n1+=4;
                } // FIN PARA ANCHO

                k++;
                k1++;


            } // FIN PARA ALTO


        }//FIN SI RGB



        if(AImageRefence.nChannels == 4){ //SI RGBA

            /* PADDING */

            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));


            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelWidth;k++){


                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);


            }

            // DERECHA IZQUIERDA


            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                    //GREEN
                    ImP.imageData[(k*_Nw)+_Kw - j - 3] = ImP.imageData[(k*_Nw)+_Kw + j +1];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 1] = ImP.imageData[(k*_Nw)+(_f) - j-3];

                    //BLUE
                    ImP.imageData[(k*_Nw)+_Kw - j - 2] = ImP.imageData[(k*_Nw)+_Kw + j +2];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 2] = ImP.imageData[(k*_Nw)+(_f) - j-2];

                }


            }

            var newYEnd = _Oheight+_KernelWidth;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelWidth;
            var xOff = 0;

            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelWidth;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelWidth;
                xOff = AImageRefence.roi.xOffset;
            }




            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelWidth;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;

                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    var _globalSumR = 0;
                    var _globalSumG = 0;
                    var _globalSumB = 0;


                    //por coeficiente

                    var p=0;

                    while(p<_coef.length){ // PARA COEFICIENTE


                        var _localSumR = 0;
                        var _localSumG = 0;
                        var _localSumB = 0;

                        // SI coef nonZero

                        if(_coef[p]!=0){

                            var m = 0;

                            //for(var m = 0; m < _pos[p].length; m++){  /

                            while(m < _pos[p].length){ //BARRIDA COEFICIENTE

                                _localSumR += ImP.imageData[_y + n +_ancla  + _pos[p][m]];
                                _localSumG += ImP.imageData[_y + n +_ancla  + _pos[p][m]+1];
                                _localSumB += ImP.imageData[_y + n +_ancla  + _pos[p][m++]+2];

                            }

                            //suma global
                            _globalSumR += (_localSumR*_coef[p]);
                            _globalSumG += (_localSumG*_coef[p]);
                            _globalSumB += (_localSumB*_coef[p]);
                        }

                        p++;
                    }

                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _globalSumR;
                        ImS.imageData[_y1+n1+1] = _globalSumG;
                        ImS.imageData[_y1+n1+2] = _globalSumB
                        ImS.imageData[_y1+n1+3] =  ImP.imageData[_y1+n1+3];
                    }


                    if(AImageRefence.roi == null){
                        //asignacion de pixel
                        ImS.imageData[_ind]     = _globalSumR;
                        ImS.imageData[_ind+1]   = _globalSumG;
                        ImS.imageData[_ind+2]   = _globalSumB;
                        ImS.imageData[_ind+3] =  ImP.imageData[_ind+3];
                    }

                    _ind+=4;

                    n+=4;
                    n1+=4;
                } // FIN PARA ANCHO

                k++;
                k1++;

            } // FIN PARA ALTO


        } // FIN SI RGBA


        return  (ImS);
    }; // END FUNCTION


    /**	 @function AkNonLinealFilter Return the convolution of the input image by the kernel (ROI supported)
     *
     * @param {Akimage} AImageRefence Input Akimage
     * @param {number} _MaskWidth Kernel width (Mask is square)
     * @param {Array} _Anchor Array Coordenades anchor
     * @param {number} _ToFilter Type of Filter
     * @return {Akimage} ImS Filtered image
     * @autor Ake
     **/

    _Akontext.AkNonLinealFilter = function(AImageRefence,_MaskWidth,_Anchor,_ToFilter){

        if (arguments.length!=4){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments";}
        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters"; }
         if((Object.prototype.toString.apply(_Anchor) != '[object Array]') || (_Anchor.length != 2)){AKerrors[11]= true;AKLastError=11;if(AkErrorEnable) throw "Anchor must be a 2 elements array"; }
        if(_Anchor[0] * _Anchor[0] >= _MaskWidth*_MaskWidth || _Anchor[1] * _Anchor[1] >= _MaskWidth*_MaskWidth){AKerrors[14]= true; AKLastError=14;if(AkErrorEnable) throw "Anchor bigger than Kernel";};



        return _genericFilter(AImageRefence,_MaskWidth,_MaskWidth,_Anchor,_ToFilter);

    }


    /**	 @function AkDilate
     * @param {Akimage} AImageRefence Input Akimage
     * @param {Array} _Kernel Kernel width (Must be square)
     * @param {Array} _Anchor Array Coordenades anchor
     * @return {Akimage} ImS Filtered image
     * @autor Ake
     **/

    _Akontext.AkDilate = function(AImageRefence,_Kernel,_Anchor){

        var _MaskWidth = Math.sqrt(_Kernel.length);

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments";}
        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}
        if(Object.prototype.toString.apply(_Kernel) != '[object Array]'){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a array"; AKLastError=11;}
        if((Object.prototype.toString.apply(_Anchor) != '[object Array]') || (_Anchor.length != 2)){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a 2 elements array"; AKLastError=11;}
        if(_Anchor[0] * _Anchor[0] >= _MaskWidth*_MaskWidth || _Anchor[1] * _Anchor[1] >= _MaskWidth*_MaskWidth){AKerrors[14]= true; AKLastError=14;if(AkErrorEnable) throw "Anchor bigger than Kernel"; }



        return _genericFilter(AImageRefence,_MaskWidth,_MaskWidth,_Anchor,DILATEFILTER,_Kernel);

    }


    /**	 @function AkErode
     *
     * @param {Akimage} AImageRefence Input Akimage
     * @param {Array} _Kernel Kernel width (Must be square)
     * @param {Array} _Anchor Array Coordenades anchor
     * @return {Akimage} ImS Filtered image
     * @autor Ake
     **/

    _Akontext.AkErode = function(AImageRefence,_Kernel,_Anchor){

        var _MaskWidth = Math.sqrt(_Kernel.length);

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments";}
        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}
        if(Object.prototype.toString.apply(_Kernel) != '[object Array]'){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a array"; AKLastError=11;}
        if((Object.prototype.toString.apply(_Anchor) != '[object Array]') || (_Anchor.length != 2)){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a 2 elements array"; AKLastError=11;}
        if(_Anchor[0] * _Anchor[0] >= _MaskWidth*_MaskWidth || _Anchor[1] * _Anchor[1] >= _MaskWidth*_MaskWidth){AKerrors[14]= true; AKLastError=14;if(AkErrorEnable) throw "Anchor bigger than Kernel"; }



        return _genericFilter(AImageRefence,_MaskWidth,_MaskWidth,_Anchor,ERODEFILTER,_Kernel);

    }

    /**	 @function AkLUT Return the convolution of the input image by the kernel (ROI supported)
     *
     * @param {Akimage} _ImIn Input Akimage
     * @param {Array} _lut Lut array, with 256 value
     * @param {Boolean} _scaled If true LUT is scaled to 0-255, if false LUT keep the originals values
     * @return {Akimage} ImS Resulting Akimage object
     * @autor Ake
     **/
    _Akontext.AkLUT = function(_ImIn,_lut,_scaled) {

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; }
        if (_lut.length!=256){AKerrors[23]= true; AKLastError=23;if(AkErrorEnable) throw "In AkLUT, lut array must be of 256 elements"; }
        if (_ImIn.depth != DEPTH_8U){AKerrors[15]= true; AKLastError=23;if(AkErrorEnable) throw "Akimage depth must be DEPTH_8U";}



        var ImS = AkCreateImage([_ImIn.width,_ImIn.height],8,_ImIn.nChannels);

        var newYEnd = _ImIn.height;
        var newXEnd = _ImIn.width<<2;
        var newXinit = 0;
        var newYinit = 0;




        if(_ImIn.roi != null){

            newYEnd = _ImIn.roi.height+_ImIn.roi.yOffset;
            newXEnd = (_ImIn.roi.width+_ImIn.roi.xOffset)<<2;
            newXinit = (_ImIn.roi.xOffset)<<2;
            newYinit = _ImIn.roi.yOffset;
            ImS.imageData.set(_ImIn.imageData);

        }


        // val[i] = [(val[i-1] - MinOld) * (MaxNew - minNew)/(MaxOld - minOld)] + minNew




        // si esta escalado, normalizo
        if(_scaled){


            var _M = Math.max.apply( Math, _lut );
            var _m = Math.min.apply( Math, _lut );



            var C1 = 255 /(_M - _m);
            var C0 = _m*C1;


            var k = newYinit;


            // GRAY

            if(_ImIn.nChannels == 1){

                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=(_lut[_ImIn.imageData[_y+n]]*C1)-C0;

                        n+=4;

                    }
                    k+=1;
                }

            }

            // RGB

            if(_ImIn.nChannels == 3){

                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=(_lut[_ImIn.imageData[_y+n]]*C1)-C0;
                        ImS.imageData[_y+n+1]=(_lut[_ImIn.imageData[_y+n+1]]*C1)-C0;
                        ImS.imageData[_y+n+2]=(_lut[_ImIn.imageData[_y+n+2]]*C1)-C0;

                        n+=4;

                    }
                    k+=1;
                }
            }

            // RGBA
            if(_ImIn.nChannels == 4){
                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=(_lut[_ImIn.imageData[_y+n]]*C1)-C0;
                        ImS.imageData[_y+n+1]=(_lut[_ImIn.imageData[_y+n+1]]*C1)-C0;
                        ImS.imageData[_y+n+2]=(_lut[_ImIn.imageData[_y+n+2]]*C1)-C0;
                        ImS.imageData[_y+n+3]=_ImIn.imageData[_y+n+3];

                        n+=4;

                    }
                    k+=1;
                }
            }




        }

        // si no hace falta escalar
        if(!_scaled){

            var k = newYinit;


            // GRAY

            if(_ImIn.nChannels == 1){

                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=_lut[_ImIn.imageData[_y+n]];

                        n+=4;

                    }
                    k+=1;
                }

            }

            // RGB

            if(_ImIn.nChannels == 3){

                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=_lut[_ImIn.imageData[_y+n]];
                        ImS.imageData[_y+n+1]=_lut[_ImIn.imageData[_y+n+1]];
                        ImS.imageData[_y+n+2]=_lut[_ImIn.imageData[_y+n+2]];

                        n+=4;

                    }
                    k+=1;
                }
            }

            // RGBA
            if(_ImIn.nChannels == 4){
                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=_lut[_ImIn.imageData[_y+n]];
                        ImS.imageData[_y+n+1]=_lut[_ImIn.imageData[_y+n+1]];
                        ImS.imageData[_y+n+2]=_lut[_ImIn.imageData[_y+n+2]];
                        ImS.imageData[_y+n+3]=_ImIn.imageData[_y+n+3];

                        n+=4;

                    }
                    k+=1;
                }
            }



        }


        return  (ImS);

    }; // END FUNCTION


    /**	 @function AkDFTPadded
     *
     * @param {Akimage} Object (This object has in the 0 (Red) channel the real values
     * and in the 1 (green) channel the imaginary values
     * @param {number} Options:
     *  	  		DXT_FORWARD transformacion hacia adelante:0
     *  			DXT_INVERSE transformacion hacia atras:1
     *  			DXT_SCALE escala el resultado por 1/NN:2
     *  			DXT_ROWS  transforma N dft de 1D:4
     * @param {boolean}	shift  true: image shifted, false: image normal
     * @return Akimage Object( This Akimage Object (This object has in the 0 (Red) channel the real values
     * and in the 1 (green) channel the imaginary values
     * @autor Ake
     **/


    _Akontext.AkDFTPadded = function(_ImE,_flag,shift){

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments";}
        if(!_ImE.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}

        var max = _ImE.width;
        if(_ImE.height > max){
            max = _ImE.height;
        }

        var newMax = AkGetOptimalDFTSize(max);

        var _Ak = AkPaddingZero(_ImE,newMax);

        return (AkDFT(_Ak,_flag,shift));

    }









// END MODULES	
})(this);	
/* Tools */
/**
 * 	   @Tools
 */
/**	 * @function AkGetSize: return the width and height of an input image object
 *
 * @param {Akimage} AImageRefence reference
 * @return {Array}
 **/



(function (_Akontext) {


    _Akontext.AkGetSize = function(AImageRefence) {
        return  ([AImageRefence.width,AImageRefence.height]);
    };

    /**	 * @function AkMerge: Merge the 4 input vectors in a result image object
     * @param {Array} _AChannel0 Array of channel 0
     * @param {Array} _AChannel1 Array of channel 1
     * @param {Array} _AChannel2 Array of channel 2
     * @param {Array} _AChannel3 Array of channel 3
     * @param {Akimage} _OutputModel Akimage object model for make the object return (could be void object)
     * @return {Akimage} Merged image object
     * @autor Ake
     **/

    _Akontext.AkMerge = function(_AChannel0, _AChannel1, _AChannel2, _AChannel3, _OutputModel){

        // Nro de parametros equivocados
        if (arguments.length!=5){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incomplete parameters"; return false;}
        // Tipo de parametro equivocado

        if(!_OutputModel.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters"; return false;}

        // If the arrays have different dimension
        var _c1 = (_AChannel0.length) || 1,
            _c2 = (_AChannel1.length) || 1,
            _c3 = (_AChannel2.length) || 1,
            _c4 = (_AChannel3.length) || 1;

        var max = Math.max(_c1,_c2,_c3,_c4);

        var min = Math.min((_c1==1)?max:_c1,(_c2==1)?max:_c2,(_c3==1)?max:_c3,(_c4==1)?max:_c4);

        if(max != min){AKerrors[6]= true; AKLastError=6;if(AkErrorEnable) throw "array whit different dimension"; return false; }

        //var ImS = AkCreateImage([_OutputModel.width, _OutputModel.height], _OutputModel.depth, _OutputModel.nChannels);

        for(var y=0; y<_OutputModel.height; y++) {
            var i = y*_OutputModel.width;


            for(var x=0; x<_OutputModel.width; x++) {

                _OutputModel.imageData[(i << 2) + (x << 2)]   = _AChannel0[i + x] || 0,
                    _OutputModel.imageData[(i << 2) + (x << 2)+1] = _AChannel1[i + x] || 0,
                    _OutputModel.imageData[(i << 2) + (x << 2)+2] = _AChannel2[i + x] || 0,
                    _OutputModel.imageData[(i << 2) + (x << 2)+3] = _AChannel3[i + x] || 0;

            }
        }


        return _OutputModel;

    };


    /**
     * @function AkSplit:Split the input image Object in its 4 channel
     * @param {Akimage} Object to be spliteds
     * @return {Akimage} An Object with 4 array, one for channel
     * @autor Ake
     **/

    _Akontext.AkSplit = function(_InputObject){

        // Tipo de parametro equivocado

        if(!_InputObject.imageData){AKerrors[4]= true; AKLastError=4;return false;}

        // If the arrays have different dimension
        var _c1 = [],
            _c2 = [],
            _c3 = [],
            _c4 = [];


        var _i=0;
        for(var y=0; y<_InputObject.height; y++) {
            _i = y*_InputObject.width;


            for(var x=0; x<_InputObject.width; x++) {

                _c1[_i + x] = _InputObject.imageData[(_i << 2) + (x << 2)];
                _c2[_i + x] = _InputObject.imageData[(_i << 2) + (x << 2)+1];
                _c3[_i + x] = _InputObject.imageData[(_i << 2) + (x << 2)+2];
                _c4[_i + x] = _InputObject.imageData[(_i << 2) + (x << 2)+3];

            }
        }



        return ([_c1,_c2,_c3,_c4]);

    };


    /**
     * @function AkPow: Power an every single value to an exponent seted
     * @param {Akimage} Akimage object to be powered
     * @param {number} exponent
     * @return {Akimage} An Object with the same struct of the InputModel powered for the seted exponent
     * @autor Ake
     **/

    _Akontext.AkPow = function(_InputObject,_Exponent){

        // Tipo de parametro equivocado

        if(!_InputObject.imageData){AKerrors[4]= true; AKLastError=4;return false;}

        // make an Akimage object

        var ImS = AkCreateImage([_InputObject.width, _InputObject.height], _InputObject.depth, _InputObject.nChannels);


        // If the arrays have different dimension

        if(_InputObject.nChannels == 1){


            var k = _InputObject.imageData.length;

            do{
                ImS.imageData[k-=4] = Math.pow(_InputObject.imageData[k],_Exponent);

            }while (k);

            return (ImS);

        }

        if(_InputObject.nChannels == 3){

            var k = _InputObject.imageData.length;

            do{
                ImS.imageData[k-=4]=Math.pow(_InputObject.imageData[k],_Exponent);
                ImS.imageData[k+1]=Math.pow(_InputObject.imageData[k+1],_Exponent);
                ImS.imageData[k+2]=Math.pow(_InputObject.imageData[k+2],_Exponent);

            }while (k);

            return (ImS);
        }

        if(_InputObject.nChannels == 4){

            var k = _InputObject.imageData.length;

            do{
                ImS.imageData[k-=4]=Math.pow(_InputObject.imageData[k],_Exponent);
                ImS.imageData[k+1]=Math.pow(_InputObject.imageData[k+1],_Exponent);
                ImS.imageData[k+2]=Math.pow(_InputObject.imageData[k+2],_Exponent);
                ImS.imageData[k+3]=_InputObject.imageData[k+3];

            }while (k);

            return (ImS);

        }


        return (-1);

    };



    /**
     * @function {AkConvertScale} Change the Struct depth to another depth value
     * @param {Akimage} _ImIn Imput Akimage object
     * @param {number} _newDepth new depth
     * @param {boolean} _scale mapping the old value to the new scale
     * @return {Akimage} return a new Akimage object with the new depth
     * @autor Ake
     **/

    _Akontext.AkConvertScale = function(_ImIn,_newDepth, _scale){

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}
        if(!_ImIn.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "expeted Akimage object in arguments"; return false;}




        // Tipo de parametro equivocado

        var newMax = 0;
        var newMin = 0;

        switch (_newDepth){
            case (DEPTH_8U): newMax = 255; newMin = 0; break;
            case (DEPTH_8S): newMax = 127; newMin = -128; break;
            case (DEPTH_16S): newMax = 32767; newMin = -32768; break;
            case (DEPTH_32S): newMax = 2147483647; newMin = -2147483648; break;
            case (DEPTH_32F):
            case (DEPTH_64F): _scale = false; break;
            default:
                AKerrors[17]= true; AKLastError=17;if(AkErrorEnable) throw "Depth code invalid"; return false;
                break;
        }


        var _ImO = AkCreateImage([_ImIn.width,_ImIn.height],_newDepth,_ImIn.nChannels);

        if(_scale){

            // if scale, so find max and min

            switch(_ImIn.nChannels){

                // if 3 and 4 channels
                case 3: case 4:

                var t = _ImIn.imageData.length

                var _M_temp = _ImIn.imageData[t-2];
                var _m_temp = _ImIn.imageData[t-2];

                do{

                    if(_M_temp < _ImIn.imageData[t-2]) _M_temp = _ImIn.imageData[t-2];
                    if(_M_temp < _ImIn.imageData[t-3]) _M_temp = _ImIn.imageData[t-3];
                    if(_M_temp < _ImIn.imageData[t-4]) _M_temp = _ImIn.imageData[t-4];
                    if(_m_temp > _ImIn.imageData[t-2]) _m_temp = _ImIn.imageData[t-2];
                    if(_m_temp > _ImIn.imageData[t-3]) _m_temp = _ImIn.imageData[t-3];
                    if(_m_temp > _ImIn.imageData[t-=4])_m_temp = _ImIn.imageData[t];

                }while (t);


                var k = _ImIn.imageData.length;

                var C1 = (newMax - newMin)/(_M_temp - _m_temp);
                var C0 = _m_temp*C1 + newMin;

                // copy

                do{
                    _ImO.imageData[k-=4]=(_ImIn.imageData[k]*C1)-C0;
                    _ImO.imageData[k+1]=(_ImIn.imageData[k+1]*C1)-C0;
                    _ImO.imageData[k+2]=(_ImIn.imageData[k+2]*C1)-C0;
                    _ImO.imageData[k+3]=255;

                }
                while (k);

                break;

                case 1:

                    // if 1 channel

                    var t = _ImIn.imageData.length;

                    var _M_temp = _ImIn.imageData[t-4];
                    var _m_temp = _ImIn.imageData[t-4];

                    // find max and min
                    do{

                        if(_M_temp < _ImIn.imageData[t-4]) _M_temp = _ImIn.imageData[t-4];
                        if(_m_temp > _ImIn.imageData[t-=4]) _m_temp = _ImIn.imageData[t];

                    }while (t);

                    var k = _ImIn.imageData.length;

                    var C1 = (newMax - newMin)/(_M_temp - _m_temp);
                    var C0 = _m_temp*C1 + newMin;

                    // copy

                    do{
                        _ImO.imageData[k-=4]=(_ImIn.imageData[k]*C1)-C0;
                    }
                    while (k);

                    break;
            } // end switch channel

        }// if scale

        if(!_scale){
            // if is not scale, just copy by SET

            _ImO.imageData.set(_ImIn.imageData);


        }

        return (_ImO);

    };// end AkConvertScale



    /**
     * @function {AkCrop} Crop part of and imagen
     * @param {Akimage} _ImIn Imput Akimage object whit a ROI define in it
     * @return {Akimage} return a new Akimage object result of the new croped
     * @autor Ake
     **/

    _Akontext.AkCrop = function(_ImIn){

        if (arguments.length!=1){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}
        if(!_ImIn.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "expeted Akimage object in arguments"; return false;}
        if(!_ImIn.roi == null){AKerrors[18]= true; AKLastError=18;if(AkErrorEnable) throw "No ROI defined"; return false;}


        var _ImO = AkCreateImage([_ImIn.roi.width,_ImIn.roi.height],_ImIn.depth,_ImIn.nChannels);



        var k = _ImIn.roi.yOffset;
        var p = 0;

        while(k<_ImIn.roi.yOffset+_ImIn.roi.height){
            var _a = ((k*_ImIn.width)+_ImIn.roi.xOffset)<<2;
            var _b = _ImIn.roi.width<<2;

            _ImO.imageData.set(_ImIn.imageData.subarray(_a,_a+_b),(_ImIn.roi.width*p)<<2);
            k++;
            p++;
        }



        return (_ImO);

    };// end AkCrop




    /**
     * @function {AkAddWeighted} Weighted addition between 2 images
     * @param {Akimage} _Im_1 Source image 1
     * @param {number} Weight_1 Weight of the first source
     * @param {Akimage} _Im_2 Source image 2
     * @param {number} Weight_2 Weight of the first source
     * @param {number} Cst Constant for the addition

     * @return {Akimage} return a new Akimage object result of the addition
     *
     * @autor Ake
     *
     * The both source must have the same depth, size and channel. If the two image have ROI, both of then must have
     * the same size, in this case, the rest of the image is the same of the first source
     *
     * The algebraic operation is
     *
     * (Im1 * W1) + (Im2 * W2) + Cst

     *
     **/

    _Akontext.AkAddWeighted = function(_Im_1, Weight_1, _Im_2, Weight_2,Cst){


        if (arguments.length<4 || arguments.length>5){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}
        if(!_Im_1.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "expeted Akimage object in arguments"; return false;}
        if(!_Im_2.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "expeted Akimage object in arguments"; return false;}

        Cst = Cst || 0;

        var _Dst = AkCreateImage([_Im_1.width,_Im_1.height],_Im_1.depth,_Im_1.nChannels);

        var newYEnd = _Im_1.height;
        var newXEnd = _Im_1.width<<2;
        var newXinit = 0;
        var newYinit = 0;
        //var newYEnd2 = _Im_2.height;
        //var newXEnd2 = _Im_2.width<<2;
        var newXinit2 = 0;
        var newYinit2 = 0;
        //var xOff = 0;



        if(_Im_1.roi != null){


            newYEnd = _Im_1.roi.height+_Im_1.roi.yOffset;
            newXEnd = (_Im_1.roi.width+_Im_1.roi.xOffset)<<2;
            newXinit = (_Im_1.roi.xOffset)<<2;
            newYinit = _Im_1.roi.yOffset;
            //newYEnd2 = _Im_2.roi.height+_Im_2.roi.yOffset;
            //newXEnd2 = (_Im_2.roi.width+_Im_2.roi.xOffset)<<2;
            newXinit2 = (_Im_2.roi.xOffset)<<2;
            newYinit2 = _Im_2.roi.yOffset;
            _Dst.imageData.set(_Im_1.imageData);
            //xOff = AImageRefence.roi.xOffset;
        }


        // GREY

        if(_Im_1.nChannels==1){

            var k = newYinit;
            var k2 = newYinit2;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Im_1.width)<<2;
                var _y2 = (k2*_Im_1.width)<<2;
                var n = newXinit;
                var n2 = newXinit2;

                while(n < newXEnd){ // PARA ANCHO

                    var _p = _y+n;
                    var _p2 = _y2+n2;
                    _Dst.imageData[_p] = (_Im_1.imageData[_p] * Weight_1) + (_Im_2.imageData[_p2] * Weight_2) + Cst;
                    n+=4;
                    n2+=4;


                }
                k+=1;
                k2+=1;
            }

        }

        // RGB

        if(_Im_1.nChannels==3){

            var k = newYinit;
            var k2 = newYinit2;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Im_1.width)<<2;
                var _y2 = (k2*_Im_1.width)<<2;
                var n = newXinit;
                var n2 = newXinit2;

                while(n < newXEnd){ // PARA ANCHO

                    var _p = _y+n;
                    var _p2 = _y2+n2;
                    _Dst.imageData[_p] =   (_Im_1.imageData[_p]   * Weight_1) + (_Im_2.imageData[_p2]   * Weight_2) + Cst;
                    _Dst.imageData[_p+1] = (_Im_1.imageData[_p+1] * Weight_1) + (_Im_2.imageData[_p2+1] * Weight_2) + Cst;
                    _Dst.imageData[_p+2] = (_Im_1.imageData[_p+2] * Weight_1) + (_Im_2.imageData[_p2+2] * Weight_2) + Cst;

                    n+=4;
                    n2+=4;

                }
                k+=1;
                k2+=1;
            }

        }

        //RGBA

        if(_Im_1.nChannels==4){

            var k = newYinit;
            var k2 = newYinit2;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Im_1.width)<<2;
                var _y2 = (k2*_Im_1.width)<<2;
                var n = newXinit;
                var n2 = newXinit2;

                while(n < newXEnd){ // PARA ANCHO

                    var _p = _y+n;
                    var _p2 = _y2+n2;
                    _Dst.imageData[_p] =   (_Im_1.imageData[_p]   * Weight_1) + (_Im_2.imageData[_p2]   * Weight_2) + Cst;
                    _Dst.imageData[_p+1] = (_Im_1.imageData[_p+1] * Weight_1) + (_Im_2.imageData[_p2+1] * Weight_2) + Cst;
                    _Dst.imageData[_p+2] = (_Im_1.imageData[_p+2] * Weight_1) + (_Im_2.imageData[_p2+2] * Weight_2) + Cst;
                    _Dst.imageData[_p+3] = (_Im_1.imageData[_p+3] * Weight_1) + (_Im_2.imageData[_p2+3] * Weight_2) + Cst;


                    n+=4;
                    n2+=4;

                }
                k+=1;
                k2+=1;
            }
        }

        return (_Dst);

    };// end AkAddWeighted


    /**
     * @function {AkClone} Clone the object Akimage to another one

     * @return {Akimage} return a new Akimage cloned by the argument object
     *
     *@autor Ake
     **/

    _Akontext.AkClone = function(AImageRefence) {

        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "expeted Akimage object in arguments"; return false;}

        var _ImS = AkCreateImage([AImageRefence.width,AImageRefence.height],AImageRefence.depth,AImageRefence.nChannels);
        _ImS.imageData.set(AImageRefence.imageData);

        return _ImS;
    };


    /**
     * @function {AkResize} Resize an image
       @param {Akimage} _ImInput Input object
       @param {number} _Nwidth New Width
       @param {number} _Nheight New Height

     * @return {Akimage} return a new Akimage with the new size
     *
     *@autor Ake
     **/

    _Akontext.AkResize = function(_ImInput,_Nwidth,_Nheight) {

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}
        if(!_ImInput.depth == DEPTH_8U){AKerrors[15]= true; AKLastError=15;if(AkErrorEnable) throw "Size must be a 8 bits depth";}
        var _AKcanvasOld = document.createElement("CANVAS");
        var _AKcanvasNew = document.createElement("CANVAS");

        _AKcanvasNew.width = _Nwidth;
        _AKcanvasNew.height = _Nheight;

        _AKcanvasOld.width = _ImInput.width;
        _AKcanvasOld.height = _ImInput.height;

        var objImageData= _AKcanvasOld.getContext('2d').createImageData(_ImInput.width,_ImInput.height);
        objImageData.data.set(_ImInput.imageData);
        _AKcanvasOld.getContext('2d').putImageData(objImageData, 0, 0);
        _AKcanvasNew.getContext("2d").drawImage(_AKcanvasOld,0,0,_Nwidth,_Nheight);
        var _ImS = AkCreateImage([_Nwidth,_Nheight],_ImInput.depth,_ImInput.nChannels);
        _ImS.imageData =_AKcanvasNew.getContext('2d').getImageData(0, 0,_Nwidth,_Nheight).data;

        return _ImS;
    };




    /**
     *
     @function {AkNormalizeArray} normalize the array between 2 a max and min value specificated in the parameters
     @param {Array} _Input Array
     @param {Array} _Output Array
     @param {number} _OldMax Old max value
     @param {number} _OldMin min value
     @param {number} _NewMax new max Value
     @param {number} _NewMin bew min value

     //parameter normalization: val[i] = [(val[i-1] - MinOld) * (MaxNew - minNew)/(MaxOld - minOld)] + minNew

     * @return {_Output Array} return the same Array passed by parameter
     *
     *@autor Ake
     **/

    _Akontext.AkNormalizeArray = function(_Input,_Output,_OldMax,_OldMin,_NewMax,_NewMin) {

        if (arguments.length!=6){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}
        if (_Input.length!=_Output.length ){AKerrors[25]= true; AKLastError=5;if(AkErrorEnable) throw "Input and Output Array size must be the same"; return false;}

        var __Operator = (_NewMax - _NewMin)/(_OldMax - _OldMin);


        var k = _Input.length;
        if(_NewMin != 0) {


            do{

                _Output[k-1] = ((_Input[k-1] - _OldMin) * __Operator) + _NewMin;


            }while(k-- > 1 )

        }

        else{

            do{

                _Output[k-1] = ((_Input[k-1] - _OldMin) * __Operator);


            }while(k-- > 1 )

        }
        return _Output;
    };

    /**
     *
     @function {AkMatrix2Array} parse a Matrix struc to an Array struct with the contiguous rows

     @param {Array} _Input 2D Array
     @param {Array} _Output Array

     //parameter normalization: val[i] = [(val[i-1] - MinOld) * (MaxNew - minNew)/(MaxOld - minOld)] + minNew

     * @return {_Output Array} return the same Array passed by parameter
     *
     *@autor Ake
     **/

    _Akontext.AkMatrix2Array = function(_Input,_Output) {

        if (arguments.length!=2){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}

        var _x = _Input.length;
        var _y = _Input[0].length;
        var __c = 0;


            for(var k =0; k< _x; k++){

                for(var p = 0; p<_y; p++){

                    _Output[__c] = _Input[k][p];
                    __c++;
                }

            }

        return _Output;
    };




    // END CONTEXT

})(this);


/* Color */
/**
 * 	   @Color_tools
 */




(function (_Akontext) {


    /**
     * @function {AkCvtColor} Convert an image from one color model to another
     * @param {Akimage}_ImE Input image reference
     * @param {int}_Ccode Model output color code
     * @return {Akimage}
     *
     * @autor Ake
     **/




    _Akontext.AkCvtColor = function(_ImE, _Ccode) {


        /// Salidas rapidas

        if (arguments.length!=2){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}
        if(!_ImE.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "expeted Akimage object in arguments"; return false;}
        if(_ImE.depth != 8){AKerrors[15]= true; AKLastError=15;if(AkErrorEnable) throw "In AkCvtColor, input depth must be DEPTH_8U"; return false;}



        var _coef = [0.3,0.58,0.114];

        switch (_Ccode){

            //RGB2RGBA
            case 0:

                var _ImS = AkCreateImage([_ImE.width,_ImE.height],8,4);
                _ImS.imageData.set(_ImE.imageData);
                break;

            //RGB2GRAY //RGBA2GRAY
            case 7:case 11:


            var _ImS = AkCreateImage([_ImE.width,_ImE.height],8,1);
            var k = _ImS.imageData.length;


            do{
                _ImS.imageData[k-=4] = (_ImE.imageData[k]*_coef[0])+(_ImE.imageData[k+1]*_coef[1])+(_ImE.imageData[k+2]*_coef[2]);

            }while (k);


            break;


            //RGB2HSV
            case 41:

                var _ImS = AkCreateImage([_ImE.width,_ImE.height],8,3);
                var k = _ImS.imageData.length;


                do{

                    var R = _ImE.imageData[k-=4];
                    var G = _ImE.imageData[k+1];
                    var B = _ImE.imageData[k+2];


                    R=R/255;
                    G=G/255;
                    B=B/255;

                    var minRGB = R;
                    var maxRGB = R;

                    if(G<minRGB) minRGB = G;
                    if(B<minRGB) minRGB = B;
                    if(G>maxRGB) maxRGB = G;
                    if(B>maxRGB) maxRGB = B;


                    // Black-gray-white
                    if (minRGB==maxRGB) {
                        _ImS.imageData[k] = minRGB;
                        _ImS.imageData[k+1] =
                            _ImS.imageData[k+2] = 0;
                    }

                    if(minRGB!=maxRGB){

                        // Colors other than black-gray-white:
                        var d = (R==minRGB) ? G-B : ((B==minRGB) ? R-G : B-R);
                        var h = (R==minRGB) ? 3 : ((B==minRGB) ? 1 : 5);

                        _ImS.imageData[k] = (h - d/(maxRGB - minRGB))*42.6;
                        _ImS.imageData[k+1] = ((maxRGB - minRGB)/maxRGB)*255;
                        _ImS.imageData[k+2] = (maxRGB)*255;

                    }


                }while (k);


                break;




            //RGBA2RGB
            case 1:

                var _ImS = AkCreateImage([_ImE.width,_ImE.height],8,3);
                _ImS.imageData.set(_ImE.imageData);
                break;


            //GRAY2RGB
            case 8:

                var _ImS = AkCreateImage([_ImE.width,_ImE.height],8,3);
                var k = _ImS.imageData.length;


                do{
                    _ImS.imageData[k-=4] =
                        _ImS.imageData[k+1]=
                            _ImS.imageData[k+2]=  _ImE.imageData[k];
                    //   _ImS[k+3]=255;

                }while (k);


                break;


            //GRAY2RGBA
            case 9:


                var _ImS = AkCreateImage([_ImE.width,_ImE.height],8,4);
                var k = _ImS.imageData.length;


                do{
                    _ImS.imageData[k-=4] =
                        _ImS.imageData[k+1]=
                            _ImS.imageData[k+2]=  _ImE.imageData[k];
                    _ImS.imageData[k+3]=255;

                }while (k);


                break;

            //HSV2RGB
            case 55:

                var _ImS = AkCreateImage([_ImE.width,_ImE.height],8,3);
                var k = _ImS.imageData.length;


                do{


                    var H = _ImE.imageData[k-=4]*0.02352;
                    var S = _ImE.imageData[k+1]/255;
                    var V = _ImE.imageData[k+2]/255;

                    var R = 0;
                    var G = 0;
                    var B = 0;

                    var C = V * S;


                    var X = C * (1.0 - Math.abs((H % 2.0) - 1.0));

                    switch(H^0){
                        case 0:
                            R = C;
                            G = X;
                            break;

                        case 1:
                            R = X;
                            G = C;
                            break;

                        case 2:
                            G = C;
                            B = X;
                            break;

                        case 3:
                            G= X;
                            B = C;
                            break;

                        case 4:
                            R = X;
                            B = C;
                            break;

                        case 5:
                            R = C;
                            B = X;
                            break;

                        case 6:
                            R = C;
                            B = X;
                            break;

                    }

                    var min = V - C;

                    _ImS.imageData[k]   = (R + min)*255;
                    _ImS.imageData[k+1] = (G + min)*255;
                    _ImS.imageData[k+2] = (B + min)*255;


                }while(k);

                break;

            default:

                AKerrors[16]= true; AKLastError=16;if(AkErrorEnable) throw "Color code invalid"; return false;

                break;
        };

        return  (_ImS);
    };



    // END CONTEXT

})(this);


/* GUI */
/**
 * 	   @GUI
 */




(function (_Akontext) {


    /**@function AkGet: Return a pixel value from the Akimage object

     * @param {Akimage} AkAImage Akimage reference
     * @param {number} _x X value
     * @param {number} _y Y value
     * @param {number} _c Channel value

     *
     * @return Return a pixel value from the Akimage object
     *
     * @autor Ake
     *
     **/

    _Akontext.AkGet = function(AkAImage,_x,_y,_c) {

        //if (arguments.length!=4){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; return false;}
        //if(!AkAImage.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "expeted Akimage object in arguments"; return false;}
        //if(_x<0 || _x > AkAImage.width){AKerrors[21]= true; AKLastError=21;if(AkErrorEnable) throw "In AkGet arguments out of range"; return false;}
        //if(_y<0 || _y > AkAImage.height){AKerrors[21]= true; AKLastError=21;if(AkErrorEnable) throw "In AkGet arguments out of range"; return false;}
        //if(_c<0 && _c > 4){AKerrors[21]= true; AKLastError=21;if(AkErrorEnable) throw "In AkGet arguments out of range"; return false;}

        return (AkAImage.imageData[(((AkAImage.width * _y)+(_x))<<2)+_c])

    };


    /**	 * @function AkSet: Set a value to the pixel coordinate
     * @param {Akimage} AkAImage Akimage reference
     * @param {number} _x X value
     * @param {number} _y Y value
     * @param {number} _c Channel value
     * @param {number} _value Value to set

     *
     * @return Return a pixel value from the Akimage object
     *
     * @autor Ake
     *
     **/

    _Akontext.AkSet = function(AkAImage,_x,_y,_c,_value) {
        AkAImage.imageData[(((AkAImage.width * _y)+(_x))<<2)+_c] = _value;
    };


    /**	 * @function AkLoadOnCanvas: Load on a CANVAS element the Akimage object
     * @param {Akimage} AkAImage Akimage reference
     * @param {CANVAS} CANVASReference Canvas object reference
     * @return Canvas father reference object
     *
     * @autor Ake
     *
     **/

    _Akontext.AkLoadOnCanvas = function(AkAImage,CANVASReference) {

        if(!(CANVASReference.nodeName == "CANVAS" || document.getElementById(CANVASReference).nodeName == "CANVAS")){
            {AKerrors[4]= true; AKLastError=4;return false;}
        }

        try{
            if(document.getElementById(CANVASReference).nodeName == "CANVAS")CANVASReference = document.getElementById(CANVASReference);
        }
        catch(e){}

        _tempData = new Uint8ClampedArray(AkAImage.imageData.length);

        /**
         * Desc:
         * Constituyo un arreglo para normalizar
         * formo un arreglo dependiendo de los canales y la profundidad
         * normalizo
         * */

        //				_coef = [0.3,0.58,0.114];

        switch (AkAImage.depth){


            case (8):


                //data between 0:255
                /**
                 * case 8, entero de 0 a 255
                 *
                 * **/


                switch (AkAImage.nChannels){

                    //channel 1 and 2 equals 0
                    case 1:

                        var k = _tempData.length;




                        do{
                            _tempData[k-=4] =
                                _tempData[k+1]=
                                    _tempData[k+2]=  AkAImage.imageData[k];
                            _tempData[k+3]=255;

                        }while (k);



                        break;

                    case 3:
                        _tempData.set(AkAImage.imageData);
                        var k = _tempData.length+3;
                        do{

                            _tempData[k-=4]=255;  //alpha

                        }
                        while (k>0);

                        break;


                    case 4:
                        _tempData.set(AkAImage.imageData);

                        break;
                }


                break;

            case (2147483656):

                //data between -128:127

                /**
                 * case 2147483656, entero con signo -128 a 127
                 *
                 * **/

                switch (AkAImage.nChannels){

                    //channel 1 and 2 equals 0
                    case 1:

                        // caso gray

                        var k = _tempData.length;

                        // Obtengo el valor promedio gray y reemplazo para atras, subo 128
                        // almaceno el gray en el canal rojo

                        do{
                            _tempData[k-=4] =
                                _tempData[k+1]=
                                    _tempData[k+2]=AkAImage.imageData[k]+128;
                            _tempData[k+3]=255;

                        }while (k);

                        break;

                    case 3: case 4:

                    // caso rgb

                    var k = _tempData.length;

                    // subo 128 en rgb
                    // dejo alpah igual

                    if(AkAImage.nChannels == 3){

                        do{
                            _tempData[k-=4]=AkAImage.imageData[k]+128;
                            _tempData[k+1]=AkAImage.imageData[k+1]+128;
                            _tempData[k+2]=AkAImage.imageData[k+2]+128;
                            _tempData[k+3]=255;



                        }
                        while (k>0);

                        break;
                    }

                    if(AkAImage.nChannels == 4){

                        do{
                            _tempData[k-=4]=AkAImage.imageData[k]+128;
                            _tempData[k+1]=AkAImage.imageData[k+1]+128;
                            _tempData[k+2]=AkAImage.imageData[k+2]+128;
                            _tempData[k+3]=AkAImage.imageData[k+3]+128;



                        }
                        while (k>0);
                    }

                    break;

                }


                break;


            case (2147483664) :case (2147483680):case (32):case (64):

            // para el resto de las profundidades:
            // obtengo el valor maximo y minimo

            _M_temp = 0;
            _m_temp = 0;


            switch (AkAImage.nChannels){

                // Si gray (1 canal)
                // busco el M y m solo en el canal rojo

                case 1:

                    var t = _tempData.length;

                    _M_temp = AkAImage.imageData[t-4];
                    _m_temp = AkAImage.imageData[t-4];

                    do{

                        if(AkAImage.imageData[t-=4] > _M_temp){

                            _M_temp =  AkAImage.imageData[t];
                        }

                        if(AkAImage.imageData[t] < _m_temp){


                            _m_temp = AkAImage.imageData[t];
                        }


                    }while (t);

                    var k = _tempData.length;

                    // convension,
                    //si mayor == menor, entonces mayor = 255 y menor = 0, se evita llenar el arreglo de 0 y dividir por 0.

                    if (!(_M_temp - _m_temp)){_M_temp = 255; _m_temp = 0;}

                    //escalo :
                    /*
                     *   val[i] = [(val[i-1] - MinOld) * (MaxNew - minNew)/(MaxOld - minOld)] + minNew
                     *
                     *   constantes:
                     *
                     *   maxNew = 255
                     *   minNew = 0
                     *   =>
                     *
                     *   val[i] = [(val[i-1] - MinOld) * (255)/(MaxOld - minOld)]
                     *
                     *   val[i] = (val[i-1]*255/(MaxOld - minOld) - MinOld*255/(MaxOld - minOld)
                     *
                     *   C1 = 255/(MaxOld - minOld)
                     *
                     *    val[i] = (val[i-1]*C1 - MinOld*C1
                     *
                     *    C0 = MinOld*C1
                     *
                     *    val[i] = val[i-1] * C1 - C0
                     *
                     * */

                    var C1 = 255 /(_M_temp - _m_temp);
                    var C0 = _m_temp*C1;

                    do{


                        _tempData[k-=4] =
                            _tempData[k+1]=
                                _tempData[k+2]=  (AkAImage.imageData[k]*C1)-C0;
                        _tempData[k+3]=255;



                    }while (k);

                    break;

                case 3: case 4:
                // Si 3 canales, busco M y m en rgb
                var t = _tempData.length;

                _M_temp = AkAImage.imageData[t-2];
                _m_temp = AkAImage.imageData[t-2];

                do{

                    if(_M_temp < AkAImage.imageData[t-2]) _M_temp = AkAImage.imageData[t-2];
                    if(_M_temp < AkAImage.imageData[t-3]) _M_temp = AkAImage.imageData[t-3];
                    if(_M_temp < AkAImage.imageData[t-4]) _M_temp = AkAImage.imageData[t-4];
                    if(_m_temp > AkAImage.imageData[t-2]) _m_temp = AkAImage.imageData[t-2];
                    if(_m_temp > AkAImage.imageData[t-3]) _m_temp = AkAImage.imageData[t-3];
                    if(_m_temp > AkAImage.imageData[t-=4])_m_temp = AkAImage.imageData[t];

                }while (t);


                var k = _tempData.length;

                if (!(_M_temp - _m_temp)){_M_temp = 255; _m_temp = 0;}

                var C1 = 255 /(_M_temp - _m_temp);
                var C0 = _m_temp*C1;

                if (AkAImage.nChannels == 3){

                    do{
                        _tempData[k-=4]=(AkAImage.imageData[k]*C1)-C0;
                        _tempData[k+1]=(AkAImage.imageData[k+1]*C1)-C0;
                        _tempData[k+2]=(AkAImage.imageData[k+2]*C1)-C0;
                        _tempData[k+3]=255;



                    }
                    while (k>0);

                    break;
                }


                if (AkAImage.nChannels == 4){

                    do{
                        _tempData[k-=4]=(AkAImage.imageData[k]*C1)-C0;
                        _tempData[k+1]=(AkAImage.imageData[k+1]*C1)-C0;
                        _tempData[k+2]=(AkAImage.imageData[k+2]*C1)-C0;
                        _tempData[k+3]=AkAImage.imageData[k+3];



                    }
                    while (k>0);
                }

                break;

            }

        }


        // Listo el arreglo, ahora redimensiono el canvas pasado para que se ajuste al arreglo unidimensional (Si o si)




        CANVASReference.width = AkAImage.width;
        CANVASReference.height = AkAImage.height;

        var objImageData= CANVASReference.getContext('2d').createImageData(AkAImage.width, AkAImage.height);

        objImageData.data.set(_tempData);
        CANVASReference.getContext('2d').putImageData(objImageData, 0, 0);

        return  CANVASReference;
    };






})(this);

