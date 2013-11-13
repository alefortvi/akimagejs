
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

        var ImS = AkCreateImage([_OutputModel.width, _OutputModel.height], _OutputModel.depth, _OutputModel.nChannels);

        for(var y=0; y<ImS.height; y++) {
            var i = y*ImS.width;


            for(var x=0; x<ImS.width; x++) {

                ImS.imageData[(i << 2) + (x << 2)]   = _AChannel0[i + x] || 0,
                    ImS.imageData[(i << 2) + (x << 2)+1] = _AChannel1[i + x] || 0,
                    ImS.imageData[(i << 2) + (x << 2)+2] = _AChannel2[i + x] || 0,
                    ImS.imageData[(i << 2) + (x << 2)+3] = _AChannel3[i + x] || 0;

            }
        }


        return ImS;

    };


    /**
     * @function AkSplit:Split the input image Object in its 4 channel
     * @param {Akimage} Object to be spliteds
     * @return {Akimage} An Object with 4 array, one for channel
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
     * @function {AkConvertScale} Change the depth from an object to other depth value
     * @param {Akimage} _ImIn Imput Akimage object
     * @param {number} _newDepth new depth
     * @param {boolean} _scale mapping the old value to the new scale
     * @return {Akimage} return a new Akimage object with the new depth
     **/

    _Akontext.AkConvertScale = function(_ImIn,_newDepth, _scale){

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;throw "incorrect numbers of arguments"; return false;}
        if(!_ImIn.imageData){AKerrors[4]= true; AKLastError=4;throw "expeted Akimage object in arguments"; return false;}




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
                AKerrors[17]= true; AKLastError=17;throw "Depth code invalid"; return false;
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
     **/

    _Akontext.AkCrop = function(_ImIn){

        if (arguments.length!=1){AKerrors[5]= true; AKLastError=5;throw "incorrect numbers of arguments"; return false;}
        if(!_ImIn.imageData){AKerrors[4]= true; AKLastError=4;throw "expeted Akimage object in arguments"; return false;}
        if(!_ImIn.roi == null){AKerrors[18]= true; AKLastError=18;throw "No ROI defined"; return false;}


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
     * The both source must have the same depth, size and channel. If the two image have ROI, both of then must have
     * the same size, in this case, the rest of the image is the same of the first source
     *
     * The algebraic operation is
     *
     * (Im1 * W1) + (Im2 * W2) + Cst

     *
     **/

    _Akontext.AkAddWeighted = function(_Im_1, Weight_1, _Im_2, Weight_2,Cst){


        if (arguments.length<4 || arguments.length>5){AKerrors[5]= true; AKLastError=5;throw "incorrect numbers of arguments"; return false;}
        if(!_Im_1.imageData){AKerrors[4]= true; AKLastError=4;throw "expeted Akimage object in arguments"; return false;}
        if(!_Im_2.imageData){AKerrors[4]= true; AKLastError=4;throw "expeted Akimage object in arguments"; return false;}

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
     *
     **/

    _Akontext.AkClone = function(AImageRefence) {

        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;throw "expeted Akimage object in arguments"; return false;}

        var _ImS = AkCreateImage([AImageRefence.width,AImageRefence.height],AImageRefence.depth,AImageRefence.nChannels);
        ImS.imageData.set(AImageRefence.imageData);

        return _ImS;
    };


    // END CONTEXT

})(this);

