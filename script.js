window.addEventListener("DOMContentLoaded", () => {
  // ===== Common elements =====
  const flowersLayer = document.getElementById("flowers");
  const btn = document.getElementById("surpriseBtn");
  const toast = document.getElementById("toast");

  const modal = document.getElementById("envelopeModal");
  const envelope = document.getElementById("envelope");
  const closeBackdrop = document.getElementById("closeEnvelope");
  const closeX = document.getElementById("closeEnvelopeX");

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // ===== Falling flowers (all pages) =====
  const flowerEmojis = ["🌸", "🌺", "🌷", "🌹", "💮", "🌼"];

  function spawnFlower() {
    if (!flowersLayer) return;

    const el = document.createElement("div");
    el.className = "flower";
    el.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];

    const left = Math.random() * 100;
    const size = 18 + Math.random() * 22;
    const fallDuration = 7 + Math.random() * 7;
    const swayDuration = 2 + Math.random() * 3;

    el.style.left = left + "vw";
    el.style.fontSize = size + "px";
    el.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
    el.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;

    flowersLayer.appendChild(el);
    setTimeout(() => el.remove(), (fallDuration + 0.5) * 1000);
  }

  for (let i = 0; i < 8; i++) spawnFlower();
  setInterval(spawnFlower, 900);

  function burstFlowers(count = 40) {
    for (let i = 0; i < count; i++) spawnFlower();
  }

  // ===== Envelope (index page only) =====
  function openEnvelopeModal() {
    if (!modal) return;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    if (envelope) envelope.classList.remove("open");
    burstFlowers(50);
    showToast("I LOVE YOU BABY 🤍🌹");
  }

  function closeEnvelopeModal() {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  if (btn) {
    btn.addEventListener("click", () => {
      if (modal) openEnvelopeModal();
      else {
        burstFlowers(50);
        showToast("Chinnu 🤍🌹 Happy Valentine’s Day!");
      }
    });
  }

  if (envelope) {
    envelope.addEventListener("click", () => {
      envelope.classList.toggle("open");
    });
  }

  if (closeBackdrop) closeBackdrop.addEventListener("click", closeEnvelopeModal);
  if (closeX) closeX.addEventListener("click", closeEnvelopeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEnvelopeModal();
  });

  // ===== MUSIC (stable on Android + iPhone) =====
  const bgMusic = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");

  let musicStarting = false;

  function setMusicButtonText() {
    if (!musicBtn || !bgMusic) return;
    musicBtn.textContent = bgMusic.paused ? "▶️ Play music" : "🔇 Stop music";
  }

  async function startMusic() {
    if (!bgMusic || musicStarting) return;
    musicStarting = true;
    if (musicBtn) musicBtn.disabled = true;

    try {
      bgMusic.volume = 0.85;
      await bgMusic.play();
      showToast("Music on 🎶");
    } catch (err) {
      showToast("Music not loading 😕");
    } finally {
      musicStarting = false;
      if (musicBtn) musicBtn.disabled = false;
      setMusicButtonText();
    }
  }

  function stopMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    setMusicButtonText();
    showToast("Music off");
  }

  if (musicBtn && bgMusic) {
    setMusicButtonText();
    musicBtn.addEventListener("click", async () => {
      if (bgMusic.paused) await startMusic();
      else stopMusic();
    });

    bgMusic.addEventListener("play", setMusicButtonText);
    bgMusic.addEventListener("pause", setMusicButtonText);
  }
});
// ===== Gift Game (gift.html) =====
const giftsWrap = document.getElementById("gifts");
const giftResult = document.getElementById("giftResult");
const giftTitle = document.getElementById("giftTitle");
const giftText = document.getElementById("giftText");
const giftAgain = document.getElementById("giftAgain");

if (giftsWrap && giftResult && giftTitle && giftText && giftAgain) {
  let winning = Math.floor(Math.random() * 3) + 1;

  function reveal(isWin){
    giftResult.hidden = false;
    giftsWrap.style.display = "none";
    if (isWin) {
      burstFlowers(60);
      giftTitle.textContent = "💖 Surprise!";
      giftText.textContent = "I LOVE YOU BABY 🤍🌹";
      showToast("You found it 💝");
    } else {
      giftTitle.textContent = "😄 Almost!";
      giftText.textContent = "Try again… your gift is waiting 🎁";
      showToast("Nope — again!");
    }
  }

  giftsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".gift");
    if (!btn) return;
    const pick = Number(btn.dataset.g);
    reveal(pick === winning);
  });

  giftAgain.addEventListener("click", () => {
    winning = Math.floor(Math.random() * 3) + 1;
    giftResult.hidden = true;
    giftsWrap.style.display = "grid";
  });
}
// ===== Lightbox (gallery.html) =====
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");
const lbX = document.getElementById("lbX");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");
const galleryEl = document.getElementById("gallery");

let lbIndex = 0;

function getImages(){
  return Array.isArray(window.__galleryImages) ? window.__galleryImages : [];
}

function openLB(index){
  const imgs = getImages();
  if (!lightbox || !lbImg || imgs.length === 0) return;
  lbIndex = Math.max(0, Math.min(index, imgs.length - 1));
  lbImg.src = imgs[lbIndex];
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLB(){
  if (!lightbox) return;
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
}

function navLB(dir){
  const imgs = getImages();
  if (imgs.length === 0) return;
  lbIndex = (lbIndex + dir + imgs.length) % imgs.length;
  lbImg.src = imgs[lbIndex];
}

if (galleryEl && lightbox && lbImg) {
  galleryEl.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    const index = Number(img.dataset.index || 0);
    openLB(index);
  });
}

if (lbClose) lbClose.addEventListener("click", closeLB);
if (lbX) lbX.addEventListener("click", closeLB);
if (lbPrev) lbPrev.addEventListener("click", () => navLB(-1));
if (lbNext) lbNext.addEventListener("click", () => navLB(1));

document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("show")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") navLB(-1);
  if (e.key === "ArrowRight") navLB(1);
});

// Swipe for mobile
let startX = null;
if (lbImg) {
  lbImg.addEventListener("touchstart", (e) => {
    startX = e.touches?.[0]?.clientX ?? null;
  }, { passive: true });

  lbImg.addEventListener("touchend", (e) => {
    if (startX == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? startX;
    const dx = endX - startX;
    startX = null;
    if (Math.abs(dx) < 40) return;
    if (dx > 0) navLB(-1);
    else navLB(1);
  }, { passive: true });
}