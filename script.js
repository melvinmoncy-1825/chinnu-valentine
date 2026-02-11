window.addEventListener("DOMContentLoaded", () => {
  // ===== Common elements =====
  const flowersLayer = document.getElementById("flowers");
  const toast = document.getElementById("toast");

  const surpriseBtn = document.getElementById("surpriseBtn");
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

  // ===== Falling flowers =====
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

  function burstFlowers(count = 40) {
    for (let i = 0; i < count; i++) spawnFlower();
  }

  for (let i = 0; i < 8; i++) spawnFlower();
  setInterval(spawnFlower, 1100);

  // ===== Envelope modal (index only) =====
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

  if (surpriseBtn) surpriseBtn.addEventListener("click", openEnvelopeModal);
  if (envelope) envelope.addEventListener("click", () => envelope.classList.toggle("open"));
  if (closeBackdrop) closeBackdrop.addEventListener("click", closeEnvelopeModal);
  if (closeX) closeX.addEventListener("click", closeEnvelopeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEnvelopeModal();
  });

  // ===== MUSIC (gallery only - stable) =====
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
    } catch {
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

  // ===== Secret Keypad (story.html) =====
  const secretPortalBtn = document.getElementById("secretPortalBtn");
  const keypadModal = document.getElementById("keypadModal");
  const keypadClose = document.getElementById("keypadClose");
  const keypadCloseX = document.getElementById("keypadCloseX");
  const keypad = document.getElementById("keypad");
  const kdisplay = document.getElementById("kdisplay");
  const kunlock = document.getElementById("kunlock");
  const kerror = document.getElementById("kerror");

  let entered = "";

  function renderDots() {
    if (!kdisplay) return;
    const dots = "•".repeat(Math.min(entered.length, 4));
    kdisplay.textContent = (dots + "••••").slice(0, 4);
  }

  function openKeypad() {
    if (!keypadModal) return;
    entered = "";
    renderDots();
    if (kerror) kerror.hidden = true;
    keypadModal.classList.add("show");
    keypadModal.setAttribute("aria-hidden", "false");
  }

  function closeKeypad() {
    if (!keypadModal) return;
    keypadModal.classList.remove("show");
    keypadModal.setAttribute("aria-hidden", "true");
  }

  function wrong() {
    if (kerror) kerror.hidden = false;
    if (keypadModal) {
      const card = keypadModal.querySelector(".kmodal-card");
      if (card) {
        card.classList.remove("kshake");
        void card.offsetWidth;
        card.classList.add("kshake");
      }
    }
    entered = "";
    renderDots();
  }

  function tryUnlock() {
    if (entered === "1825") {
      closeKeypad();
      window.location.href = "secret.html";
    } else {
      wrong();
      showToast("Wrong password 😄");
    }
  }

  if (secretPortalBtn) {
    secretPortalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openKeypad();
    });
  }

  if (keypadClose) keypadClose.addEventListener("click", closeKeypad);
  if (keypadCloseX) keypadCloseX.addEventListener("click", closeKeypad);

  if (keypad) {
    keypad.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const digit = btn.dataset.k;
      const act = btn.dataset.act;

      if (act === "clear") {
        entered = "";
        if (kerror) kerror.hidden = true;
        renderDots();
        return;
      }
      if (act === "back") {
        entered = entered.slice(0, -1);
        if (kerror) kerror.hidden = true;
        renderDots();
        return;
      }

      if (digit && entered.length < 4) {
        entered += digit;
        if (kerror) kerror.hidden = true;
        renderDots();
        if (entered.length === 4) tryUnlock();
      }
    });
  }

  if (kunlock) kunlock.addEventListener("click", tryUnlock);

  document.addEventListener("keydown", (e) => {
    if (!keypadModal || !keypadModal.classList.contains("show")) return;
    if (e.key === "Escape") closeKeypad();
  });
});