async function checkAuth() {
    try {
      const response = await fetch("/api/auswahl.php", {
        credentials: "include",
      });
  
      if (response.status === 401) {
        window.location.href = "/login.html";
        return false;
      }
  
      const result = await response.json();
  
  
      return true;
    } catch (error) {
      console.error("Auth check failed:", error);
      window.location.href = "/login.html";
      return false;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const track    = carousel.querySelector('.carousel__track'); //<-- Dieser Muss dynamisch gefüllt werden
    const slides   = Array.from(track.children);
    const likeBtn    = carousel.querySelector('.btn-like');
    const dislikeBtn = carousel.querySelector('.btn-dislike');
    
    let currentIndex    = 0;
    let startX          = 0;
    let currentTranslate = 0;
    let prevTranslate    = 0;
    let isDragging      = false;
    let animationID;
    let slideInteractions = new Array(slides.length).fill(null); // null = no decision, true = liked, false = disliked
  
  //möglicher code für die dynamische füllung des tracks
  
  // fetch('xyz.ch/api/getPhotos.php')
  //   .then(response => response.json())
  //   .then(data => {
  //     // Dynamisch die Slides füllen
  //     data.forEach(photo => {
  //       const slide = document.createElement('div');
  //       const img = document.createElement('img');
  //       img.src = photo.url;
  //       slide.appendChild(img);
  //       track.appendChild(slide);
  //     });
  //   });
  
  
    // Initialize the slides
    updateControls();
  
    // Prevent native image dragging & wire up pointer events
    slides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      img.addEventListener('dragstart', e => e.preventDefault());
  
      slide.addEventListener('pointerdown',  pointerDown(index));
      slide.addEventListener('pointermove',  pointerMove);
      slide.addEventListener('pointerup',    pointerUp);
      slide.addEventListener('pointerleave', pointerUp);
    });
    window.addEventListener('pointerup', pointerUp);
  
    // Like/dislike buttons event listeners
    likeBtn.addEventListener('click', () => {
      rateCurrentSlide(true);
    });
  
    dislikeBtn.addEventListener('click', () => {
      rateCurrentSlide(false);
    });
  
    // Keyboard navigation
    window.addEventListener('keydown', handleKeyDown);
  
    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft') {
        // Left arrow - dislike
        rateCurrentSlide(false);
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        // Right arrow - like
        rateCurrentSlide(true);
        e.preventDefault();
      }
    }
  
    function rateCurrentSlide(liked) {
      slideInteractions[currentIndex] = liked;
      updateFeedback(currentIndex, liked);
      
      // Log the action (simulate saving to database)
      // HIER KANN DER FETCH GEMACHT WERDEN
      // So, dass die Likes und Dislikes in die Datenbank geschrieben werden
      // fetch('xyz.ch/api/addPhotos.php', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     userId: 1, <-- Diese Sachen müssen angepasst werden auf euere Logik
      //     photoId: currentIndex + 1, // Converting to 1-based index for photo IDs <-- Diese Sachen müssen angepasst werden auf euere Logik
      //     action: liked ? 'like' : 'dislike', <-- Diese Sachen müssen angepasst werden auf euere Logik
      //     timestamp: new Date().toISOString() <-- Diese Sachen müssen angepasst werden auf euere Logik
      //   })
      // });
      console.log({
        userId: 1,
        photoId: currentIndex + 1, // Converting to 1-based index for photo IDs
        action: liked ? 'like' : 'dislike',
        timestamp: new Date().toISOString()
      });
      
      // Move to next slide if available
      if (currentIndex < slides.length - 1) {
        setTimeout(() => {
          currentIndex++;
          setPositionByIndex();
          updateControls();
        }, 500);
      }
    }
  
    function updateFeedback(index, liked) {
      const slide = slides[index];
      const feedback = slide.querySelector('.slide-feedback');
      
      feedback.textContent = liked ? 'Liked!' : 'Disliked!';
      feedback.className = 'slide-feedback';
      feedback.classList.add(liked ? 'liked' : 'disliked');
    }
  
    function updateControls() {
      // Disable buttons if we're at the end
      const isLastSlide = currentIndex === slides.length - 1;
      if (isLastSlide) {
        likeBtn.disabled = slideInteractions[currentIndex] !== null;
        dislikeBtn.disabled = slideInteractions[currentIndex] !== null;
      } else {
        likeBtn.disabled = false;
        dislikeBtn.disabled = false;
      }
    }
  
    function pointerDown(index) {
      return function(event) {
        currentIndex = index;
        startX       = event.clientX;
        isDragging   = true;
        track.style.transition = 'none';
        animationID = requestAnimationFrame(animation);
      }
    }
  
    function pointerMove(event) {
      if (!isDragging) return;
      const currentX = event.clientX;
      currentTranslate = prevTranslate + (currentX - startX);
      
      // Show swipe hints based on direction
      const swipeDistance = currentX - startX;
      const slide = slides[currentIndex];
      const leftHint = slide.querySelector('.swipe-hint-left');
      const rightHint = slide.querySelector('.swipe-hint-right');
      
      if (swipeDistance < -50) {
        leftHint.classList.add('show-hint');
        rightHint.classList.remove('show-hint');
      } else if (swipeDistance > 50) {
        rightHint.classList.add('show-hint');
        leftHint.classList.remove('show-hint');
      } else {
        leftHint.classList.remove('show-hint');
        rightHint.classList.remove('show-hint');
      }
    }
  
    function pointerUp() {
      if (!isDragging) return;
      cancelAnimationFrame(animationID);
      isDragging = false;
  
      const movedBy = currentTranslate - prevTranslate;
      
      // Clear swipe hints
      slides.forEach(slide => {
        slide.querySelector('.swipe-hint-left').classList.remove('show-hint');
        slide.querySelector('.swipe-hint-right').classList.remove('show-hint');
      });
      
      // swipe threshold for navigation vs. like/dislike
      if (movedBy < -100) {
        // Swiped left - dislike
        rateCurrentSlide(false);
      } else if (movedBy > 100) {
        // Swiped right - like
        rateCurrentSlide(true);
      } else {
        // Not a strong enough swipe, just restore position
        setPositionByIndex();
      }
    }
  
    function animation() {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    }
  
    function setSliderPosition() {
      track.style.transform = `translateX(${currentTranslate}px)`;
    }
  
    function setPositionByIndex() {
      currentTranslate = -currentIndex * carousel.clientWidth;
      prevTranslate    = currentTranslate;
      track.style.transition = 'transform 0.3s ease-out';
      setSliderPosition();
    }
  
    // Re-center on resize
    window.addEventListener('resize', setPositionByIndex);
  });
