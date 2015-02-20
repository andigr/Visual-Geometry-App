SimpleGeometryEngine = (function () {

	function SimpleGeometryEngine(canvas, figuresFactory, customOpts) {
	
		var context = canvas.getContext('2d');
		this.context = context;
		
		this.width = 0,
		this.height = 0,
		this.absWidth = 0,
		this.absHeight = 0,
		this.halfWidth = 0,
		this.halfHeight = 0;
		this.figuresFactory = figuresFactory;
		var _this = this;
		
		var defaultOpts = {
			liveDrawing: true,
			showSelection: true,
			showSelectionWidth: true,
			showSelectionHeight: true,
			mirrorSelectionSize: true,
			mouseMoveCallback: null,
			mouseUpCallback: null,
			selectionTextPadding : 5,
			colors: {
				selection: "grey",
				selectionText: "grey"
			},
			rectangle: {
				render: true,
			},
			triangle: {
				render: true,
			},
			circle: {
				render: true,
			},
			rhombus: {
				render: true,
			},
			display: {
				text: true,
				diagonal: true,
				angle: true
			}
		};
		
		var opts = {};
		
		var figures = {};
		
		var coordData = {
			begin: {
				x: 0,
				y: 0
			},
			end: {
				x: 0,
				y: 0
			}
		};
		
		this.figures = {
			rectangle: "rectangle",
			triangle: "triangle",
			rhombus: "rhombus",
			circle: "circle",
			oval: "oval"
		};
		
		this.currentFigure = this.figures.rectangle;
		
		var state = 0;
		
		bindButtonEvents();
		bindEvents();
		
		buildFigures();
		setOpts(customOpts);
		
		this.getFigures = function() {
			return figures;
		}
		
		function setOpts(customOpts) {
			opts = defaultOpts;
			for(var a in customOpts) {
				if(typeof(customOpts[a]) == "object" && opts.hasOwnProperty(a)) {
					for(var b in customOpts[a]) {
						opts[a][b] = customOpts[a][b];
					}
				} else {
					opts[a] = customOpts[a];
				}
			}
			setOptsForFigures();
		};
		
		function setOptsForFigures() {
			for(var figure in figures) {
				if(opts[figure]) {
					var optsForFigure = opts[figure];
					optsForFigure["colors"] = opts.colors;
					optsForFigure["display"] = opts.display;
					figures[figure].setOpts(optsForFigure);
				}
			}
		}
		
		function bindEvents() {
			canvas.addEventListener('mousedown', function(evt) {
			
				coordData.begin = getMousePos(canvas,evt);
				state = 1;
				
			}, false)
			
			
			canvas.addEventListener('mousemove', function(evt) {
			
				if(state == 0)
					return;
							
				coordData.end = getMousePos(canvas,evt);
				
				updateWidth();
				updateHeight();
				updateFigures(coordData);
				
				if(opts.liveDrawing) {
					draw(coordData);
				}
				
				if(opts.mouseMoveCallback) {
					mouseMoveCallback(figures);
				}
				
			}, false)
			
			canvas.addEventListener('mouseup', function(evt) {
			
				coordData.end = getMousePos(canvas,evt);
				state = 0;
				if(!opts.liveDrawing) {
					draw(coordData);
				}
				if(opts.mouseUpCallback) {
					mouseUpCallback(figures);
				}
			}, false)
		}
		
		function buildFigures() {
			_this.figuresFactory.context = context;
			figures[_this.figures.rectangle] = _this.figuresFactory.buildRectangle();
			figures[_this.figures.triangle] = _this.figuresFactory.buildTriangle();
			figures[_this.figures.circle] = _this.figuresFactory.buildCircle();
			figures[_this.figures.rhombus] = _this.figuresFactory.buildRhombus();
		}
		
		function updateFigures(coordData) {
			figures[_this.currentFigure].updateData(coordData);
		}
		
		function draw(coordData) {
			clearCanvas();
			if(opts.showSelection) {
				drawSelectionRectangle(coordData);
			}
			drawFigure(coordData);
		}
		
		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			return {
			  x: evt.clientX - rect.left,
			  y: evt.clientY - rect.top
			};
		}
		
		function drawFigure(coordData) {
			_this.context.save();
			figures[_this.currentFigure].render(_this.context);
			_this.context.restore();
		}
		
		function drawSelectionRectangle(coordData) {
			context.save();
			context.beginPath();
			context.rect(coordData.begin.x, 
				coordData.begin.y,
				coordData.end.x - coordData.begin.x,
				coordData.end.y - coordData.begin.y);
			context.strokeStyle = opts.colors.selection;
			context.stroke();
			context.closePath();
			drawSelectionSize(coordData);
			context.restore();
		}
		
		function drawSelectionSize(coordData) {
			if(opts.showSelectionWidth) {
				if(Math.abs(_this.width) > 50) {
					context.fillText(_this.width, coordData.begin.x + _this.width/2, coordData.begin.y - opts.selectionTextPadding);
					if(opts.mirrorSelectionSize) {
						context.fillStyle = opts.colors.selectionText;
						context.fillText(_this.width, coordData.begin.x + _this.width/2, coordData.end.y - opts.selectionTextPadding);
					}
				}
			}
			if(opts.showSelectionHeight) {
				if(Math.abs(_this.height) > 50) {
					context.fillText(_this.height, coordData.begin.x + opts.selectionTextPadding, coordData.begin.y + _this.height/2);
					if(opts.mirrorSelectionSize) {
						context.fillText(_this.height, coordData.end.x + opts.selectionTextPadding, coordData.begin.y + _this.height/2);
					}
				}
			}
		}
		
		function drawOval(coordData) {
			centerX = coordData.begin.x + _this.halfWidth;
			centerY = coordData.begin.y + _this.halfHeight;
			width = _this.width;
			height = _this.height;
			
			context.beginPath();
		  
			context.moveTo(centerX, centerY - height/2);
		  
			context.bezierCurveTo(
			centerX + width/2, centerY - height/2,
			centerX + width/2, centerY + height/2,
			centerX, centerY + height/2);

			context.bezierCurveTo(
			centerX - width/2, centerY + height/2,
			centerX - width/2, centerY - height/2,
			centerX, centerY - height/2);
			
			context.stroke();
			context.closePath();
		}
		
		function clearCanvas() {
			context.clearRect( 0 , 0 , canvas.width , canvas.height );
		}
		
		function updateWidth() {
			_this.width = coordData.end.x - coordData.begin.x;
		}
		
		function updateHeight() {
			_this.height = coordData.end.y - coordData.begin.y;
		}
		
	}
	
	SimpleGeometryEngine.prototype.getWidth = function() {
		return this.width;
	}
	
	SimpleGeometryEngine.prototype.getHeight = function() {
		return this.height;
	}
	
	return SimpleGeometryEngine;
	
}());

