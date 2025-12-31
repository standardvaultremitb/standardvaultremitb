import { auth, db } from "firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ===============================
   AUTH STATE LISTENER
   =============================== */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      console.error("User document not found");
      return;
    }

    const data = snap.data();

    // Greeting
    const hour = new Date().getHours();
    let greet = "Good evening";
    if (hour < 12) greet = "Good morning";
    else if (hour < 18) greet = "Good afternoon";

    document.getElementById("welcome").innerText =
      `${greet}, ${data.firstName}`;

    // Balances
    document.getElementById("accountBalance").innerText =
      `$${Number(data.balance).toLocaleString()}`;

    document.getElementById("ledgerBalance").innerText =
      `$${Number(data.balance).toLocaleString()}`;

    // Profile modal fields
    document.getElementById("pName").innerText =
      `${data.firstName} ${data.lastName}`;
    document.getElementById("pEmail").innerText = data.email;
    document.getElementById("pCountry").innerText = "USA";
    document.getElementById("pOccupation").innerText =
      "Orthopedic Surgeon – US Army";

  } catch (error) {
    console.error("Dashboard error:", error);
  }
});

import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

