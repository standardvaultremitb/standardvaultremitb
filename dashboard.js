/* ===============================
   DASHBOARD DATA FETCH (FIREBASE)
================================ */

firebase.auth().onAuthStateChanged(async (User) => {
  if (!User) {
    // Not logged in → redirect
    window.location.href = "index.html";
    return;
  }

  try {
    // Fetch user document from Firestore
    const docRef = firebase.firestore().collection("User").doc(User.uid);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.error("User document not found");
      return;
    }

    const data = docSnap.data();

    /* ===============================
       GREETING
    ================================ */
    const welcomeEl = document.getElementById("welcome");
    if (welcomeEl && data.firstName) {
      const hour = new Date().getHours();
      const greeting =
        hour < 12 ? "Good Morning" :
        hour < 17 ? "Good Afternoon" :
        "Good Evening";

      welcomeEl.textContent = `${greeting}, ${data.firstName}`;
    }

    /* ===============================
       BALANCES
    ================================ */
    const accountBalanceEl = document.getElementById("accountBalance");
    const ledgerBalanceEl = document.getElementById("ledgerBalance");

    if (accountBalanceEl && typeof data.balance === "number") {
      accountBalanceEl.textContent = `$${data.balance.toLocaleString()}`;
    }

    if (ledgerBalanceEl && typeof data.ledger === "number") {
      ledgerBalanceEl.textContent = `$${data.ledger.toLocaleString()}`;
    }

    /* ===============================
       PROFILE AVATAR (TOP BAR)
    ================================ */
    const avatarTop = document.getElementById("avatarTop");
    if (avatarTop && data.photo) {
      avatarTop.src = data.photo;
    }

    /* ===============================
       PROFILE MODAL DETAILS
    ================================ */
    const profilePic = document.getElementById("profilePic");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileCountry = document.getElementById("profileCountry");
    const profileOccupation = document.getElementById("profileOccupation");
    const profileOrg = document.getElementById("profileOrg");

    if (profilePic && data.photo) profilePic.src = data.photo;
    if (profileName) profileName.textContent = data.fullName || "";
    if (profileEmail) profileEmail.textContent = data.email || "";
    if (profileCountry) profileCountry.textContent = data.country || "";
    if (profileOccupation) profileOccupation.textContent = data.occupation || "";
    if (profileOrg) profileOrg.textContent = data.organization || "";

  } catch (error) {
    console.error("Error loading dashboard:", error);
  }
});

