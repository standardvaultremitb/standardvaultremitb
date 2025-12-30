// EMBEDDED USER DATA
const demoUser = {
  email: "andrew.martinz@gmail.com",
  password: "Andrew12!",
  name: "Andrew Martinz",
  accountBalance: $400,000.00,
  ledgerBalance: $400,000.00
};

// LOGIN FUNCTION (unchanged)
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === demoUser.email && password === demoUser.password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login details");
  }
}

// DASHBOARD LOAD
if (window.location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }

  // TIME-BASED GREETING
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  document.getElementById("welcome").innerText =
    `${greeting}, Welcome back! ${demoUser.name.split(" ")[0]}`;

  document.getElementById("accountBalance").innerText =
    `$${demoUser.accountBalance.toLocaleString()}`;

  document.getElementById("ledgerBalance").innerText =
    `$${demoUser.ledgerBalance.toLocaleString()}`;
}

function lockedTransfer() {
  alert("🔐 Account locked.\nPlease contact support.");
}

function openProfile() {
  document.getElementById("profileModal").style.display = "block";
}

function closeProfile() {
  document.getElementById("profileModal").style.display = "none";
}
