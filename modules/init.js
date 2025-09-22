const mounthDay = `${new Date().getMonth() + 1}${new Date().getDate()}`;

function init() {
  auth.onAuthStateChanged((user) => {
    document.getElementById('loading').style.display = 'none';
    if (user) {
      if (user.emailVerified) {

        if (document.getElementById('containerLogin'))
          document.getElementById('containerLogin').style.display = 'none';

        if (document.getElementById('containerSingUp'))
          document.getElementById('containerSingUp').style.display = 'none';

        // ✅ Usuario autenticado en Firebase
        if (esSmartphone) optionsMovile();
        else optionsPC();

        alertFullScrean(`Stage ${data.stage}`, 'silver', timer());
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        document.getElementById('myCanvas').style.display = 'block';
        document.querySelector('body').appendChild(gameControl());

        return textoEnlace();
      } else {
        alertFullScrean(`📨 Verification email sent to ${user.email}`, '#2196F3', play('assets/images/play.svg'));
        logoutUser();
      }
    } else {
      // Usuario no logueado o se cerró la sesión
      console.log("No hay usuario logueado");

      document.querySelector('body').appendChild(showlogin());

      //textoEnlace();
    }
  });
}

function showlogin() {
  let tittleLogin = document.createElement('h3');
  tittleLogin.innerText = 'Login';

  let inputEmail = document.createElement('input');

  inputEmail.type = 'email';
  inputEmail.classList = 'inputLogin';
  inputEmail.name = 'email';
  inputEmail.id = 'email';
  inputEmail.placeholder = 'Email';

  let inputPassword = document.createElement('input');

  inputPassword.type = 'password';
  inputPassword.classList = 'inputLogin';
  inputPassword.name = 'password';
  inputPassword.id = 'password';
  inputPassword.placeholder = 'Password';

  let start = document.createElement('button');

  start.classList = 'butonLogin';
  start.textContent = 'Start';
  start.id = 'bStart';

  start.addEventListener('click', function () {

    if (document.getElementById('email').value == '')
      return alertFullScrean('⚠️ Email is empty !!!', 'rgb(192, 134, 47, 1)', play('assets/images/back.png'));
    else if (document.getElementById('password').value == '')
      return alertFullScrean('⚠️ Password is empty !!!', 'rgb(192, 134, 47, 1)', play('assets/images/back.png'));

    loginUser({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
      .then(function (user) {
        console.log(user);
      })
      .catch(function (error) {
        alertFullScrean(`💀 ${error.code} !!!`, 'rgb(170, 72, 72)', play('assets/images/play.svg'));
      });
  });

  let singUp = document.createElement('button');

  singUp.classList = 'butonLogin';
  singUp.textContent = 'SingUp';
  singUp.id = 'bSingUp';

  singUp.addEventListener('click', function () {

    document.getElementById('containerLogin').style.display = 'none';
    document.querySelector('body').appendChild(showCreateUser());
  });

  let resetPass = document.createElement('p');

  resetPass.classList = 'resetPass';
  resetPass.id = 'resetPass';
  resetPass.innerHTML = 'Forgote my password'

  resetPass.addEventListener('click', function() {
    resetPassword(document.getElementById('email').value);
  });

  let containerLogin = document.createElement('div');

  containerLogin.classList = 'containerLogin';
  containerLogin.id = 'containerLogin';

  containerLogin.appendChild(tittleLogin);
  containerLogin.appendChild(inputEmail);
  containerLogin.appendChild(inputPassword);
  containerLogin.appendChild(start);
  containerLogin.appendChild(singUp);
  containerLogin.appendChild(resetPass);

  return containerLogin;
}

function showCreateUser() {
  let tittleSingUp = document.createElement('h3');
  tittleSingUp.innerText = 'SingUp';

  let inputEmail = document.createElement('input');

  inputEmail.type = 'email';
  inputEmail.classList = 'inputSingUp';
  inputEmail.name = 'email';
  inputEmail.id = 'emailSingUp';
  inputEmail.placeholder = 'Email';

  let inputPassword1 = document.createElement('input');

  inputPassword1.type = 'password';
  inputPassword1.classList = 'inputSingUp';
  inputPassword1.name = 'password1';
  inputPassword1.id = 'password1';
  inputPassword1.placeholder = 'Password';

  let inputPassword2 = document.createElement('input');

  inputPassword2.type = 'password';
  inputPassword2.classList = 'inputSingUp';
  inputPassword2.name = 'password2';
  inputPassword2.id = 'password2';
  inputPassword2.placeholder = 'Repeat Password';

  let singUp = document.createElement('button');

  singUp.classList = 'butonLogin';
  singUp.textContent = 'SingUp';
  singUp.id = 'bSingUp';

  singUp.addEventListener('click', function () {

    let emailSingUp = document.getElementById('emailSingUp').value;
    let pass1 = document.getElementById('password1').value;
    let pass2 = document.getElementById('password2').value;

    if (emailSingUp == '') {
      return alert('Sin Correo');
    } else if (pass1 != pass2) {
      return alert('Contraseñas diferentes');
    } else {
      createUser({
        email: document.getElementById('emailSingUp').value,
        password: document.getElementById('password1').value
      })
        .then(function (user) {
          console.log(user);
        })
        .catch(function (error) {
          alertFullScrean(`💀 ${error.code} !!!`, 'rgb(170, 72, 72)', play('assets/images/play.svg'));
        });
    }
  });

  let containerSingUp = document.createElement('div');

  containerSingUp.classList = 'containerSingUp';
  containerSingUp.id = 'containerSingUp';

  containerSingUp.appendChild(tittleSingUp);
  containerSingUp.appendChild(inputEmail);
  containerSingUp.appendChild(inputPassword1);
  containerSingUp.appendChild(inputPassword2);
  containerSingUp.appendChild(singUp);

  return containerSingUp;
}

function gameControl() {

  let buttonPlay = document.createElement('img');

  buttonPlay.id = 'buttonPlay';
  buttonPlay.classList = 'buttonPlay';
  buttonPlay.alt = 'Play';
  buttonPlay.src = 'assets/images/play.png';

  buttonPlay.addEventListener('click', function () {
    start();
  });

  let buttonPause = document.createElement('img');

  buttonPause.id = 'buttonPause';
  buttonPause.classList = 'buttonPause';
  buttonPause.alt = 'Pause';
  buttonPause.src = 'assets/images/pause.png';

  buttonPause.addEventListener('click', function () {
    stop();
  });

  let buttonLogOut = document.createElement('img');

  buttonLogOut.id = 'buttonLogOut';
  buttonLogOut.classList = 'buttonLogOut';
  buttonLogOut.alt = 'LogOut';
  buttonLogOut.src = 'assets/images/off.png';

  buttonLogOut.addEventListener('click', function () {
    if (document.getElementById('containerLogin'))
      document.getElementById('containerLogin').style.display = 'none';

    if (document.getElementById('containerSingUp'))
      document.getElementById('containerSingUp').style.display = 'none';

    if (document.getElementById('myCanvas'))
      document.getElementById('myCanvas').style.display = 'none';

    if (document.getElementById('containerControl'))
      document.getElementById('containerControl').style.display = 'none';

    if (document.getElementById('controlers-container'))
      document.getElementById('controlers-container').style.display = 'none';

    if (document.getElementById('enlace'))
      document.getElementById('enlace').style.display = 'none';

    logoutUser();
    restart();
  })

  let containerControl = document.createElement('div');

  containerControl.classList = 'containerControl';
  containerControl.id = 'containerControl';

  containerControl.appendChild(buttonPlay);
  containerControl.appendChild(buttonPause);
  containerControl.appendChild(buttonLogOut);

  return containerControl;
}