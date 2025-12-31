document.addEventListener("DOMContentLoaded", () => {

  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    const uid = user.uid;

    try {
      const snap = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get();

      if (!snap.exists) {
        alert("User profile not found.");
        return;
      }

      const data = snap.data();

      /* GREETING */
      document.getElementById("welcome").innerText =
        `${getGreeting()}, ${data.firstName}`;

      /* BALANCES */
      document.getElementById("accountBalance").innerText =
        `$${Number(data.balance).toLocaleString()}`;

      document.getElementById("ledgerBalance").innerText =
        `$${Number(data.ledger).toLocaleString()}`;

      /* AVATAR */
      document.getElementById("avatarTop").src = data.photo;

      /* PROFILE MODAL */
      document.getElementById("profileName").innerText = data.fullName;
      document.getElementById("profileEmail").innerText = data.email;
      document.getElementById("profileCountry").innerText = data.country;
      document.getElementById("profileOccupation").innerText =
        `${data.occupation} (${data.organisation})`;

      /* LOCKED STATUS */
      if (data.status === "locked") {
        document.getElementById("transferBtn")
          .addEventListener("click", lockedTransfer);
      }

    } catch (e) {
      console.error("Dashboard load error:", e);
    }
  });

});

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

