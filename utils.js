function browser() {
}

browser.init = function() {
	var u = navigator.userAgent, app = navigator.appVersion;

	browser = {};
	browser.ie9 = u.indexOf('MSIE 9.0') >=0;
	browser.ie10 = u.indexOf('MSIE 10.0') >=0;
	browser.ie = u.indexOf('MSIE') >=0 || u.indexOf('Trident') >=0;
	browser.oldIE = u.indexOf('MSIE 8.0') >=0||u.indexOf('MSIE 7.0') >=0 || u.indexOf('MSIE 6.0') >=0;
	browser.android = u.indexOf('Android') >=0 && u.indexOf('Linux') >=0;
	browser.iPhone = u.indexOf('iPhone') >=0;
	browser.iPad = u.indexOf('iPad') >=0;
	browser.blackberry = u.indexOf('BlackBerry') >=0;
	browser.firefoxMobile = u.indexOf('Mobile') >=0 && u.indexOf('Firefox') >=0;
	browser.firefoxOS = u.indexOf('Mobile') >=0 && u.indexOf('Firefox') >=0 && u.indexOf('Android') < 0;
	browser.windowPhone = u.indexOf('Windows Phone') >=0;
	browser.webkit = u.indexOf("WebKit") >=0;
	browser.weixin = u.indexOf("MicroMessenger") >= 0;
	browser.weibo = u.indexOf("weibo") >= 0;
	browser.qq = u.indexOf("QQ") >= 0;

	if(browser.iPhone) {
		var a = u.match(/iPhone; CPU iPhone OS \d+/g);
		if(a && a.length) {
			browser.iOSVersion = parseInt(a[0].match(/\d+/g)[0]);
		}
	}

	function getBrowserVersionNumber() {
		var ua = navigator.userAgent;
		var keys = ["AppleWebKit/", "AppleWebKit ", "AppleWebKit", "MSIE ", "Firefox/", 
			"Safari/", "Opera ", "Opera/"];

		for(var i = 0; i < keys.length; i++) {
			var iter = keys[i];
			var offset = ua.indexOf(iter);
			if(offset >= 0) {
				var str = ua.substr(offset + iter.length);
				var version = parseFloat(str);

				return version;
			}
		}

		return 1.0;
	}

	browser.number = getBrowserVersionNumber();

	browser.isAudioSupportLoop = true;
	if(browser.isIPhone && browser.iOSVersion < 6) {
		browser.isAudioSupportLoop = false;
	}

	if(browser.oldIE || browser.ie9) {
		window.console = {};
		window.console.log = function(str) {};
	}
	
	browser.isMobile = browser.android || browser.iPhone || browser.blackberry
		|| browser.windowPhone || browser.firefoxMobile;

	if(browser.isMobile) {
		window.console.logStr = "";
		window.console.logR = window.console.log;

		window.console.getLog = function() {
			return window.console.logStr;
		}

		window.console.log = function(str) {
			window.console.logStr += str + "\n";
			window.console.logR(str);

			return;
		}
	}

	console.log(navigator.userAgent); 
	window.isSpecialBrowser = browser.qq || browser.weibo || browser.weixin;

	return;
}

function isQQ() {
	return browser.qq;
}

function isWeiBo() {
	return browser.weibo;
}

function isWeiXin() {
	return browser.weixin;
}

function isWebkit() {
	return browser.webkit;
}

function isOldIE() {
	return browser.oldIE;
}

function isIE() {
	return browser.ie;
}

if(browser.oldIE) {
	console.log("oldIE "+browser.oldIE);
}

function isMobile() {
	return browser.isMobile;
}

function isAndroid() {
	return browser.android;
}

function isIPhone() {
	return browser.iPhone;
}

function isIPad() {
	return browser.ipad;
}

function isWinPhone() {
	return browser.windowPhone;
}

function isBlackBerry() {
	return browser.blackberry;
}

function isFirefoxMobile() {
	return browser.firefoxMobile;
}

function isFirefoxOS () {
	return browser.firefoxOS;
}

function isPhoneGap() {
	return (window.cordova || window.Cordova || window.PhoneGap || window.phonegap) 
		&& /^file:\/{3}[^\/]/i.test(window.location.href) 
		&& /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}

function isTizen() {
	return window.tizen;
}

function browserVersion() {
	return browser.number;
}

browser.init();

/*
 * File: utils.js
 * Author:  Li XianJing <xianjimli@hotmail.com>
 * Brief: some tool functions.
 * 
 * Copyright (c) 2011 - 2015  Li XianJing <xianjimli@hotmail.com>
 * 
 */

Object.defineProperty(Array.prototype, 'remove', 
{
	enumerable: false,
	value: function(obj, all){
		for (var i=0; i < this.length; ++i ) {
			if ( this[i] === obj ) {
				this.splice(i, 1); 

				if(!all) 
				   break;
			}
		}
		
		return this;
	}
});

Object.defineProperty(Array.prototype, 'insert', 
{
	enumerable: false,
	value: function(index, obj){
		if(index >= 0 && index < this.length) {
			this.splice(index, 0, obj);
		}
		else {
			this.push(obj);
		}

		return this;
	}
});

