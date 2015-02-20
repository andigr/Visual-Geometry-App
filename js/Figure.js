var Figure = (function() {
	
	var Figure = function() {
		this.x = 0;
		this.y = 0;
		this.opts = {
			render: true,
			fill: false,
			colors: {
				shape: "black",
				diagonal: "green",
				angle: "red",
				text: "green",
				fill: "white"
			},
			display: {
				diagonal: true,
				angle: true,
				text: true
			},
			showRadians: false
		}
	};
	
	Figure.prototype.setOpts = function(customOpts) {
		for(var a in customOpts) {
			if(typeof(customOpts[a]) == "object" && this.opts.hasOwnProperty(a)) {
				for(var b in customOpts[a]) {
					this.opts[a][b] = customOpts[a][b];
				}
			} else {
				this.opts[a] = customOpts[a];
			}
		}
	}
	
	Figure.prototype.render = function(context) {
		this.drawShape(context);
		this.drawData(context);
	}
	
	Figure.prototype.radToDegrees = function(rad) {
		return rad * (180 / Math.PI);
	}
	
	Figure.prototype.degreesToRad = function(d) {
		return d * ( Math.PI / 180);
	}
	
	Figure.prototype.formatValue = function(num) {
		return num.toFixed(1);
	}
	
	Figure.prototype.fillShape = function(context) {
		if(this.opts.fill == true) {
			context.save();
			context.fillStyle = this.opts.colors.fill;
			context.fill();
			context.restore();
		}
	}
	
	return Figure;
	
}());