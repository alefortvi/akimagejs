
# akimage(.js)

A javascript image processing library. Based in the OpenCV interphase. 
Akimage is coded on ES5 standard. No npm, or package management.
I'm working in the version 2 in with TypeScript and RxJs 

## Installation 🔧

Just include akimage.js to your project. (libs/build/compilated)
```HTML
<script type="text/javascript" src="../../libs/build/compilated/akimage.js"> </script>
```

## Usage 🔧


An Akimage Object must receive an input image or a dimension. The image can be loaded dynamically or from an HTML element such as CANVAS or IMG

#### HTML

```HTML
<!-- From a IMG element -->
<img id="myImage" src="../../images/myimage.jpg"/>

```

#### JS

```Javascript
var img = document.getElementById('myImage');

// and create the Akimage Object RGB color

var Ak = AkLoadImage(img,LOAD_IMAGE_COLOR);


```

With the Akimage object you can do the processing you want

## Example
 
Changing color model to HSV and show individuals component

#### HTML

```HTML
<canvas id="canvas1"></canvas>
<canvas id="canvas2"></canvas>
<canvas id="canvas3"></canvas>
```

#### JS

```Javascript
// Change RGB to HSV

var img = new Image();
img.src = 'lenna256.jpg';
var Ak = AkLoadImage(img,LOAD_IMAGE_COLOR);

Ak = AkCvtColor(Ak,RGB2HSV);

// Split the orignal objet and return a 3D array whit the individual components in each dimension 

var HSV = AkSplit(Ak);

// Get the indivial channel to crete an Akimage objeto to show

var H_ = HSV[0];
var S_ = HSV[1];
var V_ = HSV[2];

// AkCreateImage(size[], DEPTH, nrs of channels) 

var H = AkCreateImage([256,256],DEPTH_8U,1);
var S = AkCreateImage([256,256],DEPTH_8U,1);
var V = AkCreateImage([256,256],DEPTH_8U,1);

// Merge the array components to an Akimage object
// AkMerge(ch0, ch1, ch2, chAlfa, Output)
// Non used channel can be 0

AkMerge(H_,0,0,0,H);
AkMerge(S_,0,0,0,S);
AkMerge(V_,0,0,0,V);

// Finally. Load the result in a canvas



AkLoadOnCanvas(H,canvas1);
AkLoadOnCanvas(S,canvas2);
AkLoadOnCanvas(V,canvas3);

```
#### Result️
Original

![alt text](https://raw.githubusercontent.com/alefortvi/akimagejs/master/images/lenna256.jpg "")


|Hue|Saturation|Value|
|-------------|-------------|-------------|
|![alt text](https://raw.githubusercontent.com/alefortvi/akimagejs/master/images/Hue.png "") |![alt text](https://raw.githubusercontent.com/alefortvi/akimagejs/master/images/Sat.png "")  |![alt text](https://raw.githubusercontent.com/alefortvi/akimagejs/master/images/Val.png "") 


## Documentation ⚙️

Documentation? Well... 
I don't have it ready yet. But you have a lot of examples in **Demos**

## License 📄

This project is under the License (MIT). See the file ** LICENSE.md ** for details


---
⌨️ with ❤️ by [alefortvi](https://github.com/alefortvi) 😊
