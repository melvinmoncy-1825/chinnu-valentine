window.addEventListener("DOMContentLoaded", () => {
  const giftsWrap = document.getElementById("gifts");
  const giftResult = document.getElementById("giftResult");
  const giftTitle = document.getElementById("giftTitle");
  const giftText = document.getElementById("giftText");
  const giftAgain = document.getElementById("giftAgain");
  const openGiftSurprise = document.getElementById("openGiftSurprise");

  const giftEnvelopeModal = document.getElementById("giftEnvelopeModal");
  const giftEnvelope = document.getElementById("giftEnvelope");
  const closeGiftBackdrop = document.getElementById("closeGiftEnvelope");
  const closeGiftX = document.getElementById("closeGiftEnvelopeX");

  // If this page doesn't have gift UI, do nothing
  if (!giftsWrap || !giftResult || !giftTitle || !giftText || !giftAgain) return;

  // Always hide surprise button initially
  if (openGiftSurprise) openGiftSurprise.hidden = true;

  const WINNING = "3"; // ✅ only gift 3

  function resetGiftUI() {
    giftResult.hidden = true;
    giftsWrap.style.display = "grid";
    if (openGiftSurprise) openGiftSurprise.hidden = true;
  }

  giftsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".gift");
    if (!btn) return;

    const pick = btn.getAttribute("data-g"); // string "1"/"2"/"3"

    giftResult.hidden = false;
    giftsWrap.style.display = "none";

    if (pick === WINNING) {
      giftTitle.textContent = "💖 You found it!";
      giftText.textContent = "കുഞ്ഞേ… ഇതാ നിനക്കായി ഒരു സർപ്രൈസ് 💌";
      if (openGiftSurprise) openGiftSurprise.hidden = false; // ✅ only gift 3
    } else {
      giftTitle.textContent = "😄 Not this one!";
      giftText.textContent = "ഇത് അല്ല കുഞ്ഞേ… വീണ്ടും ശ്രമിക്കൂ 😄🎁";
      if (openGiftSurprise) openGiftSurprise.hidden = true; // ✅ gift 1/2 no surprise
    }
  });

  giftAgain.addEventListener("click", resetGiftUI);

  // Envelope modal
  function openModal() {
    if (!giftEnvelopeModal) return;
    giftEnvelopeModal.classList.add("show");
    giftEnvelopeModal.setAttribute("aria-hidden", "false");
    if (giftEnvelope) giftEnvelope.classList.remove("open");
  }

  function closeModal() {
    if (!giftEnvelopeModal) return;
    giftEnvelopeModal.classList.remove("show");
    giftEnvelopeModal.setAttribute("aria-hidden", "true");
  }

  if (openGiftSurprise) openGiftSurprise.addEventListener("click", openModal);
  if (giftEnvelope) giftEnvelope.addEventListener("click", () => giftEnvelope.classList.toggle("open"));
  if (closeGiftBackdrop) closeGiftBackdrop.addEventListener("click", closeModal);
  if (closeGiftX) closeGiftX.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});