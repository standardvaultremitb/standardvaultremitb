/* ===============================
   IMPORTS (MUST BE AT TOP)
   =============================== */
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase.js";

/* ===============================
   UI ACTIONS & INTERACTIONS
   =============================== */

/* PROFILE MODAL */
window.openProfile = function () {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "block";
};

window.closeProfile = function () {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "none";
};

/* LOAN MODAL */
window.openLoanModal = function () {
  const modal = document.getElementById("loanModal");
  if (modal) modal.style.display = "block";
};

window.closeLoanModal = function () {
  const modal = document.getElementById("loanModal");
  if (modal) modal.style.display = "none";
};

/* TRANSFER MODAL */
window.openTransferModal = function () {
  const modal = document.getElementById("transferModal");
  if (modal) modal.style.display = "block";
};

window.closeTransferModal = function () {
  const modal = document.getElementById("transferModal");
  if (modal) modal.style.display = "none";
};

/* CLOSE MODALS ON OUTSIDE CLICK */
window.addEventListener("click", (event) => {
  ["profileModal", "loanModal", "transferModal"].forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) modal.style.display = "none";
  });
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
        openTransferModal(); // Account restricted modal
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

  /* INIT INACTIVITY TIMER */
  resetInactivityTimer();
});

/* ===============================
   AUTO LOGOUT (INACTIVITY ONLY)
   =============================== */

/* CONFIG */
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes
let inactivityTimer;

/* LOGOUT FUNCTION */
function logout(reason = null) {
  signOut(auth)
    .finally(() => {
      if (reason) alert(reason);
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
["click", "mousemove", "keydown", "scroll", "touchstart"].forEach(event => {
  document.addEventListener(event, resetInactivityTimer, true);
});
