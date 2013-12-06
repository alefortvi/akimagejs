@echo on
DEL /F /S /Q /A "compilated\akimage.js"
type 00_namespace.js 01_constants.js 02_objects.js 03_constructors.js 04_ROI.js 05_Histogram.js 06_modules.js 07_tools.js 08_color.js 09_GUI.js >> compilated/akimage.js

@echo builded