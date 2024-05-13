function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            //alert("YOU WIN, CONGRATULATIONS!");
            //document.location.reload();
            clearInterval(mainTimeOut);
            mensajeFinal('You Win!');
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px arcade";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px arcade";
  ctx.fillStyle = "#fff";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FF9800";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#B0B0B0";
  ctx.fill();
  ctx.closePath(); canvas.width
}

function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#8B4513";
        ctx.fill();
        ctx.lineWidth = 0.5; // Ancho del borde
        ctx.strokeStyle = "#fff"; // Color del borde (negro)
        ctx.stroke(); // Dibujar el borde
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  drawBall();
  drawBricks();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawLives();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if (!lives) {
        //alert("GAME OVER");
        clearInterval(mainTimeOut);
        //document.location.reload();
        mensajeFinal('Game Over');
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;

}

function mensajeFinal(mensaje) {
  let container = document.createElement('div');
  container.className = 'container-final';

  let p = document.createElement('p');
  p.innerHTML = mensaje;

  let play = document.createElement('img');
  play.className = 'play-game';
  play.src = 'assets/images/play.svg';
  
  play.addEventListener('click', function(){
    restart(this.parentElement);
  });

  container.appendChild(p);
  container.appendChild(play);

  document.querySelector('body').appendChild(container);

  setTimeout(function () {
    container.classList.add('show');
  }, 100);
}

function optionsPC() {
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);
}

function optionsMovile() {
  let controlersContainer = document.createElement('div');
  controlersContainer.className = 'controlers-container';

  let izquierda = document.createElement('img');
  izquierda.src = 'assets/images/izquierda.svg';
  izquierda.className = 'control';

  let derecha = document.createElement('img');
  derecha.src = 'assets/images/derecha.svg';
  derecha.className = 'control';
  
  controlersContainer.appendChild(izquierda);
  controlersContainer.appendChild(derecha);

  document.querySelector('body').appendChild(controlersContainer);

  izquierda.addEventListener("touchstart", function(){
    leftPressed = true;
    rightPressed = false;

    izquierda.classList.add('active');
  });

  izquierda.addEventListener("touchend", function(){
    leftPressed = false;
    rightPressed = false;

    izquierda.classList.remove('active');
  });

  derecha.addEventListener("touchstart", function(){
    rightPressed = true;
    leftPressed = false;

    derecha.classList.add('active');
  });

  derecha.addEventListener("touchend", function(){
    rightPressed = false;
    leftPressed = false;

    derecha.classList.remove('active');
  });
}

