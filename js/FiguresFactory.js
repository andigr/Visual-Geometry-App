FiguresFactory = (function() {
	function Factory(figures) {
	}
	
	Factory.prototype.buildRectangle = function(w, h) {
		var rectangle = new Rectangle(w, h);
		return rectangle;
	}
	
	Factory.prototype.buildTriangle = function(w, h) {
		var triangle = new Triangle(w, h);
		return triangle;
	}
	
	Factory.prototype.buildCircle = function(w, h) {
		var circle = new Circle(w);
		return circle;
	}
	
	Factory.prototype.buildRhombus = function(w, h) {
		var rhombus = new Rhombus(w, h);
		return rhombus;
	}

	return Factory;
}())