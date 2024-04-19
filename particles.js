/*  Variable */
//Constantele nu pot fi modificate
//In acest caz acestea sunt niste selectori al
//elementelor din Document-Object-Model (DOM)
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let mouseX, mouseY;
let particlesArray = [];
let hue = 0;
let universalColor = "hsl(0, 100, 50)";
let canvasColor = "rgba(253, 253, 253, 0.2)";
let toggle = false;
let stopId;
let width = canvas.width = window.innerWidth;      /* Setup dimensiune ecran */
let height = canvas.height = window.innerHeight;

/* Clasa unei particule */
class Particle {
  constructor(X, Y, radius, color, lifespan) {
    // Evita sub-pixel rendering pentru a face programul mai eficient
    this.x = Math.floor(X);
    this.y = Math.floor(Y);

    this.velocityX = Math.floor(random(-5, 5));
    this.velocityY = Math.floor(random(-5, 5));

    this.radius = radius;
    this.color = color;
    this.lifespan = lifespan;
  }
  show() { //compune particula
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
  update() { //actualizeaza pozitia particulei
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.lifespan > 0) {
      this.lifespan--;
    }
  }

  bounceOnBorderColision() {
    // Schimba directia de pe axele OX respectiv OY cand atinge marginea ecranului
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.velocityX = -this.velocityX;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.velocityY = -this.velocityY;
    }
  }
  finish() {
    return this.lifespan <= 0;
  }

  //Nu este nevoie de un destructor, memoria este gestionata automat
}

/*  Rendering */
function render(){
  context.fillStyle = canvasColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = particlesArray.length - 1; i >= 0; i--) {
    particlesArray[i].show();                   //deseneaza particula
    particlesArray[i].bounceOnBorderColision(); //verifica coliziunile
    particlesArray[i].update();                 // modifica pozitia
    if (particlesArray[i].finish()) {           //sterge particula
      // Array-ul / Vectorul de particule este parcurs invers
      //pentru a evita problemele generate de metoda de mai jos.
      particlesArray.splice(i, 1);
    }
  }
  // requestAnimationFrame() este functionalitatea noua adaugata
  // care optimizeaza procesarea grafica prin folosirea hardware-ului
  stopId = window.requestAnimationFrame(render);
}

//Schimba cromatica continuu, obtinandu-se o gama larga de culori
window.setInterval(() => {
  //aceasta este o functie sageata (arrow function) care nu are nume
  universalColor = "hsl(" + hue + ", 100%, 50%)";
  hue+=10;
  if (hue > 359) {
    hue = 0;
  }
}, 600);

//Auto-genereaza particule
window.setInterval(() => {
  if (particlesArray.length < 15) {
    particlesArray.push(
      // Operatorul pe biti de dubla negatie "~~" taie zecimalele mai repede decat Math.floor()
      new Particle(canvas.width / 2, canvas.height / 2, 5, universalColor, ~~random(100, 1000))
    );
  }
}, 600);

/*  Functii */
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
// Reajusteaza dimensiunea ecranului automat
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("keydown", function (event) {
  //Genereaza particule noi atunci cand tasta space este apasata
  if (event.key == " ") {
    particlesArray.push(
      new Particle(mouseX, mouseY, 5, universalColor, ~~random(100, 1000))
    );
  }
  //Sterge toate particulele si reinitializeaza culoarea ecranului
  if (event.key == "q") {
    particlesArray = [];
    context.fillStyle = "rgba(253, 253, 253, 1)";
    context.fillRect(0, 0, width, height);
  }
  if (event.key == "c") {
    toggleAnimation();
  }
});

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

/* Setari pentru compatibilitate */
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
