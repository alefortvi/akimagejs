
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

