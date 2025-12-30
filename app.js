/* =========================
   BASIC LOGIN PROTECTION
========================= */
(function () {
  const isDashboard = window.location.pathname.includes("dashboard.html");

  if (isDashboard && !localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }
})();

/* =========================
   DEMO USER DATA
========================= */
const userData = {
  fullName: "Dr. Andrew Martinz",
  firstName: "Amdrew",
  email: "andrew.martinz@gmail.com",
  country: "United States of America",
  occupation: "Orthopedic Surgeon",
  organization: "United States Army",
  accountBalance: $400,000,
  ledgerBalance: $400,000
};

/* =========================
   TIME-BASED GREETING
========================= */
(function setGreeting() {
  const welcomeEl = document.getElementById("welcome");
  if (!welcomeEl) return;

  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  welcomeEl.textContent = `${greeting}, ${userData.firstName}`;
})();

/* =========================
   BALANCE DISPLAY
========================= */
(function setBalances() {
  const acc = document.getElementById("accountBalance");
  const led = document.getElementById("ledgerBalance");

  if (acc) {
    acc.textContent = `$${userData.accountBalance.toLocaleString()}`;
  }

  if (led) {
    led.textContent = `$${userData.ledgerBalance.toLocaleString()}`;
  }
})();

/* =========================
   ACTIONS
========================= */
function lockedTransfer() {
  alert("🔐 Account locked.\nPlease contact support.");
}

/* =========================
   PROFILE MODAL CONTROLS
========================= */
function openProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "block";
}

function closeProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "none";
}

/* =========================
   CLICK OUTSIDE TO CLOSE
========================= */
window.addEventListener("click", function (e) {
  const modal = document.getElementById("profileModal");
  if (modal && e.target === modal) {
    modal.style.display = "none";
  }
});

/* =========================
   OPTIONAL: LOGOUT (READY)
========================= */
// function logout() {
//   localStorage.removeItem("loggedIn");
//   window.location.href = "index.html";
// }

