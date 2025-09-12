// Tu configuración de Firebase para pelota2D
const firebaseConfig = {
  apiKey: "AIzaSyCl9fZE_y6LuJ_eO6PgSJ7cHRx4RF-rY6c",
  authDomain: "pelota2d.firebaseapp.com",
  projectId: "pelota2d",
  storageBucket: "pelota2d.appspot.com",
  messagingSenderId: "879501955863", // Reemplaza con tu ID de remitente
  appId: "1:879501955863:web:6915db3de05f4475739d52",
  measurementId: "G-4N430R4W3H"
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function createUser(objDataUser) {
  alertFullScrean(`⏳ Loading game. Please wait !!!`, 'silver', null);

  return auth.createUserWithEmailAndPassword(objDataUser.email, objDataUser.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Sesión iniciada con:", user.email);
      document.getElementById('alertFullScrean').remove();
      return user;
    })
    .catch((error) => {
      document.getElementById('alertFullScrean').remove();
      console.log(error);
      throw error;
    });
}

function loginUser(objDataUser) {

  alertFullScrean(`⏳ Loading game. Please wait !!!`, 'silver', null);

  return auth.signInWithEmailAndPassword(objDataUser.email, objDataUser.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Sesión iniciada con:", user.email);
      document.getElementById('alertFullScrean').remove();
      return user;
    })
    .catch((error) => {
      document.getElementById('alertFullScrean').remove();
      console.log(error);
      throw error;
    });
}


// Cerrar sesión
function logoutUser() {
  auth.signOut();
}