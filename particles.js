/**************
  Variables
************/
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let width, height;
let mouseX, mouseY;
let particlesArray = [];
let hue = 0;
let universalColor = "hsl(0, 50, 50)";

/*************
  Setup
*************/
document.getElementsByTagName("body")[0].style.backgroundColor = "#171717";
document.getElementsByTagName("body")[0].style.cursor = "none";

width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;

/*************
  Particle class
*************/
class Particle {
  constructor(X, Y, radius, color, lifespan) {
    this.x = X;
    this.y = Y;

    this.velocityX = random(-2, 2);
    this.velocityY = random(-2, 2);

    this.radius = radius;
    this.color = color;
    this.lifespan = lifespan;

    //this.hue = hue;
    //this.lastPoint = { x: this.x, y: this.y };
  }
  show() {
    //Last point as an agument if we want to do the particles without arc
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    /*context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = this.radius;
    context.moveTo(this.lastPoint.x, this.lastPoint.y);
    context.lineTo(this.x, this.y);
    // context.arcTo(this.x+this.radius, this.y, this.x, this.y, this.radius);
    // context.arcTo(this.x+this.radius, this.y, this.x, this.y, this.radius);
    // context.arcTo(this.x, this.y-this.radius, this.x, this.y+this.radius, this.radius);
    // context.arcTo(this.x, this.y+this.radius, this.x, this.y-this.radius, this.radius);
    context.lineWidth = this.radius;
    context.stroke();
    context.closePath();*/
  }
  update() {
    this.lastPoint = { x: this.x, y: this.y };
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.lifespan != undefined) {
      this.lifespan--;
    }
  }
  bounceOnBorderColision() {
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.velocityX = -this.velocityX;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.velocityY = -this.velocityY;
    }
  }
  finish() {
    return this.lifespan < 0;
  }
}

/*************
  Rendering
*************//*
let start;
function drawOnCanvas(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  context.fillStyle = "rgba(23, 23, 23, 0.05)";
  context.fillRect(0, 0, width, height);
  for (let i = particlesArray.length - 1; i >= 0; i--) {
    particlesArray[i].show();
    particlesArray[i].bounceOnBorderColision();
    particlesArray[i].color = universalColor; //each particle has the same color
    particlesArray[i].update();
    if (particlesArray[i].finish()) {
      particlesArray.splice(i, 1);
    }
  }

  if (elapsed < 2000) { // Stop the animation after 2 seconds (elapsed < 2000)
    window.requestAnimationFrame(drawOnCanvas);
  }
}
window.requestAnimationFrame(drawOnCanvas);*/

window.setInterval(() => {
  context.fillStyle = "rgba(23, 23, 23, 0.05)";
  context.fillRect(0, 0, width, height);
  //ctx.globalCompositeOperation = "darken";
  for (let i = particlesArray.length - 1; i >= 0; i--) {
    particlesArray[i].show();
    particlesArray[i].bounceOnBorderColision();
    particlesArray[i].color = universalColor; //each particle has the same color
    particlesArray[i].update();
    if (particlesArray[i].finish()) {
      particlesArray.splice(i, 1);
    }
  }
}, 1);/**/

//Autospawn
window.setInterval(() => {
  if (particlesArray.length < 15) {
    particlesArray.push(new Particle(width / 2, height / 2, 5, universalColor));
  }
}, 100);

//Increase the hue change and lower the interval's time for rainbow mode
window.setInterval(() => {
  universalColor = "hsl(" + hue + ", 50%, 50%)";
  hue++; //hue+=10;

  //Random hue increase for uneven progress
  //hue+=~~random(1, 50); //~~ is faster than of Math.floor()
  if (hue > 359) {
    hue = 0;
  }
}, 100); //10

//Autospawn
window.setInterval(() => {
  if (particlesArray.length < 1) {
    particlesArray.push(
      new Particle(width / 2, height / 2, 5, universalColor)
    );
  }
}, 800);

/*************
  Functions
*************/
function random(min, max) {
  return min + Math.random() * (max - min + 1);
}

/*************
  Event listeners
*************/
//Automatically adjust the size of the canvas
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

window.addEventListener("keydown", function (event) {
  //Create new particles by pressing the space bar
  if (event.key == " ") {
    particlesArray.push(
      new Particle(mouseX, mouseY, 5, universalColor, ~~random(100, 1000))
    );
  }
  //Delete all particles
  if (event.key == "q") {
    particlesArray = [];
  }
  if (event.key == "c") {
    context.fillStyle = "rgba(23, 23, 23, 1)";
    context.fillRect(0, 0, width, height);
  }
});

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

/*************
 Compatibility
*************/

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

// Add something so that each particle has its own hue that modifies like the others // Delayed hue?
//Find a way to remove bg dirtiness and keep the trails
//add requestAnimationFrame()

// Circular motion and smooth mouse following with drag https://www.youtube.com/watch?v=raXW5J1Te7Y

//http://javascript.info/js-animation#using-requestanimationframe
//https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame for firefox https://robert.ocallahan.org/2010/08/mozrequestanimationframe_14.html
//https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp (if needed)

// function createDot(X, Y, radius, color) {
//   // context.beginPath();
//   // context.fillStyle = color;
//   // context.arc(X, Y, radius, 0, 2 * Math.PI);
//   // context.closePath();
//   // context.fill();
//   context.beginPath();
//   context.strokeStyle = color;
//   context.lineWidth = radius;
//   context.moveTo();
//   context.lineTo();
//   context.stroke();
//   context.closePath();
// }

// Screen is black but clear screen makes it gray - check implementation notes

