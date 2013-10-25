
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
@Constats
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

	})(this);




	/*
	 * @AKontrol
	 * Akimage controls variables
	 * */
	
Akimage.namespace('Akimage.AKontrol');


(function (_Akontext) {
		

					/*** Akimage controls variables ****/

					_Akontext.AKerrors = [];
						
					_Akontext.AKLastError = "";
		

})(this);


	Akimage.namespace('Akimage.AIROI');

	/*
	 *
	 * @components
	 *
	 * AIROI
	 */

	
	/* AIROI, similar a IPLROI  */

(function (_Akontext) {
		
	Akimage.AIROI = function(){

			this.AIROI = {

				xOffset : 0,

				yOffset : 0,

				height: 1,

				width : 1,

				coi : 1

			};
	};
	
})(this);



	/*
	 *
	 * @components
	 *
	 * AImage
	 */


Akimage.namespace('Akimage.AImage');

(function (_Akontext) {
	
	
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

				// priviledged method

		//		metodo_privilegiado:function () {
		//			return metodo(atributo);
		//		},

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

				roi : {xOffset : 0,yOffset : 0,height: 1,width : 1,coi : 1},

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
			/**	 * @loadImage
				 * @param {Imagereference}{isColor} object reference, color model
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



			/**	 * @AkCreateImage size, depth, channels
			 * @param {size}{depth}{channels}
			 **/
					/*
					 * 		size: Image Size array
					 * 		depth: bit depth
					 * 		channels: number of channels
					 *
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


				})(this);


Akimage.namespace('Akimage.Modules');

/* Tools */
/**
 * 	   @Modules
 */




(function (_Akontext) {

	/* Private FFT */
	
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
		        throw new Error("init: radix-2 required");
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
		  FFT.fft(re, im);
		  if(swap){
			  FFT.swap(re,im);
		  }
		  return([re,im]);
	}
	if(swap){
		  FFT.swap(re,im);
	  }
	FFT.ifft(re, im);
	
	  return([re,im]);
	  
	};
	
	
	/**	 * AkDFT
	 * @param _ImE: Akimage Object (This object has in the 0 (Red) channel the real values
	 * and in the 1 (green) channel the imaginary values
	 * @param flag: Options: 
	 * @param 	  		DXT_FORWARD transformacion hacia adelante:0
	 * @param 			DXT_INVERSE transformacion hacia atras:1
	 * @param 			DXT_SCALE escala el resultado por 1/NN:2
	 * @param 			DXT_ROWS  transforma N dft de 1D:4
	 * @param 			swaped  true: image shifted, false: image normal
	 * @return Akimage Object( This Akimage Object (This object has in the 0 (Red) channel the real values
	 * and in the 1 (green) channel the imaginary values
**/

	
	_Akontext.AkDFT = function (_ImE,_flag,shift){
		
		 // Nro de parametros equivocados
		if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;throw "incomplete parameters"; return false;}
	
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
	        throw new Error("init: radix-2 required");
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
	imageWidth = _ImE.width,
    n = imageWidth;


	// Creo el objeto Akimage
	
	var ImS = AkCreateImage([_ImE.width, _ImE.height], 32, 3);
	var	re = [],
		im = [];
	
	//var re = new Int32Array   (_ImE.width),
	//im = new Int32Array   (_ImE.width);
	
	
	
		
	
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
	
	    	ImS.imageData[(i << 2) + (x << 2)] = re[i + x],
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
		
		    	ImS.imageData[(i << 2) + (x << 2)] = re[i + x],
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
			
			    	ImS.imageData[(i << 2) + (x << 2)] = re[i + x],
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

	
	/**	 @AkGetOptimalDFTSize Get the near optimal value size
	* @param {_Adimension} Dimension of the Akimage objeto (width or height
	* @return {optimal_value} optimal Dft value
	**/
	};//End Context	
	
	_Akontext.AkGetOptimalDFTSize = function(_Adimension) {
		
		if(!(_Adimension & (_Adimension -1 ))){return _Adimension;}
			
		if(!_Adimension){AKerrors[4]= true; AKLastError=4;throw "invalid parameters"; return false;}
		
 
		 while (_Adimension & (_Adimension-1)) {
			 _Adimension = _Adimension & (_Adimension-1);
		 }
		 
		 _Adimension = _Adimension << 1;
		 
		 return _Adimension;
		};


	/**	 @AkPaddingZero Fill with zero to complete the size
	* @param {_Adimension} Dimension of the Akimage objeto (width or height
	* @return {optimal_value} optimal Dft value
	**/
	
	_Akontext.AkPaddingZero = function(_AIn, _ANewSize) {
		
		
		
		 // Nro de parametros equivocados
		if (arguments.length!=2){AKerrors[5]= true; AKLastError=5;throw "incomplete parameters"; return false;}
		if(!_AIn.imageData){AKerrors[4]= true; AKLastError=4;throw "invalid parameters"; return false;}
		if(!_ANewSize){AKerrors[4]= true; AKLastError=4;throw "invalid parameters"; return false;}
//		if(_ANewSize>4096){AKerrors[7]= true; AKLastError=7;throw "Padding size, too hight"; return false;}
		if(_ANewSize<_AIn.width){AKerrors[8]= true; AKLastError=8;throw "new size is lower than old size"; return false;}
		if(_AIn.width != _AIn.height){AKerrors[9]= true; AKLastError=9;throw "Image must be square"; return false;}
		
		if(_ANewSize==_AIn.width) {return _AIn;}
		
		var ImS;
		

			var ImS = AkCreateImage([_ANewSize,_ANewSize], _AIn.depth, _AIn.nChannels);
			
			for(var k = 0; k<_AIn.width;k++){
				ImS.imageData.set(_AIn.imageData.subarray((k*_AIn.width)<<2,((_AIn.width<<2)*(k+1))-1),(k*_ANewSize)<<2);
				
			}
			
			return ImS;
	};

	/**	 AkFilter2D Return the convolution of the input image by the kernel
	* @param {_AIn} Input Akimage
	* @param {_AKernel} Kernel
	* @return {Convolute image} 
	**/
	
	
	_Akontext.AkFilter2D = function(_AIn, _AKernel) {
		
		
		
		 // Nro de parametros equivocados
		if (arguments.length!=2){AKerrors[5]= true; AKLastError=5;throw "incomplete parameters"; return false;}
		if(!_AIn.imageData){AKerrors[4]= true; AKLastError=4;throw "invalid parameters"; return false;}
		
		
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
		
		
		
		 /* padding Kernel*/

		var reK = new Float32Array(max*max);
		var imK = new Float32Array(max*max);
		var _tempKernel = new Float32Array(_AKernel.length);
		_tempKernel.set(_AKernel);
		
		var _Kw = Math.sqrt(_tempKernel.length);
		
		
		if (_temp.length < reK.length){
			
			//si hay padding
			for(var k = 0; k<_Kw;k++){
				reK.set(_tempKernel.subarray(k*_Kw,(k+1)*_Kw),(k*max));
			};
		}
		//si no hay padding
		else{
			reK.set(_AKernel);
		}
		
		

		/******************** VER DE HACER LAS DOS TRANSFORMACIONES JUNTAS *********************/
		// transforming image
		
		var _Tim = _FFT(re,im,max,false,false);
		
		return _Tim;
		// transforming Kernel
		
		var _Tke = _FFT(reK,imK,max,false,false);
		
		var Fre = [];
		var Fim = [];
		
		// product
		
		for(var kk=0;kk<_Tke[0].length;kk++){
			Fre[kk] = (_Tim[0])[kk]*(_Tke[0])[kk];
			Fim[kk] = (_Tim[1])[kk]*(_Tke[1])[kk];
		}
		
		//inverse;
		
		_Tim = _FFT(Fre,Fim,max,true,false);
		
		var ImS = AkCreateImage([max, max], 32, 3);
		
		for(var y=0; y<max; y++) {
		    var i = y*max;
		
		
		    for(var x=0; x<max; x++) {
		
		    	ImS.imageData[(i << 2) + (x << 2)] = (_Tim[0])[i + x],
		    	ImS.imageData[(i << 2) + (x << 2)+1] = (_Tim[1])[i + x];
		
		    }
		  }
		
		return ImS;

	};
	
	
	
// END MODULES	
})(this);	
			/* Tools */
			/**
			 * 	   @Tools
			 */
			/**	 * @AkGetSize return the width and height of an input image object
			 * 
				 * @param {AImageRefence} AImage reference
				 * @return array(width, height
			**/



				(function (_Akontext) {


						_Akontext.AkGetSize = function(AImageRefence) {
							return  ([AImageRefence.width,AImageRefence.height]);
						};

			/**	 * @AkMerge Merge the 4 input vectors in a result image object
				 * @param {_AChannel0} Vector of channel 0
				 * @param {_AChannel1} Vector of channel 1
				 * @param {_AChannel2} Vector of channel 2
				 * @param {_AChannel3} Vector of channel 3
				 * @param {_OutputModel} Akimage object model for make the object return (could be void object)
				 * @return {_AOutput} Merged image object
			**/
				
						_Akontext.AkMerge = function(_AChannel0, _AChannel1, _AChannel2, _AChannel3, _OutputModel){
							
							 // Nro de parametros equivocados
							if (arguments.length!=5){AKerrors[5]= true; AKLastError=5;throw "incomplete parameters"; return false;}
							// Tipo de parametro equivocado
							
							if(!_OutputModel.imageData){AKerrors[4]= true; AKLastError=4;throw "invalid parameters"; return false;}
							
							// If the arrays have different dimension
							var _c1 = (_AChannel0.length) || 1,
								_c2 = (_AChannel1.length) || 1,
								_c3 = (_AChannel2.length) || 1,
								_c4 = (_AChannel3.length) || 1;
							
							var max = Math.max(_c1,_c2,_c3,_c4);
							
							var min = Math.min((_c1==1)?max:_c1,(_c2==1)?max:_c2,(_c3==1)?max:_c3,(_c4==1)?max:_c4);
							
							if(max != min){AKerrors[6]= true; AKLastError=6;throw "array whit different dimension"; return false; } 
							
							
							
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
					 * @AkMerge Split the input image Object in its 4 channel
					 * @param {_InputModel} Akimage object to be spliteds
					 * @return {_AOutput} An Object with 4 array, one for channel
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
		 * @AkPow Power an every single value to an exponent seted
		 * @param {_InputModel} Akimage object to be powered
		 * @param {_Exponent} exponent
		 * @return {_AOutput} An Object with the same struct of the InputModel powered for the seted exponent
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
				
				
				
				// END CONTEXT

				})(this);


				/* GUI */
				/**
				 * 	   @GUI
				 */
				/**	 * AkLoadOnCanvas
					 * @param {AkAImage}{AImageRefence} AImage reference,Canvas object reference
					 *
					 *
					 * @return Canvas father reference object
				**/



			(function (_Akontext) {


					_Akontext.AkLoadOnCanvas = function(AkAImage,AImageRefence) {

						if(!(AImageRefence.nodeName == "CANVAS" || document.getElementById(AImageRefence).nodeName == "CANVAS")){
							{AKerrors[4]= true; AKLastError=4;return false;}
						}

						try{
							if(document.getElementById(AImageRefence).nodeName == "CANVAS")AImageRefence = document.getElementById(AImageRefence);
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
										_tempData[k+3]=_tempData[k+3];



									}
									while (k>0);
								}

							break;

							}

					}


	// Listo el arreglo, ahora redimensiono el canvas pasado para que se ajuste al arreglo unidimensional (Si o si)




						AImageRefence.width = AkAImage.width;
						AImageRefence.height = AkAImage.height;

						var objImageData= AImageRefence.getContext('2d').createImageData(AkAImage.width, AkAImage.height);

						objImageData.data.set(_tempData);
						 AImageRefence.getContext('2d').putImageData(objImageData, 0, 0);

						return  AImageRefence;
					};


			})(this);

