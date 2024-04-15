/**************
  Variables
************/
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let mouseX, mouseY;
let particlesArray = [];
let hue = 0;
let universalColor = "hsl(0, 100, 50)";
let canvasColor = "rgba(253, 253, 253, 0.05)";
let toggle = false;
let stopId;

/*************
  Setup
*************/
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;

/*************
  Particle class
*************/
class Particle {
  constructor(X, Y, radius, color, lifespan) {
    this.x = Math.floor(X);
    this.y = Math.floor(Y);

    this.velocityX = Math.floor(random(-5, 5));
    this.velocityY = Math.floor(random(-5, 5));

    this.radius = radius;
    this.color = color;
    this.lifespan = lifespan;
  }
  show() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
  update() {
    this.lastPoint = { x: this.x, y: this.y };
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.lifespan > 0) {
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
*************/
function render(){
  context.fillStyle = canvasColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  //ctx.globalCompositeOperation = "source-over";
  for (let i = particlesArray.length - 1; i >= 0; i--) {
    particlesArray[i].show();
    particlesArray[i].bounceOnBorderColision();
    //particlesArray[i].color = universalColor; //each particle has the same color
    particlesArray[i].update();
    if (particlesArray[i].finish()) {
      particlesArray.splice(i, 1);
    }
  }
  stopId = window.requestAnimationFrame(render);
}

//Increase the hue change and lower the interval's time for rainbow mode
window.setInterval(() => {
  universalColor = "hsl(" + hue + ", 100%, 50%)";
  hue+=10;
  if (hue > 359) {
    hue = 0;
  }
}, 600); //10

//Autospawn
window.setInterval(() => {
  if (particlesArray.length < 15) {
    particlesArray.push(
      new Particle(canvas.width / 2, canvas.height / 2, 5, universalColor)
    );
  }
}, 600);

/*************
  Functions
*************/
function random(min, max) {
  return min + Math.random() * (max - min + 1);
}

function toggleAnimation() {
  if (!toggle) {
    toggle = true;
    window.requestAnimationFrame(render);
  } else {
    toggle = false;
    cancelAnimationFrame(stopId);
  }
}

/*************
  Event listeners
*************/
//Automatically adjust the size of the canvas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
    //context.fillStyle = "rgba(253, 253, 253, 1)";
    //context.fillRect(0, 0, width, height);
    toggleAnimation();
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

