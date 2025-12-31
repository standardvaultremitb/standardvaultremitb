import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    alert("User record not found");
    return;
  }

  const data = snap.data();

  /* GREETING */
    const hour = new Date().getHours();
    let greeting = "Good evening";
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";

    document.getElementById("welcome").textContent =
      `${greeting}, ${data.fullName}`;

  /* BALANCES */
  document.getElementById("accountBalance").innerText =
    `$${Number(data.balance).toLocaleString()}`;

  document.getElementById("ledgerBalance").innerText =
    `$${Number(data.ledger).toLocaleString()}`;

  /* PROFILE IMAGE */
  document.getElementById("profilePic").src = data.photo;
  document.getElementById("profilePicModal").src = data.photo;

/* PROFILE DETAILS */
document.getElementById("profileName").innerText = data.fullName;
document.getElementById("profileEmail").innerText = data.email;
document.getElementById("profileCountry").innerText = data.country;
document.getElementById("profileOccupation").innerText =
  `${data.occupation} – ${data.organisation}`;

  /* ACCOUNT STATUS */
  window.accountStatus = data.status;
});

