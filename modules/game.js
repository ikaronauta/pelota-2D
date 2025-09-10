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
      if (b.status > 0) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status--;
          score++;
          data.score = score;
          if (allBricksBreacked()) {
            //alert("YOU WIN, CONGRATULATIONS!");
            //document.location.reload();
            clearInterval(mainTimeOut);
            alertFullScrean('You Win', 'rgb(72, 159, 170)', play('assets/images/play.svg'));
            data.stage++;
            localStorage.setItem('pelota2D', JSON.stringify(data));
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px arcade";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + data.score, 8, 20);
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
      if (bricks[c][r].status > 0) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = `#8B4513${brickScalaColor[bricks[c][r].status]}`;
        ctx.fill();
        ctx.lineWidth = 0.5; 
        ctx.strokeStyle = "#fff"; 
        ctx.stroke();
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
        alertFullScrean(`💀 Game Over ${JSON.parse(localStorage.getItem('pelota2D')).user} !!!`, 'rgb(170, 72, 72)', play('assets/images/play.svg'));
        data.stage = 1;
        data.score = 0;
        localStorage.setItem('pelota2D', JSON.stringify(data));
      } else {

        stop();
        alertFullScrean(messages[Math.floor(Math.random() * messages.length -1)], 'silver', timer());

        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = numAle % 2 == 0 ? 2.2 : -2.2;
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

function alertFullScrean(mensaje, color, button) {
  let container = document.createElement('div');
  container.id = 'alertFullScrean';
  container.className = 'container-final';
  container.style.backgroundColor = color;

  let p = document.createElement('p');
  p.innerHTML = mensaje;
  p.style.fontSize = esSmartphone ? '2.5rem' : '5rem';

  container.appendChild(p);
  container.appendChild(button);

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

function textoEnlace(){
  let enlace = document.createElement('a');
  enlace.className = esSmartphone ? 'enlace movile' : 'enlace pc';
  enlace.innerHTML = 'www.julianandresortiz.com';
  enlace.href = 'https://julianandresortiz.com/';
  enlace.target = '_blank';

  document.querySelector('body').appendChild(enlace);
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

  izquierda.addEventListener("touchstart", function(e){
    e.preventDefault();
    leftPressed = true;
    rightPressed = false;

    izquierda.classList.add('active');
  });

  izquierda.addEventListener("touchend", function(e){
    e.preventDefault();
    leftPressed = false;
    rightPressed = false;

    izquierda.classList.remove('active');
  });

  derecha.addEventListener("touchstart", function(e){
    e.preventDefault();
    rightPressed = true;
    leftPressed = false;

    derecha.classList.add('active');
  });

  derecha.addEventListener("touchend", function(e){
    e.preventDefault();
    rightPressed = false;
    leftPressed = false;

    derecha.classList.remove('active');
  });
}

