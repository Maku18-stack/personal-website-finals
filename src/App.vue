<template>
  <div class="page">
    <!-- Top bar -->
    <header class="topbar">
      <div class="brand">
        <div class="dot"></div>
        <div>
          <div class="name">Mark Ani</div>
          <div class="tag">WEBPROG Finals • Personal Profile</div>
        </div>
      </div>

      <nav class="nav">
        <a href="#about">About</a>
        <a href="#stack">Stack</a>
        <a href="#projects">Projects</a>
        <a href="#guestbook">Guestbook</a>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="heroCard">
        <p class="kicker">Personal Profile Website</p>
        <h1 class="h1">Clean. Responsive. API-Connected.</h1>
        <p class="lead">
          A simple portfolio with a working guestbook powered by a REST API + Supabase.
        </p>

        <div class="ctaRow">
          <a class="btn" href="#guestbook">Leave a message</a>
          <a class="btn ghost" href="#projects">View projects</a>
        </div>

        <div class="meta">
          <div class="pill">GET + POST ✅</div>
          <div class="pill">Mobile Responsive ✅</div>
          <div class="pill">Supabase Connected ✅</div>
        </div>
      </div>
    </section>

    <!-- Content grid -->
    <main class="grid">
      <!-- Left column -->
      <section id="about" class="card">
        <h2 class="h2">About</h2>
        <p class="p">
          Hi! I’m <b>Mark Ani</b>. This site is my WEBPROG final project. It’s designed to be
          clean and minimal, while still showing real full-stack functionality (frontend + backend API + database).
        </p>

        <div class="infoGrid">
          <div class="info">
            <div class="label">Focus</div>
            <div class="value">Web Development</div>
          </div>
          <div class="info">
            <div class="label">Goal</div>
            <div class="value">Simple + scalable structure</div>
          </div>
          <div class="info">
            <div class="label">Features</div>
            <div class="value">Guestbook, Projects, Tech Stack</div>
          </div>
          <div class="info">
            <div class="label">Design</div>
            <div class="value">Black & White UI</div>
          </div>
        </div>
      </section>

      <!-- Right column -->
      <section id="stack" class="card">
        <h2 class="h2">Tech Stack</h2>
        <p class="p muted">
          Tools used in this project. (Logos scroll below.)
        </p>

        <!-- Marquee -->
        <div class="marquee" aria-label="tech logos marquee">
          <div class="track">
            <div class="chip">Vue.js</div>
            <div class="chip">React</div>
            <div class="chip">NestJS</div>
            <div class="chip">Supabase</div>
            <div class="chip">Vercel</div>
            <div class="chip">REST API</div>

            <!-- duplicate for seamless scroll -->
            <div class="chip">Vue.js</div>
            <div class="chip">React</div>
            <div class="chip">NestJS</div>
            <div class="chip">Supabase</div>
            <div class="chip">Vercel</div>
            <div class="chip">REST API</div>
          </div>
        </div>

        <div class="split">
          <div class="mini">
            <div class="miniTitle">Frontend</div>
            <div class="miniText">Vue + Vite • responsive layout • clean components</div>
          </div>
          <div class="mini">
            <div class="miniTitle">Backend</div>
            <div class="miniText">NestJS REST API • GET/POST endpoints</div>
          </div>
          <div class="mini">
            <div class="miniTitle">Database</div>
            <div class="miniText">Supabase (Postgres) • guestbook table</div>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="card full">
        <div class="row">
          <h2 class="h2">Projects</h2>
          <div class="right muted">Updated • clean cards • responsive</div>
        </div>

        <div class="cards">
          <article class="proj">
            <div class="projTop">
              <div class="projTitle">Personal Profile Website</div>
              <div class="badge">Live</div>
            </div>
            <p class="projText">
              Minimal portfolio UI with a working guestbook using REST API calls to a backend connected to Supabase.
            </p>
            <div class="projMeta">
              <span class="tagPill">Vue</span>
              <span class="tagPill">Vercel</span>
              <span class="tagPill">Responsive</span>
            </div>
          </article>

          <article class="proj">
            <div class="projTop">
              <div class="projTitle">Guestbook API</div>
              <div class="badge ghost">API</div>
            </div>
            <p class="projText">
              NestJS backend exposing <b>GET /guestbook</b> and <b>POST /guestbook</b> endpoints for database operations.
            </p>
            <div class="projMeta">
              <span class="tagPill">NestJS</span>
              <span class="tagPill">REST</span>
              <span class="tagPill">Supabase</span>
            </div>
          </article>

          <article class="proj">
            <div class="projTop">
              <div class="projTitle">Design System</div>
              <div class="badge ghost">UI</div>
            </div>
            <p class="projText">
              Black & white theme, consistent spacing, accessible contrast, clean typography, and mobile-first layout.
            </p>
            <div class="projMeta">
              <span class="tagPill">UI</span>
              <span class="tagPill">A11y</span>
              <span class="tagPill">Mobile</span>
            </div>
          </article>
        </div>
      </section>

      <!-- Guestbook -->
      <section id="guestbook" class="card full">
        <div class="row">
          <h2 class="h2">Guestbook</h2>
          <button class="btn ghost small" @click="load" :disabled="loading">
            {{ loading ? "Refreshing..." : "Refresh" }}
          </button>
        </div>

        <div class="guestGrid">
          <form class="form" @submit.prevent="submit">
            <label class="field">
              <span>Name</span>
              <input v-model="name" class="input" placeholder="Your name" maxlength="40" />
            </label>

            <label class="field">
              <span>Message</span>
              <textarea
                v-model="message"
                class="input textarea"
                placeholder="Write something..."
                maxlength="200"
              ></textarea>
              <div class="counter muted">{{ (message || "").length }}/200</div>
            </label>

            <button class="btn" :disabled="loading">
              {{ loading ? "Posting..." : "Post Message" }}
            </button>

            <p v-if="error" class="error">{{ error }}</p>
            <p v-if="ok" class="ok">Posted successfully.</p>
          </form>

          <div class="list">
            <div v-if="messages.length === 0" class="empty muted">
              No messages yet. Be the first to sign the guestbook.
            </div>

            <article v-for="m in messages" :key="m.id" class="msg">
              <div class="msgTop">
                <div class="msgName">{{ m.name }}</div>
                <div class="msgTime muted">{{ formatDate(m.created_at) }}</div>
              </div>
              <div class="msgBody">{{ m.message }}</div>
            </article>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="muted">© {{ new Date().getFullYear() }} Mark Ani • WEBPROG Final Project</div>
      <div class="muted">Built with Vue • API • Supabase</div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const API = import.meta.env.VITE_API_URL;

