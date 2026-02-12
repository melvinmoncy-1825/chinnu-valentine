window.addEventListener("DOMContentLoaded", () => {
  const giftsWrap = document.getElementById("gifts");
  const giftResult = document.getElementById("giftResult");
  const giftTitle = document.getElementById("giftTitle");
  const giftText = document.getElementById("giftText");
  const giftAgain = document.getElementById("giftAgain");
  const openGiftSurprise = document.getElementById("openGiftSurprise");

  const modal = document.getElementById("giftEnvelopeModal");
  const env = document.getElementById("giftEnvelope");
  const closeBg = document.getElementById("closeGiftEnvelope");
  const closeX = document.getElementById("closeGiftEnvelopeX");

  // Not gift page → do nothing
  if (!giftsWrap || !giftResult || !giftTitle || !giftText || !giftAgain) return;

  // Always hide surprise button initially
  if (openGiftSurprise) openGiftSurprise.hidden = true;

  const WIN = "3"; // ✅ ONLY Gift 3

  function reset() {
    giftResult.hidden = true;
    giftsWrap.style.display = "grid";
    if (openGiftSurprise) openGiftSurprise.hidden = true;
  }

  giftsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".gift");
    if (!btn) return;

    const pick = btn.getAttribute("data-g"); // "1" / "2" / "3"

    giftResult.hidden = false;
    giftsWrap.style.display = "none";

    if (pick === WIN) {
      giftTitle.textContent = "💖 You found it!";
      giftText.textContent = "കുഞ്ഞേ… ഇതാ നിനക്കായി ഒരു സർപ്രൈസ് 💌";
      if (openGiftSurprise) openGiftSurprise.hidden = false;
      window.showToast?.("Open Surprise 💌");
    } else {
      giftTitle.textContent = "😄 Not this one!";
      giftText.textContent = "ഇത് അല്ല കുഞ്ഞേ… വീണ്ടും ശ്രമിക്കൂ 😄🎁";
      if (openGiftSurprise) openGiftSurprise.hidden = true;
      window.showToast?.("Try again 😄");
    }
  });

  giftAgain.addEventListener("click", reset);

  function openModal() {
    if (!modal) return;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    env?.classList.remove("open");
    window.showToast?.("I LOVE YOU BABY 🤍🌹");
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  openGiftSurprise?.addEventListener("click", openModal);
  env?.addEventListener("click", () => env.classList.toggle("open"));
  closeBg?.addEventListener("click", closeModal);
  closeX?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
});