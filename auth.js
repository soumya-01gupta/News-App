import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
  import { getAuth,GoogleAuthProvider,signInWithPopup,signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDr45_q5lhuxfFRDzeT6h1XqtjNzWX_UD8",
    authDomain: "news-blast-a725d.firebaseapp.com",
    projectId: "news-blast-a725d",
    storageBucket: "news-blast-a725d.appspot.com",
    messagingSenderId: "939032460704",
    appId: "1:939032460704:web:71c349c01f7aab91a338c5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth  = getAuth(app);
  auth.languageCode = 'en';

  const provider = new GoogleAuthProvider();

  const googleLogin = document.getElementById("google-login-btn");


  googleLogin.addEventListener("click",function(){
    signInWithPopup(auth,provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href="index.html"

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
  });