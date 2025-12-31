firebase.auth().onAuthStateChanged(async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  try {
    const uid = user.uid;
    const ref = firebase.firestore().collection("users").doc(uid);
    const snap = await ref.get();

    if (!snap.exists) {
      console.error("Firestore document not found");
      return;
    }

    const d = snap.data();

    /* SAFE DOM INJECTION */
    const welcome = document.getElementById("welcome");
    const accBal = document.getElementById("accountBalance");
    const ledBal = document.getElementById("ledgerBalance");
    const avatar = document.getElementById("avatarTop");

    if (!welcome || !accBal || !ledBal || !avatar) {
      console.error("Required dashboard elements missing");
      return;
    }

    welcome.innerText = `${getGreeting()}, ${d.firstName}`;
    accBal.innerText = `$${Number(d.balance).toLocaleString()}`;
    ledBal.innerText = `$${Number(d.ledger).toLocaleString()}`;
    avatar.src = d.photo;

    /* PROFILE MODAL */
    document.getElementById("profilePic").src = d.photo;
    document.getElementById("profileName").innerText = d.fullName;
    document.getElementById("profileEmail").innerText = d.email;
    document.getElementById("profileCountry").innerText = d.country;
    document.getElementById("profileOccupation").innerText =
      `${d.occupation} (${d.organisation})`;

    /* LOCKED ACCOUNT */
    if (d.status === "locked") {
      document.getElementById("transferBtn").onclick = lockedTransfer;
    }

  } catch (e) {
    console.error("Dashboard fatal error:", e);
  }
});

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

