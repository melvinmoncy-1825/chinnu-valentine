const btn = document.getElementById("surpriseBtn");
const toast = document.getElementById("toast");

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function confettiBurst() {
  // lightweight confetti using emoji
  const count = 40;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.textContent = Math.random() > 0.5 ? "💖" : "✨";
    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-20px";
    el.style.fontSize = (16 + Math.random() * 18) + "px";
    el.style.transition = "transform 2.2s linear, opacity 2.2s linear";
    el.style.zIndex = "9999";
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      const fall = 110 + Math.random() * 120;
      const drift = (Math.random() * 2 - 1) * 40;
      el.style.transform = `translate(${drift}px, ${fall}vh) rotate(${Math.random()*360}deg)`;
      el.style.opacity = "0";
    });

    setTimeout(() => el.remove(), 2300);
  }
}

if (btn) {
  btn.addEventListener("click", () => {
    confettiBurst();
    showToast("Chinnu, you’re my favorite person. ❤️");
  });
}