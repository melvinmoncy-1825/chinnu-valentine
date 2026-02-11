window.addEventListener("DOMContentLoaded", () => {
  // ===== Common =====
  const flowersLayer = document.getElementById("flowers");
  const toast = document.getElementById("toast");

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

  // ===== Envelope modal (INDEX page: existing) =====
  const surpriseBtn = document.getElementById("surpriseBtn");
  const modal = document.getElementById("envelopeModal");
  const envelope = document.getElementById("envelope");
  const closeBackdrop = document.getElementById("closeEnvelope");
  const closeX = document.getElementById("closeEnvelopeX");

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

  // ===== Envelope modal (GIFT page: NEW) =====
  const giftEnvelopeModal = document.getElementById("giftEnvelopeModal");
  const giftEnvelope = document.getElementById("giftEnvelope");
  const closeGiftBackdrop = document.getElementById("closeGiftEnvelope");
  const closeGiftX = document.getElementById("closeGiftEnvelopeX");
  const openGiftSurprise = document.getElementById("openGiftSurprise");

  function openGiftEnvelopeModal() {
    if (!giftEnvelopeModal) return;
    giftEnvelopeModal.classList.add("show");
    giftEnvelopeModal.setAttribute("aria-hidden", "false");
    if (giftEnvelope) giftEnvelope.classList.remove("open");
    burstFlowers(70);
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

  // Escape closes any modal
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeEnvelopeModal();
    closeGiftEnvelopeModal();
    closeKeypad();
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

  // ===== Gift game logic (gift.html) =====
  const giftsWrap = document.getElementById("gifts");
  const giftResult = document.getElementById("giftResult");
  const giftTitle = document.getElementById("giftTitle");
  const giftText = document.getElementById("giftText");
  const giftAgain = document.getElementById("giftAgain");

  if (giftsWrap && giftResult && giftTitle && giftText && giftAgain) {
    let winning = Math.floor(Math.random() * 3) + 1;

    function reveal(isWin) {
      giftResult.hidden = false;
      giftsWrap.style.display = "none";

      if (isWin) {
        burstFlowers(80);
        giftTitle.textContent = "💖 Surprise!";
        giftText.textContent = "കുഞ്ഞേ… ഇതാ നിനക്കായി ഒരു സർപ്രൈസ് 💌";
        if (openGiftSurprise) openGiftSurprise.hidden = false;
        showToast("You found it 💝");
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
});