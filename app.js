document.addEventListener("DOMContentLoaded", function () {

  // AUTH CHECK
  if (window.location.pathname.includes("dashboard.html")) {
    if (!localStorage.getItem("loggedIn")) {
      window.location.href = "index.html";
      return;
    }
  }

  // FETCH USER DATA
  const storedUser = localStorage.getItem("userData");
  if (!storedUser) return;

  const user = JSON.parse(storedUser);

  // GREETING
  const welcomeEl = document.getElementById("welcome");
  if (welcomeEl) {
    const hour = new Date().getHours();
    const greeting =
      hour < 12 ? "Good Morning" :
      hour < 17 ? "Good Afternoon" :
      "Good Evening";

    welcomeEl.textContent = `${greeting}, ${user.firstName}`;
  }

  // BALANCES
  const acc = document.getElementById("accountBalance");
  const led = document.getElementById("ledgerBalance");

  if (acc) acc.textContent = `$${user.accountBalance.toLocaleString()}`;
  if (led) led.textContent = `$${user.ledgerBalance.toLocaleString()}`;
});

/* ACTIONS */
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

