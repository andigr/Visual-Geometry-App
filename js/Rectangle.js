Rectangle = (function() {

	Rectangle.prototype = new Figure();
	Rectangle.constructor = Rectangle;
	
	function Rectangle(width, height) {
		this.width = width;
		this.height = height;
	}
	
	Rectangle.prototype.updateData = function(coordData) {
		this.x = coordData.begin.x;
		this.y = coordData.begin.y;
		this.width = coordData.end.x - coordData.begin.x;
		this.height = coordData.end.y - coordData.begin.y;
	}
	
	Rectangle.prototype.diagonal = function() {
		return Math.sqrt(Math.pow(this.width,2)+Math.pow(this.height,2));
	}
	
	Rectangle.prototype.area = function() {
		return Math.abs(this.width * this.height);
	}
	
	Rectangle.prototype.perimeter = function() {
		return Math.abs((this.width + this.height) * 2);
	}
	
	Rectangle.prototype.drawData = function(context) {
		if(this.opts.display.diagonal)
			this.drawRectDiagonal(context);
		if(this.opts.display.angle)
			this.drawRectAngle(context);
	}
	
	Rectangle.prototype.drawShape = function(context) {
		if(!this.opts.render) {
			return;
		}
		context.beginPath();
		context.rect(this.x, 
			this.y,
			this.width,
			this.height);
		context.strokeStyle = this.opts.colors.shape;
		context.stroke();
		this.fillShape(context);
		context.closePath();
	}
	
	Rectangle.prototype.drawRectDiagonal = function(context) {
		context.save();
		context.beginPath();
		context.moveTo(this.x, this.y + this.height);
		context.lineTo(this.x + this.width, this.y);
		if(this.opts.display.text)
			context.save();
			context.fillStyle = this.opts.colors.text;
			context.fillText(this.formatValue(this.diagonal()), this.x + this.width / 2, this.y + this.height / 2);
			context.restore();
		context.strokeStyle = this.opts.colors.diagonal;
		context.stroke();
		context.closePath();
		context.restore();
	}
	
	Rectangle.prototype.drawRectAngle = function(context) {
		context.save();
		context.beginPath();
		context.moveTo(this.x + (this.width*0.1), this.y);
		context.lineTo(this.x + (this.width*0.1), this.y  + (this.height*0.1));
		context.lineTo(this.x, this.y  + (this.height*0.1));
		if(this.opts.display.text)
			context.save();
			context.fillStyle = this.opts.colors.text;
			angle = 90;
			var angle = 90;
			if(this.opts.showRadians) {
				angle = this.degreesToRad(angle);
				angle = this.formatValue(angle);
			}
			context.fillText(angle, this.x + (this.width*0.1) + 5, this.y  + (this.height*0.1));
			context.restore();
		context.strokeStyle = this.opts.colors.angle;
		context.stroke();
		context.closePath();
		context.restore();
	}
	
	Rectangle.prototype.getData = function() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			diagonal: this.diagonal(),
			perimeter: this.perimeter(),
			area: this.area()
		};
	}
	
	return Rectangle;
	
}(Figure));