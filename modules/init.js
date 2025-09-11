const mounthDay = `${new Date().getMonth()}${new Date().getDate()}`;

function init() {
  if (localStorage.getItem(`pelota2D-${mounthDay}`) && 
      (JSON.parse(localStorage.getItem(`pelota2D-${mounthDay}`)).stage > 1 || 
        JSON.parse(localStorage.getItem(`pelota2D-${mounthDay}`)).user != 'default')) {
    alertFullScrean(`Stage ${data.stage}`, 'silver', timer());
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    document.getElementById('myCanvas').style.display = 'block';
    textoEnlace();
    return;
  }

  let input = document.createElement('input');

  input.classList = 'user';
  input.name = 'user';
  input.id = 'user';
  input.placeholder = 'Username';

  let start = document.createElement('button');

  start.classList = 'bStart';
  start.textContent = 'Start';
  start.id = 'bStart';
  start.addEventListener('click', function () {

    if (document.getElementById('user').value == '')
      return alertFullScrean('⚠️ Username is empty !!!', 'rgb(192, 134, 47, 1)', play('assets/images/back.png'));

    alertFullScrean(`Stage ${data.stage}`, 'silver', timer());
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    document.getElementById('user').style.display = 'none';
    document.getElementById('bStart').style.display = 'none';
    document.getElementById('myCanvas').style.display = 'block';

    textoEnlace();

    data = JSON.parse(localStorage.getItem(`pelota2D-${mounthDay}`))
    data.user = document.getElementById('user').value;

    localStorage.setItem(`pelota2D-${mounthDay}`, JSON.stringify(data));
  });

  document.querySelector('body').appendChild(input);
  document.querySelector('body').appendChild(start);
}