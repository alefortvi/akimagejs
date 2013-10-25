



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
				 * isColor
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
					 *      @return {akimage}
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
                 * */


                _Akontext.AkCreateROI = function(_xOffset,_yOffset, _Width, _Height) {

                    if (arguments.length!=4) {AKerrors[5]= true; AKLastError=5; throw "invalid number of arguments";return false;}

                    if (_xOffset < 0 || _yOffset <0|| _Width <1|| _Height<1) {AKerrors[4]= true; AKLastError=4; throw "invalid value of argument" ;return false;}



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
                 * 		@param {number} _xOffset X offset
                 * 	@param {number} _yOffset X offset
                 * 	@param {number} _Width X offset
                 * 	@param {number} _Height X offset
                 *      @return {AIROI}
                 * */


                _Akontext.AkCreateHist = function(_bins){

                    if (arguments.length!=1) {AKerrors[5]= true; AKLastError=5; throw "invalid number of arguments";return false;}
                    if (!(Object.prototype.toString.apply(_bins) === '[object Array]')) {AKerrors[19]= true; throw "In Histogram array expeted" AKLastError=19; return false;}

                   var multi = false;
                   if(_bins[0][0] != undefined) {multi = true;}




                    var _Histogram = (new Akimage.AkHistogram()).AkHistogram;




                    if(!multi){

                        if(_bins[1]<_bins[0])
                            {AKerrors[20]= true; AKLastError=20; throw "in Histogram invalid hight value is low than low value";return false;}


                        for(var k = _bins[0]; k<_bins[1];k++){


                            _Histogram.bins[k] = k;

                        }

                    }



                    if(multi){

                        var _i = 0;

                        for(var p= 0; p<_bins.length;p++){

                            if(_bins[p][1]<_bins[p][0])
                                {AKerrors[20]= true; AKLastError=20; throw "in Histogram invalid hight value is low than low value";return false;}

                            for(var k = _bins[p][0]; k<_bins[p][1];k++){


                                _Histogram.bins[_i] = p;

                                _i++;
                            }

                        }

                    }


                    return (_Histogram);

                };

				})(this);