Object.defineProperty(Array.prototype, 'indexOf', 
{
	enumerable: false,
	value: function(obj){
		var n = this.length;
		for (var i=0; i < n; ++i ) {
			if ( this[i] === obj ) {
				return i;
			}
		}
		
		return -1;
	}
});

Object.defineProperty(Array.prototype, 'find', 
{
	enumerable: false,
	value: function(checkIf){
		var n = this.length;
		for (var i=0; i < n; ++i ) {
			var  iter = this[i];
			if (checkIf(iter)) {
				return iter;
			}
		}

		return null;
	}
});


Object.defineProperty(Array.prototype, 'binarySearch', 
{
	enumerable: false,
	value: function(find, comparator){
		var i = 0;
		var low = 0;
		var comparison = 0; 
		var high = this.length - 1;

		while (low <= high) {
			i = (low + high) >> 1;
			comparison = comparator(this[i], find);
			if (comparison < 0) { low = i + 1; continue; };
			if (comparison > 0) { high = i - 1; continue; };

			return i;
		}

		return -1;
	}
});

Object.defineProperty(Array.prototype, 'has', 
{
	enumerable: false,
	value: function(obj){
    	return this.indexOf(obj) >= 0;
	}
});

Object.defineProperty(Array.prototype, 'destroyData', 
{
	enumerable: false,
	value: function(){
		for(var i = 0; i < this.length; i++) {
			var iter = this[i];

			if(!iter || typeof iter != "object") {
				continue;
			}

			if(iter.destroy && typeof iter.destroy == "function") {
				iter.destroy();
			}
		}

		this.length = 0;  

		return this;
	}
});

Object.defineProperty(Array.prototype, 'clear', 
{
	enumerable: false,
	value: function(destroyData){
		if(destroyData) {
			this.destroyData();
		}
		this.length = 0;  

		return this;
	}
});

Object.defineProperty(Array.prototype, 'copy', 
{
	enumerable: false,
	value: function(src){
		this.clear();

		for (var i= 0 ; i < src.length ; ++i ) {
			var obj = src[i];

			if(obj && obj.dup) {
				obj = obj.dup();
			}

			this.push(obj);	
		}

		return this;
	}
});

function makeUniqRandArray(start, end) {
	if(start >= end) {
		return null;
	}

	var arr = [];
	var range = end - start + 1;

	for(var i = 0; i < range; i++) {
		do {
			var num = start + Math.floor(Math.random() * range);
			if(!arr.has(num)) {
				arr.push(num);
				break;
			}
		}while(1);
	}
	
	return arr;
}

///////////////////////////////////////////////////////////////////

function fixRect(rect) {
	if(rect.w < 0) {
		rect.x = rect.x + rect.w;
		rect.w = -rect.w;
	}

	if(rect.h < 0) {
		rect.y = rect.y + rect.h;
		rect.h = -rect.h;
	}

	return rect;
}

function isPointInRect(point, rect) {
    return point.x >= rect.x
        && point.y >= rect.y
        && point.x < (rect.x + rect.w)
        && point.y < (rect.y + rect.h);
}


function cantkAddEventListener(name, handler) {
	if (window.attachEvent) {
		//IE and Opera
		window.attachEvent(name, handler);
	} else if (window.addEventListener) {
		// IE 6
		window.addEventListener(name, handler);
	} else {
		//FireFox
		document.addEventListener(name, handler, true);
	}

	return;
}

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {   
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {   
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);   
	}
	 else {   
	 	return this.replace(reallyDo, replaceWith);   
	 }   
}   

/*WordPress convert " to “ ”, we need convert it back.*/
function fixJson(json) {
	var i = 0;
	var str = "";

	json = json.replaceAll("<br>", "");
	
	var n = json.length;
	for(i = 0; i < n; i++) {
		var c = json.charAt(i);

		if(c === '“' || c === '”') {
			c = '"';
		}

		str = str + c;
	}

	return str;
}

String.prototype.trim = function() 
{
	return String(this).replace(/^\s+|\s+$|^\n+|\n+$/g, '');
}

String.prototype.startWith = function(str){var t=this;return t.indexOf(str) == 0;};

String.prototype.endWith = function(str){var t = this;return t.substring(t.length-str.length,t.length) == str;};

String.prototype.isImageFileName = function(){
	var t = this.toLowerCase();

	return t.endWith(".png") || t.endWith(".jpg") || t.endWith("jpeg");
};

function drawDashedRect(canvas, x, y, w, h) {
	var f = 8;
	var e = 4;

	canvas.beginPath();
	drawDashedLine(canvas, {x:x, y:y}, {x:w+x, y:y}, f, e);
	drawDashedLine(canvas, {x:x, y:h+y}, {x:w+x, y:h+y}, f, e);
	drawDashedLine(canvas, {x:x, y:y}, {x:x, y:h+y}, f, e);
	drawDashedLine(canvas, {x:w+x, y:y}, {x:w+x, y:h+y}, f, e);

	return;
}

