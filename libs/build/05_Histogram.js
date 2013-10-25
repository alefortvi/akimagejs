



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
                * @return {AkHistrogram}
			**/


					_Akontext.AkCalcHist = function(_ImIn, _Hist) {


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

                        if(AImageRefence.roi != null){

                            ImS.imageData.set(AImageRefence.imageData);
                            newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelWidth;
                            newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                            newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                            newYinit = AImageRefence.roi.yOffset+_KernelWidth;
                            xOff = AImageRefence.roi.xOffset;


                        }





                        if(_ImIn.nChannels==1){

                            var k = 0;

                            while(k<newYEnd){ //PARA ALTO

                                var _y = (k*_ImIn.width)<<2;
                                //var _y1 = (k1*_Owidth)<<2;

                                var n = newXinit;
                                //var n1 = xOff<<2;

                                while(n < newXEnd){ // PARA ANCHO
                                    _Hist.maxBins[_Hist.bins[_ImIn.imageData[_y+n]]]+=1;

                                    n+=4;

                                }
                                k+=1;
                            }

                        }

                        if(_ImIn.nChannels==3){}
                        if(_ImIn.nChannels==4){}



                        return (_ImIn);

                };


				})(this);


