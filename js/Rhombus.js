Rhombus = (function() {
	
	Rhombus.prototype = new Figure();
	Rhombus.constructor = Rhombus;
	
	function Rhombus(diagonalHorizontal, diagonalVertical) {
		this.x = 0;
		this.y = 0;
		this.diagonalHorizontal = diagonalHorizontal;
		this.diagonalVertical = diagonalVertical;
	}
	
	Rhombus.prototype.area = function() {
		return Math.abs(this.diagonalHorizontal * this.diagonalVertical);
	}
	
	Rhombus.prototype.perimeter = function() {
		return Math.abs(this.side() * 4);
	}
	
	Rhombus.prototype.updateData = function(coordData) {
		this.x = coordData.begin.x;
		this.y = coordData.begin.y;
		this.diagonalHorizontal = coordData.end.x - this.x;
		this.diagonalVertical = coordData.end.y - this.y;
	}
	
	Rhombus.prototype.side = function() {
		var halfX = this.diagonalHorizontal / 2;
		var halfY = this.diagonalVertical / 2;
		return Math.sqrt(Math.pow(halfX, 2) + Math.pow(halfY, 2));
	}
	
	Rhombus.prototype.drawData = function(context) {
		context.beginPath();
		var halfX = this.diagonalHorizontal / 2;
		var halfY = this.diagonalVertical / 2;
		context.moveTo(this.x, this.y + halfY );
		context.lineTo(this.x + this.diagonalHorizontal, this.y + halfY);
		context.moveTo(this.x + halfX, this.y);
		context.lineTo(this.x + halfX, this.y + this.diagonalVertical);
		context.save();
		context.fillStyle = this.opts.colors.text;
		context.fillText(this.formatValue(this.side()), this.x + halfX / 2, this.y  + halfY / 2);
		context.strokeStyle = this.opts.colors.diagonal;
		context.stroke();
		context.closePath();
		context.restore();
	}
	
	Rhombus.prototype.drawShape = function(context) {
		if(!this.opts.render) {
			return;
		}
		var halfX = this.diagonalHorizontal / 2;
		var halfY = this.diagonalVertical / 2;
		context.beginPath();
		context.moveTo(this.x, this.y + halfY );
		context.lineTo(this.x + halfX, this.y);
		context.lineTo(this.x + this.diagonalHorizontal, this.y + halfY);
		context.lineTo(this.x + halfX, this.y + this.diagonalVertical);
		context.lineTo(this.x, this.y + halfY );
		this.fillShape(context);
		context.strokeStyle = this.opts.colors.shape;
		context.stroke();
		context.closePath();
	}
	
	Rhombus.prototype.getData = function() {
		return {
			x: this.x,
			y: this.y,
			side: this.side(),
			diagonalHorizontal: this.diagonalHorizontal,
			diagonalVertical: this.diagonalVertical,
			perimeter: this.perimeter(),
			area: this.area()
		}
	}
	
	return Rhombus;
	
}(Figure));