function drawDashedLine(canvas, start_p, end_p, f, e) {
	if(!canvas || !start_p || !end_p || !f) return;
	

	var x = start_p.x;
	var y = start_p.y;
	
	canvas.moveTo(x, y);
	if(!e) {
		canvas.lineTo(end_p.x, end_p.y);
		
		return;
	}
	
	var dx = end_p.x - start_p.x;
	var dy = end_p.y - start_p.y;
	var length = Math.sqrt(dx*dx + dy*dy);	
	var angle = Math.atan(dy/dx);

	canvas.save();
	canvas.translate(start_p.x, start_p.y);
	canvas.rotate(angle);
	if(end_p.x < start_p.x) {
		canvas.translate(-length, 0);
	}
	canvas.moveTo(0, 0);			
	x = 0;
	while(x < length) {
		x += f;
		if(x > length) {
			x = length;
		}
		canvas.lineTo(x, 0);

		if(x == length) {
			break;
		}

		x += e;
		if(x > length) {
			x = length;
		}
		canvas.moveTo(x, 0);			
	}
	canvas.restore();

	return;
}

var C_ARROW_NONE   = 0;
var C_ARROW_NORMAL = 1;
var C_ARROW_CIRCLE = 2;
var C_ARROW_RECT   = 3;
var C_ARROW_DIAMOND  = 4;
var C_ARROW_TRI    = 5;
var C_ARROW_FILL_CIRCLE = 1 << 8 | C_ARROW_CIRCLE;
var C_ARROW_FILL_RECT   = 1 << 8 | C_ARROW_RECT;
var C_ARROW_FILL_DIAMOND  = 1 << 8 | C_ARROW_DIAMOND;
var C_ARROW_FILL_TRI    = 1 << 8 | C_ARROW_TRI;

function drawArrowHeaderNormal(canvas, size) {
	canvas.translate(-size/2, 0);
	canvas.moveTo(-size/2, -size/2);
	canvas.lineTo(size/2, 0);
	canvas.lineTo(-size/2, size/2);
	canvas.stroke();
	canvas.beginPath();

	return;
}

function drawArrowHeaderTri(canvas, size) {
	canvas.translate(-size/2, 0);
	canvas.moveTo(size/2, 0);
	canvas.lineTo(-size/2, -size/2);
	canvas.lineTo(-size/2, size/2);
	canvas.lineTo(size/2, 0);
	
	return;
}

function drawArrowHeaderCircle(canvas, size) {
	canvas.translate(-size/2, 0);
	canvas.arc(0, 0, size/2, Math.PI*2, 0);
	
	return;
}

function drawArrowHeaderRect(canvas, size) {
	canvas.translate(-size/2, 0);
	canvas.rect(-size/2, -size/2, size, size);
	
	return;
}

function drawArrowHeaderRRect(canvas, size) {
	canvas.translate(-size/2, 0);
	canvas.rotate(Math.PI/4);
	canvas.rect(-size/2, -size/2, size, size);
		
	return;
}

var arrow_draw_header = 
[
	null,
	drawArrowHeaderNormal,
	drawArrowHeaderCircle,
	drawArrowHeaderRect,
	drawArrowHeaderRRect,
	drawArrowHeaderTri
];

function drawArrow(canvas, type, start_p, end_p, a_size) {
	var size = 10;
	if(!canvas || !start_p || !end_p) return;
	var fill = type >> 8;
	
	type = type & 0xff;	
	if(type <= 0 || type >= arrow_draw_header.length) {
		return;
	}
	
	if(a_size) {
		size = a_size;
	}
	
	var k = (end_p.y - start_p.y)/(end_p.x - start_p.x)
	var angle = Math.atan(k);
	

	if(end_p.x < start_p.x) {
		angle = angle + Math.PI;
	}
	
	var fillStyle =  canvas.fillStyle;
	var strokeStyle = canvas.strokeStyle;
	
	canvas.save();
	
	canvas.translate(end_p.x, end_p.y);
	canvas.rotate(angle);
	
	canvas.beginPath();
	size = size + canvas.lineWidth - 1;
	arrow_draw_header[type](canvas, size);
	canvas.closePath();
	
	if(fill) {
		canvas.fillStyle = strokeStyle;
	}
	else {
		canvas.fillStyle = "White";
	}

	if(type > 1) {
		canvas.fill();
	}
	canvas.stroke();

	canvas.restore();
	
	canvas.fillStyle =  fillStyle;
	canvas.strokeStyle = strokeStyle;
	
	return;
}

var gCacheCanvas = null;
function CacheCanvasGet(width, height) {
	if(!gCacheCanvas) {
		gCacheCanvas = document.createElement("canvas");

		gCacheCanvas.type = "backend_canvas";
		gCacheCanvas.width = width;
		gCacheCanvas.height = height;
	}

	if(gCacheCanvas) {
		if(gCacheCanvas.width < width) {
			gCacheCanvas.width = width;
		}

		if(gCacheCanvas.height < height) {
			gCacheCanvas.height = height;
		}
	}

	return gCacheCanvas;
}

