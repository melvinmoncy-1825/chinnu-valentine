:root{
  --bg:#ffffff;
  --card:#ffffff;
  --text:#1a1a1a;
  --muted:#666;
  --red:#d61f2c;
  --red2:#ff5a6a;
  --border:#eee;
  --shadow: 0 14px 50px rgba(0,0,0,.12);
  --radius: 20px;
}

*{ box-sizing:border-box; }

body{
  margin:0;
  min-height:100vh;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color:var(--text);
  background:
    radial-gradient(900px 600px at 10% 10%, rgba(214,31,44,.10) 0%, transparent 60%),
    radial-gradient(900px 600px at 90% 15%, rgba(214,31,44,.08) 0%, transparent 55%),
    linear-gradient(180deg, #ffffff, #fff5f6);
  display:grid;
  place-items:center;
  padding:24px;
}

.bg-petals{
  position:fixed;
  inset:0;
  pointer-events:none;
  opacity:.22;
  background-image:
    radial-gradient(circle at 12% 18%, rgba(214,31,44,.35) 0 2px, transparent 3px),
    radial-gradient(circle at 72% 28%, rgba(214,31,44,.25) 0 2px, transparent 3px),
    radial-gradient(circle at 30% 80%, rgba(214,31,44,.18) 0 2px, transparent 3px),
    radial-gradient(circle at 90% 75%, rgba(214,31,44,.20) 0 2px, transparent 3px);
  background-size: 220px 220px, 280px 280px, 260px 260px, 240px 240px;
}

.card{
  width:min(560px, 100%);
  background:var(--card);
  border:1px solid var(--border);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  padding:28px;
}

.card.wide{ width:min(920px, 100%); }

.badge{
  display:inline-flex;
  gap:8px;
  align-items:center;
  font-weight:800;
  color:var(--red);
  border:1px solid rgba(214,31,44,.25);
  padding:8px 12px;
  border-radius:999px;
  background: linear-gradient(180deg, #fff, #fff3f4);
  margin-bottom: 12px;
}

h1{
  margin:0 0 10px;
  font-size: clamp(28px, 4vw, 40px);
  letter-spacing: .2px;
}

.subtitle{
  margin:0 0 22px;
  color:var(--muted);
  line-height:1.45;
}

.button-grid{
  display:grid;
  gap:12px;
  margin-top:10px;
}

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  text-decoration:none;
  padding:14px 16px;
  border-radius:14px;
  border:1px solid rgba(214,31,44,.18);
  background: linear-gradient(135deg, var(--red), var(--red2));
  color:#fff;
  font-weight:900;
  cursor:pointer;
  transition: transform .12s ease, filter .12s ease;
}
.btn:hover{ transform: translateY(-1px); filter:saturate(1.05); }
.btn:active{ transform: translateY(1px); }

.btn-ghost{
  background:#fff;
  color:var(--red);
  border:1px solid rgba(214,31,44,.35);
}

.footer{
  margin-top:18px;
  display:flex;
  justify-content:center;
}

.tiny{
  margin:0;
  font-size: 12px;
  color: var(--muted);
}

.topbar{
  display:grid;
  grid-template-columns: 1fr auto 1fr;
  align-items:center;
  gap:10px;
  margin-bottom: 10px;
}

.link{
  color: var(--red);
  text-decoration:none;
  font-weight:800;
}
.link:hover{ text-decoration:underline; }

.gallery{
  margin-top:16px;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap:12px;
}

.gallery img{
  width:100%;
  height:220px;
  object-fit:cover;
  border-radius:16px;
  border:1px solid var(--border);
  box-shadow: 0 10px 26px rgba(0,0,0,.10);
}

.note{
  margin-top: 14px;
  padding: 18px;
  border:1px solid var(--border);
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff, #fff7f8);
}

.note h2{ margin:0 0 10px; color: var(--red); }
.note h3{ margin-top:14px; color: var(--text); }
.note p, .note li{ line-height:1.65; }
.note ul{ margin: 10px 0 0; padding-left: 18px; }
.ending{ margin-top: 14px; font-weight:1000; color: var(--red); }
.sign{ margin-top: 6px; color: var(--muted); }

.toast{
  position: fixed;
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  background: #ffffff;
  border:1px solid rgba(214,31,44,.22);
  padding: 10px 14px;
  border-radius: 999px;
  box-shadow: var(--shadow);
  opacity: 0;
  pointer-events:none;
  transition: opacity .2s ease;
  font-weight:900;
  color: var(--red);
}
.toast.show{ opacity: 1; }