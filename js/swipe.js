document.addEventListener('DOMContentLoaded', async () => {
  const cardContainer = document.getElementById('swipecard');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  // Fetch 1 activity from the server
  async function loadActivity() {
    try {
      const response = await fetch('/api/swipe/readswipe.php', { credentials: 'include' });

      if (!response.ok) throw new Error('Failed to load activity');

      const data = await response.json();
      currentActivity = data;

      if (!currentActivity) {
        cardContainer.innerHTML = `
        <div class="no-activity">
          <h5>Keine Aktivitäten mehr verfügbar.</p>
        </div>
        `;
      } else {
        renderCard(currentActivity);
      }
    } catch (err) {
      console.log(err)
      console.error("Error loading activity:", err);
      cardContainer.innerHTML = "<p>Fehler beim Laden.</p>";
    }
  }

  function renderCard(activity) {
    cardContainer.innerHTML = `
        <div class="card-image-wrapper">
          <img src="./${activity.bild}" alt="${activity.name}" />
        </div>
        <div class="card-text">
          <h2>${activity.name}</h2>
          <p>Preis: ${activity.preis} €</p>
          <p>Wetter: ${activity.witterung}</p>
          <p>Teilnehmer: ${activity.personenzahl ?? 'unbekannt'}</p>
          <a href="${activity.url}" target="_blank">Mehr Info</a>
        </div>
    `;
  }



  // Send match data
  async function sendMatch(isLiked) {
    if (!currentActivity) return;

    try {
      await fetch('/api/swipe/createswipe.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activity_id: currentActivity.id,
          is_liked: isLiked ? 1 : 0,
        })
      });
    } catch (err) {
      console.error("Failed to send match", err);
    }
  }

  // Button events
  likeBtn.addEventListener('click', async () => {
    await sendMatch(true);
    loadActivity(); // Load next
  });

  dislikeBtn.addEventListener('click', async () => {
    await sendMatch(false);
    loadActivity(); // Load next
  });

  // Initialize
  loadActivity();
});
