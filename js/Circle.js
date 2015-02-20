Circle = (function() {
	
	Circle.prototype = new Figure();
	Circle.constructor = Circle;
	
	function Circle(radius) {
		this.radius = radius;
		this.x = 0;
		this.y = 0;
		this.diameter = radius * 2;
		this.opts.colors.radius = "red";
	}
	
	Circle.prototype.updateData = function(coordData) {
		var signY = 1;
		var signX = 1;

		if(coordData.begin.x > coordData.end.x) {
			signX = -1;
		}
		if(coordData.begin.y > coordData.end.y) {
			signY = -1;
		}
		var width = coordData.end.x - coordData.begin.x;
		var height = coordData.end.y - coordData.begin.y;
		var radius = width / 2;
		if(Math.abs(width) > Math.abs(height)) {
			radius = height/2;
		}
		radius = Math.abs(radius);
		this.x = coordData.begin.x + (signX * radius);
		this.y = coordData.begin.y + (signY * radius);
		this.radius = radius;
		this.diameter = radius * 2;
	}
	
	Circle.prototype.area = function() {
		return Math.pow(this.radius, 2) * Math.PI;
	}
	
	Circle.prototype.circumference = function() {
		return Math.PI * 2 * this.radius;
	}
	
	Circle.prototype.drawData = function(context) {
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.x + this.radius, this.y);
		context.strokeStyle = this.opts.colors.radius;
		context.stroke();
		context.save();
		context.fillStyle = this.opts.colors.text;
		context.fillText(this.radius, this.x + this.radius / 2, this.y);	
		context.restore();
		context.closePath();
	}
	
	Circle.prototype.drawShape = function(context) {
		if(!this.opts.render) {
			return;
		}
		context.beginPath();
		context.arc(this.x, 
			this.y,
			Math.abs(this.radius), 
			0, 
			360);
		this.fillShape(context);
		context.strokeStyle = this.opts.colors.shape;
		context.stroke();
		context.closePath();
	}
	
	Circle.prototype.getData = function() {
		return {
			x: this.x,
			y: this.y,
			radius: this.radius,
			diameter: this.diameter,
			circumference: this.circumference(),
			area: this.area()
		};
	}
	
	return Circle;
	
}(Figure));