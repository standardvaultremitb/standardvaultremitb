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

/* AUTO-TITLE GREETING */
const hour = new Date().getHours();
let greeting = "Good evening";
if (hour < 12) greeting = "Good morning";
else if (hour < 18) greeting = "Good afternoon";

/* Resolve First Name */
let firstName = "User";
if (data.firstName && data.firstName.trim() !== "") {
  firstName = data.firstName.trim();
} else if (data.fullName) {
  firstName = data.fullName.trim().split(" ")[0];
}

/* Auto-Title Logic */
let title = "";
const occupation = (data.occupation || "").toLowerCase();

if (
  occupation.includes("doctor") ||
  occupation.includes("surgeon") ||
  occupation.includes("orthopedic")
) {
  title = "Dr. Andrew ";
}

/* Render Greeting */
document.getElementById("welcome").textContent =
  `${greeting}, ${title}${firstName}`;


  /* BALANCES */
  document.getElementById("accountBalance").innerText =
    `$${Number(data.balance).toLocaleString()}`;

  document.getElementById("ledgerBalance").innerText =
    `$${Number(data.ledger).toLocaleString()}`;
  
/* PROFILE IMAGE */
const avatar = document.getElementById("profileAvatar");
const profilePic = document.getElementById("profilePic");

if (avatar) avatar.src = data.photo;
if (profilePic) profilePic.src = data.photo;

/* PROFILE DETAILS */
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileCountry = document.getElementById("profileCountry");
const profileOccupation = document.getElementById("profileOccupation");

if (profileName) profileName.textContent = data.fullName;
if (profileEmail) profileEmail.textContent = data.email;
if (profileCountry) profileCountry.textContent = data.country;
if (profileOccupation)
  profileOccupation.textContent =
    `${data.occupation} – ${data.organisation}`;

  /* ACCOUNT STATUS */
  window.accountStatus = data.status;
});
