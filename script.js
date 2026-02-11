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

  if (envelope) {
    envelope.addEventListener("click", () => envelope.classList.toggle("open"));
  }

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

  // ===== SECRET password on story page =====
  const secretPortalBtn = document.getElementById("secretPortalBtn");

  if (secretPortalBtn) {
    secretPortalBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const pass = prompt("Enter password 🔒");
      if (pass === null) return;

      if (pass.trim() === "1825") {
        window.location.href = "secret.html";
      } else {
        showToast("Wrong password 😄");
      }
    });
  }
});