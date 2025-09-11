const esSmartphone = window.matchMedia("(max-width: 900px)").matches;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = numAle % 2 == 0 ? 2.2 : -2.2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 2;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var mainTimeOut, timerInit;
var lives = 5;
var containerTimer;
var data = {"stage": 1, "score": 0, "user": "default"};
var numAle = Math.floor(Math.random() * 10);
var brickScalaColor = {
  3: '',
  2: '80',
  1: '20'
}

const stagesRules = {
  1: [
    'bricks[0][2].status = 0',
    'bricks[4][2].status = 0'
  ],
  2: [
    'bricks[1][2].status = 0',
    'bricks[3][2].status = 0'
  ],
  3 : [
    'bricks[1][1].status = 0',
    'bricks[3][1].status = 0'
  ],
  4 : [
    'bricks[0][0].status = 0',
    'bricks[0][3].status = 0',
    'bricks[1][1].status = 0',
    'bricks[2][2].status = 0',
    'bricks[3][1].status = 0',
    'bricks[4][0].status = 0',
    'bricks[4][3].status = 0'
  ]
}

const stagesFiles = {
  1: [3,5],
  2: [3,5],
  3: [3,5],
  4: [4,5],
}

if (localStorage.getItem(`pelota2D-${mounthDay}`)) {
  data = JSON.parse(localStorage.getItem(`pelota2D-${mounthDay}`));
  score = data.score;
} else {
  localStorage.setItem(`pelota2D-${mounthDay}`, JSON.stringify(data));
}

if(stagesFiles.hasOwnProperty(data.stage)){
  brickRowCount = stagesFiles[data.stage][0];
  brickColumnCount = stagesFiles[data.stage][1];
}

let bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 3 };
  }
}