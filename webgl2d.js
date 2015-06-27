function WebGL2DContext() {
}

WebGL2DContext.getFragmentShaderSource = function() {
	var source = [
	"precision mediump float;",
	"varying vec2 vTextureCoord;",
	"uniform sampler2D uSampler;",
	"uniform vec4 vtSize;",
	"uniform vec4 color;",
	"void main(void) {",
	"    if(vtSize.z > 0.0) {",
	"        gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, 1.0-vTextureCoord.t));",
	"    }",
	"    else",
	"    {",
	"        gl_FragColor = color;",
	"    }",
	"}"].join("\n");

	return source;
}

WebGL2DContext.getVertexShaderSource = function() {
	var source = [
	"precision mediump float;",
	"attribute vec4 vtVetex;",
	"uniform mat3 uMVMatrix;",
	"uniform vec4 vtSize;",
	"varying vec2 vTextureCoord;",
	"void main(void) {",
	"    vec2 aVertexPosition = vtVetex.xy;",
	"    vec2 aTextureCoord = vtVetex.zw;",
	"    vec2 viewSize = vtSize.xy;",
	"    vec2 textureSize = vtSize.zw;",
	"    vec3 pos = uMVMatrix * vec3(aVertexPosition, 1.0);",
	"    vec2 pos2 = (vec2(pos.x, viewSize.y-pos.y)/ viewSize) * 2.0 - 1.0;",
	"    gl_Position = vec4(pos2, 0, 1.0);",
	"    if(textureSize.x > 1.0) {",
	"        vTextureCoord = aTextureCoord/textureSize;",
	"    }",
	"    else",
	"    {",
	"         textureSize = vec2(0.0, 0.0);",
	"    }",
	"}"].join("\n");

	return source;
}
WebGL2DContext.getVertexShader = function(gl) {
	return WebGL2DContext.getShader(gl, gl.VERTEX_SHADER, WebGL2DContext.getVertexShaderSource());
}

WebGL2DContext.getFragmentShader = function(gl) {
	return WebGL2DContext.getShader(gl, gl.FRAGMENT_SHADER, WebGL2DContext.getFragmentShaderSource());
}