if(isWebkit()) {
	drawNinePatchEx = function(context, image, s_x, s_y, s_w, s_h, x, y, w, h) {
		var dx = 0;
		var dy = 0;
		var tw = 0;
		var th = 0;
		var cw = 0;
		var ch = 0;
		var dcw = 0;
		var dch = 0;
		
		if(!image) {
			context.fillRect(x, y, w, h);
			return;
		}

		if(!s_w || s_w > image.width) {
			s_w = image.width;
		}

		if(!s_h || s_h > image.height) {
			s_h = image.height;
		}

		if(w < s_w && h < s_h) {
			context.drawImage(image, s_x, s_y, s_w, s_h, x, y, w, h);

			return;
		}

		tw = Math.floor(s_w/3);
		th = Math.floor(s_h/3);
		cw = s_w - tw - tw;
		ch = s_h - th - th;
		
		dcw = w - tw - tw;
		dch = h - th - th;

		/*draw four corner*/
		context.drawImage(image, s_x, s_y, tw, th, x, y, tw, th);
		context.drawImage(image, s_x+s_w-tw, s_y, tw, th, x+w-tw, y, tw, th);
		context.drawImage(image, s_x, s_y+s_h-th, tw, th, x, y+h-th, tw, th);
		context.drawImage(image, s_x+s_w-tw, s_y+s_h-th, tw, th, x+w-tw, y+h-th, tw, th);

		//top/bottom center
		if(dcw > 0) {
			context.drawImage(image, s_x+tw, s_y, cw, th, x+tw, y, dcw, th);
			context.drawImage(image, s_x+tw, s_y+s_h-th, cw, th, x+tw, y+h-th, dcw, th);
		}

		//left/right middle 
		if(dch > 0) {
			context.drawImage(image, s_x, s_y+th, tw, ch, x, y+th, tw, dch);
			context.drawImage(image, s_x+s_w-tw, s_y+th, tw, ch, x+w-tw, y+th, tw, dch);
		}

		//center + middle
		if(dcw > 0 && dch > 0) {
			context.drawImage(image, s_x+tw, s_y+th, cw, ch, x+tw, y+th, dcw, dch);
		}

		return;
	}
} else {
	drawNinePatchEx = function(context, image, s_x, s_y, s_w, s_h, x, y, w, h) {
		var dx = 0;
		var dy = 0;
		var tw = 0;
		var th = 0;
		var cw = 0;
		var ch = 0;
		var dcw = 0;
		var dch = 0;
		
		if(!image) {
			context.fillRect(x, y, w, h);
			return;
		}

		if(!s_w || s_w > image.width) {
			s_w = image.width;
		}

		if(!s_h || s_h > image.height) {
			s_h = image.height;
		}

		if(w < s_w && h < s_h) {
			context.drawImage(image, s_x, s_y, s_w, s_h, x, y, w, h);

			return;
		}

		tw = Math.floor(s_w/3);
		th = Math.floor(s_h/3);
		cw = s_w - tw - tw;
		ch = s_h - th - th;
		
		dcw = w - tw - tw;
		dch = h - th - th;

		/*draw four corner*/
		context.drawImage(image, s_x, s_y, tw, th, x, y, tw, th);
		context.drawImage(image, s_x+s_w-tw, s_y, tw, th, x+w-tw, y, tw, th);
		context.drawImage(image, s_x, s_y+s_h-th, tw, th, x, y+h-th, tw, th);
		context.drawImage(image, s_x+s_w-tw, s_y+s_h-th, tw, th, x+w-tw, y+h-th, tw, th);

		if(dcw > 0) {
			context.drawImage(image, s_x+tw, s_y, cw, th, x+tw-1, y, dcw+2, th);
			context.drawImage(image, s_x+tw, s_y+s_h-th, cw, th, x+tw-1, y+h-th, dcw+2, th);
		}

		if(dch > 0) {
			context.drawImage(image, s_x, s_y+th, tw, ch, x, y+th-0.5, tw, dch+1);
			context.drawImage(image, s_x+s_w-tw, s_y+th, tw, ch, x+w-tw, y+th-0.5, tw, dch+1);
		}

		//center
		if(dcw > 0 && dch > 0) {
			context.drawImage(image, s_x+tw, s_y+th, cw, ch, x+tw-1, y+th-1, dcw+2, dch+2);
		}

		return;
	}
}

function drawNinePatch(context, image, x, y, w, h) {
	if(!image) {
		context.fillRect(x, y, w, h);
		return;
	}

	return drawNinePatchEx(context, image, 0, 0, image.width, image.height, x, y, w, h);
}

function drawNinePatchIcon(context, icon, x, y, w, h) {
	var image = icon.getImage();
	var s_x = icon.getX();
	var s_y = icon.getY();
	var s_w = icon.getWidth();
	var s_h = icon.getHeight();

	if(!image) {
		context.fillRect(x, y, w, h);
		return;
	}

	return drawNinePatchEx(context, image, s_x, s_y, s_w, s_h, x, y, w, h);
}

function RoundRect() {
}

RoundRect.TL = 1;
RoundRect.TR = 2;
RoundRect.BL = 4;
RoundRect.BR = 8;

