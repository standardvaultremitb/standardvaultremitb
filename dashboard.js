
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db } from "./firebase.js";

console.log("Dashboard JS loaded");

onAuthStateChanged(auth, async (user) => {
  console.log("Auth state:", user);

  if (!user) {
    console.log("No user, redirecting");
    window.location.href = "index.html";
    return;
  }

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  console.log("Firestore snapshot exists:", snap.exists());

  if (!snap.exists()) {
    alert("User profile not found in database.");
    return;
  }

  const data = snap.data();
  console.log("User data:", data);

  document.body.style.background = "#f4f6f8"; // force visible background

  document.getElementById("welcome").textContent =
    `Welcome, ${data.firstName}`;

  document.getElementById("accountBalance").textContent =
    `$${data.balance.toLocaleString()}`;

  document.getElementById("ledgerBalance").textContent =
    `$${data.ledger.toLocaleString()}`;

  document.getElementById("profilePic").src = data.photo;
  document.getElementById("fullName").textContent = data.fullName;
  document.getElementById("email").textContent = data.email;
});
