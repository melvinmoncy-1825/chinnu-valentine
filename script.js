window.addEventListener("DOMContentLoaded", () => {
  const flowersLayer = document.getElementById("flowers");
  const toast = document.getElementById("toast");

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // ===== Flowers =====
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

  function burstFlowers(count = 50) {
    for (let i = 0; i < count; i++) spawnFlower();
  }

  for (let i = 0; i < 8; i++) spawnFlower();
  setInterval(spawnFlower, 1100);

  // ===== Gift game =====
  const giftsWrap = document.getElementById("gifts");
  const giftResult = document.getElementById("giftResult");
  const giftTitle = document.getElementById("giftTitle");
  const giftText = document.getElementById("giftText");
  const giftAgain = document.getElementById("giftAgain");
  const openGiftSurprise = document.getElementById("openGiftSurprise");

  if (giftsWrap && giftResult && giftTitle && giftText && giftAgain) {
    let winning = Math.floor(Math.random() * 3) + 1;

    function reveal(isWin) {
      giftResult.hidden = false;
      giftsWrap.style.display = "none";

      if (isWin) {
        burstFlowers(90);
        giftTitle.textContent = "💖 You found it!";
        giftText.textContent = "കുഞ്ഞേ… ഇതാ നിനക്കായി ഒരു സർപ്രൈസ് 💌";
        if (openGiftSurprise) openGiftSurprise.hidden = false;
        showToast("Now open the surprise 💝");
      } else {
        giftTitle.textContent = "😄 Almost!";
        giftText.textContent = "വീണ്ടും ശ്രമിക്കൂ… നിന്റെ സർപ്രൈസ് കാത്തിരിക്കുന്നു 🎁";
        if (openGiftSurprise) openGiftSurprise.hidden = true;
        showToast("Try again 😄");
      }
    }

    giftsWrap.addEventListener("click", (e) => {
      const b = e.target.closest(".gift");
      if (!b) return;
      const pick = Number(b.dataset.g);
      reveal(pick === winning);
    });

    giftAgain.addEventListener("click", () => {
      winning = Math.floor(Math.random() * 3) + 1;
      giftResult.hidden = true;
      giftsWrap.style.display = "grid";
      if (openGiftSurprise) openGiftSurprise.hidden = true;
    });
  }

  // ===== Envelope popup on gift page =====
  const giftEnvelopeModal = document.getElementById("giftEnvelopeModal");
  const giftEnvelope = document.getElementById("giftEnvelope");
  const closeGiftBackdrop = document.getElementById("closeGiftEnvelope");
  const closeGiftX = document.getElementById("closeGiftEnvelopeX");

  function openGiftEnvelopeModal() {
    if (!giftEnvelopeModal) return;
    giftEnvelopeModal.classList.add("show");
    giftEnvelopeModal.setAttribute("aria-hidden", "false");
    if (giftEnvelope) giftEnvelope.classList.remove("open");
    burstFlowers(80);
    showToast("I LOVE YOU BABY 🤍🌹");
  }

  function closeGiftEnvelopeModal() {
    if (!giftEnvelopeModal) return;
    giftEnvelopeModal.classList.remove("show");
    giftEnvelopeModal.setAttribute("aria-hidden", "true");
  }

  if (openGiftSurprise) openGiftSurprise.addEventListener("click", openGiftEnvelopeModal);
  if (giftEnvelope) giftEnvelope.addEventListener("click", () => giftEnvelope.classList.toggle("open"));
  if (closeGiftBackdrop) closeGiftBackdrop.addEventListener("click", closeGiftEnvelopeModal);
  if (closeGiftX) closeGiftX.addEventListener("click", closeGiftEnvelopeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeGiftEnvelopeModal();
  });
});