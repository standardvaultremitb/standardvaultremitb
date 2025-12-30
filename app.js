document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     LOGIN PROTECTION
  ========================= */
  if (window.location.pathname.includes("dashboard.html")) {
    if (!localStorage.getItem("loggedIn")) {
      window.location.href = "index.html";
      return;
    }
  }

  /* =========================
     DEMO USER DATA
  ========================= */
  const userData = {
    fullName: "Dr. Andrew Martinz",
    firstName: "Andrew",
    email: "andrew.martinz@gmail.com",
    accountBalance: 5,000,000,
    ledgerBalance: 5,000,000
  };

  /* =========================
     GREETING
  ========================= */
  const welcomeEl = document.getElementById("welcome");
  if (welcomeEl) {
    const hour = new Date().getHours();
    let greeting =
      hour < 12 ? "Good Morning" :
      hour < 17 ? "Good Afternoon" :
      "Good Evening";

    welcomeEl.textContent = `${greeting}, ${userData.firstName}`;
  }

  /* =========================
     BALANCES
  ========================= */
  const accountBalanceEl = document.getElementById("accountBalance");
  const ledgerBalanceEl = document.getElementById("ledgerBalance");

  if (accountBalanceEl) {
    accountBalanceEl.textContent =
      `$${userData.accountBalance.toLocaleString()}`;
  }

  if (ledgerBalanceEl) {
    ledgerBalanceEl.textContent =
      `$${userData.ledgerBalance.toLocaleString()}`;
  }

});

/* =========================
   GLOBAL ACTION FUNCTIONS
   (MUST be outside DOMContentLoaded)
========================= */
function lockedTransfer() {
  alert("🔐 Account locked.\nPlease contact support.");
}

function openProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "block";
}

function closeProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "none";
}

