window.addEventListener("DOMContentLoaded", () => {
  const flowersLayer = document.getElementById("flowers");
  const btn = document.getElementById("surpriseBtn");
  const toast = document.getElementById("toast");

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

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

  for (let i = 0; i < 12; i++) spawnFlower();
  setInterval(spawnFlower, 650);

  function burstFlowers() {
    for (let i = 0; i < 50; i++) spawnFlower();
  }

  if (btn) {
    btn.addEventListener("click", () => {
      burstFlowers();
      showToast("Chinnu 🤍🌹 Happy Valentine’s Day!");
    });
  }
});