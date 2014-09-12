
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

