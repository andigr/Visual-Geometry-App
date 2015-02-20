function updated(figure, coordData) {
	figure.updateData(coordData);
	return figure;
}

QUnit.test( "Rectangle perimeter", function( assert ) {
	data = rectangle1().getData();
	assert.ok( data.perimeter == 140, "Wrong perimeter value!" );
});

QUnit.test( "Rectangle area", function( assert ) {
	data = rectangle1().getData();
	assert.ok( data.area == 1200, "Wrong area value!" );
});

QUnit.test( "Rectangle diagonal", function( assert ) {
	data = rectangle1().getData();
	assert.ok( data.diagonal == 50, "Wrong diagonal value!" );
});

QUnit.test( "Updated rectangle diagonal", function( assert ) {
	data = updated(rectangle1(), coordData1()).getData();
	assert.ok( data.diagonal == 500, "Wrong diagonal value!" );
});

QUnit.test( "Updated rectangle coordinates", function( assert ) {
	data = updated(rectangle1(), coordData1()).getData();
	assert.ok( data.x == 100, "Wrong x value!" );
	assert.ok( data.y == 100, "Wrong y value!" );
});

QUnit.test( "Updated rectangle diagonal", function( assert ) {
	data = updated(rectangle1(), coordData1()).getData();
	assert.ok( data.diagonal == 500, "Wrong diagonal value!" );
});

QUnit.test( "Updated rectangle perimeter", function( assert ) {
	data = updated(rectangle1(), coordData1()).getData();
	assert.ok( data.perimeter == 1400, "Wrong perimeter value!" );
});

QUnit.test( "Updated rectangle area", function( assert ) {
	data = updated(rectangle1(), coordData1()).getData();
	assert.ok( data.area == 120000, "Wrong area value!" );
});

QUnit.test( "Triangle hypotenuse", function( assert ) {
	data = triangle1().getData();
	assert.ok( data.hypotenuse == 50, "Wrong hypotenuse value!" );
});

QUnit.test( "Triangle perimeter", function( assert ) {
	data = triangle1().getData();
	assert.ok( data.perimeter == 120, "Wrong perimeter value!" );
});

QUnit.test( "Triangle area", function( assert ) {
	data = triangle1().getData();
	assert.ok( data.area == 600, "Wrong area value!" );
});

QUnit.test( "Triangle angle A", function( assert ) {
	data = triangle1().getData();
	assert.ok( data.angleARad == 0.6435011087932844, "Wrong area value!" );
});

QUnit.test( "Triangle angle B", function( assert ) {
	data = triangle1().getData();
	assert.ok( data.angleBRad == 0.9272952180016122, "Wrong area value!" );
});

QUnit.test( "Updated triangle hypotenuse", function( assert ) {
	data = updated(triangle1(), coordData1()).getData();
	assert.ok( data.hypotenuse == 500, "Wrong hypotenuse value!" );
});

QUnit.test( "Updated triangle perimeter", function( assert ) {
	data = updated(triangle1(), coordData1()).getData();
	assert.ok( data.perimeter == 1200, "Wrong perimeter value!" );
});

QUnit.test( "Updated triangle area", function( assert ) {
	data = updated(triangle1(), coordData1()).getData();
	assert.ok( data.area == 60000, "Wrong area value!" );
});

QUnit.test( "Updated triangle angle A", function( assert ) {
	data = triangle1().getData();
	assert.ok( data.angleARad == 0.6435011087932844, "Wrong area value!" );
});

QUnit.test( "Updated triangle angle B", function( assert ) {
	data = triangle1().getData();
	assert.ok( data.angleBRad == 0.9272952180016122, "Wrong area value!" );
});

QUnit.test( "Circle radius", function( assert ) {
	data = circle1().getData();
	assert.ok( data.radius == 200, "Wrong radius value!" );
});

QUnit.test( "Circle circumference", function( assert ) {
	data = circle1().getData();
	assert.ok( data.circumference == Math.PI * 400, "Wrong circumference value!" );
});

QUnit.test( "Circle area", function( assert ) {
	data = circle1().getData();
	assert.ok( data.area == Math.PI * 40000, "Wrong area value!" );
});

QUnit.test( "Updated Circle coordinates", function( assert ) {
	data = updated(circle1(), coordData1()).getData();
	assert.ok( data.x == 250, "Wrong x value!" );
	assert.ok( data.y == 250, "Wrong y value!" );
});

QUnit.test( "Updated Circle radius", function( assert ) {
	data = updated(circle1(), coordData1()).getData();
	assert.ok( data.radius == 150, "Wrong radius value!" );
});

QUnit.test( "Updated Circle circumference", function( assert ) {
	data = updated(circle1(), coordData1()).getData();
	assert.ok( data.circumference == Math.PI * 300, "Wrong circumference value!" );
});

QUnit.test( "Updated Circle area", function( assert ) {
	data = updated(circle1(), coordData1()).getData();
	assert.ok( data.area == Math.PI * 22500, "Wrong area value!" );
});

QUnit.test( "Rhombus side", function( assert ) {
	data = rhombus1().getData();
	assert.ok( data.side == 50, "Wrong side value!" );
});

QUnit.test( "Rhombus perimeter", function( assert ) {
	data = rhombus1().getData();
	assert.ok( data.perimeter == 200, "Wrong perimeter value!" );
});

QUnit.test( "Rhombus area", function( assert ) {
	data = rhombus1().getData();
	assert.ok( data.area == 4800, "Wrong area value!" );
});

QUnit.test( "Updated Rhombus side", function( assert ) {
	data = updated(rhombus1(), coordData1()).getData();
	console.log(data);
	assert.ok( data.side == 250, "Wrong side value!" );
});

QUnit.test( "Updated Rhombus perimeter", function( assert ) {
	data = updated(rhombus1(), coordData1()).getData();
	assert.ok( data.perimeter == 1000, "Wrong perimeter value!" );
});

QUnit.test( "Updated Rhombus area", function( assert ) {
	data = updated(rhombus1(), coordData1()).getData();
	assert.ok( data.area == 120000, "Wrong area value!" );
});

QUnit.test( "Radians to degree convertation", function( assert ) {
	var degrees = triangle1().radToDegrees(Math.PI / 6);
	degrees = degrees.toFixed(0)
	console.log(degrees);
	assert.ok( degrees == 30, "Wrong degree value!" );
});