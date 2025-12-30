import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { auth } from "./firebase.js";

window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      error.textContent = err.message;
    });
};

