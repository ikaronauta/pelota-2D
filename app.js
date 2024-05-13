const esSmartphone = window.matchMedia("(max-width: 900px)").matches;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var mainTimeOut;
var lives = 3;

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

var backgroundImage = new Image();
backgroundImage.src = 'assets/images/space.jpg';

backgroundImage.onload = function () {
  if (esSmartphone) optionsMovile();
  else optionsPC();

  start();
};

function start(){
  mainTimeOut = setInterval(draw, 10);
}

function stop(){
  clearInterval(mainTimeOut);
}

function restart(divMensaje){
  document.location.reload();
} 