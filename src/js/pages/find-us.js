// ! Canvas
const canvasBg = function () {
  const canvas = document.getElementById('canvas1');

  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray;

  // get mouse position
  const mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 220) * (canvas.width / 220),
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  // create particle

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    // method to draw individual particle
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = '#1cca59';
      ctx.fill();
    }

    // check particle position, check mouse position, move the particle, draw the particle
    update() {
      // check if  particle is still within canvas
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // check collision detection - mouse position / particle position
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
          this.x += 10;
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 10;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
          this.y += 10;
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 10;
        }
      }

      // move particle
      this.x += this.directionX;
      this.y += this.directionY;

      // draw particle
      this.draw();
    }
  }

  // create particle array
  const init = function () {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 5 + 1;
      const x =
        Math.random() * (window.innerWidth - size * 2 - size * 2) + size * 2;
      const y =
        Math.random() * (window.innerHeight - size * 2 - size * 2) + size * 2;
      const directionX = Math.random() * 0.2;
      const directionY = Math.random() * 0.2;
      const color = '#1cca59';

      particlesArray.push(
        new Particle(x, y, directionX, directionY, size, color)
      );
    }
  };

  // check if particles are close enough to draw line between them

  const connect = function () {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = 0; b < particlesArray.length; b++) {
        const distance =
          (particlesArray[a].x - particlesArray[b].x) *
            (particlesArray[a].x - particlesArray[b].x) +
          (particlesArray[a].y - particlesArray[b].y) *
            (particlesArray[a].y - particlesArray[b].y);
        if (distance < ((canvas.width / 7) * canvas.height) / 7) {
          opacityValue = 1 - distance / 15000;
          ctx.strokeStyle = `rgba(28, 202, 89,${opacityValue})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  };

  // animation loop

  const animate = function () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
  };

  // resize event
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = (canvas.height / 220) * (canvas.width / 220);
    init();
  });

  // mouse out event
  window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  init();
  animate();
};
canvasBg();