function drawRoundRect(canvas, w, h, r, which) {
	var hw = w >> 1;
	var hh = h >> 1;

	if(w < 0 || h < 0) {
		return;
	}
	
	if(!which) {
		which = RoundRect.TL | RoundRect.TR | RoundRect.BL | RoundRect.BR;
	}

	if((r >= hw || r >= hh) && which === (RoundRect.TL | RoundRect.TR | RoundRect.BL | RoundRect.BR)) {
		canvas.arc(hw, hh, Math.min(hh, hw), 0, Math.PI * 2);
		return;
	}

	if(r) {
		if(which & RoundRect.TL) {
			canvas.arc(r, r, r, Math.PI, 1.5*Math.PI, false);
		}
		else {
			canvas.moveTo(0, 0);
		}

		if(which & RoundRect.TR) {
			canvas.lineTo(w - r, 0);
			canvas.arc(w-r, r, r, 1.5*Math.PI, 2*Math.PI,  false);
		}
		else {
			canvas.lineTo(w, 0);
		}
	
		if(which & RoundRect.BR) {
			canvas.lineTo(w, h-r);
			canvas.arc(w-r, h-r, r, 0, 0.5*Math.PI, false);
		}
		else {
			canvas.lineTo(w, h);
		}

		if(which & RoundRect.BL) {
			canvas.lineTo(r, h);
			canvas.arc(r, h-r, r, 0.5 * Math.PI, Math.PI, false);
		}
		else {
			canvas.lineTo(0, h);
		}
		
		if(which & RoundRect.TL) {
			canvas.lineTo(0, r);
		}
		else {
			canvas.lineTo(0, 0);
		}
	}
	else {
		canvas.rect(0, 0, w, h);
	}

	return;
}

function cantkGetViewPort() {
	var width;
	var height;

	if (typeof window.innerWidth != 'undefined'){
		width = window.innerWidth;
		height = window.innerHeight;
	}
	else if (typeof document.documentElement != 'undefined'
	&& typeof document.documentElement.clientWidth !=
	'undefined' && document.documentElement.clientWidth != 0)
	{
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	}
	else{
		width = document.getElementsByTagName('body')[0].clientWidth;
		height = document.getElementsByTagName('body')[0].clientHeight;
	}

	return {width:width, height:height};
}

if(!window.orgViewPort) {
	window.orgViewPort = cantkGetViewPort();
}

function layoutText(canvas, fontSize, str, width, flexibleWidth) {
	if(width <= 0 || !str) {
		return [];
	}

	var i = 0;
	var j = 0;
	var wordW = 0;
	var lineW = 0;
	var logicLine = "";
	var logicLines = [];
	var phyLines = str.split("\n");
	var textLayout = new TextLayout(canvas);

	for(i = 0; i < phyLines.length; i++) {
		var line = phyLines[i];

		if(line) {
			textLayout.setText(line);
			while(textLayout.hasNext()) {
				var lineInfo = textLayout.nextLine(width, fontSize, flexibleWidth);
				logicLines.push(lineInfo.text);
			}
		}
		else {
			logicLines.push(" ");
		}
	}

	return logicLines;
}

function codeIsLetter(code) {
	return ((code >= 0x61 && code <= 0x7a) || (code >= 0x41 && code <= 0x5a));
}

function TextLayout(canvas) {
	this.canvas = canvas;

	this.setText = function(str) {
		this.str = str;
		this.startOffset = 0;
		this.lineInfo = {text:"", width:0};

		return;
	}
	
	this.canBreakBefore = function(chr) {
		if(chr === ' '
			|| chr === '\t'
			|| chr === '.'
			|| chr === ']'
			|| chr === ')'
			|| chr === '}'
			|| chr === ','
			|| chr === '?'
			|| chr === ';'
			|| chr === ':'
			|| chr === '!'
			|| chr === '\"'
			|| chr === '\''
			|| chr === '。'
			|| chr === '？'
			|| chr === '、'
			|| chr === '”'
			|| chr === '’'
			|| chr === '】'
			|| chr === '》'
			|| chr === '〉'
			|| chr === '〕'
			|| chr === '）'
			|| chr === '：'
			|| chr === '；'
			|| chr === '，') {
				return false;
		}

		return true;
	}

	this.hasNext = function() {
		return this.startOffset < this.str.length;
	}

	this.nextLine = function(width, fontSize, flexibleWidth) {
		var done = false;
		var lineText = "";
		var str = this.str;
		var i = this.startOffset;
		var length = str.length;
		var n = Math.floor((width/fontSize)*0.75);
		var availableLength = length - this.startOffset;

		if(availableLength < 1) {
			this.lineInfo.text = "";
			this.lineInfo.width = 0;

			return null;
		}
		
		if(availableLength < n) {
			lineText = str.substr(this.startOffset, availableLength);
			this.lineInfo.text = lineText;
			this.lineInfo.width = canvas.measureText(lineText).width;

			this.startOffset = this.startOffset + lineText.length;

			return this.lineInfo;
		}

		if(n > 3) {
			n = n - 3;
		}
	
		lineText = str.substr(this.startOffset, n);
	
		var code = 0;
		var chr = null;
		var chrWidth = 0;
		var nextChar = null;
		var lineWidth = canvas.measureText(lineText).width;

		var flexibleWidth = flexibleWidth ? flexibleWidth : Math.floor(width * 0.3);

		var fontSize2 = 2 * fontSize;
		var maxWidth = width + flexibleWidth;
		var minWidth = width - fontSize2;

		for(i = this.startOffset + n; i < length; i++) {
			chr = str.charAt(i);
			code = str.charCodeAt(i);
			if(chr === '\t') {
				chr = ' ';
			}

			lineText += chr;
			chrWidth  = canvas.measureText(chr).width;
			lineWidth = lineWidth + 1 + chrWidth;
		
			if(chr == "'") {
				continue;
			}

			if(lineWidth > maxWidth) {
				break;
			}
			
			if(lineWidth < minWidth) {
				continue;
			}

			if(codeIsLetter(code)) {
				continue;
			}
			
			if(code == 0x20) {
				if(lineWidth >= width) {
					break;
				}

				var nOfLetter = 0;
				for(var k = i+1; k < length; k++) {
					code = str.charCodeAt(k);

					if(codeIsLetter(code)) {
						nOfLetter++;
					}
					else {
						break;
					}
				}

				if(nOfLetter > 7) {
					break;
				}
				else {
					continue;
				}
			}

			if((i + 1) < length) {
				nextChar = str.charAt(i+1);
				if(lineWidth >= width && this.canBreakBefore(nextChar)) {
					break;
				}
			}
		}

		this.lineInfo.text = lineText;
		this.lineInfo.width = canvas.measureText(lineText).width;
		this.startOffset = this.startOffset + lineText.length;

		return this.lineInfo;
	}

	return this;
}

