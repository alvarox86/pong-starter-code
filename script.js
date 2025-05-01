// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

const ball = {
  x: 30, //Posicion eje X
  y: 30, //Posicion eje Y
  w: 20, //Ancho de la bola
  h: 20, //Altura de la bola
  speed: 5,
  isMovingRight: true,
  isMovingDown: true,
};

const paddle = {
    x:200,
    y:550,
    w:100,
    h:20,
    speed:20
}

// *** Game Functions ***

function moveBall() {
  if (ball.isMovingRight === true) {
    ball.x += ball.speed;
    ballNode.style.left = `${ball.x}px`;
  } else{
    ball.x -= ball.speed;
    ballNode.style.left = `${ball.x}px`;
  }

  if(ball.isMovingDown === true){
    ball.y += ball.speed;
    ballNode.style.top = `${ball.y}px`;
  }else{
    ball.y -= ball.speed;
    ballNode.style.top = `${ball.y}px`;
  }
}

function checkBallCollisionWall() {
  if(ball.x > (gameBoxNode.offsetWidth - ball.w)){
    ball.isMovingRight = false
  }

  if(ball.y > (gameBoxNode.offsetHeight - ball.h)){
    //ball.isMovingDown = false
    gameOver();
  }

  if (ball.x <= 0 ){
    ball.isMovingRight = true
  }

  if (ball.y <= 0 ){
    ball.isMovingDown = true
  }
}

function gameOver(){
    clearInterval(gameInterval)
    alert("JJAJAJJAJAJAJAJA HAS PERDIDO FRIKI")
}

function checkPaddleCollisionBall(){
    if (
        ball.x < paddle.x + paddle.w &&
        ball.x + ball.w > paddle.x &&
        ball.y < paddle.y + paddle.h &&
        ball.y + ball.h > paddle.y
      ) {
        // Collision detected!
        ball.isMovingDown = false
      } 
}

function gameLoop() {
  moveBall();
  checkBallCollisionWall();
  checkPaddleCollisionBall()
}

// *** Game Loop Interval ***

let gameInterval = setInterval(() => {
  gameLoop();
}, 1000 / 60);

// *** Event Listeners ***

document.addEventListener("keydown", () =>{
    if(event.key === "a"){
        console.log("a")
        paddle.x -= paddle.speed
        paddleNode.style.left = `${paddle.x}px`
    }else if(event.key === "d"){
        console.log("d")
        paddle.x += paddle.speed
        paddleNode.style.left = `${paddle.x}px`
    }
})