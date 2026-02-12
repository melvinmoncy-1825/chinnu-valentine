window.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");
  window.showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  };

  const flowersLayer = document.getElementById("flowers");
  if (!flowersLayer) return;

  const emojis = ["🌸","🌺","🌷","🌹","💮","🌼"];
  function spawn() {
    const el = document.createElement("div");
    el.className = "flower";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (Math.random() * 100) + "vw";
    el.style.fontSize = (18 + Math.random() * 22) + "px";
    el.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
    el.style.animationDuration = `${7 + Math.random() * 7}s, ${2 + Math.random() * 3}s`;
    flowersLayer.appendChild(el);
    setTimeout(() => el.remove(), 16000);
  }

  for (let i = 0; i < 8; i++) spawn();
  setInterval(spawn, 1100);
});