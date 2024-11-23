var leftPaddle = {
  x: 30,
  y: 100,
  height: 100,
  width: 10,
  score: 0
}

var rightPaddle = {
  x: 450,
  y: 100,
  height: 100,
  width: 10,
  score: 0
}

class pongBall {
  constructor(x,y,diameter) {
      this.x = x;
      this.y = y;
      this.diameter = diameter;
      this.direction = 1;

      this.xspeed = random(-3,3);
      this.yspeed = random(-3,3);
  }
  
  display() {
      fill("white")
      circle(this.x,this.y,this.diameter)
  }
  
  update() {
      this.x += this.xspeed;
      this.y += this.yspeed;
      
      // right side
      if (this.x > width) {
          console.log("Left paddle scored");
          rightPaddle.score += 1;
          this.resetBall();
      };
      
      // left side
      if (this.x < 0) {
          console.log("Right paddle scored");
          leftPaddle.score += 1;
          this.resetBall();
      }
      
      if (this.y > height) {
          this.yspeed = -3
      };
      
      if (this.y < 0) {
          this.yspeed = 3
      }
  }

  resetBall() {
    this.x = width/2;
    this.y = height/2;
    this.xspeed = random(-1,3);
    this.yspeed = random(-1,3);
  }

  collideLeft() {
    return (this.x >= leftPaddle.x && this.x <= leftPaddle.x + leftPaddle.width && this.y >= leftPaddle.y && this.y <= leftPaddle.y + leftPaddle.height);
  }

  collideRight() {
    return (this.x >= rightPaddle.x && this.x <= rightPaddle.x + rightPaddle.width && this.y >= rightPaddle.y && this.y <= rightPaddle.y + leftPaddle.height)
  }

}

function setup() {
  createCanvas(500,350);
  ball = new pongBall(250,175,20);
}

function preload() {
  font = loadFont('ARCADECLASSIC.TTF')
}

function draw() {

  background(80);
  textFont(font);
  textSize(100);
  noStroke();
  fill(95);

  textAlign(RIGHT, TOP);
  text(rightPaddle.score, width/2 - 50, 10);

  textAlign(LEFT);
  text(leftPaddle.score, width/2 + 50, 10);

  // left paddle
  fill("white");
  noStroke();
  rect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  
  // right paddle
  fill("white");
  noStroke();
  rect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
  
  LeftPaddleInput();
  RightPaddleInput();
  pongBallUpdateNStuff();

  // dashed line in the middle
  stroke(0);
  strokeWeight(5);
  drawingContext.setLineDash([20, 20]);
  line(width/2, 3, width/2, height);
}

function pongBallUpdateNStuff() {
  ball.display();
  ball.update();

  if (ball.collideLeft()) {
    ball.xspeed *= -1;
    ball.yspeed *= -1;
  }

  if (ball.collideRight()) {
    ball.xspeed *= -1;
    ball.yspeed *= -1;
  }
}

function RightPaddleInput() {
  if (keyIsDown(38) && rightPaddle.y > 0) {
      rightPaddle.y -= 5;
  }
  
  if (keyIsDown(40) && rightPaddle.y < 350 - rightPaddle.height) {
      rightPaddle.y += 5;
  }
}

function LeftPaddleInput() {
  if (keyIsDown(87) && leftPaddle.y > 0) {
      leftPaddle.y -= 5;
  }
  
  if (keyIsDown(83) && leftPaddle.y < 350 - leftPaddle.height) {
      leftPaddle.y += 5;
  }
}

function keyTyped() {
  if (key === 'r') {
    ball.resetBall();
  }
}