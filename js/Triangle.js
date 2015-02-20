Triangle = (function() {
	
	Triangle.prototype = new Figure();
	Triangle.constructor = Triangle;
	
	function Triangle(cathetusHorizontal, cathetusVertical) {
		this.cathetusHorizontal = cathetusHorizontal;
		this.cathetusVertical = cathetusVertical;
	}
	
	Triangle.prototype.updateData = function(coordData) {
		this.x = coordData.begin.x;
		this.y = coordData.begin.y;
		this.cathetusHorizontal = coordData.end.x - coordData.begin.x;
		this.cathetusVertical = coordData.end.y - coordData.begin.y;
	}
	
	Triangle.prototype.area = function() {
		return Math.abs(this.cathetusHorizontal * this.cathetusVertical / 2);
	}
	
	Triangle.prototype.perimeter = function() {
		return Math.abs(this.cathetusHorizontal + this.cathetusVertical + this.hypotenuse());
	}
	
	Triangle.prototype.hypotenuse = function() {
		return Math.sqrt(Math.pow(this.cathetusHorizontal, 2) + Math.pow(this.cathetusVertical, 2));
	}
	
	Triangle.prototype.angleARad = function() {
		var rel = 0;
		if (this.cathetusVertical != 0) {
			rel = this.cathetusHorizontal / this.cathetusVertical;
		}
		return Math.atan(rel);
	}
	
	Triangle.prototype.angleA = function() {
		return this.radToDegrees(this.angleARad());
	}
	
	Triangle.prototype.angleBRad = function() {
		var rel = 0;
		if (this.cathetusHorizontal != 0) {
			rel = this.cathetusVertical / this.cathetusHorizontal;
		}
		return Math.atan(rel);
	}
	
	Triangle.prototype.angleB = function() {
		return this.radToDegrees(this.angleBRad());
	}
	
	Triangle.prototype.drawData = function(context) {
		context.beginPath();
		context.moveTo(this.x + (this.cathetusHorizontal*0.1), this.y);
		context.lineTo(this.x + (this.cathetusHorizontal*0.1), this.y  + (this.cathetusVertical*0.1));
		context.lineTo(this.x, this.y  + (this.cathetusVertical*0.1));
		context.strokeStyle = this.opts.colors.angle;
		if(this.opts.display.text) {
			context.save();
			context.fillStyle = this.opts.colors.text;
			context.fillText(this.formatValue(this.hypotenuse()), this.x + this.cathetusHorizontal / 2, this.y + this.cathetusVertical / 2);
			var angle = 90;
			if(this.opts.showRadians) {
				angle = this.degreesToRad(angle);
				angle = this.formatValue(angle);
			}
			context.fillText(angle, this.x + (this.cathetusHorizontal*0.1) + 5, this.y  + (this.cathetusVertical*0.1));
			context.restore();
		}
		this.drawAngle(context);
		context.stroke();
		context.closePath();
	}
	
	Triangle.prototype.drawAngle = function(context) {
		var a = 0;
		var b = 0;
		if(this.opts.showRadians) {
			a = this.angleARad();
			b = this.angleBRad();
		} else {
			a = this.angleA();
			b = this.angleB();
		}
		a = this.formatValue(a);
		b = this.formatValue(b);
		
		context.save();
		context.fillStyle = this.opts.colors.text;
		context.fillText("A= " + a, this.x + 5, this.y  + (this.cathetusVertical*0.9));
		context.fillText("B= " + b, this.x + (this.cathetusHorizontal*0.9), this.y  + 20);
		context.restore();
	}
	
	Triangle.prototype.drawShape = function(context) {
		if(!this.opts.render) {
			return;
		}
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.x + this.cathetusHorizontal, this.y);
		context.lineTo(this.x, this.y + this.cathetusVertical);
		context.lineTo(this.x, this.y);
		context.strokeStyle = this.opts.colors.shape;
		this.fillShape(context);
		context.stroke();
		context.closePath();
	}
	
	Triangle.prototype.getData = function() {
		return {
			x: this.x,
			y: this.y,
			cathetusHorizontal: this.cathetusHorizontal,
			cathetusVertical: this.cathetusVertical,
			hypotenuse: this.hypotenuse(),
			perimeter: this.perimeter(),
			area: this.area(),
			angleARad: this.angleARad(),
			angleBRad: this.angleBRad(),
			angleA: this.angleA(),
			angleB: this.angleB(),
		};
	}
	
	return Triangle;
	
}(Figure));