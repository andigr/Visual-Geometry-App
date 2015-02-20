var figure = 'rectangle';
function mouseUpCallback(figures) {
	switch(figure) {
		case 'rectangle':
			var data = figures.rectangle.getData();
			document.getElementById('rectangle-x').value = data.x;
			document.getElementById('rectangle-y').value = data.y;
			document.getElementById('rectangle-width').value = data.width;
			document.getElementById('rectangle-height').value = data.height;
			document.getElementById('rectangle-diagonal').value = data.diagonal;
			document.getElementById('rectangle-perimeter').value = data.perimeter;
			document.getElementById('rectangle-area').value = data.area;
			break;
		case 'triangle':
			var data = figures.triangle.getData();
			document.getElementById('triangle-x').value = data.x;
			document.getElementById('triangle-y').value = data.y;
			document.getElementById('triangle-cathetusHorizontal').value = data.cathetusHorizontal;
			document.getElementById('triangle-cathetusVertical').value = data.cathetusVertical;
			document.getElementById('triangle-hypotenuse').value = data.hypotenuse;
			document.getElementById('triangle-perimeter').value = data.perimeter;
			document.getElementById('triangle-area').value = data.area;
			document.getElementById('triangle-angleA').value = data.angleA;
			document.getElementById('triangle-angleB').value = data.angleB;
			document.getElementById('triangle-angleARad').value = data.angleARad;
			document.getElementById('triangle-angleBRad').value = data.angleBRad;
			break;
		case 'circle':
			var data = figures.circle.getData();
			document.getElementById('circle-x').value = data.x;
			document.getElementById('circle-y').value = data.y;
			document.getElementById('circle-radius').value = data.radius;
			document.getElementById('circle-circumference').value = data.circumference;
			document.getElementById('circle-area').value = data.area;
			break;
		case 'rhombus':
			var data = figures.rhombus.getData();
			document.getElementById('rhombus-x').value = data.x;
			document.getElementById('rhombus-y').value = data.y;
			document.getElementById('rhombus-side').value = data.side;
			document.getElementById('rhombus-diagonalHorizontal').value = data.diagonalHorizontal;
			document.getElementById('rhombus-diagonalVertical').value = data.diagonalVertical;
			document.getElementById('rhombus-perimeter').value = data.perimeter;
			document.getElementById('rhombus-area').value = data.area;
			break;
	}
	
}

function mouseMoveCallback(figures) {
	
}

var canvas = document.getElementById('canvas');
var figures_collection = {
	Triangle: Triangle,
	Rectangle: Rectangle,
	Circle: Circle,
	Rhombus: Rhombus
};
var figuresFactory = new FiguresFactory(figures_collection);
var opts = {
	mouseUpCallback: mouseUpCallback,
	mirrorSelectionSize: false,
	rectangle: {
		render: true,
	},
	triangle: {
		render: true,
		showRadians: false,
	},
	display: {
		text: true,
		diagonal: true
	},
	colors: {
		diagonal: "green",
		radius: "green",
		text: "black"
	}
}
window.oo = opts;
var d = new SimpleGeometryEngine(canvas, figuresFactory, opts);
window.d = d;

function bindButtonEvents() {
	
	figures = ['rectangle', 'triangle', 'rhombus', 'circle'];
	figure = figures[0];
	
	for(var i = 0; i < figures.length; i++) {
		var buttonId = 'g-' + figures[i];
		var button = document.getElementById(buttonId);
		button.addEventListener('mouseup', function() {
			resetButtons();
			resetContainers();
			var clickedFigure = this.getAttribute('data-figure');
			this.className += " active";
			document.getElementById(clickedFigure + '-container').className = 'show';
			d.currentFigure = d.figures[clickedFigure];
			figure = clickedFigure;
		});
		var fill = document.getElementById(figures[i] + '-fill');
		fill.addEventListener('change', function(e) {
			target = e.target;
			figure = d.getFigures();
			window.ff = figure;
			var clickedFigure = this.getAttribute('data-figure');
			figure = figure[clickedFigure];
			figure.opts.fill = target.checked;
		});
	}
	
	function resetButtons() {
		for(var i = 0; i < figures.length; i++) {
			var button  = document.getElementById('g-'+figures[i]);
			button.className = 'g-button';
		}
	}
	
	function resetContainers() {
		for(var i = 0; i < figures.length; i++) {
			var container  = document.getElementById(figures[i] + '-container');
			container.className = 'hide';
		}
	}
	
}

function hideAllBut(conteinerId) {
	var rectangleContainer = document.getElementById('rectangle-container').className = 'hide';
	var triangleContainer = document.getElementById('triangle-container').className = 'hide';
	var rhombusContainer = document.getElementById('rhombus-container').className = 'hide';
	var circleContainer = document.getElementById('circle-container').className = 'hide';
}