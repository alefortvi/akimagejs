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

            fullMax : 0
        };
    };



})(this);

