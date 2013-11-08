



/**
 * 	   ROI methods
 *
 */

/* Metodos */
/**
 * 	   @Methods
 */

(function (_Akontext) {

    /**	 * @function AkSetImageROI set a ROI in the Akimage passed by arguments
     * @param {Akimage} ImageReference Object
     * @param  {AROI} Region of interest
     **/


    _Akontext.AkSetImageROI = function(_ImIn, _ROI) {

        _ImIn.roi = _ROI;

        return (_ImIn);

    };


})(this);


