window.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // Toast
  const toast = $("toast");
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // Flowers (optional)
  const flowersLayer = $("flowers");
  const flowerEmojis = ["🌸", "🌺", "🌷", "🌹", "💮", "🌼"];
  function spawnFlower() {
    if (!flowersLayer) return;
    const el = document.createElement("div");
    el.className = "flower";
    el.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    el.style.left = (Math.random() * 100) + "vw";
    el.style.fontSize = (18 + Math.random() * 22) + "px";
    el.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
    el.style.animationDuration = `${7 + Math.random() * 7}s, ${2 + Math.random() * 3}s`;
    flowersLayer.appendChild(el);
    setTimeout(() => el.remove(), 16000);
  }
  function burstFlowers(n=40){ for(let i=0;i<n;i++) spawnFlower(); }
  if (flowersLayer) { for (let i=0;i<8;i++) spawnFlower(); setInterval(spawnFlower, 1100); }

  // ===== Gift elements =====
  const giftsWrap = $("gifts");
  const giftResult = $("giftResult");
  const giftTitle = $("giftTitle");
  const giftText = $("giftText");
  const giftAgain = $("giftAgain");
  const openGiftSurprise = $("openGiftSurprise");

  // Envelope modal elements
  const giftEnvelopeModal = $("giftEnvelopeModal");
  const giftEnvelope = $("giftEnvelope");
  const closeGiftBackdrop = $("closeGiftEnvelope");
  const closeGiftX = $("closeGiftEnvelopeX");

  // Hide surprise button always at start
  if (openGiftSurprise) openGiftSurprise.hidden = true;

  function resetGiftUI() {
    if (giftResult) giftResult.hidden = true;
    if (giftsWrap) giftsWrap.style.display = "grid";
    if (openGiftSurprise) openGiftSurprise.hidden = true;
  }

  // Gift logic: ONLY Gift 3 wins
  if (giftsWrap && giftResult && giftTitle && giftText && giftAgain) {
    const winning = 3;

    giftsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".gift");
      if (!btn) return;

      // ✅ IMPORTANT: this reads data-g from the clicked button
      const pick = Number(btn.getAttribute("data-g"));

      giftResult.hidden = false;
      giftsWrap.style.display = "none";

      if (pick === winning) {
        burstFlowers(80);
        giftTitle.textContent = "💖 You found it!";
        giftText.textContent = "കുഞ്ഞേ… ഇതാ നിനക്കായി ഒരു സർപ്രൈസ് 💌";
        if (openGiftSurprise) openGiftSurprise.hidden = false; // ✅ only gift 3
        showToast("Open Surprise 💌");
      } else {
        giftTitle.textContent = "😄 Not this one!";
        giftText.textContent = "ഇത് അല്ല കുഞ്ഞേ… വീണ്ടും ശ്രമിക്കൂ 😄🎁";
        if (openGiftSurprise) openGiftSurprise.hidden = true;  // ✅ gift 1/2 no surprise
        showToast("Try again 😄");
      }
    });

    giftAgain.addEventListener("click", resetGiftUI);
  }

  // Envelope open/close
  function openGiftEnvelopeModalFn() {
    if (!giftEnvelopeModal) return;
    giftEnvelopeModal.classList.add("show");
    giftEnvelopeModal.setAttribute("aria-hidden", "false");
    if (giftEnvelope) giftEnvelope.classList.remove("open");
    burstFlowers(60);
    showToast("I LOVE YOU BABY 🤍🌹");
  }

  function closeGiftEnvelopeModalFn() {
    if (!giftEnvelopeModal) return;
    giftEnvelopeModal.classList.remove("show");
    giftEnvelopeModal.setAttribute("aria-hidden", "true");
  }

  if (openGiftSurprise) openGiftSurprise.addEventListener("click", openGiftEnvelopeModalFn);
  if (giftEnvelope) giftEnvelope.addEventListener("click", () => giftEnvelope.classList.toggle("open"));
  if (closeGiftBackdrop) closeGiftBackdrop.addEventListener("click", closeGiftEnvelopeModalFn);
  if (closeGiftX) closeGiftX.addEventListener("click", closeGiftEnvelopeModalFn);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeGiftEnvelopeModalFn();
  });
});