// register.js
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const birthdate = document.getElementById("birthdate").value.trim();
    const passwordagain = document.querySelector('#passwordagain').value.trim();

    if (password === passwordagain){
    try {
      const response = await fetch("api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password, firstname, lastname, birthdate,}),
      });
      const result = await response.json();

      if (result.status === "success") {
        alert("Registrierung erfolgreich! Sie können sich jetzt anmelden.");
        window.location.href = "login.html";
      } else {
        alert(result.message || "Registrierung fehlgeschlagen.");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Etwas ist schiefgelaufen!");
    }
  } else {
    alert("Passwörter stimmen nicht überein.");
  }
  });
