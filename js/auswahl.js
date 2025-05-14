async function checkAuth() {
    try {
      const response = await fetch("/api/protected.php", {
        credentials: "include",
      });
  
      if (response.status === 401) {
        window.location.href = "/login.html";
        return false;
      }
  
      const result = await response.json();
  
      // Display user data in the protected content div
      const protectedContent = document.getElementById("protectedContent");
      protectedContent.innerHTML = `
        <h4>Wilkommen, ${result.firstname,lastname}!</h2>
      `;
  
      return true;
    } catch (error) {
      console.error("Auth check failed:", error);
      window.location.href = "/login.html";
      return false;
    }
  }
  
  // Check auth when page loads
  window.addEventListener("load", checkAuth);
  