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

/* CLOSE MODALS ON OUTSIDE CLICK */
window.addEventListener("click", function (event) {
  const profileModal = document.getElementById("profileModal");
  const loanModal = document.getElementById("loanModal");

  if (event.target === profileModal) profileModal.style.display = "none";
  if (event.target === loanModal) loanModal.style.display = "none";
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
        alert("Account restricted 🔐\nPlease contact support.");
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

