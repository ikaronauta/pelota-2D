const objBackgroundStages = {
  1: '/assets/images/stage1.jpg',
  2: '/assets/images/stage2.jpg',
  3: '/assets/images/stage3.jpg',
  4: '/assets/images/stage4.jpg',
  5: '/assets/images/stage5.jpg',
  6: '/assets/images/stage6.jpg',
  7: '/assets/images/stage7.jpg',
  8: '/assets/images/stage8.jpg',
}

const messages = [
  "Try again! 🔄",
  "You can! 💪",
  "Keep going! 🏃‍♂️",
  "Don't worry! 🙂",
  "Almost there! ⏳",
  "Stay strong! 🦾",
  "Next time! 👉",
  "Keep trying! 🎯",
  "Don't stop! 🚫",
  "Keep pushing! 📈",
  "Stay focused! 🎯👀",
  "Believe yourself! 🌟",
  "One more! ➕",
  "Bounce back! 🦘",
  "Be persistent! 🔥",
  "Stay calm! 🧘",
  "You got this! ✅",
  "Never quit! 🚀",
  "Stay positive! ☀️",
  "Push forward! ⬆️"
];

let loading = document.createElement('div');
loading.innerText = '⏳ Loading....';
loading.classList = 'loading';
loading.id = 'loading';
document.querySelector('body').appendChild(loading);

var backgroundImage = new Image();
backgroundImage.src = objBackgroundStages.hasOwnProperty(data.stage) ? 
                      objBackgroundStages[data.stage] :
                      objBackgroundStages[0];

backgroundImage.onload = function () {  
  
  if(stagesRules.hasOwnProperty(data.stage)){
    stagesRules[data.stage].forEach(function(rule){
      eval(rule);
    });
  }
  
  init();
};

function start(){
  clearInterval(mainTimeOut);
  mainTimeOut = setInterval(draw, 11 - data.stage);
}

function stop(){
  clearInterval(mainTimeOut);
}

function restart(){
  document.location.reload();
} 

function play(rutaImaen){
  let play = document.createElement('img');
  play.className = 'play-game';
  play.src = rutaImaen;
  play.tabIndex = 0;
  
  play.addEventListener('click', function(){
    restart(this.parentElement);
  });

  document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      play.click();
    }
});

  return play;
}

function timer(){
  let count = 3;
  containerTimer = document.createElement('p');
  containerTimer.id = 'timer';
  containerTimer.textContent = count;
  containerTimer.style.fontFamily = 'arcade';
  
  timerInit = setInterval(() => {
    count--;

    if(count == 0) {
      containerTimer.textContent = 'GO !!!'
      clearInterval(timerInit);
      document.getElementById('alertFullScrean').remove();

      start();
      return;
    }

    containerTimer.textContent = count;
  }, 1000);

  return containerTimer;
}

function allBricksBreacked(){
  let countBricksNoBreacked = 0;

  bricks.forEach(function(row){
    row.forEach(function(brick){
      if(brick.status > 0) countBricksNoBreacked++;
    });
  });

  return countBricksNoBreacked == 0 ? true : false;
}