let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let width, height;
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;

let numberOfParticles = 250; //Math.ceil(random(1, 200));
let particles = [];

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

function random(min, max) {
  return min + Math.random() * (max - min + 1);
}

class Particle {
  constructor() {
    this.radius = 5;
    this.lifetime = Math.ceil(random(1000, 5000));

    this.x = width / 2; //random(0 + this.radius, width - this.radius);
    this.y = height / 2; //random(0 + this.radius, height - this.radius);

    //Double Tilde ~~a and Bitwise OR (a | 0) are faster ways to write Math.floor(a)
    this.randomColor = '#' + ((Math.random() * 16777215) | 0).toString(16);

    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  show() {
    context.beginPath();
    context.fillStyle = this.randomColor;
    // After setting the fill style, draw an arc on the canvas
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.lifetime--;
  }

  bounceOnBorderColision() {
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.speedX = -this.speedX;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.speedY = -this.speedY;
    }
  }
  /*
  colisionDetection(){
    let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
    let distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
    let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
    let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
    if (speed < 0){
      break;
    }
   obj1.vx -= (speed * vCollisionNorm.x);
   obj1.vy -= (speed * vCollisionNorm.y);
   obj2.vx += (speed * vCollisionNorm.x);
   obj2.vy += (speed * vCollisionNorm.y);
  };

  //pt x
  if((this.x + vt - (q + u))*(this.x + vt - (q + ut)) == 4r*r){

  }

  //pt y
  if((this.y + vt - (this.y + u))*(p + vt - (this.y + u)) == 4r*r){

  }

  if((p + vt - (q + ut))*(p + vt - (q + ut)) = 4r*r){

  }
  
  */
  deleteParticle() {
    return this.lifetime < 0;
  }
}

let displayParticles = window.setInterval(() => {
  //updating the display, the alpha value enables the particle to have a trail
  context.globalCompositeOperation = 'source-over';
  context.fillStyle = 'rgba(25, 25, 25, 0.3)';
  context.fillRect(0, 0, width, height);
  context.globalCompositeOperation = 'screen';

  if (particles.length < numberOfParticles) {
    particles.push(new Particle());
    // for (let i = 0; i < 5; i++) {
    //   particles.push(new Particle());
    // }
    //console.log('Particle spawned!  ツ ¯\\_(ツ)_/¯');
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].show();
    particles[i].bounceOnBorderColision();
    particles[i].update();

    if (particles[i].deleteParticle()) {
      particles.splice(i, 1);
    }
  }
}, 1);

window.addEventListener('keydown', function (event) {
  if (event.key == ' ') {
    particles.push(new Particle());
  }
  if (event.key == 'i') {
    context.font = "30px Arial";
    context.fillText(particles.length + ' particles', 5, 25);
    // let numberOfparticlesDiv = document.createElement('div', );
    // numberOfparticlesDiv.style.position= 'absolute';
    // numberOfparticlesDiv.style.top= '0px';
    // numberOfparticlesDiv.style.left= '0px';
    // numberOfparticlesDiv.style.zIndex= '2';
    // numberOfparticlesDiv.innerHTML = particles.length + ' particles';
  }
});
// window.addEventListener('keydown', function (event) {
  
// });
/*
for(let i=0; i<numberOfParticles; i++){
  console.log(particles[i].lifetime);
}
console.log(particles.length);
window.clearInterval(displayParticles);
*/
/*
var keyEnum = { W_Key: 0, A_Key: 1, S_Key: 2, D_Key: 3, Spacebar_key: 4 };
var keyArray = new Array(5);

function onKeyDown() {
  // Detect which key was pressed
  if (key == ' ') keyArray[keyEnum.Spacebar_key] = true;
  // Repeat for each key you care about...
}

function onKeyUp() {
  // Detect which key was released
  if (key == ' ') keyArray[keyEnum.Spacebar_key] = false;
  // Repeat for each key you care about...
}

function isKeyDown(key) {
  return keyArray[key];
}*/
// window.addEventListener("keydown", function(event) {
//  console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
//  if(event.key == ' '){
//    console.log('Space');
//  }
// });
