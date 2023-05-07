var canvas = document.querySelector('canvas')
	;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var mouse = {
	x: undefined,
 	y: undefined
 }

 window.addEventListener('mousemove', function(event) {
	// 	function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})
//event (where mouse is)
 window.addEventListener('mousemove', function(event) {
	// 	function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})
//resizing the browser
window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})

var colorArray = [
	'pink',
	'red',
	'purple',
	'white',
 ];
 //radius for when circles get resized by the mouse
 var maxRadius = 40;
 var minRadius = 2;

function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.fillStyle  = this.color;
		
		//to create the "flashlight" effect
		if(!(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius< maxRadius )) {
			c.strokeStyle = 'black';
			c.fillStyle = 'black';
		}else{
			c.strokeStyle = this.color;
			c.fillStyle = this.color;
		}
		c.stroke();
		//c.fill();
	}
	
	this.update = function() {
		if( (this.x + this.radius) > innerWidth || (this.x-this.radius) < 0){
			this.dx = -this.dx;
		}
		if( (this.y + this.radius) > innerHeight || (this.y-this.radius) < 0){
			this.dy = -this.dy;
		}
		
		this.x = this.x + this.dx;
		this.y = this.y + this.dy

		//interacting with the mouse
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius< maxRadius ) {
			this.radius += 0.5;
		}else if(this.radius > this.minRadius){
			this.radius -= 1;
		}

		this.x = this.x + this.dx;
		this.y = this.y + this.dy
		this.draw();
	}
	
}
//for loop to create a bunch of circles
var circleArray = [];

for(var i = 0; i< 800; i++){
	circleArray.push(new Circle())
	var radius = Math.random()*3+1;

	var x = Math.random() * (innerWidth-radius*2)+radius;//subtract diameter to make sure doesnt get stuck on side
	var y  = Math.random() * (innerHeight-radius*2)+radius;
	var dx = (Math.random() - 0.5)*2;
	var dy = (Math.random() - 0.5)*2;	
	
	circleArray.push(new Circle(x, y, dx, dy, radius));

}

//create a instance of the circle function
var circle = new Circle(200, 200, 4, 4, 30);

function animate() {
	requestAnimationFrame(animate);
	//clear the canvas (to have one circle at a time)
	c.clearRect(0, 0, innerWidth, innerHeight);
	//make the background black
	c.fillStyle = 'black';
	c.fillRect(0,0,innerWidth,innerHeight);

	//iterate through all circles
	for(var i = 0; i<circleArray.length; i++){
		circleArray[i].update();
	}
}

animate();
