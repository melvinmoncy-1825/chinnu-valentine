window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("secretPortalBtn");
  const modal = document.getElementById("keypadModal");
  const closeBg = document.getElementById("keypadClose");
  const closeX = document.getElementById("keypadCloseX");
  const keypad = document.getElementById("keypad");
  const display = document.getElementById("kdisplay");
  const unlock = document.getElementById("kunlock");
  const err = document.getElementById("kerror");

  if (!btn || !modal || !keypad || !display || !unlock) return;

  let entered = "";

  function render() {
    const dots = "•".repeat(Math.min(entered.length, 4));
    display.textContent = (dots + "••••").slice(0, 4);
  }

  function open() {
    entered = "";
    render();
    if (err) err.hidden = true;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  function close() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  function wrong() {
    if (err) err.hidden = false;
    entered = "";
    render();
    window.showToast?.("Wrong password 😄");
  }

  function tryUnlock() {
    if (entered === "1825") {
      close();
      window.location.href = "secret.html";
    } else {
      wrong();
    }
  }

  btn.addEventListener("click", (e) => { e.preventDefault(); open(); });
  closeBg?.addEventListener("click", close);
  closeX?.addEventListener("click", close);

  keypad.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;

    const digit = b.dataset.k;
    const act = b.dataset.act;

    if (act === "clear") { entered = ""; if (err) err.hidden = true; render(); return; }
    if (act === "back")  { entered = entered.slice(0, -1); if (err) err.hidden = true; render(); return; }

    if (digit && entered.length < 4) {
      entered += digit;
      if (err) err.hidden = true;
      render();
      if (entered.length === 4) tryUnlock();
    }
  });

  unlock.addEventListener("click", tryUnlock);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
});