/**
 @AKontrol {A GUI for manage and debug errors}
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