function createXMLHttpRequest() {
	var XMLHttpRequest = (function () {
		if (typeof window === 'undefined') {
			throw new Error('no window object present');
		}
		else if (window.XMLHttpRequest) {
			return window.XMLHttpRequest;
		}
		else if (window.ActiveXObject) {
			var axs = [
				'Msxml2.XMLHTTP.6.0',
				'Msxml2.XMLHTTP.3.0',
				'Microsoft.XMLHTTP'
			];
			for (var i = 0; i < axs.length; i++) {
				try {
					var ax = new(window.ActiveXObject)(axs[i]);
					return function () {
						if (ax) {
							var ax_ = ax;
							ax = null;
							return ax_;
						}
						else {
							return new(window.ActiveXObject)(axs[i]);
						}
					};
				}
				catch (e) {}
			}
			throw new Error('ajax not supported in this browser')
		}
		else {
			throw new Error('ajax not supported in this browser');
		}
	})();

	return new XMLHttpRequest();
}

function httpDoRequest(info) {
	var	xhr = createXMLHttpRequest();

	if(!info || !info.url) {
		return false;
	}

	var url = info.url;
	var data = info.data;
	var method = info.method ? info.method : "GET";

	if(info.forceProxy && url.indexOf("http") === 0 && url.indexOf(window.location.hostname) < 0) {
		url = '/proxy.php?url=' + window.btoa(encodeURI(url));
		console.log("use proxy:" + url);
	}

	xhr.crossOrigin = "Anonymous";
	xhr.open(method, url, true);

	if(info.noCache) {
		xhr.setRequestHeader('If-Modified-Since', '0');
	}

	if(info.headers) {
		for(var key in info.headers) {
			var value = info.headers[key];
			xhr.setRequestHeader(key, value);
		}
	}

	if(xhr) {
		xhr.send(info.data ? info.data : null);
		
		if(!xhr.onprogress) {
			xhr.onreadystatechange = function() {
				if(info.onProgress) {
					info.onProgress(xhr);
				}
				if(xhr.readyState === 4) {
					if(info.onDone) {
						info.onDone(true, xhr, xhr.responseText);
					}
				}
				//console.log("onreadystatechange:" + xhr.readyState);
				return;
			}
		}
		else {
			xhr.onprogress = function(e)  {
				var total = e.total;
				if(info.onProgress) {
					info.onProgress(xhr);
				}
				console.log("get:" + total);
			 }
			
			xhr.onload = function(e)  {
				if(info.onDone) {
					info.onDone(true, xhr, e.target.responseText);
				}
			}
			
			xhr.onerror = function(e)  {
				if(info.onDone) {
					info.onDone(false, xhr, xhr.responseText);
				}
			}
		}
	}

	return true;
}

function httpGetURL(url, onDone, forceProxy) {
	var rInfo = {};
	rInfo.url = url;
	rInfo.onDone = onDone;
	rInfo.forceProxy = forceProxy;

	httpDoRequest(rInfo);

	return;
}

function httpPostURL(url, data, onDone, forceProxy) {
	var rInfo = {};
	rInfo.url = url;
	rInfo.onDone = onDone;
	rInfo.forceProxy = forceProxy;
	rInfo.method = "POST";
	rInfo.data = data;

	httpDoRequest(rInfo);

	return;
}

function httpGetJSON(url, onDone, forceProxy) {
	httpGetURL(url, function(result, xhr, data) {
		var json = null;
		if(result) {
			try {
				json = JSON.parse(data);
			}catch(e) {
				console.log("JSON.parse failed： url=" + url + " data:" + data);
			}
		}
		onDone(json);
	}, forceProxy);

	return;
}

function cantkRestoreViewPort() {
	cantkInitViewPort(1);

	return;
}

function cantkSetViewPortWidth(width) {
	var value = "";
	var head = document.getElementsByTagName('head')[0];
	var meta = document.querySelector("meta[name=viewport]");

	if(!meta) {
		meta = document.createElement('meta');
		meta.name = 'viewport';
		head.appendChild(meta);
	}
	
	var content = 'width='+ width +'; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;';
	meta.setAttribute('content', content);

	return;
}

