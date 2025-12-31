
/* ===============================
   UI ACTIONS & INTERACTIONS
   =============================== */

/* TRANSFER LOCK */
function handleTransfer() {
  if (window.accountStatus === "locked") {
    alert("Account restricted 🔐\nPlease contact support.");
  } else {
    alert("Transfer feature coming soon.");
  }
}

/* PROFILE MODAL */
function openProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "block";
}

function closeProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) modal.style.display = "none";
}

/* CLOSE MODAL ON OUTSIDE CLICK */
window.addEventListener("click", function (event) {
  const modal = document.getElementById("profileModal");
  if (modal && event.target === modal) {
    modal.style.display = "none";
  }
});

/* ===============================
   TRANSFER BUTTON HANDLER
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
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
});

/* ===============================
   LOAN STATUS HANDLER
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  const loanStatusBtn = document.getElementById("loanStatusBtn");

  if (loanStatusBtn) {
    loanStatusBtn.addEventListener("click", () => {
      alert("Loan Eligibility: Good Standing");
    });
  }
});
