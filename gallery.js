window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  if (!audio || !btn) return;

  /* ===== Slideshow Setup ===== */
  let overlay = null;
  let slideTimer = null;
  let currentSlide = 0;
  let slideImages = [];
  let heartTimer = null;

  const captions = [
    "Every moment with you is a gift 🤍",
    "You make my world beautiful 🌹",
    "My favourite person 💕",
    "Together is my favourite place 🤍",
    "You & Me, always 💖",
    "I love your smile 😊🤍",
    "My heart is yours 💗",
    "Forever & ever 🌹🤍",
    "You are my everything 💕",
    "I love you, Chinnu 🤍🌹",
    "The best is yet to come 💖"
  ];

  function createOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "slideshow-overlay";
    overlay.innerHTML = `
      <button class="slideshow-close" aria-label="Close">×</button>
      <div class="slideshow-hearts" id="slideshowHearts"></div>
      <div class="slideshow-counter" id="slideCounter"></div>
      <div class="slideshow-caption" id="slideCaption"></div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector(".slideshow-close").addEventListener("click", () => {
      audio.pause();
    });
  }

  function spawnHeart() {
    const container = document.getElementById("slideshowHearts");
    if (!container) return;
    const h = document.createElement("div");
    h.className = "s-heart";
    h.textContent = ["❤️","💕","💗","🤍","🌹","💖"][Math.floor(Math.random()*6)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (16 + Math.random() * 18) + "px";
    h.style.animationDuration = (4 + Math.random() * 5) + "s";
    container.appendChild(h);
    setTimeout(() => h.remove(), 9000);
  }

  function showSlide(index) {
    if (!overlay || slideImages.length === 0) return;
    currentSlide = index % slideImages.length;

    // Remove old images
    overlay.querySelectorAll("img").forEach(img => {
      img.classList.remove("slide-active");
      setTimeout(() => img.remove(), 1200);
    });

    // Create new image
    const img = document.createElement("img");
    img.src = slideImages[currentSlide];
    img.alt = "Memory " + (currentSlide + 1);
    overlay.appendChild(img);

    // Trigger animation after a tiny delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.classList.add("slide-active");
      });
    });

    // Update caption
    const cap = document.getElementById("slideCaption");
    if (cap) cap.textContent = captions[currentSlide % captions.length];

    // Update counter
    const counter = document.getElementById("slideCounter");
    if (counter) counter.textContent = `${currentSlide + 1} / ${slideImages.length}`;
  }

  function startSlideshow() {
    // Gather all loaded gallery images
    slideImages = window.__galleryImages || [];
    if (slideImages.length === 0) {
      // Fallback: grab from gallery DOM
      document.querySelectorAll("#gallery img").forEach(img => {
        if (img.src) slideImages.push(img.src);
      });
    }
    if (slideImages.length === 0) return;

    createOverlay();
    currentSlide = 0;
    overlay.classList.add("active");
    showSlide(0);

    slideTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 4000); // 4 seconds per photo

    heartTimer = setInterval(spawnHeart, 800);
  }

  function stopSlideshow() {
    if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
    if (heartTimer) { clearInterval(heartTimer); heartTimer = null; }
    if (overlay) overlay.classList.remove("active");
  }

  /* ===== Music Button ===== */
  function update() {
    btn.textContent = audio.paused ? "▶️ Play music" : "🔇 Stop music";
  }

  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        startSlideshow();
      } else {
        audio.pause();
        stopSlideshow();
      }
    } catch {
      window.showToast?.("Music file not loading");
    }
    update();
  });

  audio.addEventListener("play", update);
  audio.addEventListener("pause", () => {
    update();
    stopSlideshow();
  });
  update();
});