function cantkInitViewPort(scale) {
	var value = "";
	var meta = document.createElement('meta');
	var head = document.getElementsByTagName('head')[0];
	
	if(window.devicePixelRatio && window.devicePixelRatio > 2) {
		window.realDevicePixelRatio = window.devicePixelRatio;
		window.devicePixelRatio = 2;
	}

	var defaultRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;

	scale = scale ? scale : (1/defaultRatio);
	var scaleValues = "initial-scale="+scale+", minimum-scale="+scale+", maximum-scale="+scale+", user-scalable=0";

	if(isIPhone()) {
	  value = 'width=device-width, ' + scaleValues;
	}
	else if(isAndroid()) {
		var ver = browserVersion();
		if(ver < 537.00 || isWeiXin() || isWeiBo() || isQQ()) {
			window.devicePixelRatio = window.realDevicePixelRatio;
			value = 'target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
		}
		else { 
			//target-densitydpi is not supported any longer in new version.
			value =  'width=device-width, ' + scaleValues; 
		}
	}
	else if(isFirefoxMobile()) {
      var vp = cantkGetViewPort();
	  value =  'width='+vp.width+', ' + scaleValues; 
	}
	else {
	  value =  'width=device-width, ' + scaleValues; 
	}

	meta.name = 'viewport';
	meta.content = value;

	console.log("viewport: " + value);
	head.appendChild(meta);

	return;
}

function cantkLog(str) {
	console.log(str);

	return;
}

////////////////////////////////////////////////


var gDelayScripts = new Array();

function cantkDelayLoadScript(url) {
	gDelayScripts.push(url);

	return;
}

function loadDelayScriptsNow() {
	var i = 0;
	var tag = null;
	var filename = null;
	var node = document.head ? document.head : document.body;

	for(i = 0; i < gDelayScripts.length; i++) {
		filename = gDelayScripts[i];
		tag = document.createElement("script"); 
		tag.src = filename; 
		node.appendChild(tag);
		console.log("Load: " + filename);
	}
	
	gDelayScripts.clear();

	return;
}

function loadScriptOnce(src) {
	var scripts = document.scripts;

	if(scripts) {
		for(var i = 0; i < scripts.length; i++) {
			var iter = scripts[i];
			if(iter.src && iter.src.indexOf(src) >= 0) {
				console.log("script is loaded: " + src);
				return;
			}
		}
	}
	
	var node = document.head ? document.head : document.body;
	var tag = document.createElement("script");
	tag.src = src; 
	node.appendChild(tag);
	
	console.log("load script: " + src);
	
	return;
	
}

setTimeout(function() {
	loadDelayScriptsNow();
	return;
}, 800);

function delayLoadScripts(hostName) {
	if(hostName) {
		dappSetResHostName(hostName);
	}
	
	return;
}

function getScriptByUrl(url) {
	var scripts = document.getElementsByTagName("script");

	if(scripts) {
		for(var i = 0; i < scripts.length; i++) {
			var iter = scripts[i];
			var src = iter.src;

			if(src.indexOf(url) >= 0) {
				return iter;
			}
		}
	}

	return null;
}

function isScriptLoaded(url) {
	return getScriptByUrl(url) != null;
}


/////////////////////////////////////////////////////////
Locales = {};
Locales.getLanguageName = function() {
	var lang = "";
	if(navigator.language) {
		lang = navigator.language;
	}
	else if(navigator.userLanguage) {
		lang = navigator.userLanguage;
	}

	lang = lang.toLowerCase();

	return lang;
}

function cantkGetLocale() {
	return Locales.getLanguageName();
}
	

function getQueryParameter(key) {
  var key = key + "=";
  var queryString = window.top.location.search.substring(1);

  if ( queryString.length > 0 ) {
    begin = queryString.indexOf ( key );
    if ( begin != -1 ) {
      begin += key.length;
      end = queryString.indexOf ( "&" , begin );
        if ( end == -1 ) {
        end = queryString.length
      }
      return unescape ( queryString.substring ( begin, end ) );
    }
  }

  return null; 
}

function cantkGetQueryParam(key) {
	return getQueryParameter(key);
}

function getFontSizeInFont(str) {
	var fontSize = 12;
	var px = str.match(/\d+px/g);

	if(px) {
		fontSize = parseInt(px[0]);
	}
	else {
		var pt = str.match(/\d+pt/g);
		if(pt) {
			fontSize = parseInt(pt[0]) * 1.5;
		}
	}

	return fontSize;
}

