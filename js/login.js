// login.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("api/login.php", {
      method: "POST",
      // credentials: 'include', // uncomment if front-end & back-end are on different domains
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email, password }),
    });
    const result = await response.json();

    if (result.status === "success") {
      alert("Anmeldung erfolgreich!");
      window.location.href = "auswahl.html";
    } else {
      alert(result.message || "Anmeldung fehlgeschlagen.");
    }
  } catch (error) {
    console.error("Fehler:", error);
    alert("Etwas ist schiefgelaufen!");
  }
});
