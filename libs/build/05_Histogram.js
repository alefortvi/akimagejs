



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


        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;throw "incorrect numbers of arguments"; return false;}
        if(!_ImIn.imageData){AKerrors[4]= true; AKLastError=4;throw "expeted Akimage object in arguments"; return false;}
        if(!_Hist.bins){AKerrors[22]= true; AKLastError=22;throw "expeted AkHistogram object in arguments"; return false;}



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
     **/



    _Akontext.AkHist2Akimage = function(AkHist,_channels,_width,_height,_fill,_color) {


        if (arguments.length!=6){AKerrors[5]= true; AKLastError=5;throw "incorrect numbers of arguments"; return false;}
        if(!AkHist.bins){AKerrors[22]= true; AKLastError=22;throw "expeted AkHistogram object in arguments"; return false;}




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

        var ImS_ = AkCreateImage([_width,_height],8,3);
        ImS_.imageData =_AKcanvasNew.getContext('2d').getImageData(0, 0,_width,_height).data;



        return ImS_;




    };








})(this);


