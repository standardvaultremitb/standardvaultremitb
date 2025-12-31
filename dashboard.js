import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const data = snap.data();

  const snap = await getDoc(userRef);

if (snap.exists()) {
  const data = snap.data();

  // Render profile info
  renderUserProfile(data);
}
  
  /* GREETING */
    const hour = new Date().getHours();
    let greeting = "Good evening";
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";

    document.getElementById("welcome").textContent =
      `${greeting}, ${data.firstName}`;

  /* BALANCES */
  document.getElementById("accountBalance").innerText =
    `$${Number(data.balance).toLocaleString()}`;

  document.getElementById("ledgerBalance").innerText =
    `$${Number(data.ledger).toLocaleString()}`;

  /* PROFILE IMAGE */
  document.getElementById("profileAvatar").src = data.photo;
  document.getElementById("profilePic").src = data.photo;
  document.getElementById("profilePicModal").src = data.photo;

/* PROFILE DETAILS */
document.getElementById("profileName").textContent = data.fullName;
document.getElementById("profileEmail").textContent = data.email;
document.getElementById("profileCountry").textContent = data.country;
document.getElementById("profileOccupation").textContent =
  `${data.occupation} – ${data.organisation}`;

  function renderUserProfile(data) {
  // Profile photo
  const profilePic = document.getElementById("profilePic");
  if (profilePic) {
    profilePic.src = data.photo;
    profilePic.alt = data.fullName;
  }

  // Profile text info
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profileCountry = document.getElementById("profileCountry");
  const profileOccupation = document.getElementById("profileOccupation");

  if (profileName) profileName.textContent = data.fullName;
  if (profileEmail) profileEmail.textContent = data.email;
  if (profileCountry) profileCountry.textContent = data.country;
  if (profileOccupation)
    profileOccupation.textContent = `${data.occupation} – ${data.organisation}`;
  }
  
  /* ACCOUNT STATUS */
  window.accountStatus = data.status;
});

