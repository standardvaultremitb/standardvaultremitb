import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db } from "./firebase.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return;

  const data = snap.data();

  const hour = new Date().getHours();
  const greet =
    hour < 12 ? "Good Morning" :
    hour < 17 ? "Good Afternoon" :
    "Good Evening";

  document.getElementById("welcome").textContent =
    `${greet}, ${data.firstName}`;

  document.getElementById("accountBalance").textContent =
    `$${data.balance.toLocaleString()}`;

  document.getElementById("ledgerBalance").textContent =
    `$${data.ledger.toLocaleString()}`;

  document.getElementById("profilePic").src = data.photo;
  document.getElementById("fullName").textContent = data.fullName;
  document.getElementById("email").textContent = data.email;
});

window.lockedTransfer = () =>
  alert("🔐 Account locked.\nContact support.");

window.openProfile = () =>
  document.getElementById("profileModal").style.display = "block";

window.closeProfile = () =>
  document.getElementById("profileModal").style.display = "none";

