// async function checkAuth() {
//     try {
//       const response = await fetch("/api/auswahl.php", {
//         credentials: "include",
//       });
  
//       if (response.status === 401) {
//         window.location.href = "/login.html";
//         return false;
//       }
  
//       const result = await response.json();
  
  
//       return true;
//     } catch (error) {
//       console.error("Auth check failed:", error);
//       window.location.href = "/login.html";
//       return false;
//     }
//   }
  
//   // Check auth when page loads
//   window.addEventListener("load", checkAuth);


async function loadData() {
  const url = '/api/auswahl/readauswahl.php'; // mit korrekter API-URL ersetzen
  try {
      const response = await fetch(url);
      return await response.json();
  } catch (error) {
      console.error(error);
      return false;
  }
}

const data = await loadData();
console.log(data);


  document.addEventListener('DOMContentLoaded', function() {
    // Get all card elements
    const cards = document.querySelectorAll('.card');
    console.log(cards)
    
    // Add click event listener to each card
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Check if this card is already selected
            const isSelected = this.classList.contains('selected');
            
            // Option 1: Toggle selection (multiple cards can be selected)
            this.classList.toggle('selected');
            
            // Option 2: Single selection (uncomment to enable)
            // First remove 'selected' class from all cards
            // cards.forEach(c => c.classList.remove('selected'));
            // Then add it to the current card if it wasn't already selected
            // if (!isSelected) {
            //     this.classList.add('selected');
            // }
            
            console.log(`Card ${this.id} is ${this.classList.contains('selected') ? 'selected' : 'deselected'}`);
        });
    });

    // Get the "Submit" button
    const weiterBtn = document.querySelector('#weiterBtn');
    weiterBtn.addEventListener('click', function() {
        // WEiterleiten auf folgende Seite Swipe.html 
        window.location.href = "swipe.html";
    }
    );
});
  