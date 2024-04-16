// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x,y, velx, vely, color, size){
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.color = color;
    this.size = size;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
  }

  update() {
    // this.x = this.x + this.velx;
    // this.y = this.y + this.vely;

    if((this.x + this.size) >= width){
      this.velx = -(this.velx);
    }

    if((this.x - this.size) <= 0){
      this.velx = -(this.velx);
    }

    if((this.y + this.size) >= height){
      this.vely = -(this.vely);
    }

    if((this.y - this.size) <= 0){
      this.vely = -(this.vely);
    }

    this.x += this.velx;
    this.y += this.vely;
  }

  collisionDetect() {
    for(const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          // Calculate the angle between the two balls
          const angle = Math.atan2(dy, dx);

           // Calculate the direction of their velocities
           const thisvelX = this.speedX;
           const thisvelY = this.speedY;
           const ballvelX = ball.speedX;
           const ballvelY = ball.speedY;

           // Calculate the new velocities using elastic collision formula
           const new_thisvelX = (thisvelX * (this.mass - ball.mass) + (2 * ball.mass * ballvelX)) / (this.mass + ball.mass);
           const new_thisvelY = (thisvelY * (this.mass - ball.mass) + (2 * ball.mass * ballvelY)) / (this.mass + ball.mass);
           const new_ballvelX = (ballvelX * (ball.mass - this.mass) + (2 * this.mass * thisvelX)) / (this.mass + ball.mass);
           const new_ballvelY = (ballvelY * (ball.mass - this.mass) + (2 * this.mass * thisvelY)) / (this.mass + ball.mass);

           // Update the velocities of the balls
           this.speedX = new_thisvelX;
           this.speedY = new_thisvelY;
           ball.speedX = new_ballvelX;
           ball.speedY = new_ballvelY;
           
          // Move the balls slightly apart to avoid sticking together
          const overlap = this.size + ball.size - distance;
          this.x += Math.cos(angle) * overlap / 2;
          this.y += Math.sin(angle) * overlap / 2;
          ball.x -= Math.cos(angle) * overlap / 2;
          ball.y -= Math.sin(angle) * overlap / 2;
        }
      }
    }
  }

}

const balls = [];

while(balls.length < 100) {
  const size = random(1,50);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, width - size),
    random(-10,10),
    random(-10,10),
    randomRGB(),
    size,
  );

    balls.push(ball);
}

function loop () {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();