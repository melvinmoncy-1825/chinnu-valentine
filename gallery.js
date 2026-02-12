window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  if (!audio || !btn) return;

  function update() {
    btn.textContent = audio.paused ? "▶️ Play music" : "🔇 Stop music";
  }

  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch {
      // mobile needs user gesture—this click IS the gesture. If it fails, file path is wrong.
      window.showToast?.("Music file not loading");
    }
    update();
  });

  audio.addEventListener("play", update);
  audio.addEventListener("pause", update);
  update();
});