WebGL2DContext.getShader = function(gl, type, source) {
	var shader = gl.createShader(type);

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

WebGL2DContext.createProgram = function(gl) {
	var fragmentShader = WebGL2DContext.getFragmentShader(gl);
	var vertexShader = WebGL2DContext.getVertexShader(gl); 
	var shaderProgram = gl.createProgram();

	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	var lineStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
	if(!lineStatus) {
		alert("Could not initialise shaders:" + gl.getProgramInfoLog(shaderProgram));
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vtVetex = gl.getAttribLocation(shaderProgram, "vtVetex");
	gl.enableVertexAttribArray(shaderProgram.vtVetex);
	
	shaderProgram.color = gl.getUniformLocation(shaderProgram, "color");
	shaderProgram.vtSize = gl.getUniformLocation(shaderProgram, "vtSize");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

	return shaderProgram;
}

WebGL2DContext.initGL = function(canvas) {
	var gl = null;
	var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	for (var i = 0; i < names.length; i++) {
		try {
      		gl = canvas.getContext(names[i]);
		} catch(e) {}
    
		if (gl) {
			break;
		}
	}

	if (!gl) {
		console.log("Could not initialise WebGL :-(");
		alert("Could not initialise WebGL :-(");

		return null;
	}
	
	gl.w = canvas.width;
	gl.h = canvas.height;
	gl.bufferCache = [];

	return gl;
}

WebGL2DContext.loadTextureWithImage = function(gl, image) {
	var texture = gl.createTexture();
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	
	image.texture = texture;
	texture.w = image.width;
	texture.h = image.height;
	texture.src = image.src;

	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	gl.bindTexture(gl.TEXTURE_2D, null);

	return image;
}

WebGL2DContext.createBuffer = function(gl) {
	if(gl.bufferCache.length) {
		return gl.bufferCache.pop();
	}

	return gl.createBuffer(); 
}

WebGL2DContext.releaseBuffer = function(gl, buffer) {
	gl.bufferCache.push(buffer);

	return;
}

WebGL2DContext.createBufferWithData = function(gl, data) {
	var buffer = WebGL2DContext.createBuffer(gl);
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

	return buffer;
}

WebGL2DContext.loadTexture = function(gl, src, onSuccess, onFail) {
	var image = new Image();

	image.onload = function() {
		WebGL2DContext.loadTextureWithImage(gl, image);
		if(image.texture) {
			if(onSuccess) {
				onSuccess(image);
			}
		}
		else {
			if(onFail) {
				onFail();
			}
		}
	}

	image.onerror = function(e) {
		if(onFail) {
			onFail();
		}
		console.log("Load Image Failed:" + src);
	}

	image.src = src;

	return image;
}

////////////////////////////////////////////////////////////////////////////

WebGL2DContext.prototype.defineProperties = function() {
	var ctx = this;

	Object.defineProperty(ctx, "lineWidth", {
		set: function (lineWidth) {
			return this;

		},
		get: function () {
			return this._lineWidth;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "fillStyle", {
		set: function (fillStyle) {
			if(this.fillStyleStr !== fillStyle) {
				this.fillStyleStr = fillStyle;
				this.fillColor = ColorParser.parserColor(fillStyle); 
			}

			return this;

		},
		get: function () {
			return this.fillStyleStr;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "strokeStyle", {
		set: function (strokeStyle) {
			if(this.strokeStyleStr !== strokeStyle) {
				this.strokeStyleStr = strokeStyle;
				this.strokeColor = ColorParser.parserColor(strokeStyle);
			}

			return this;

		},
		get: function () {
			return this.strokeStyleStr;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "globalAlpha", {
		set: function (globalAlpha) {
			return this;

		},
		get: function () {
			return this._globalAlpha;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "globalCompositeOperation", {
		set: function (globalCompositeOperation) {
			return this;

		},
		get: function () {
			return this._globalCompositeOperation;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "textAlign", {
		set: function (textAlign) {
			return this;

		},
		get: function () {
			return this._textAlign;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "textBaseline", {
		set: function (textBaseline) {
			return this;

		},
		get: function () {
			return this._textBaseline;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "font", {
		set: function (font) {
			return this;

		},
		get: function () {
			return this._font;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "lineCap", {
		set: function (lineCap) {
			return this;

		},
		get: function () {
			return this._lineCap;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "lineJoin", {
		set: function (lineJoin) {
			this._lineJoin = lineJoin;
			return this;

		},
		get: function () {
			return this._lineJoin;
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(ctx, "miterLimit", {
		set: function (miterLimit) {
			this._miterLimit = miterLimit;
			return this;

		},
		get: function () {
			return this._miterLimit;
		},
		enumerable: true,
		configurable: true
	});
}

WebGL2DContext.mat3Cache = [];

WebGL2DContext.prototype.save = function() {
	var mvMatrix = this.matrix;
	var newMatrix = WebGL2DContext.mat3Cache.pop();
	
	this.matrix = newMatrix;
	this.mvMatrixStack.push(mat3.copy(newMatrix, mvMatrix));

	return this;
}

WebGL2DContext.prototype.restore = function() {
	var mvMatrixStack = this.mvMatrixStack;

	if(mvMatrixStack.length <= 1) {
		alert("restore failed.");
		return this;
	}

	WebGL2DContext.mat3Cache.push(mvMatrixStack.pop());
	this.matrix = mvMatrixStack[mvMatrixStack.length-1];

	return this;
}

WebGL2DContext.prototype.translate = function(x, y) {
	var mvMatrix = this.matrix;

    mat3.translate(mvMatrix, mvMatrix, [x, y, 0]);

    return this;
}

WebGL2DContext.prototype.rotate = function(angle) {
	var mvMatrix = this.matrix;

    mat3.rotate(mvMatrix, mvMatrix, angle, [0, 0, 1]);

    return this;
}

WebGL2DContext.prototype.scale = function(x, y) {
	var mvMatrix = this.matrix;

    mat3.scale(mvMatrix, mvMatrix, [x, y, 1]);

    return this;
}

WebGL2DContext.prototype.drawImage = function(image, p1, p2, p3, p4, p5, p6, p7, p8) {
	var len = arguments.length;
	if(!image.texture) {
		console.log("Invalid image for webgl:" + image.src + " " + image.width + "x" + image.height);
		return;
	}

	if(len === 3) {
		this.drawImage3(image, p1, p2);
	}
	else if(len === 5) {
		this.drawImage5(image, p1, p2, p3, p4);
	}
	else if(len === 9) {
		this.drawImage9(image, p1, p2, p3, p4, p5, p6, p7, p8);
	}
	else {
		console.log("invalid arguments for drawImage");
	}

	return this;
}

WebGL2DContext.prototype.drawImage3 = function(image, dx, dy) {
	return this.drawImage9(image, 0, 0, image.width, image.height, dx, dy, image.width, image.height);
}

WebGL2DContext.prototype.drawImage5 = function(image, dx, dy, dw, dh) {
	return this.drawImage9(image, 0, 0, image.width, image.height, dx, dy, dw, dh);
}

WebGL2DContext.prototype.drawImage9 = function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
	var gl = this.gl;
	var dr = dx + dw;
	var db = dy + dh;
	var sr = sx + sw;
	var sb = sy + sh;
	var shaderProgram = this.shaderProgram;
	var mvMatrix = this.mvMatrixStack[this.mvMatrixStack.length-1];

	var texture = image.texture;
	var buffer = texture.buffer;

	if(!buffer) {
		var data = new Float32Array([dx,dy, sx,sy, dr,dy, sr,sy, dr,db, sr,sb, dx,db, sx,sb]);
		buffer = WebGL2DContext.createBufferWithData(gl, data);
		texture.buffer = buffer;
		gl.buffer = buffer;
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	}

	if(gl.buffer !== buffer) {
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	}
	gl.vertexAttribPointer(shaderProgram.vtVetexAttribute, 4, gl.FLOAT, false, 0, 0);

	if(gl.currentTexture !== texture) {
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.uniform1i(shaderProgram.samplerUniform, 0);
		gl.currentTexture = texture;
	}

	gl.uniform4f(shaderProgram.vtSize, gl.w, gl.h, texture.w, texture.h);
	gl.uniformMatrix3fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
	
//	WebGL2DContext.releaseBuffer(gl, buffer);

	return this;
}

WebGL2DContext.prototype.fillRect = function(dx, dy, dw, dh) {
	return;
	var gl = this.gl;
	var dr = dx + dw;
	var db = dy + dh;
	var shaderProgram = this.shaderProgram;
	var mvMatrix = this.mvMatrixStack[this.mvMatrixStack.length-1];

	var color = this.fillColor;
	var vertices = new Float32Array([dx,dy, dr,dy, dr,db, dx,db]);
	var textureCoords = new Float32Array([0,0, 0,0, 0,0, 0,0]);

	var vertexBuffer = WebGL2DContext.createBufferWithData(gl, vertices);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);

	var textureCoordBuffer = WebGL2DContext.createBufferWithData(gl,textureCoords);
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
	
	gl.uniform4f(shaderProgram.vtSize, gl.w, gl.h, 0, 0);
	gl.uniform4f(shaderProgram.color, color.r, color.g, color.b, color.a);
	gl.uniformMatrix3fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

	WebGL2DContext.releaseBuffer(gl, vertexBuffer);
	WebGL2DContext.releaseBuffer(gl, textureCoordBuffer);

	return this;
}

WebGL2DContext.prototype.loadTextureWithImage = function(image) {
	return WebGL2DContext.loadTextureWithImage(this.gl, image);
}

WebGL2DContext.prototype.loadTexture = function(src, onSuccess, onFail) {
	return WebGL2DContext.loadTexture(this.gl, src, onSuccess, onFail);
}

WebGL2DContext.prototype.init = function(canvas) {
	var gl = this.gl;

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	mat3.identity(this.mvMatrixStack[0]);

	return this;
}

WebGL2DContext.enableGL2D = function(canvas) {
	if(!canvas.gl2dContext) {
		canvas.getContextOrg = canvas.getContext;
		
		canvas.gl2dContext = WebGL2DContext.create(canvas);
		canvas.getContext = function(type, options) {
			if(type === "webgl-2d") {
				return canvas.gl2dContext.init(this);
			}
			else {
				return canvas.getContextOrg(type, options);
			}
		}
	}

	return;
}

WebGL2DContext.create = function(canvas) {
	var ctx = new WebGL2DContext();

	ctx.defineProperties();
	ctx.matrix = mat3.create();
	ctx.mvMatrixStack = [ctx.matrix];

	for(var i = 0; i < 20; i++) {
		WebGL2DContext.mat3Cache.push(mat3.create());
	}

	var gl = WebGL2DContext.initGL(canvas);

	gl.cullFace(gl.BACK);
	gl.frontFace(gl.CW);
	gl.enable(gl.BLEND);
	gl.enable(gl.CULL_FACE);
	gl.disable(gl.DEPTH_TEST);
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

	ctx.gl = gl;
	ctx.shaderProgram = WebGL2DContext.createProgram(gl);

	return ctx.init(canvas);
}

