
window.requestAnimFrame = window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame;


var canvas;
var contextName = "2d";

var startTime = Date.now();
var renderTimes = 0;
var loopTimes = 1;
var fpsResult = {};
var sampleTimes = 0;
var images = [];
var imagesSrc = ["images/1-512.jpg", "images/1-256.jpg", "images/1-128.jpg", "images/1-64.jpg", "images/1-32.jpg"];

function drawOneLoop(ctx, index, hw, hh) {
	for(var i = 0; i < images.length; i++) {
		var image = images[1];
		if(image && image.width) {
			ctx.save();
			ctx.drawImage(image, hw-(image.width>>1), hh - (image.height >> 1));
			ctx.restore();
		}
	}

	return;
}

function render() {
	var ctx = canvas.getContext(contextName);
	
	ctx.fillStyle = "Black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	var hw = canvas.width >> 1;
	var hh = canvas.height >> 1;
	for(var i = 0; i < loopTimes; i++) {
		var angle = 2 * Math.PI * ((i/loopTimes) + renderTimes/360);
		ctx.save();
		ctx.translate(hw, hh);
		ctx.rotate(angle);
		ctx.translate(-hw, -hh);
		drawOneLoop(ctx, i, hw, hh);
		ctx.restore();
	}

	renderTimes++;
	
	var cost = (Date.now() - startTime)/1000;
	if(cost > 5) {
		var fps = Math.round(renderTimes/cost);
		fpsResult[loopTimes.toString()] = {objects: loopTimes * images.length, fps:fps};

		sampleTimes++;
		console.log(sampleTimes);

		if(sampleTimes > 4) {
			var str = JSON.stringify(fpsResult, null, "\t");
			console.log(str);
			alert(str);
			return;
		}
		
		renderTimes = 0;
		loopTimes += 10;
		startTime = Date.now();
	}

	requestAnimFrame(render);
}

function readyToGo(useGL) {
	cantkInitViewPort();

	setTimeout(function() {
		prepareRender(useGL);
	}, 200);
}

function prepareRender(useGL) {
	var ctx = null;
	var vp = cantkGetViewPort();

	canvas = document.getElementById("main-canvas");
//	canvas.style.width = vp.width;
//	canvas.style.height = vp.height;
	canvas.width = 480;
	canvas.height = 800;

	if(useGL) {
		contextName = "webgl-2d";
		WebGL2DContext.enableGL2D(canvas);	
		var ctx = canvas.getContext(contextName);
	}

	for(var i = 0; i < imagesSrc.length; i++) {
		var image = null;
		if(useGL) {
			image = ctx.loadTexture(imagesSrc[i]);
		}
		else {
			image = new Image();
			image.src = imagesSrc[i];
		}
		images.push(image);
	}

	startTime = Date.now();
	render();
}