function basename(path) {
	return path.replace(/\\/g,'/').replace( /.*\//, '' );
}

function dirname(path) {
	return path.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');
}

String.prototype.basename = function(withoutExt) {
	var filename = this.replace(/\\/g,'/').replace( /.*\//, '' );

	if(withoutExt) {
		var index = filename.lastIndexOf('.');
		if(index >= 0) {
			filename = filename.substr(0, index);
		}
	}

	return filename;
}

String.prototype.extname = function() {	
	var extName = "";
	var index = this.lastIndexOf('.');

	if(index >= 0) {
		extName = this.substr(index+1);	
	}

	return extName;
}

String.prototype.dirname = function() {
	return this.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');
}

function cantkIsFullscreen() {
	return document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen;
}

function cantkRequestFullscreen(onDone) {
	function onFullscreenChanged(e) {
		if(onDone) {
			onDone(cantkIsFullscreen());
		}
		console.log("fullscreenchange:" + cantkIsFullscreen());

		return true;
	}

	if(cantkIsFullscreen()) {
		onFullscreenChanged();
		return true;
	}

    var element = document.documentElement;
    if (document.documentElement.requestFullscreen) {
		element.addEventListener('fullscreenchange', onFullscreenChanged, true);
    	return element.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
		element.addEventListener('mozfullscreenchange', onFullscreenChanged, true);
    	return element.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
		element.addEventListener('webkitfullscreenchange', onFullscreenChanged, true);
    	return element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
	
	return false;
}

function saveStrToFile(fileName, content) {
	function get_blob_builder() {
		return window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
	}

	try {
		var BB = get_blob_builder();
		var bb = new BB;
		bb.append(content);
		saveAs(bb.getBlob("text/plain;charset=" + document.characterSet), fileName);
	}catch(e) {
		var bb = new Blob([content], {type:"text/plain;charset=" + document.characterSet});
		saveAs(bb, fileName);
	}

	return;
}

function readLocalTextFile(onSuccess, onFail) {
	function onFileChoosed(file) {
		try {
			var reader = new FileReader();
			reader.onload = function (evt) {
				var result = evt.target.result;
				if(onSuccess) {
					onSuccess(result);
				}
				return;
			};
			
			reader.onerror = function(evt) {
				if(onFail) {
					onFail(evt);
				}
				return;
			};
			reader.readAsText(file);
			reader = null;
		}catch(e) {
			if(onFail) {
				onFail(null);
			}
		}
	}

	var input = document.createElement("input");
	input.type = "file";
	input.multiple = false;
	input.onchange = function(e) {
		if(this.files && this.files.length) {
			var file = this.files[0];
			if(file && (!file.type || file.type.indexOf("text") >= 0)) {
				onFileChoosed(file);
			}
			else {
				console.log("Not text file.");
			}
		}
	}
	input.click();

	input = null;

	return;
}

Math.distanceBetween = function(p1, p2) {
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	var d = Math.sqrt(dx * dx + dy * dy);

	return d;
}

Math.lineAngle = function(from, to) {
	var dx = to.x - from.x;
	var dy = to.y - from.y;
	var d = Math.sqrt(dx * dx + dy * dy);

	if(dx == 0 && dy == 0) {
		return 0;
	}
	
	if(dx == 0) {
		if(dy < 0) {
			return 1.5 * Math.PI;
		}
		else {
			return 0.5 * Math.PI;
		}
	}

	if(dy == 0) {
		if(dx < 0) {
			return Math.PI;
		}
		else {
			return 0;
		}
	}

	if(dx > 0) {
		if(dy > 0) {
			return Math.asin(dy/d);
		}
		else {
			return 2 * Math.PI - Math.asin(Math.abs(dy)/d);
		}
	}
	else {
		if(dy > 0) {
			return Math.PI - Math.asin(Math.abs(dy)/d);
		}
		else {
			return Math.PI + Math.asin(Math.abs(dy)/d);
		}
	}
}

Math.translatePoint = function(point, angle, distance) {
	var x = point.x;
	var y = point.y;

	if(angle < 0.5 * Math.PI) {
		x = x + distance * Math.cos(angle);
		y = y + distance * Math.sin(angle);
	}
	else if(angle < Math.PI) {
		var a = Math.PI - angle;
		x = x - distance * Math.cos(a);
		y = y + distance * Math.sin(a);
	}
	else if(angle < 1.5 * Math.PI) {
		var a = angle - Math.PI;
		x = x - distance * Math.cos(a);
		y = y - distance * Math.sin(a);
	}
	else {
		var a = 2 * Math.PI - angle;
		x = x + distance * Math.cos(a);
		y = y - distance * Math.sin(a);
	}
	return {x:x, y:y};

}

Math.rotatePoint = function(point, angle) {
	var p = {};

	p.x = point.x * Math.cos(angle) + point.y * Math.sin(angle);
	p.y = point.y * Math.cos(angle) - point.x * Math.sin(angle);

	return p;
}

function dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
 }

window.makeUniqRandArray = makeUniqRandArray;
  
function isWebAudioSupported() {
	return typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined';
}

window.sendStatistics = function(str) {
	window.magicData = str;
	return;
}

window.setStatisticsData = function(data) {
	window.magicData = data;

	return;
}

/*
 * JavaScript MD5 1.0.1
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 * 
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*jslint bitwise: true */
/*global unescape, define */

(function ($) {
    'use strict';

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
        var i,
            bkey = rstr2binl(key),
            ipad = [],
            opad = [],
            hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
    * Encode a string as utf-8
    */
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw) {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return md5;
        });
    } else {
        $.md5 = md5;
    }
    window.md5 = md5;
    window.sum = md5;
}(this));
console.log("Build At " + gBuildDate);

