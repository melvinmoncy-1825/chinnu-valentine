window.addEventListener("DOMContentLoaded", () => {
  // ===== Common elements =====
  const flowersLayer = document.getElementById("flowers");
  const btn = document.getElementById("surpriseBtn");
  const toast = document.getElementById("toast");

  // ===== Envelope modal (index page only) =====
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
    const fallDuration = 7 + Math.random() * 7; // seconds
    const swayDuration = 2 + Math.random() * 3;

    el.style.left = left + "vw";
    el.style.fontSize = size + "px";
    el.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
    el.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;

    flowersLayer.appendChild(el);
    setTimeout(() => el.remove(), (fallDuration + 0.5) * 1000);
  }

  // Start falling flowers (tune for performance)
  for (let i = 0; i < 10; i++) spawnFlower();
  setInterval(spawnFlower, 900); // increase to 1100+ if phone is slow

  // Burst
  function burstFlowers(count = 40) {
    for (let i = 0; i < count; i++) spawnFlower();
  }

  // ===== Envelope modal functions =====
  function openEnvelopeModal() {
    if (!modal) return;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    // reset envelope closed each time
    if (envelope) envelope.classList.remove("open");

    // add a nice moment
    burstFlowers(50);
    showToast("I LOVE YOU BABY 🤍🌹");
  }

  function closeEnvelopeModal() {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  // Surprise button: open envelope if present, else do a burst+toast fallback
  if (btn) {
    btn.addEventListener("click", () => {
      if (modal) {
        openEnvelopeModal();
      } else {
        burstFlowers(50);
        showToast("Chinnu 🤍🌹 Happy Valentine’s Day!");
      }
    });
  }

  // Tap envelope to open/close
  if (envelope) {
    envelope.addEventListener("click", () => {
      envelope.classList.toggle("open");
    });
  }

  // Close modal
  if (closeBackdrop) closeBackdrop.addEventListener("click", closeEnvelopeModal);
  if (closeX) closeX.addEventListener("click", closeEnvelopeModal);

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEnvelopeModal();
  });
});