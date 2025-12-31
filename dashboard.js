
console.log("Dashboard script loaded");

firebase.auth().onAuthStateChanged(async (user) => {
  console.log("Auth check running");

  if (!user) {
    console.log("No authenticated user");
    alert("Not logged in");
    return;
  }

  console.log("Logged in UID:", user.uid);

  try {
    const docRef = firebase.firestore().collection("users").doc(user.uid);
    const snap = await docRef.get();

    console.log("Firestore exists:", snap.exists);
    console.log("Firestore data:", snap.data());

    if (!snap.exists) {
      alert("User document NOT found in Firestore");
      return;
    }

    // TEMPORARY DISPLAY (bypass UI)
    alert(
      "DATA FOUND:\n" +
      "Name: " + snap.data().firstName + "\n" +
      "Balance: $" + snap.data().balance
    );

  } catch (err) {
    console.error("Firestore error:", err);
    alert("Firestore error — check console");
  }
});
