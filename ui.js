/* ===============================
   UI ACTIONS & INTERACTIONS
   =============================== */

/* PROFILE MODAL */
function openProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "block";
}

function closeProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "none";
}

/* LOAN MODAL */
function openLoanModal() {
  const modal = document.getElementById("loanModal");
  if (modal) modal.style.display = "block";
}

function closeLoanModal() {
  const modal = document.getElementById("loanModal");
  if (modal) modal.style.display = "none";
}

/* TRANSFER MODAL */
function openTransferModal() {
  const modal = document.getElementById("transferModal");
  if (modal) modal.style.display = "block";
}

function closeTransferModal() {
  const modal = document.getElementById("transferModal");
  if (modal) modal.style.display = "none";
}

/* CLOSE MODALS ON OUTSIDE CLICK */
window.addEventListener("click", function (event) {
  const profileModal = document.getElementById("profileModal");
  const loanModal = document.getElementById("loanModal");
  const transferModal = document.getElementById("transferModal");

  if (event.target === profileModal) profileModal.style.display = "none";
  if (event.target === loanModal) loanModal.style.display = "none";
  if (event.target === transferModal) transferModal.style.display = "none";
});

/* ===============================
   BUTTON HANDLERS
   =============================== */

document.addEventListener("DOMContentLoaded", () => {

  /* TRANSFER */
  const transferBtn = document.getElementById("transferBtn");
  if (transferBtn) {
    transferBtn.addEventListener("click", () => {
      if (window.accountStatus === "locked") {
        openTransferModal();
      } else {
        alert("Transfer feature coming soon.");
      }
    });
  }

  /* LOAN STATUS */
  const loanStatusBtn = document.getElementById("loanStatusBtn");
  if (loanStatusBtn) {
    loanStatusBtn.addEventListener("click", openLoanModal);
  }

});
   
/* ===============================
   AUTO LOGOUT (INACTIVITY ONLY)
   =============================== */

import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase.js";

/* CONFIG — change if needed */
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

let inactivityTimer;

/* LOGOUT FUNCTION */
function logout(reason = null) {
  signOut(auth)
    .then(() => {
      if (reason) alert(reason);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Logout error:", error);
      window.location.href = "index.html";
    });
}

/* RESET INACTIVITY TIMER */
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    logout("Logged out due to inactivity.");
  }, INACTIVITY_LIMIT);
}

/* TRACK USER ACTIVITY */
[
  "click",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart"
].forEach(event => {
  document.addEventListener(event, resetInactivityTimer, true);
});

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  resetInactivityTimer();
});
