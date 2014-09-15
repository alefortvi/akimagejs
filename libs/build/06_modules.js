Akimage.namespace('Akimage.Modules');




/* Tools */
/**
 * 	   @Modules
 */




(function (_Akontext) {


    /*
     Local functions for non linear filters
     */
/**
    @autor Ake
 **/

    var _maxF = function (Arr){
        return Math.max.apply( Math, Arr )

    };

    /**
     @autor Ake
     **/

    var _minF = function (Arr){
        return Math.min.apply( Math, Arr )

    };

    /**
     @autor Ake
     **/

    var _modeF = function (Arr){
        Arr.sort();
        var k = 1;
        var currentValue = Arr[0];
        var cantMax = 1;
        var maxValue = Arr[0];
        var cantCurrent = 1;

        while(k < Arr.length){


            switch(Arr[k]){
                case (currentValue):
                    cantCurrent++;
                    if(cantCurrent>cantMax){
                        cantMax = cantCurrent;
                        maxValue = Arr[k];
                    }
                break;
                default :
                    cantCurrent = 1;
                    currentValue = Arr[k];
                break;

            }
            k++;
        }
        return(maxValue);
    };

    /**
     @autor Ake
     **/

    var _medianF = function (Arr){
        Arr.sort();
        return (Arr[(Arr.length*.5)^0]);

    };

    /**
     @autor Ake
     **/

    var _dilateF = function (Arr,_K){

        var _Max = Number.MIN_VALUE;
        var k = 0;
        while(k<Arr.length){
            if((_K[k] && Arr[k])>_Max){
                _Max = Arr[k];
            }
            k++;
        }

        return (_Max);

    };

    /**
     @autor Ake
     **/

    var _erodeF = function (Arr,_K){

        var _min = Number.MAX_VALUE;
        var k = 0;
        while(k<Arr.length){
            if((_K[k] && Arr[k])<_min){
                _min = Arr[k];
            }
            k++;
        }

        return (_min);

    };



    /*Generic filter*/

    /**
     @autor Ake
     **/

    var _genericFilter = function(AImageRefence,_KernelWidth,_KernelHeight,_Anchor,ToFilter,_kernel){

        var _filter;

        switch(ToFilter){

            case MAXFILTER :_filter = _maxF; break;
            case MINFILTER : _filter = _minF; break;
            case MODEFILTER : _filter = _modeF; break;
            case MEDIANFILTER : _filter = _medianF; break;
            case DILATEFILTER : _filter = _dilateF; break;
            case ERODEFILTER : _filter = _erodeF; break;
            default :AKerrors[24]= true; AKLastError=24;if(AkErrorEnable) throw "AkNon Lineal Filter:  Invalid Filter Code"; break;

        }


        var ImS = AkCreateImage([AImageRefence.width, AImageRefence.height], AImageRefence.depth, AImageRefence.nChannels);
        var ImP = AkCreateImage([AImageRefence.width+(_KernelWidth<<1), AImageRefence.height+(_KernelWidth<<1)], AImageRefence.depth, AImageRefence.nChannels);

        var _Nwidth =  AImageRefence.width+(_KernelWidth<<1);
        var _Nheight = AImageRefence.height+(_KernelHeight<<1);
        var _Owidth =  AImageRefence.width;
        var _Oheight = AImageRefence.height;

        //ancla incluye la multiplicacion por 4

        var _ancla = ((_Nwidth*_Anchor[0])+_Anchor[1])<<2;


        var k = 0;



        // Get the global positions of the kernel values in the image
        var _GlobalPostions = [];

        while(k<(_KernelWidth*_KernelHeight)){

            _GlobalPostions[_GlobalPostions.length] =
                ((Math.floor(k/_KernelWidth)*_Nwidth)+(k%_KernelWidth))<<2;


            k++;
        }
        // variables x4

        var _b = ((_Nwidth+1)*_KernelWidth<<2);

        var _Ow = _Owidth<<2;
        var _Nw = _Nwidth<<2;
        var _Kw = _KernelWidth<<2;
        var _c =  _Owidth*(_Oheight-_KernelHeight)<<2;
        var _d =  _c + _Ow;
        var _e = (((_Nheight - 1) * _Nwidth) + _KernelWidth)<<2;
        var _f = _Kw + _Ow;


        //lets convolve

        //detectar canales


        var _ind = 0;

        if(AImageRefence.nChannels==1){ // SI CANAL 1


            // Periodic boundary conditions
            /* PADDING */


            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));
            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelHeight;k++){


                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);
            }

            // DERECHA IZQUIERDA

            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                }


            }


            var newYEnd = _Oheight+_KernelHeight;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelHeight;
            var xOff = 0;



            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelHeight;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelHeight;
                xOff = AImageRefence.roi.xOffset;

            }


            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelHeight;

            //for(var k = _KernelWidth; k<_Oheight+_KernelWidth; k++){

            while(k<newYEnd){ //PARA ALTO
                //Suma global

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;


                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    //arreglo de elemetos de la mascara
                    var _temp = [];

                    var m = 0;


                    // push in _temp the local value for the mask

                    while(m < _GlobalPostions.length){ //Local mask

                        _temp.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m++]]);
                    }

                    //filter conditions

                    //////// HERE IS THE STATISTICAL FUNCTION ////////

                    var _M = _filter(_temp,_kernel);

                    // TO HERE


                    if(AImageRefence.roi != null){
                        ImS.imageData[_y1+n1] = _M;
                    }

                    if(AImageRefence.roi == null){
                        ImS.imageData[_ind] = _M;
                    }

                    _ind+=4;
                    n+=4;
                    n1+=4;

                } // FIN PARA ANCHO


                k++;
                k1++;

            } // FIN PARA ALTO



        } // FIN SI CANAL 1

        if(AImageRefence.nChannels == 3){ // SI RGB



            /* PADDING */

            // Periodic boundary conditions
            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));

            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelHeight;k++){


                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);


            }

            // DERECHA IZQUIERDA


            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                    //GREEN
                    ImP.imageData[(k*_Nw)+_Kw - j - 3] = ImP.imageData[(k*_Nw)+_Kw + j +1];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 1] = ImP.imageData[(k*_Nw)+(_f) - j-3];

                    //BLUE
                    ImP.imageData[(k*_Nw)+_Kw - j - 2] = ImP.imageData[(k*_Nw)+_Kw + j +2];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 2] = ImP.imageData[(k*_Nw)+(_f) - j-2];

                }


            }

            var newYEnd = _Oheight+_KernelHeight;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelHeight;
            var xOff = 0;

            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelHeight;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelHeight;
                xOff = AImageRefence.roi.xOffset;


            }

            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelHeight;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;

                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    var _tempR = [];
                    var _tempG = [];
                    var _tempB = [];

                    var m = 0;

                    while(m < _GlobalPostions.length){ //Local mask

                        _tempR.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m]]);
                        _tempG.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m]+1]);
                        _tempB.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m++]+2]);

                    }

                    //filter conditions

                    //////// HERE IS THE STATISTICAL FUNCTION ////////

                    var _MR = _filter(_tempR,_kernel);
                    var _MG = _filter(_tempG,_kernel);
                    var _MB = _filter(_tempB,_kernel);


                    // TO HERE

                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _MR;
                        ImS.imageData[_y1+n1+1] = _MG;
                        ImS.imageData[_y1+n1+2] = _MB;
                    }


                    if(AImageRefence.roi == null){
                        //asignacion de pixel
                        ImS.imageData[_ind]     = _MR;
                        ImS.imageData[_ind+1]   = _MG;
                        ImS.imageData[_ind+2]   = _MB;
                    }

                    _ind+=4;
                    n+=4;
                    n1+=4;
                } // FIN PARA ANCHO

                k++;
                k1++;


            } // FIN PARA ALTO


        }//FIN SI RGB



        if(AImageRefence.nChannels == 4){ //SI RGBA



            /* PADDING */

            // Periodic boundary conditions
            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));

            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelHeight;k++){


                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);


            }

            // DERECHA IZQUIERDA


            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                    //GREEN
                    ImP.imageData[(k*_Nw)+_Kw - j - 3] = ImP.imageData[(k*_Nw)+_Kw + j +1];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 1] = ImP.imageData[(k*_Nw)+(_f) - j-3];

                    //BLUE
                    ImP.imageData[(k*_Nw)+_Kw - j - 2] = ImP.imageData[(k*_Nw)+_Kw + j +2];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 2] = ImP.imageData[(k*_Nw)+(_f) - j-2];

                }


            }

            var newYEnd = _Oheight+_KernelHeight;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelHeight;
            var xOff = 0;

            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelHeight;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelHeight;
                xOff = AImageRefence.roi.xOffset;


            }

            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelWidth;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;

                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    var _tempR = [];
                    var _tempG = [];
                    var _tempB = [];

                    var m = 0;


                    while(m < _GlobalPostions.length){ //Local mask

                        _tempR.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m]]);
                        _tempG.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m]+1]);
                        _tempB.push(ImP.imageData[_y + n + _ancla + _GlobalPostions[m++]+2]);

                    }

                    //filter conditions

                    //////// HERE IS THE STATISTICAL FUNCTION ////////

                    var _MR = _filter(_tempR,_kernel);
                    var _MG = _filter(_tempG,_kernel);
                    var _MB = _filter(_tempB,_kernel);

                    // TO HERE

                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _MR;
                        ImS.imageData[_y1+n1+1] = _MG;
                        ImS.imageData[_y1+n1+2] = _MB;
                        ImS.imageData[_y1+n1+3] = ImP.imageData[_y1+n1+3];
                    }


                    if(AImageRefence.roi == null){
                        //asignacion de pixel
                        ImS.imageData[_ind]     = _MR;
                        ImS.imageData[_ind+1]   = _MG;
                        ImS.imageData[_ind+2]   = _MB;
                        ImS.imageData[_ind+3]   = ImP.imageData[_ind+3];
                    }

                    _ind+=4;
                    n1+=4;
                    n+=4;

                } // FIN PARA ANCHO
                k1++;
                k++

            } // FIN PARA ALTO


        } // FIN SI RGBA


        return  (ImS);
    }; // END FUNCTION

    /* Private FFT */

    /**
     * @autor wellflat
     * @link https://github.com/wellflat/javascript-labs/tree/master/cv/fft
     *
     * **/

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
                    if(AkErrorEnable) throw new Error("init: radix-2 required");
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
            FFT.fft2d(re, im);
            if(swap){
                FFT.swap(re, im);
            }
            return([re,im]);
        }
        if(swap){
            FFT.swap(re,im);
        }
        FFT.ifft2d(re, im);

        return([re,im]);

    };


    /**	 * @function AkDFT return the fourier transformation
     * @param {Akimage} Object (This object has in the 0 (Red) channel the real values
     * and in the 1 (green) channel the imaginary values
     * @param {number} Options:
     *  	  		DXT_FORWARD transformacion hacia adelante:0
     *  			DXT_INVERSE transformacion hacia atras:1
     *  			DXT_SCALE escala el resultado por 1/NN:2
     *  			DXT_ROWS  transforma N dft de 1D:4
     * @param {boolean}	shift  true: image shifted, false: image normal
     * @return Akimage Object( This Akimage Object (This object has in the 0 (Red) channel the real values
     * and in the 1 (green) channel the imaginary values
     * @autor Wellflat (modificated by Ake)
     **/


    _Akontext.AkDFT = function (_ImE,_flag,shift){

        // Nro de parametros equivocados
        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incomplete parameters";}

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
                        if(AkErrorEnable) throw new Error("init: radix-2 required");
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
            imageWidth = _ImE.width;


        // Creo el objeto Akimage

        var ImS = AkCreateImage([_ImE.width, _ImE.height], 32, 3);
//	var	re = [],
//		im = [];

        var re = new Int32Array   (_ImE.width*_ImE.width),
            im = new Int32Array   (_ImE.width*_ImE.width);





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

                        ImS.imageData[(i << 2) + (x << 2)] = re[i + x];
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

                        ImS.imageData[(i << 2) + (x << 2)] = re[i + x];
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

                        ImS.imageData[(i << 2) + (x << 2)] = re[i + x];
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


        /**	 @function AkGetOptimalDFTSize: Get the near optimal value size
         * @param {number}_Adimension: Dimension of the Akimage objeto (width or height)
         * @return {number} optimal Dft value
         * @autor Ake
         **/
    };//End Context

    _Akontext.AkGetOptimalDFTSize = function(_Adimension) {

        if(!(_Adimension & (_Adimension -1 ))){return _Adimension;}

        if(!_Adimension){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}


        while (_Adimension & (_Adimension-1)) {
            _Adimension = _Adimension & (_Adimension-1);
        }

        _Adimension = _Adimension << 1;

        return _Adimension;
    };


    /**	 @function {AkPaddingZero} Fill with zero to complete the size
     * @param {Akimage}_AIn  Dimension of the Akimage objeto (width or height)
     * @param {number}_ANewSize  Dimension of the Akimage objeto (width or height)
     * @return {Akimage} optimal Dft value
     * @autor Ake
     **/

    _Akontext.AkPaddingZero = function(_AIn, _ANewSize) {



        // Nro de parametros equivocados
        if (arguments.length!=2){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incomplete parameters";}
        if(!_AIn.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}
        if(!_ANewSize){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}
        if(_ANewSize<_AIn.width){AKerrors[8]= true; AKLastError=8;if(AkErrorEnable) throw "new size is lower than old size";}
        //if(_AIn.width != _AIn.height){AKerrors[9]= true; AKLastError=9;if(AkErrorEnable) throw "Image must be square";}

        //if(_ANewSize==_AIn.width) {return _AIn;}


        var ImS = AkCreateImage([_ANewSize,_ANewSize], _AIn.depth, _AIn.nChannels);

        for(var k = 0; k<_ANewSize;k++){

            var a = (k*_AIn.width)<<2;
            var b = a+(_AIn.width<<2);

            ImS.imageData.set(_AIn.imageData.subarray(a,b),(k*_ANewSize)<<2);

        }

        return ImS;
    };

    /**	 @function AkFrequencyFilter Return the convolution of the input image by the kernel
     * @param {Akimage}_AIn Input Akimage
     * @param {Array}_AKernel Kernel
     * @param {boolean}_swap swap kernel
     * @return {Akimage}:Convolute image
     * @autor Ake
     **/



    _Akontext.AkFrequencyFilter = function(_AIn, _AKernel,_swap) {



        // Nro de parametros equivocados
        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incomplete parameters"; }
        if(!_AIn.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters"; }
        if(Math.sqrt(_AKernel.length)!=Math.sqrt(_AKernel.length)^0){AKerrors[10]= true; AKLastError=10;if(AkErrorEnable) throw "Kernel must be square";}


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


        /***
         *
         *
         * Experimental, en vez de trabajar con un kernel y tranformar, expando el kernel en el tamano de la imagen
         * con funciones nativas
         *
         * ***/


        /**
         *
         * Kernel oparations
         *
         * */


        /*
         * swap kernel
         *
         * */

        if(_swap){

            var Arr = new Float32Array(_AKernel.length);
            var tam = Math.sqrt(_AKernel.length);
            var M = Math.ceil(Math.sqrt(_AKernel.length)*0.5);
            var m = Math.sqrt(_AKernel.length)>>1;

            for(var k = 0;k < M; k++){
                var y = k * tam;
                var ArrT = new Float32Array(tam);

                for(var p = 0; p < tam; p++){
                    if(p<M){
                        ArrT[m+p] = _AKernel[y+p];
                    }
                    else{
                        ArrT[p-M] = _AKernel[y+p];
                    }

                }

                Arr.set(ArrT,(m+k)*tam)

            }

            for(var k = M;k < tam; k++){
                var y = k * tam;
                var ArrT = new Float32Array(tam);

                for(var p = 0; p < tam; p++){
                    if(p<M){
                        ArrT[m+p] = _AKernel[y+p];
                    }
                    else{
                        ArrT[p-M] = _AKernel[y+p];
                    }

                }

                Arr.set(ArrT,(k-M)*tam);

            }

            _AKernel = Arr;

        }
        //scaling

        var _M_temp = Math.max.apply( Math, _AKernel );
        var _m_temp = Math.min.apply( Math, _AKernel );

        if (!(_M_temp - _m_temp)){_M_temp = 255; _m_temp = 0;}

        var C1 = 255 /(_M_temp - _m_temp);
        var C0 = _m_temp*C1;

        var H = Math.sqrt(_AKernel.length);

        var _tempData = new Uint8ClampedArray((H*H)<<2);

        var _AKcanvasOld = document.createElement("CANVAS");
        var _AKcanvasNew = document.createElement("CANVAS");

        var k = _tempData.length;


        do{
            _tempData[k-=4]=(_AKernel[k>>2]*C1)-C0;
            _tempData[k+1]=(_AKernel[(k>>2)+1]*C1)-C0;
            _tempData[k+2]=(_AKernel[(k>>2)+2]*C1)-C0;
            _tempData[k+3]=255;


        }
        while (k>0);



        _AKcanvasOld.width = H;
        _AKcanvasOld.height = H;

        var objImageData= _AKcanvasOld.getContext('2d').createImageData(Math.sqrt(_AKernel.length), Math.sqrt(_AKernel.length));

        objImageData.data.set(_tempData);


        _AKcanvasOld.getContext('2d').putImageData(objImageData, 0, 0);

        _AKcanvasNew.width = max;
        _AKcanvasNew.height = max;

        //Magic magic
        _AKcanvasNew.getContext("2d").drawImage(_AKcanvasOld,0,0,max,max);

        var _newTempData;// = new Uint8ClampedArray(H*H);

        _newTempData =_AKcanvasNew.getContext('2d').getImageData(0, 0, max,max).data;





        //extraigo un canal


        var _i;
        var reK = new Float32Array(max*max);

        for(var y=0; y<max; y++) {
            _i = y*max;


            for(var x=0; x<max; x++) {

                reK[_i + x] = _newTempData[(_i << 2) + (x << 2)];

            }
        }



        /**
         *
         * Image oparations
         *
         * */

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
        var padding = false;

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




        //return ([reK,reK]);

        /**********///



        var imK = new Float32Array(max*max);


        // transforming image






        var _Tim = _FFT(re,im,max,false,false);



        //return(_Tim);


        var _Tke = [reK,imK];

        var Fre = [];
        var Fim = [];

        // product



        for(var kk=0;kk<_Tke[0].length;kk++){
            Fre[kk] = (_Tim[0])[kk]*(_Tke[0])[kk];
            Fim[kk] = (_Tim[1])[kk]*(_Tke[0])[kk];
            //Fim[kk] = (_Tim[1])[kk]*(_Tke[1])[kk];
        }



        //return ([Fre,Fim])
        //inverse;

        _Tim = _FFT(Fre,Fim,max,true,false);

        //return _Tim;


        var ImS0 = AkCreateImage([_AIn.width, _AIn.height], 32, 1);
        var ImS1 = AkCreateImage([_AIn.width, _AIn.height], 32, 3);




        //unpadding


        var dif = max - _AIn.width;



        for(var y=0; y<ImS0.height; y++) {
            var i_0 = y*(ImS0.width + dif);
            var i_1 = y*ImS0.width;


            for(var x=0; x<ImS0.width; x++) {

                ImS0.imageData[(i_1 << 2) + (x << 2)] =
                    ImS1.imageData[(i_1 << 2) + (x << 2)] = (_Tim[0])[i_0 + x];
                ImS1.imageData[(i_1 << 2) + (x << 2)+1] = (_Tim[1])[i_0 + x];

            }
        }




        return([ImS0,ImS1]);

    };



    /**	 @function AkFilter2D Return the convolution of the input image by the kernel (ROI supported)
     *
     * @param {Akimage} AImageRefence Input Akimage
     * @param {Array} _AKernel Kernel
     * @param {Array} _Anchor Array Coordenades anchor
     * @return {Akimage} ImS Convolute image
     * @autor Ake
     **/
    _Akontext.AkFilter2D = function(AImageRefence,_AKernel,_Anchor) {



        /*
         *
         * Salidas rapidas
         *
         * */

        var _KernelWidth = Math.sqrt(_AKernel.length);

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; ;}
        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters"; ;}
        if(_KernelWidth != (_KernelWidth^0)){AKerrors[10]= true; AKLastError=10;if(AkErrorEnable) throw "Kernel must be square"; ;};
        if((Object.prototype.toString.apply(_Anchor) != '[object Array]') || (_Anchor.length != 2)){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a 2 elements array"; AKLastError=11;;}
        if(_Anchor[0] * _Anchor[0] >= _KernelWidth*_KernelWidth || _Anchor[1] * _Anchor[1] >= _KernelWidth*_KernelWidth){AKerrors[14]= true; AKLastError=14;if(AkErrorEnable) throw "Anchor bigger than Kernel"; ;};

        //SI EL ANCLA SE VA DEL KERNEL




        var _AK = new Float32Array(_AKernel);

        var _coef = [];
        var _pos = [];

        var ImS = AkCreateImage([AImageRefence.width, AImageRefence.height], AImageRefence.depth, AImageRefence.nChannels);
        var ImP = AkCreateImage([AImageRefence.width+(_KernelWidth<<1), AImageRefence.height+(_KernelWidth<<1)], AImageRefence.depth, AImageRefence.nChannels);

        var _Nwidth =  AImageRefence.width+(_KernelWidth<<1);
        var _Nheight = AImageRefence.height+(_KernelWidth<<1);
        var _Owidth =  AImageRefence.width;
        var _Oheight = AImageRefence.height;

        //ancla incluye la multiplicacion por 4

        var _ancla = ((_Nwidth*_Anchor[0])+_Anchor[1])<<2;

        _AKernel.sort();

        var value = undefined;
        var _delta = 0.01;

        //Busco cantidad de elementos distintos


        var k = 0;

        while(k<_AKernel.length){
            //for(var k = 0; k<_AKernel.length;k++){


            if(_AKernel[k] != value){

                value = _AKernel[k];

                var A = [];
                var p=0;

                while(p<_AK.length){
                    //for(var p = 0;p<_AK.length;p++){

                    if(Math.abs(_AK[p]-value)<_delta){
                        A[A.length] =
                            ((Math.floor(p/_KernelWidth)*_Nwidth)+(p%_KernelWidth))<<2;
                    }
                    p++;
                }

                _pos.push(A);


                _coef[_coef.length] =

                    value = _AKernel[k];



            }

            k++;
        }



        // variables x4

        var _b = ((_Nwidth+1)*_KernelWidth<<2);

        var _Ow = _Owidth<<2;
        var _Nw = _Nwidth<<2;
        var _Kw = _KernelWidth<<2;
        var _c =  _Owidth*(_Oheight-_KernelWidth)<<2;
        var _d =  _c + _Ow;
        var _e = (((_Nheight - 1) * _Nwidth) + _KernelWidth)<<2;
        var _f = _Kw + _Ow;


        //lets convolve

        //detectar canales


        var _ind = 0;

        if(AImageRefence.nChannels==1){ // SI CANAL 1



            /* PADDING */
            // Periodic boundary conditions

            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));


            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelWidth;k++){
                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);
            }

            // DERECHA IZQUIERDA

            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                }


            }


            var newYEnd = _Oheight+_KernelWidth;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelWidth;
            var xOff = 0;



            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelWidth;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelWidth;
                xOff = AImageRefence.roi.xOffset;

            }


            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelWidth;

            //for(var k = _KernelWidth; k<_Oheight+_KernelWidth; k++){

            while(k<newYEnd){ //PARA ALTO
                //Suma global

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;


                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    //for( var n = _KernelWidth<<2; n < (_Owidth + _KernelWidth)<<2; n+=4){

                    var _globalSum = 0;

                    //por coeficiente

                    var p=0;

                    while(p<_coef.length){ // PARA COEFICIENTE
                        //for(var p=0;p<_coef.length;p++ ){

                        var _localSum = 0;

                        // SI coef nonZero

                        if(_coef[p]!=0){

                            // for coeficientes

                            var m = 0;

                            //for(var m = 0; m < _pos[p].length; m++){  /

                            while(m < _pos[p].length){ //BARRIDA COEFICIENTE

                                _localSum += ImP.imageData[_y + n +_ancla  + _pos[p][m++]];


                            }

                            //    //producto por coeficiente
                            //    _localSum*=_coef[p];

                            //suma global
                            _globalSum += (_localSum*_coef[p]);
                        }

                        p++;

                    }

                    //asignacion de pixel

                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _globalSum;
                    }

                    if(AImageRefence.roi == null){

                        ImS.imageData[_ind] = _globalSum;
                    }

                    _ind+=4;

                    n+=4;
                    n1+=4;

                } // FIN PARA ANCHO


                k++;
                k1++;

            } // FIN PARA ALTO



        } // FIN SI CANAL 1


        if(AImageRefence.nChannels == 3){ // SI RGB

            /* PADDING */
            // Periodic boundary conditions

            //padding

            for(var k=0;k<_Oheight;k++){
                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));
            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelWidth;k++){
                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);
            }

            // DERECHA IZQUIERDA


            for(var k=0;k<_Nheight;k++){
                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                    //GREEN
                    ImP.imageData[(k*_Nw)+_Kw - j - 3] = ImP.imageData[(k*_Nw)+_Kw + j +1];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 1] = ImP.imageData[(k*_Nw)+(_f) - j-3];

                    //BLUE
                    ImP.imageData[(k*_Nw)+_Kw - j - 2] = ImP.imageData[(k*_Nw)+_Kw + j +2];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 2] = ImP.imageData[(k*_Nw)+(_f) - j-2];

                }

            }

            var newYEnd = _Oheight+_KernelWidth;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelWidth;
            var xOff = 0;

            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelWidth;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelWidth;
                xOff = AImageRefence.roi.xOffset;
            }






            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelWidth;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;

                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    var _globalSumR = 0;
                    var _globalSumG = 0;
                    var _globalSumB = 0;


                    //por coeficiente

                    var p=0;

                    while(p<_coef.length){ // PARA COEFICIENTE


                        var _localSumR = 0;
                        var _localSumG = 0;
                        var _localSumB = 0;

                        // SI coef nonZero

                        if(_coef[p]!=0){

                            var m = 0;

                            //for(var m = 0; m < _pos[p].length; m++){  /

                            while(m < _pos[p].length){ //BARRIDA COEFICIENTE

                                _localSumR += ImP.imageData[_y + n +_ancla  + _pos[p][m]];
                                _localSumG += ImP.imageData[_y + n +_ancla  + _pos[p][m]+1];
                                _localSumB += ImP.imageData[_y + n +_ancla  + _pos[p][m++]+2];

                            }



                            //suma global
                            _globalSumR += (_localSumR*_coef[p]);
                            _globalSumG += (_localSumG*_coef[p]);
                            _globalSumB += (_localSumB*_coef[p]);
                        }

                        p++;
                    }


                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _globalSumR;
                        ImS.imageData[_y1+n1+1] = _globalSumG;
                        ImS.imageData[_y1+n1+2] = _globalSumB;
                    }


                    if(AImageRefence.roi == null){
                        //asignacion de pixel
                        ImS.imageData[_ind]     = _globalSumR;
                        ImS.imageData[_ind+1]   = _globalSumG;
                        ImS.imageData[_ind+2]   = _globalSumB;
                    }

                    _ind+=4;

                    n+=4;
                    n1+=4;
                } // FIN PARA ANCHO

                k++;
                k1++;


            } // FIN PARA ALTO


        }//FIN SI RGB



        if(AImageRefence.nChannels == 4){ //SI RGBA

            /* PADDING */

            //padding

            for(var k=0;k<_Oheight;k++){

                ImP.imageData.set(AImageRefence.imageData.subarray(_Ow * k, _Ow * (k + 1)), _b + (_Nw * k));


            }

            // ARRIBA Y ABAJO


            for(var k=0;k<_KernelWidth;k++){


                ImP.imageData.set(AImageRefence.imageData.subarray(k * _Ow, (k * _Ow) + _Ow),_Nw*(_KernelWidth-1-k)+_Kw);
                ImP.imageData.set(AImageRefence.imageData.subarray((k * _Ow)+_c, (k * _Ow)+_d),_e - _Nw*k);


            }

            // DERECHA IZQUIERDA


            for(var k=0;k<_Nheight;k++){

                for(var j = 0; j<_Kw;j+=4){

                    // RED
                    ImP.imageData[(k*_Nw)+_Kw - j - 4] = ImP.imageData[(k*_Nw)+_Kw + j];
                    ImP.imageData[(k*_Nw)+(_f) + j] = ImP.imageData[(k*_Nw)+(_f) - j-4];

                    //GREEN
                    ImP.imageData[(k*_Nw)+_Kw - j - 3] = ImP.imageData[(k*_Nw)+_Kw + j +1];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 1] = ImP.imageData[(k*_Nw)+(_f) - j-3];

                    //BLUE
                    ImP.imageData[(k*_Nw)+_Kw - j - 2] = ImP.imageData[(k*_Nw)+_Kw + j +2];
                    ImP.imageData[(k*_Nw)+(_f) + j+ 2] = ImP.imageData[(k*_Nw)+(_f) - j-2];

                }


            }

            var newYEnd = _Oheight+_KernelWidth;
            var newXEnd = (_KernelWidth+ _Owidth)<<2;
            var newXinit = _KernelWidth<<2;
            var newYinit = _KernelWidth;
            var xOff = 0;

            if(AImageRefence.roi != null){

                ImS.imageData.set(AImageRefence.imageData);
                newYEnd = AImageRefence.roi.height+AImageRefence.roi.yOffset+_KernelWidth;
                newXEnd = AImageRefence.roi.width+AImageRefence.roi.xOffset+_KernelWidth<<2;
                newXinit = (AImageRefence.roi.xOffset+_KernelWidth)<<2;
                newYinit = AImageRefence.roi.yOffset+_KernelWidth;
                xOff = AImageRefence.roi.xOffset;
            }




            //Recorrida global

            var k = newYinit;
            var k1 = newYinit-_KernelWidth;

            while(k<newYEnd){ //PARA ALTO

                var _y = (k*_Nwidth)<<2;
                var _y1 = (k1*_Owidth)<<2;

                var n = newXinit;
                var n1 = xOff<<2;

                while(n < newXEnd){ // PARA ANCHO

                    var _globalSumR = 0;
                    var _globalSumG = 0;
                    var _globalSumB = 0;


                    //por coeficiente

                    var p=0;

                    while(p<_coef.length){ // PARA COEFICIENTE


                        var _localSumR = 0;
                        var _localSumG = 0;
                        var _localSumB = 0;

                        // SI coef nonZero

                        if(_coef[p]!=0){

                            var m = 0;

                            //for(var m = 0; m < _pos[p].length; m++){  /

                            while(m < _pos[p].length){ //BARRIDA COEFICIENTE

                                _localSumR += ImP.imageData[_y + n +_ancla  + _pos[p][m]];
                                _localSumG += ImP.imageData[_y + n +_ancla  + _pos[p][m]+1];
                                _localSumB += ImP.imageData[_y + n +_ancla  + _pos[p][m++]+2];

                            }

                            //suma global
                            _globalSumR += (_localSumR*_coef[p]);
                            _globalSumG += (_localSumG*_coef[p]);
                            _globalSumB += (_localSumB*_coef[p]);
                        }

                        p++;
                    }

                    if(AImageRefence.roi != null){

                        ImS.imageData[_y1+n1] = _globalSumR;
                        ImS.imageData[_y1+n1+1] = _globalSumG;
                        ImS.imageData[_y1+n1+2] = _globalSumB
                        ImS.imageData[_y1+n1+3] =  ImP.imageData[_y1+n1+3];
                    }


                    if(AImageRefence.roi == null){
                        //asignacion de pixel
                        ImS.imageData[_ind]     = _globalSumR;
                        ImS.imageData[_ind+1]   = _globalSumG;
                        ImS.imageData[_ind+2]   = _globalSumB;
                        ImS.imageData[_ind+3] =  ImP.imageData[_ind+3];
                    }

                    _ind+=4;

                    n+=4;
                    n1+=4;
                } // FIN PARA ANCHO

                k++;
                k1++;

            } // FIN PARA ALTO


        } // FIN SI RGBA


        return  (ImS);
    }; // END FUNCTION


    /**	 @function AkNonLinealFilter Return the convolution of the input image by the kernel (ROI supported)
     *
     * @param {Akimage} AImageRefence Input Akimage
     * @param {number} _MaskWidth Kernel width (Mask is square)
     * @param {Array} _Anchor Array Coordenades anchor
     * @param {number} _ToFilter Type of Filter
     * @return {Akimage} ImS Filtered image
     * @autor Ake
     **/

    _Akontext.AkNonLinealFilter = function(AImageRefence,_MaskWidth,_Anchor,_ToFilter){

        if (arguments.length!=4){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments";}
        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters"; }
         if((Object.prototype.toString.apply(_Anchor) != '[object Array]') || (_Anchor.length != 2)){AKerrors[11]= true;AKLastError=11;if(AkErrorEnable) throw "Anchor must be a 2 elements array"; }
        if(_Anchor[0] * _Anchor[0] >= _MaskWidth*_MaskWidth || _Anchor[1] * _Anchor[1] >= _MaskWidth*_MaskWidth){AKerrors[14]= true; AKLastError=14;if(AkErrorEnable) throw "Anchor bigger than Kernel";};



        return _genericFilter(AImageRefence,_MaskWidth,_MaskWidth,_Anchor,_ToFilter);

    }


    /**	 @function AkDilate
     * @param {Akimage} AImageRefence Input Akimage
     * @param {Array} _Kernel Kernel width (Must be square)
     * @param {Array} _Anchor Array Coordenades anchor
     * @return {Akimage} ImS Filtered image
     * @autor Ake
     **/

    _Akontext.AkDilate = function(AImageRefence,_Kernel,_Anchor){

        var _MaskWidth = Math.sqrt(_Kernel.length);

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments";}
        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}
        if(Object.prototype.toString.apply(_Kernel) != '[object Array]'){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a array"; AKLastError=11;}
        if((Object.prototype.toString.apply(_Anchor) != '[object Array]') || (_Anchor.length != 2)){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a 2 elements array"; AKLastError=11;}
        if(_Anchor[0] * _Anchor[0] >= _MaskWidth*_MaskWidth || _Anchor[1] * _Anchor[1] >= _MaskWidth*_MaskWidth){AKerrors[14]= true; AKLastError=14;if(AkErrorEnable) throw "Anchor bigger than Kernel"; }



        return _genericFilter(AImageRefence,_MaskWidth,_MaskWidth,_Anchor,DILATEFILTER,_Kernel);

    }


    /**	 @function AkErode
     *
     * @param {Akimage} AImageRefence Input Akimage
     * @param {Array} _Kernel Kernel width (Must be square)
     * @param {Array} _Anchor Array Coordenades anchor
     * @return {Akimage} ImS Filtered image
     * @autor Ake
     **/

    _Akontext.AkErode = function(AImageRefence,_Kernel,_Anchor){

        var _MaskWidth = Math.sqrt(_Kernel.length);

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments";}
        if(!AImageRefence.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}
        if(Object.prototype.toString.apply(_Kernel) != '[object Array]'){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a array"; AKLastError=11;}
        if((Object.prototype.toString.apply(_Anchor) != '[object Array]') || (_Anchor.length != 2)){AKerrors[11]= true;if(AkErrorEnable) throw "Anchor must be a 2 elements array"; AKLastError=11;}
        if(_Anchor[0] * _Anchor[0] >= _MaskWidth*_MaskWidth || _Anchor[1] * _Anchor[1] >= _MaskWidth*_MaskWidth){AKerrors[14]= true; AKLastError=14;if(AkErrorEnable) throw "Anchor bigger than Kernel"; }



        return _genericFilter(AImageRefence,_MaskWidth,_MaskWidth,_Anchor,ERODEFILTER,_Kernel);

    }

    /**	 @function AkLUT Return the convolution of the input image by the kernel (ROI supported)
     *
     * @param {Akimage} _ImIn Input Akimage
     * @param {Array} _lut Lut array, with 256 value
     * @param {Boolean} _scaled If true LUT is scaled to 0-255, if false LUT keep the originals values
     * @return {Akimage} ImS Resulting Akimage object
     * @autor Ake
     **/
    _Akontext.AkLUT = function(_ImIn,_lut,_scaled) {

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments"; }
        if (_lut.length!=256){AKerrors[23]= true; AKLastError=23;if(AkErrorEnable) throw "In AkLUT, lut array must be of 256 elements"; }
        if (_ImIn.depth != DEPTH_8U){AKerrors[15]= true; AKLastError=23;if(AkErrorEnable) throw "Akimage depth must be DEPTH_8U";}



        var ImS = AkCreateImage([_ImIn.width,_ImIn.height],8,_ImIn.nChannels);

        var newYEnd = _ImIn.height;
        var newXEnd = _ImIn.width<<2;
        var newXinit = 0;
        var newYinit = 0;




        if(_ImIn.roi != null){

            newYEnd = _ImIn.roi.height+_ImIn.roi.yOffset;
            newXEnd = (_ImIn.roi.width+_ImIn.roi.xOffset)<<2;
            newXinit = (_ImIn.roi.xOffset)<<2;
            newYinit = _ImIn.roi.yOffset;
            ImS.imageData.set(_ImIn.imageData);

        }


        // val[i] = [(val[i-1] - MinOld) * (MaxNew - minNew)/(MaxOld - minOld)] + minNew




        // si esta escalado, normalizo
        if(_scaled){


            var _M = Math.max.apply( Math, _lut );
            var _m = Math.min.apply( Math, _lut );



            var C1 = 255 /(_M - _m);
            var C0 = _m*C1;


            var k = newYinit;


            // GRAY

            if(_ImIn.nChannels == 1){

                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=(_lut[_ImIn.imageData[_y+n]]*C1)-C0;

                        n+=4;

                    }
                    k+=1;
                }

            }

            // RGB

            if(_ImIn.nChannels == 3){

                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=(_lut[_ImIn.imageData[_y+n]]*C1)-C0;
                        ImS.imageData[_y+n+1]=(_lut[_ImIn.imageData[_y+n+1]]*C1)-C0;
                        ImS.imageData[_y+n+2]=(_lut[_ImIn.imageData[_y+n+2]]*C1)-C0;

                        n+=4;

                    }
                    k+=1;
                }
            }

            // RGBA
            if(_ImIn.nChannels == 4){
                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=(_lut[_ImIn.imageData[_y+n]]*C1)-C0;
                        ImS.imageData[_y+n+1]=(_lut[_ImIn.imageData[_y+n+1]]*C1)-C0;
                        ImS.imageData[_y+n+2]=(_lut[_ImIn.imageData[_y+n+2]]*C1)-C0;
                        ImS.imageData[_y+n+3]=_ImIn.imageData[_y+n+3];

                        n+=4;

                    }
                    k+=1;
                }
            }




        }

        // si no hace falta escalar
        if(!_scaled){

            var k = newYinit;


            // GRAY

            if(_ImIn.nChannels == 1){

                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=_lut[_ImIn.imageData[_y+n]];

                        n+=4;

                    }
                    k+=1;
                }

            }

            // RGB

            if(_ImIn.nChannels == 3){

                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=_lut[_ImIn.imageData[_y+n]];
                        ImS.imageData[_y+n+1]=_lut[_ImIn.imageData[_y+n+1]];
                        ImS.imageData[_y+n+2]=_lut[_ImIn.imageData[_y+n+2]];

                        n+=4;

                    }
                    k+=1;
                }
            }

            // RGBA
            if(_ImIn.nChannels == 4){
                while(k<newYEnd){ //PARA ALTO

                    var _y = (k*_ImIn.width)<<2;

                    var n = newXinit;

                    while(n < newXEnd){ // PARA ANCHO

                        ImS.imageData[_y+n]=_lut[_ImIn.imageData[_y+n]];
                        ImS.imageData[_y+n+1]=_lut[_ImIn.imageData[_y+n+1]];
                        ImS.imageData[_y+n+2]=_lut[_ImIn.imageData[_y+n+2]];
                        ImS.imageData[_y+n+3]=_ImIn.imageData[_y+n+3];

                        n+=4;

                    }
                    k+=1;
                }
            }



        }


        return  (ImS);

    }; // END FUNCTION


    /**	 @function AkDFTPadded
     *
     * @param {Akimage} Object (This object has in the 0 (Red) channel the real values
     * and in the 1 (green) channel the imaginary values
     * @param {number} Options:
     *  	  		DXT_FORWARD transformacion hacia adelante:0
     *  			DXT_INVERSE transformacion hacia atras:1
     *  			DXT_SCALE escala el resultado por 1/NN:2
     *  			DXT_ROWS  transforma N dft de 1D:4
     * @param {boolean}	shift  true: image shifted, false: image normal
     * @return Akimage Object( This Akimage Object (This object has in the 0 (Red) channel the real values
     * and in the 1 (green) channel the imaginary values
     * @autor Ake
     **/


    _Akontext.AkDFTPadded = function(_ImE,_flag,shift){

        if (arguments.length!=3){AKerrors[5]= true; AKLastError=5;if(AkErrorEnable) throw "incorrect numbers of arguments";}
        if(!_ImE.imageData){AKerrors[4]= true; AKLastError=4;if(AkErrorEnable) throw "invalid parameters";}

        var max = _ImE.width;
        if(_ImE.height > max){
            max = _ImE.height;
        }

        var newMax = AkGetOptimalDFTSize(max);

        var _Ak = AkPaddingZero(_ImE,newMax);

        return (AkDFT(_Ak,_flag,shift));

    }









// END MODULES	
})(this);	