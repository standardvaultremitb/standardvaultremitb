
console.log("dashboard.js loaded");

firebase.auth().onAuthStateChanged(async (users) => {

  console.log("Auth state changed");

  if (!users) {
    console.log("No user, redirecting");
    window.location.href = "index.html";
    return;
  }

  console.log("Logged in UID:", users.uid);

  try {
    const docRef = firebase.firestore().collection("users").doc(user.uid);
    const snap = await docRef.get();

    console.log("Firestore response:", snap.exists, snap.data());

    if (!snap.exists) {
      alert("User document not found in Firestore");
      return;
    }

    const d = snap.data();

    document.getElementById("welcome").innerText =
      `${getGreeting()}, ${d.firstName}`;

    document.getElementById("accountBalance").innerText =
      `$${Number(d.balance).toLocaleString()}`;

    document.getElementById("ledgerBalance").innerText =
      `$${Number(d.ledger).toLocaleString()}`;

    document.getElementById("avatarTop").src = d.photo;

    document.getElementById("profilePic").src = d.photo;
    document.getElementById("profileName").innerText = d.fullName;
    document.getElementById("profileEmail").innerText = d.email;
    document.getElementById("profileCountry").innerText = d.country;
    document.getElementById("profileOccupation").innerText =
      `${d.occupation} (${d.organisation})`;

    if (d.status === "locked") {
      document.getElementById("transferBtn").onclick = lockedTransfer;
    }

    console.log("Dashboard populated successfully");

  } catch (e) {
    console.error("Fatal dashboard error:", e);
  }
});

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

