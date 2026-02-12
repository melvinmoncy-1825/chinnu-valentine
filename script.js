window.addEventListener("DOMContentLoaded", () => {
  // ---------- Helpers ----------
  const $ = (id) => document.getElementById(id);

  const toast = $("toast");
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // ---------- Flowers (safe on all pages) ----------
  const flowersLayer = $("flowers");
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

  // Start flower loop only if layer exists
  if (flowersLayer) {
    for (let i = 0; i < 8; i++) spawnFlower();
    setInterval(spawnFlower, 1100);
  }

  // ---------- Index Envelope (only if exists) ----------
  const indexModal = $("envelopeModal");
  const indexEnvelope = $("envelope");
  const indexCloseBackdrop = $("closeEnvelope");
  const indexCloseX = $("closeEnvelopeX");
  const surpriseBtn = $("surpriseBtn"); // may be removed, ok

  function openIndexEnvelope() {
    if (!indexModal) return;
    indexModal.classList.add("show");
    indexModal.setAttribute("aria-hidden", "false");
    if (indexEnvelope) indexEnvelope.classList.remove("open");
    burstFlowers(70);
    showToast("I LOVE YOU BABY 🤍🌹");
  }

  function closeIndexEnvelope() {
    if (!indexModal) return;
    indexModal.classList.remove("show");
    indexModal.setAttribute("aria-hidden", "true");
  }

  if (surpriseBtn) surpriseBtn.addEventListener("click", openIndexEnvelope);
  if (indexEnvelope) indexEnvelope.addEventListener("click", () => indexEnvelope.classList.toggle("open"));
  if (indexCloseBackdrop) indexCloseBackdrop.addEventListener("click", closeIndexEnvelope);
  if (indexCloseX) indexCloseX.addEventListener("click", closeIndexEnvelope);

  // ---------- Gallery Music (only if exists) ----------
  const bgMusic = $("bgMusic");
  const musicBtn = $("musicBtn");
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
      showToast("Tap again to play 🎶");
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

  // ---------- Gift page: Gift 3 ONLY + Envelope popup ----------
  const giftsWrap = $("gifts");
  const giftResult = $("giftResult");
  const giftTitle = $("giftTitle");
  const giftText = $("giftText");
  const giftAgain = $("giftAgain");
  const openGiftSurprise = $("openGiftSurprise");

  const giftEnvelopeModal = $("giftEnvelopeModal");
  const giftEnvelope = $("giftEnvelope");
  const closeGiftBackdrop = $("closeGiftEnvelope");
  const closeGiftX = $("closeGiftEnvelopeX");

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

  function resetGiftUI() {
    if (giftResult) giftResult.hidden = true;
    if (giftsWrap) giftsWrap.style.display = "grid";
    if (openGiftSurprise) openGiftSurprise.hidden = true;
  }

  if (giftsWrap && giftResult && giftTitle && giftText && giftAgain) {
    const winning = 3; // ✅ Gift 3 ONLY

    // ensure button hidden at start
    if (openGiftSurprise) openGiftSurprise.hidden = true;

    giftsWrap.addEventListener("click", (e) => {
      const b = e.target.closest(".gift");
      if (!b) return;

      const pick = Number(b.dataset.g);

      giftResult.hidden = false;
      giftsWrap.style.display = "none";

      if (pick === winning) {
        burstFlowers(90);
        giftTitle.textContent = "💖 You found it!";
        giftText.textContent = "കുഞ്ഞേ… ഇതാ നിനക്കായി ഒരു സർപ്രൈസ് 💌";
        if (openGiftSurprise) openGiftSurprise.hidden = false; // ✅ only gift 3
        showToast("Open the surprise 💝");
      } else {
        giftTitle.textContent = "😄 Not this one!";
        giftText.textContent = "ഇത് അല്ല കുഞ്ഞേ… വീണ്ടും ശ്രമിക്കൂ 😄🎁";
        if (openGiftSurprise) openGiftSurprise.hidden = true;  // ✅ hide for gift 1 & 2
        showToast("Try again 😄");
      }
    });

    giftAgain.addEventListener("click", resetGiftUI);
  }

  if (openGiftSurprise) openGiftSurprise.addEventListener("click", openGiftEnvelopeModal);
  if (giftEnvelope) giftEnvelope.addEventListener("click", () => giftEnvelope.classList.toggle("open"));
  if (closeGiftBackdrop) closeGiftBackdrop.addEventListener("click", closeGiftEnvelopeModal);
  if (closeGiftX) closeGiftX.addEventListener("click", closeGiftEnvelopeModal);

  // ---------- Story keypad (only if exists) ----------
  const secretPortalBtn = $("secretPortalBtn");
  const keypadModal = $("keypadModal");
  const keypadClose = $("keypadClose");
  const keypadCloseX = $("keypadCloseX");
  const keypad = $("keypad");
  const kdisplay = $("kdisplay");
  const kunlock = $("kunlock");
  const kerror = $("kerror");

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

  function wrongKeypad() {
    if (kerror) kerror.hidden = false;
    const card = keypadModal?.querySelector?.(".kmodal-card");
    if (card) {
      card.classList.remove("kshake");
      void card.offsetWidth;
      card.classList.add("kshake");
    }
    entered = "";
    renderDots();
  }

  function tryUnlock() {
    if (entered === "1825") {
      closeKeypad();
      window.location.href = "secret.html";
    } else {
      wrongKeypad();
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

  // ---------- Escape closes whatever exists ----------
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeIndexEnvelope();
    closeGiftEnvelopeModal();
    closeKeypad();
  });
});