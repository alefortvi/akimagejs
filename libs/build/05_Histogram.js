



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
			**/


					_Akontext.AkCalcHist = function(_ImIn, _Hist,_Hcode) {

                        /*
                        *
                        * TODO Salidas rapidas
                        * ROI
                        *
                        * **/


                        _Hcode = _Hcode | 0;
                        var ROI = false;

                        if(_ImIn.roi){
                            ROI = true;
                        }

                        if(ROI){

                        }


                        var newYEnd = _ImIn.height;
                        var newXEnd = _ImIn.width<<2;
                        var newXinit = 0;
                        var newYinit = 0;
                        var xOff = 0;


            /*
                        if(AImageRefence.roi != null){

                            ImS.imageData.set(AImageRefence.imageData);
                            newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelWidth;
                            newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                            newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                            newYinit = AImageRefence.roi.yOffset+_KernelWidth;
                            xOff = AImageRefence.roi.xOffset;


                        }
            */


                        _Hist.maxBins[0] = [];



                        if(_ImIn.nChannels==1){

                            var k = 0;

                            while(k<_Hist.bins.length){ // relleno con ceros

                                _Hist.maxBins[0][k++]=0;

                            }

                            var k = 0;

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

                            while(k<_Hist.bins.length){ // relleno con ceros

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
                 * @param {Akimage} AImageRefence: Akimage reference,Canvas object reference
                 * @param {HTMLCANVAS} AkAImage: Html Canvas object Reference
                 * @param {number} _height: Html Canvas object Reference
                 * @param {number} _width: Html Canvas object Reference
                 *
                 *
                 * @return Canvas father reference object
                 **/



                _Akontext.AkHist2Akimage = function(AkHist,_channels,_width,_height) {


                    /**
                     *
                     * TODO
                     * configurar altura y ancho
                     * configurar fill
                     //lista de colores
                     // flag de acumulacion
                     *
                     * */



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
                    var c2=1;

                    switch (_channels){
                        case (1):c1 = 0;break;
                        case (2):c1 = 1;break;
                        case (3):c1 = 0;c2 = 1;break;
                        case (4):c1 = 2;break;
                        case (5):c1 = 0;c2 = 2;break;
                        case (6):c1 = 1;c2 = 2;break;
                    };


                    switch (_channels){
                        case (1):case (2):case (4):

                            var k = AkHist.maxBins[c1].length;

                            do{
                                k-=1;
                                if(AkHist.maxBins[c1][k]>fullMax)
                                    {fullMax = AkHist.maxBins[c1][k]}

                            }while(k);

                            break;

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


                    }




                    var _Q = (_height / fullMax);

                    var k = AkHist.maxBins[0].length;
                    var ancho = AkHist.maxBins[0].length;

                    var ImS = AkCreateImage([k,_height],8,3);

                    do{

                        var _h =  (_height - (AkHist.maxBins[0][k] *_Q))^0;

                        k--;
                        ImS.imageData[((_h*ancho)<<2) + (k<<2)] = 255;
                        //ImS.imageData[((_h*ancho)<<2) + (k<<2)+1] = 255;
                        //ImS.imageData[((_h*ancho)<<2) + (k<<2)+2] = 255;
                        //ImS.imageData[((_h*ancho)<<2) + (k<<2)+3] = 255;



                    }while(k);


                    return ImS;

                    var _temp = new Uint8ClampedArray((ancho*_height)<<2);
                    _temp.set(ImS.imageData);

                    //hasta aca el histograma tiene el ancho del Maxbines

                    //escalar y rotar

                    //crear CANVAS

                    var _AKcanvasOld = document.createElement("CANVAS");
                    var _AKcanvasNew = document.createElement("CANVAS");



                    _AKcanvasNew.width = ancho;
                    _AKcanvasNew.height = _height;

                    // pongo el contenido en un canvas
                    var objImageData= (_AKcanvasOld.getContext("2d")).createImageData(ancho,_height);


                    (objImageData.data).set(_temp);


                    (_AKcanvasOld.getContext("2d")).putImageData(objImageData,0,0);


                    //_AKcanvasOld.getContext('2d').putImageData(objImageData, 0, 0);


                    var ImS = AkCreateImage([ancho,_height],8,1);


                    ImS.imageData.set(_AKcanvasNew.getContext("2d").getImageData(0, 0, ancho,_height).data);

                    return ImS;

                    _AKcanvasNew.width = _width;
                    _AKcanvasNew.height = _height;

                    //ImS.imageData.set(_AKcanvasOld.getContext('2d').getImageData(0, 0, _width,_height).data);

                    //extraigo imagen

                    _AKcanvasNew.getContext("2d").drawImage(_AKcanvasOld,0,0,_width,_height);

                    var ImS = AkCreateImage([_width,_height],8,1);

                    ImS.imageData = _AKcanvasNew.getContext('2d').getImageData(0, 0, _width,_height).data;



                    /*
                    *

                     var objImageData= _AKcanvasOld.getContext('2d').createImageData(Math.sqrt(_AKernel.length), Math.sqrt(_AKernel.length));

                     objImageData.data.set(_tempData);

                     _AKcanvasOld.getContext('2d').putImageData(objImageData, 0, 0);

                     _AKcanvasNew.width = max;
                     _AKcanvasNew.height = max;

                     //Magic magic
                     _AKcanvasNew.getContext("2d").drawImage(_AKcanvasOld,0,0,max,max);

                     var _newTempData;// = new Uint8ClampedArray(H*H);

                     _newTempData =_AKcanvasNew.getContext('2d').getImageData(0, 0, max,max).data;
                    * */



                    return ImS;




                };








            })(this);