const name = ref("");
const message = ref("");
const messages = ref([]);
const loading = ref(false);
const error = ref("");
const ok = ref(false);

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleString();
}

async function load() {
  error.value = "";
  ok.value = false;
  loading.value = true;
  try {
    const res = await fetch(`${API}/guestbook`);
    const data = await res.json();
    messages.value = Array.isArray(data) ? data : [];
  } catch (e) {
    error.value = "Failed to load messages. Check API URL or backend status.";
  } finally {
    loading.value = false;
  }
}

async function submit() {
  error.value = "";
  ok.value = false;

  const n = (name.value || "").trim();
  const msg = (message.value || "").trim();
  if (!n || !msg) {
    error.value = "Please enter both name and message.";
    return;
  }

  loading.value = true;
  try {
    const res = await fetch(`${API}/guestbook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: n, message: msg }),
    });
    const data = await res.json();
    if (data?.error) {
      error.value = data.error;
    } else {
      name.value = "";
      message.value = "";
      ok.value = true;
      await load();
    }
  } catch (e) {
    error.value = "Failed to submit. Check backend and env vars.";
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<style>
:root{
  --bg:#0b0b0b;
  --card:#101010;
  --border:#1e1e1e;
  --text:#ffffff;
  --muted:rgba(255,255,255,.65);
  --muted2:rgba(255,255,255,.45);
  --shadow: 0 10px 30px rgba(0,0,0,.35);
  --radius:18px;
}

*{ box-sizing:border-box; }
html,body{ margin:0; padding:0; background:var(--bg); color:var(--text); }
a{ color:inherit; text-decoration:none; }
a:hover{ opacity:.85; }

.page{ min-height:100vh; }

.topbar{
  position:sticky; top:0; z-index:20;
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 18px;
  border-bottom:1px solid var(--border);
  background:rgba(11,11,11,.85);
  backdrop-filter: blur(10px);
}

.brand{ display:flex; align-items:center; gap:10px; }
.dot{ width:12px; height:12px; border-radius:999px; background:#fff; }
.name{ font-weight:800; letter-spacing:.2px; }
.tag{ font-size:12px; color:var(--muted); margin-top:2px; }

.nav{ display:flex; gap:14px; }
.nav a{ font-size:13px; color:var(--muted); padding:8px 10px; border-radius:999px; }
.nav a:hover{ background:rgba(255,255,255,.06); color:#fff; }

.hero{
  padding:28px 16px 8px;
  max-width:1080px;
  margin:0 auto;
}
.heroCard{
  border:1px solid var(--border);
  background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0));
  border-radius:var(--radius);
  padding:22px;
  box-shadow: var(--shadow);
}
.kicker{ color:var(--muted); margin:0 0 10px; font-size:12px; letter-spacing:.14em; text-transform:uppercase; }
.h1{ margin:0 0 10px; font-size:34px; line-height:1.15; letter-spacing:-.02em; }
.lead{ margin:0 0 16px; color:var(--muted); max-width:70ch; }

.ctaRow{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:14px; }
.btn{
  display:inline-flex; align-items:center; justify-content:center;
  padding:10px 14px;
  border-radius:14px;
  border:1px solid #2a2a2a;
  background:#fff; color:#000;
  font-weight:700; font-size:13px;
  cursor:pointer;
}
.btn:hover{ transform: translateY(-1px); }
.btn:disabled{ opacity:.6; cursor:not-allowed; transform:none; }
.btn.ghost{ background:transparent; color:#fff; }
.btn.small{ padding:8px 12px; border-radius:12px; font-weight:700; }

.meta{ display:flex; gap:8px; flex-wrap:wrap; }
.pill{
  font-size:12px;
  padding:7px 10px;
  border:1px solid var(--border);
  border-radius:999px;
  color:var(--muted);
  background:rgba(255,255,255,.03);
}

.grid{
  max-width:1080px;
  margin:0 auto;
  padding:14px 16px 30px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:14px;
}
.card{
  border:1px solid var(--border);
  background:var(--card);
  border-radius:var(--radius);
  padding:18px;
  box-shadow: var(--shadow);
}
.card.full{ grid-column: 1 / -1; }

.h2{ margin:0 0 10px; font-size:18px; letter-spacing:-.01em; }
.p{ margin:0 0 12px; color:var(--muted); line-height:1.6; }
.muted{ color:var(--muted); }
.right{ text-align:right; }
.row{ display:flex; align-items:center; justify-content:space-between; gap:10px; }

.infoGrid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
  margin-top:10px;
}
.info{
  border:1px solid var(--border);
  border-radius:14px;
  padding:12px;
  background:rgba(255,255,255,.02);
}
.label{ font-size:12px; color:var(--muted2); margin-bottom:6px; }
.value{ font-size:13px; color:#fff; font-weight:700; }

.marquee{
  border:1px solid var(--border);
  border-radius:14px;
  overflow:hidden;
  background:rgba(255,255,255,.02);
  margin:10px 0 12px;
}
.track{
  display:flex;
  gap:10px;
  padding:10px;
  width:max-content;
  animation: scroll 18s linear infinite;
}
@keyframes scroll{
  from{ transform: translateX(0); }
  to{ transform: translateX(-50%); }
}
.chip{
  padding:8px 10px;
  border:1px solid var(--border);
  border-radius:999px;
  font-size:12px;
  color:#fff;
  background:rgba(255,255,255,.03);
  white-space:nowrap;
}

.split{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap:10px;
}
.mini{
  border:1px solid var(--border);
  border-radius:14px;
  padding:12px;
  background:rgba(255,255,255,.02);
}
.miniTitle{ font-weight:800; font-size:13px; margin-bottom:6px; }
.miniText{ color:var(--muted); font-size:13px; line-height:1.5; }

.cards{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:10px;
}
.proj{
  border:1px solid var(--border);
  border-radius:16px;
  padding:14px;
  background:rgba(255,255,255,.02);
}
.projTop{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px; }
.projTitle{ font-weight:900; font-size:14px; }
.badge{
  font-size:11px;
  padding:6px 10px;
  border-radius:999px;
  border:1px solid #2a2a2a;
  background:#fff; color:#000;
  font-weight:800;
}
.badge.ghost{ background:transparent; color:#fff; }
.projText{ margin:0 0 10px; color:var(--muted); line-height:1.5; font-size:13px; }
.projMeta{ display:flex; gap:8px; flex-wrap:wrap; }
.tagPill{
  font-size:11px;
  padding:6px 9px;
  border-radius:999px;
  border:1px solid var(--border);
  color:var(--muted);
  background:rgba(255,255,255,.03);
}

.guestGrid{
  display:grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap:12px;
  margin-top:10px;
}
.form{ display:grid; gap:10px; }
.field span{ display:block; font-size:12px; color:var(--muted2); margin-bottom:6px; }
.input{
  width:100%;
  padding:10px 12px;
  border-radius:14px;
  border:1px solid #2a2a2a;
  background:#0b0b0b;
  color:#fff;
  outline:none;
}
.input:focus{ border-color:#4a4a4a; }
.textarea{ min-height:110px; resize:vertical; }
.counter{ text-align:right; font-size:12px; margin-top:6px; }

.error{ color:#ff8e8e; margin:0; font-size:13px; }
.ok{ color:#9dffb3; margin:0; font-size:13px; }

.list{
  border:1px solid var(--border);
  border-radius:16px;
  padding:12px;
  background:rgba(255,255,255,.02);
  max-height:360px;
  overflow:auto;
}
.empty{ padding:8px; }
.msg{
  border-top:1px solid var(--border);
  padding:10px 4px;
}
.msg:first-child{ border-top:none; }
.msgTop{ display:flex; align-items:baseline; justify-content:space-between; gap:10px; margin-bottom:6px; }
.msgName{ font-weight:900; }
.msgBody{ color:#fff; line-height:1.55; }

.footer{
  max-width:1080px;
  margin:0 auto;
  padding:18px 16px 30px;
  display:flex;
  justify-content:space-between;
  gap:10px;
  border-top:1px solid var(--border);
}

/* Responsive */
@media (max-width: 920px){
  .grid{ grid-template-columns: 1fr; }
  .cards{ grid-template-columns: 1fr; }
  .split{ grid-template-columns: 1fr; }
  .guestGrid{ grid-template-columns: 1fr; }
  .nav{ display:none; } /* keeps it clean on mobile */
  .h1{ font-size:28px; }
}
</style>