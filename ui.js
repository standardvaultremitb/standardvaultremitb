/* ===============================
   UI ACTIONS & INTERACTIONS
   =============================== */

/* TRANSFER LOCK */
function lockedTransfer() {
  alert("Account restricted 🔐\nPlease contact support.");
}

/* PROFILE MODAL */
function openProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) {
    modal.style.display = "block";
  }
}

function closeProfile() {
  const modal = document.getElementById("profileModal");
  if (modal) {
    modal.style.display = "none";
  }
}

/* CLOSE MODAL ON OUTSIDE CLICK */
window.onclick = function (event) {
  const modal = document.getElementById("profileModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

/* LOGOUT */
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  });
}

<script type="module" src="firebase.js"></script>
<script type="module" src="dashboard.js"></script>
<script src="ui.js"></script>
   
