<template>
  <div class="page">

    <!-- ══ HEADER ══ -->
    <header class="header">
      <div class="brand">
        <span class="brand-dot"></span>
        <span class="brand-name">maku<span class="brand-accent">.</span></span>
      </div>

      <!-- Desktop nav -->
      <nav class="nav desktop-nav">
        <a href="#profile">Profile</a>
        <a href="#guestbook">Guestbook</a>
        <a href="#entries">Entries</a>
      </nav>

      <div class="header-right">
        <div class="header-badge">Open to work</div>
        <button class="hamburger" @click="mobileNav = !mobileNav" :aria-expanded="mobileNav" aria-label="Menu">
          <span :class="{ open: mobileNav }"></span>
          <span :class="{ open: mobileNav }"></span>
          <span :class="{ open: mobileNav }"></span>
        </button>
      </div>
    </header>

    <!-- Mobile nav drawer -->
    <div class="mobile-drawer" :class="{ visible: mobileNav }">
      <a href="#profile"   @click="mobileNav=false">Profile</a>
      <a href="#guestbook" @click="mobileNav=false">Guestbook</a>
      <a href="#entries"   @click="mobileNav=false">Entries</a>
    </div>

    <!-- ══ PROFILE ══ -->
    <section id="profile" class="profile-section">

      <div class="hero">
        <div class="hero-left">
          <div class="avatar-wrap">
            <div class="avatar-ring"></div>
            <div class="avatar-inner">MA</div>
          </div>
          <div class="hero-meta">
            <div class="hero-tag">WEBPROG · Finals</div>
            <h1 class="hero-name">Mark Ani</h1>
            <p class="hero-sub">Full-Stack Developer · Philippines</p>
          </div>
        </div>
        <div class="hero-right">
          <a class="cta-btn" href="#guestbook">Sign Guestbook <span class="arrow">↓</span></a>
        </div>
      </div>

      <div class="info-grid">
        <div class="card about-card">
          <div class="card-label">About</div>
          <p class="about-text">
            This page contains my profile and a working guestbook. The guestbook uses
            REST API calls and stores entries in the database via NestJS + Supabase.
          </p>
          <div class="about-kv">
            <div class="kv-item">
              <span class="kv-key">Email</span>
              <span class="kv-val">your-email@example.com</span>
            </div>
            <div class="kv-item">
              <span class="kv-key">Location</span>
              <span class="kv-val">Philippines</span>
            </div>
            <div class="kv-item">
              <span class="kv-key">Stack</span>
              <span class="kv-val">Vue · NestJS · Supabase</span>
            </div>
          </div>
        </div>

        <div class="card skills-card">
          <div class="card-label">Skills</div>
          <div class="skill-list">
            <div class="skill-item" v-for="(s, i) in skills" :key="i" :style="`--i:${i}`">
              <span class="skill-icon">{{ s.icon }}</span>
              <span>{{ s.label }}</span>
            </div>
          </div>
        </div>

        <div class="card links-card">
          <div class="card-label">Links</div>
          <div class="link-list">
            <a class="link-row" href="#" target="_blank" rel="noreferrer">
              <span class="link-icon">⌥</span><span>GitHub</span><span class="link-arr">↗</span>
            </a>
            <a class="link-row" href="#" target="_blank" rel="noreferrer">
              <span class="link-icon">▲</span><span>Vercel</span><span class="link-arr">↗</span>
            </a>
            <a class="link-row" href="#" target="_blank" rel="noreferrer">
              <span class="link-icon">◎</span><span>Backend API</span><span class="link-arr">↗</span>
            </a>
          </div>
        </div>
      </div>

      <div class="marquee" aria-hidden="true">
        <div class="track">
          <span class="chip" v-for="(t, i) in [...techChips, ...techChips]" :key="i">{{ t }}</span>
        </div>
      </div>
    </section>

    <!-- ══ GUESTBOOK ══ -->
    <section id="guestbook" class="section">
      <div class="section-header">
        <div>
          <div class="section-eyebrow">Leave a message</div>
          <h2 class="section-title">Guestbook</h2>
        </div>
        <div class="section-right">
          <div class="count-badge">
            <span class="count-num">{{ messages.length }}</span>
            <span class="count-label">entries</span>
          </div>
          <button class="ghost-btn" @click="load" :disabled="loading || apiMissing">
            {{ loading ? "…" : "↺ Refresh" }}
          </button>
        </div>
      </div>

      <div v-if="apiMissing" class="notice">
        <span class="notice-icon">⚠</span>
        <div>
          <strong>Configuration required</strong> — Set <code>VITE_API_URL</code> in your
          Vercel frontend project, then redeploy.
        </div>
      </div>

      <div class="guest-grid">
        <form class="card form-card" @submit.prevent="submit" aria-label="Guestbook form">
          <div class="card-label">Sign the guestbook</div>

          <div class="row2">
            <label class="field">
              <span class="field-label">Name</span>
              <input v-model="name" class="input" placeholder="Your name" maxlength="40" />
            </label>
            <label class="field">
              <span class="field-label">Location</span>
              <input v-model="location" class="input" placeholder="City / Country" maxlength="60" />
            </label>
          </div>

          <div class="field">
            <div class="field-label-row">
              <span class="field-label">Category</span>
              <span class="field-sub">{{ selectedTagLabel }}</span>
            </div>
            <div class="pill-grid" role="list">
              <button
                v-for="t in tags" :key="t.id"
                type="button"
                class="pill" :class="{ active: tag === t.id }"
                @click="tag = t.id" role="listitem"
              >{{ t.label }}</button>
            </div>
          </div>

          <label class="field">
            <span class="field-label">Message</span>
            <textarea
              v-model="message"
              class="input textarea"
              placeholder="Write a message… (max 200 chars)"
              maxlength="200"
            ></textarea>
            <div class="char-count">{{ (message || "").length }}/200</div>
          </label>

          <div class="form-actions">
            <button class="submit-btn" :disabled="loading || apiMissing">
              {{ loading ? "Posting…" : "Submit Entry" }}
            </button>
            <button class="ghost-btn" type="button" @click="resetForm" :disabled="loading">Clear</button>
          </div>

          <p v-if="error" class="msg-error">{{ error }}</p>
          <p v-if="ok" class="msg-ok">✓ Entry submitted!</p>
        </form>

        <div class="card preview-card" aria-label="Guestbook preview">
          <div class="card-label">Latest entries</div>
          <div v-if="messages.length === 0" class="empty-state">No entries yet — be the first!</div>
          <article v-for="m in messages.slice(0, 4)" :key="m.id" class="preview-entry">
            <div class="entry-top">
              <div class="entry-name">{{ m.name }}</div>
              <div class="entry-date">{{ formatDate(m.created_at) }}</div>
            </div>
            <div class="entry-meta">
              {{ m.location || "—" }} <span class="dot">·</span> {{ m.tag ? tagLabel(m.tag) : "—" }}
            </div>
            <p class="entry-msg">{{ m.message }}</p>
          </article>
          <a class="view-all" href="#entries">View all entries →</a>
        </div>
      </div>
    </section>

    <!-- ══ ENTRIES ══ -->
    <section id="entries" class="section">
      <div class="section-header entries-header">
        <div>
          <div class="section-eyebrow">Browse</div>
          <h2 class="section-title">All Entries</h2>
        </div>
        <div class="filters">
          <input v-model="query" class="input filter-input" placeholder="Search…" maxlength="40" />
          <select v-model="filterTag" class="input filter-select">
            <option value="">All categories</option>
            <option v-for="t in tags" :key="t.id" :value="t.id">{{ t.label }}</option>
          </select>
        </div>
      </div>

      <div class="table-wrap">
        <div class="table-head">
          <span>Name</span><span>Location</span><span>Category</span><span>Date</span>
        </div>
        <div v-if="filteredMessages.length === 0" class="empty-state table-empty">No entries found.</div>
        <article v-for="m in filteredMessages" :key="m.id" class="table-row">
          <div class="cell cell-name">{{ m.name }}</div>
          <div class="cell cell-muted">{{ m.location || "—" }}</div>
          <div class="cell">
            <span v-if="m.tag" class="tag-badge">{{ tagLabel(m.tag) }}</span>
            <span v-else class="cell-muted">—</span>
          </div>
          <div class="cell cell-muted cell-date">{{ formatDate(m.created_at) }}</div>
          <div class="msg-expand">
            <span class="msg-label">Message</span>
            <span class="msg-body">{{ m.message }}</span>
          </div>
        </article>
      </div>
    </section>

    <footer class="footer">
      <span>© {{ new Date().getFullYear() }} Mark Ani</span>
      <span>Built with Vue · NestJS · Supabase</span>
    </footer>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const API = import.meta.env.VITE_API_URL || "";
const apiMissing = computed(() => !API || typeof API !== "string" || !API.startsWith("http"));

const tags = [
  { id: "formal",       label: "Formal" },
  { id: "respectful",   label: "Respectful" },
  { id: "professional", label: "Professional" },
  { id: "friendly",     label: "Friendly" },
  { id: "neutral",      label: "Neutral" },
  { id: "feedback",     label: "Feedback" },
];

const skills = [
  { icon: "◈", label: "Frontend — Vue + Vite" },
  { icon: "◉", label: "Backend — NestJS" },
  { icon: "◎", label: "Database — Supabase" },
  { icon: "▲", label: "Deployment — Vercel" },
];

const techChips = ["Vue 3","Vite","NestJS","REST API","Supabase","PostgreSQL","Vercel","TypeScript","Tailwind"];

const mobileNav = ref(false);
const name      = ref("");
const location  = ref("");
const tag       = ref("formal");
const message   = ref("");
const messages  = ref([]);
const loading   = ref(false);
const error     = ref("");
const ok        = ref(false);
const query     = ref("");
const filterTag = ref("");

const selectedTagLabel = computed(() => tagLabel(tag.value));
function tagLabel(id) { return tags.find(x => x.id === id)?.label ?? id ?? ""; }
function formatDate(d) { if (!d) return ""; return new Date(d).toLocaleString(); }

const filteredMessages = computed(() => {
  const q = (query.value || "").toLowerCase().trim();
  return messages.value.filter(m => {
    const text = !q || [m.name, m.message, m.location].some(f => (f||"").toLowerCase().includes(q));
    return text && (!filterTag.value || m.tag === filterTag.value);
  });
});

async function load() {
  error.value = ""; ok.value = false;
  if (apiMissing.value) { messages.value = []; return; }
  loading.value = true;
  try {
    const data = await (await fetch(`${API}/guestbook`)).json();
    messages.value = Array.isArray(data) ? data : [];
  } catch { error.value = "Failed to load entries."; }
  finally   { loading.value = false; }
}

function resetForm() {
  name.value = ""; location.value = ""; message.value = "";
  tag.value = "formal"; error.value = ""; ok.value = false;
}

async function submit() {
  error.value = ""; ok.value = false;
  const n = name.value.trim(), msg = message.value.trim();
  if (!n || !msg) { error.value = "Name and message are required."; return; }
  if (apiMissing.value) { error.value = "API URL missing."; return; }
  loading.value = true;
  try {
    const data = await (await fetch(`${API}/guestbook`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: n, message: msg, location: location.value.trim(), tag: tag.value }),
    })).json();
    if (data?.error) { error.value = data.error; }
    else { ok.value = true; name.value = ""; location.value = ""; message.value = ""; await load(); }
  } catch { error.value = "Failed to post."; }
  finally   { loading.value = false; }
}

onMounted(load);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');

/* ═══ TOKENS ═══ */
:root {
  --bg:      #060608;
  --surface: #0e0e12;
  --border:  rgba(255,255,255,.08);
  --border2: rgba(255,255,255,.14);
  --txt:     #f0f0f2;
  --muted:   rgba(240,240,242,.52);
  --muted2:  rgba(240,240,242,.3);
  --accent:  #c8ff57;
  --accent2: #57c8ff;
  --danger:  #ff8e8e;
  --success: #9dffb3;
  --r:       18px;
  --r-sm:    12px;
  --font:    'Syne', sans-serif;
  --mono:    'DM Mono', monospace;
}

/* ═══ RESET ═══ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { background: var(--bg); color: var(--txt); font-family: var(--font); line-height: 1.5; }
a { color: inherit; text-decoration: none; }
button, input, textarea, select { font-family: var(--font); }

/* ═══ PAGE ═══ */
.page { max-width: 1100px; margin: 0 auto; padding: 0 20px 64px; }

/* ═══ HEADER ═══ */
.header {
  display: flex; align-items: center; gap: 10px;
  padding: 18px 0 16px;
  border-bottom: 1px solid var(--border);
  position: sticky; top: 0;
  background: rgba(6,6,8,.88);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  z-index: 200;
}
.brand { display: flex; align-items: center; gap: 8px; margin-right: auto; }
.brand-dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--accent); box-shadow: 0 0 10px var(--accent); flex-shrink: 0;
}
.brand-name { font-size: 20px; font-weight: 900; letter-spacing: -.02em; }
.brand-accent { color: var(--accent); }

.desktop-nav { display: flex; gap: 4px; }
.desktop-nav a {
  font-size: 13px; color: var(--muted); padding: 8px 14px;
  border-radius: 999px; border: 1px solid transparent; transition: all .2s; white-space: nowrap;
}
.desktop-nav a:hover { color: var(--txt); border-color: var(--border2); }

.header-right { display: flex; align-items: center; gap: 8px; }
.header-badge {
  font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--accent); border: 1px solid rgba(200,255,87,.25);
  background: rgba(200,255,87,.07); padding: 6px 12px; border-radius: 999px; white-space: nowrap;
}

/* Hamburger */
.hamburger {
  display: none; flex-direction: column; justify-content: center; align-items: center;
  gap: 5px; width: 42px; height: 42px;
  background: transparent; border: 1px solid var(--border);
  border-radius: var(--r-sm); cursor: pointer; transition: border-color .2s; flex-shrink: 0;
}
.hamburger:hover { border-color: var(--border2); }
.hamburger span {
  display: block; width: 18px; height: 2px;
  background: var(--muted); border-radius: 2px; transition: transform .25s, opacity .2s;
}
.hamburger span:nth-child(1).open { transform: translateY(7px) rotate(45deg); }
.hamburger span:nth-child(2).open { opacity: 0; }
.hamburger span:nth-child(3).open { transform: translateY(-7px) rotate(-45deg); }

/* Drawer */
.mobile-drawer {
  display: flex; flex-direction: column; gap: 2px;
  overflow: hidden; max-height: 0;
  transition: max-height .3s ease, padding .3s ease;
  background: var(--surface); border-bottom: 1px solid var(--border);
}
.mobile-drawer.visible { max-height: 220px; padding: 8px 0; }
.mobile-drawer a {
  font-size: 15px; font-weight: 700; color: var(--muted);
  padding: 13px 20px; transition: background .15s, color .15s;
}
.mobile-drawer a:hover { background: rgba(255,255,255,.04); color: var(--txt); }

/* ═══ PROFILE ═══ */
.profile-section { padding-top: 32px; }

.hero {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 20px; padding-bottom: 28px;
  border-bottom: 1px solid var(--border); margin-bottom: 20px;
}
.hero-left { display: flex; align-items: center; gap: 18px; }

.avatar-wrap { position: relative; width: 72px; height: 72px; flex-shrink: 0; }
.avatar-ring {
  position: absolute; inset: -3px; border-radius: 50%;
  background: conic-gradient(var(--accent), var(--accent2), var(--accent));
  animation: spin 6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.avatar-inner {
  position: relative; width: 72px; height: 72px;
  border-radius: 50%; background: var(--surface);
  border: 3px solid var(--bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 900; color: var(--accent);
}

.hero-tag {
  font-size: 11px; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: var(--muted2); margin-bottom: 4px;
}
.hero-name { font-size: clamp(24px, 5vw, 46px); font-weight: 900; letter-spacing: -.03em; line-height: 1; }
.hero-sub  { margin-top: 7px; color: var(--muted); font-size: 14px; }

.cta-btn {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--accent); color: #000; font-weight: 900; font-size: 14px;
  padding: 14px 22px; border-radius: var(--r);
  transition: transform .2s, box-shadow .2s;
  box-shadow: 0 0 28px rgba(200,255,87,.18); white-space: nowrap; flex-shrink: 0;
}
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 40px rgba(200,255,87,.32); }
.arrow { font-size: 16px; }

/* Info grid */
.info-grid {
  display: grid; grid-template-columns: 1.6fr 1fr .85fr;
  gap: 16px; margin-bottom: 16px;
}

/* ═══ CARD ═══ */
.card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r); padding: 20px;
  position: relative; overflow: hidden;
}
.card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(300px circle at 0% 0%, rgba(200,255,87,.04), transparent 65%);
  pointer-events: none;
}
.card-label {
  font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--muted2); margin-bottom: 14px;
}

.about-text { color: var(--muted); line-height: 1.7; font-size: 14px; margin-bottom: 16px; }
.about-kv   { display: flex; flex-direction: column; gap: 10px; }
.kv-item    { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.kv-key     { font-size: 12px; color: var(--muted2); flex-shrink: 0; }
.kv-val     { font-size: 13px; font-weight: 700; text-align: right; word-break: break-all; }

.skill-list { display: flex; flex-direction: column; gap: 8px; }
.skill-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: var(--muted); padding: 10px 12px;
  border: 1px solid var(--border); border-radius: var(--r-sm);
  background: rgba(255,255,255,.02);
  animation: slideIn .4s ease both;
  animation-delay: calc(var(--i) * .07s);
}
@keyframes slideIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:none; } }
.skill-icon { font-size: 14px; color: var(--accent); flex-shrink: 0; }

.link-list { display: flex; flex-direction: column; gap: 8px; }
.link-row {
  display: flex; align-items: center; gap: 10px; font-size: 13px;
  padding: 12px 13px; border: 1px solid var(--border);
  border-radius: var(--r-sm); background: rgba(255,255,255,.02);
  transition: border-color .2s, background .2s; min-height: 44px;
}
.link-row:hover { border-color: var(--border2); background: rgba(255,255,255,.05); }
.link-icon { font-size: 13px; color: var(--accent2); flex-shrink: 0; }
.link-arr  { margin-left: auto; color: var(--muted2); font-size: 12px; }

/* ═══ MARQUEE ═══ */
.marquee {
  border: 1px solid var(--border); border-radius: 14px;
  overflow: hidden; background: var(--surface);
}
.track {
  display: flex; gap: 10px; padding: 10px;
  width: max-content; animation: scroll 22s linear infinite;
}
@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.chip {
  padding: 8px 14px; border: 1px solid var(--border); border-radius: 999px;
  font-size: 12px; font-weight: 700; background: rgba(255,255,255,.02);
  white-space: nowrap; color: var(--muted); font-family: var(--mono);
}

/* ═══ SECTIONS ═══ */
.section { padding-top: 48px; }
.section-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 16px; margin-bottom: 20px; flex-wrap: wrap;
}
.section-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 5px;
}
.section-title  { font-size: clamp(20px, 3.5vw, 30px); font-weight: 900; letter-spacing: -.02em; }
.section-right  { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.count-badge {
  display: flex; flex-direction: column; align-items: flex-end;
  border: 1px solid var(--border); border-radius: 14px;
  padding: 10px 14px; background: var(--surface);
}
.count-num   { font-size: 22px; font-weight: 900; color: var(--accent); line-height: 1; }
.count-label { font-size: 11px; color: var(--muted2); letter-spacing: .06em; text-transform: uppercase; margin-top: 3px; }

/* ═══ NOTICE ═══ */
.notice {
  display: flex; align-items: flex-start; gap: 12px;
  background: rgba(255,160,60,.06); border: 1px solid rgba(255,160,60,.2);
  border-radius: var(--r); padding: 16px 18px;
  font-size: 13px; color: var(--muted); margin-bottom: 20px; line-height: 1.6;
}
.notice-icon { font-size: 18px; flex-shrink: 0; padding-top: 1px; }
.notice code {
  font-family: var(--mono); background: rgba(255,255,255,.07);
  padding: 2px 6px; border-radius: 6px; font-size: 12px;
}

/* ═══ GUEST GRID ═══ */
.guest-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }

/* ═══ FORM ═══ */
.form-card  { display: flex; flex-direction: column; gap: 16px; }
.row2       { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field      { display: flex; flex-direction: column; }
.field-label {
  font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--muted2); margin-bottom: 8px;
}
.field-label-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.field-sub       { font-size: 11px; color: var(--muted2); }

.input {
  width: 100%; padding: 12px 14px;
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
  border-radius: var(--r-sm); color: var(--txt); font-size: 14px;
  outline: none; transition: border-color .2s; -webkit-appearance: none;
}
.input:focus { border-color: rgba(200,255,87,.4); }
.input::placeholder { color: var(--muted2); }
.textarea   { min-height: 110px; resize: vertical; line-height: 1.6; }
.char-count { text-align: right; font-size: 11px; color: var(--muted2); margin-top: 6px; font-family: var(--mono); }

.pill-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.pill {
  border: 1px solid var(--border); background: transparent;
  color: var(--muted); padding: 9px 14px; border-radius: 999px;
  font-size: 12px; font-weight: 700; cursor: pointer; transition: all .15s; min-height: 38px;
}
.pill:hover  { border-color: var(--border2); color: var(--txt); }
.pill.active { background: var(--accent); color: #000; border-color: var(--accent); }

.form-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.submit-btn {
  flex: 1; min-width: 120px;
  background: var(--accent); color: #000; border: none;
  padding: 13px 20px; border-radius: var(--r-sm);
  font-weight: 900; font-size: 14px; cursor: pointer;
  transition: transform .15s, opacity .15s; min-height: 46px;
}
.submit-btn:hover:not(:disabled) { transform: translateY(-1px); }
.submit-btn:disabled { opacity: .5; cursor: not-allowed; }
.ghost-btn {
  background: transparent; border: 1px solid var(--border);
  color: var(--muted); padding: 12px 16px; border-radius: var(--r-sm);
  font-weight: 700; font-size: 13px; cursor: pointer;
  transition: border-color .15s, color .15s; min-height: 44px; white-space: nowrap;
}
.ghost-btn:hover:not(:disabled) { border-color: var(--border2); color: var(--txt); }
.ghost-btn:disabled { opacity: .5; cursor: not-allowed; }

.msg-error { font-size: 13px; color: var(--danger); }
.msg-ok    { font-size: 13px; color: var(--success); }

/* ═══ PREVIEW ═══ */
.preview-card { display: flex; flex-direction: column; gap: 12px; }
.empty-state {
  padding: 30px 0; text-align: center;
  font-size: 13px; color: var(--muted2); font-style: italic;
}
.preview-entry {
  border: 1px solid var(--border); border-radius: 14px;
  padding: 14px; background: rgba(255,255,255,.02);
  animation: fadeUp .35s ease both;
}
@keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
.entry-top  { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 4px; flex-wrap: wrap; }
.entry-name { font-weight: 900; font-size: 14px; }
.entry-date { font-size: 11px; color: var(--muted2); font-family: var(--mono); flex-shrink: 0; }
.entry-meta { font-size: 12px; color: var(--muted2); margin-bottom: 8px; }
.dot        { margin: 0 4px; }
.entry-msg  { font-size: 13px; color: var(--muted); line-height: 1.6; }

.view-all {
  display: inline-flex; align-self: flex-start; align-items: center;
  padding: 10px 14px; border-radius: var(--r-sm); border: 1px solid var(--border);
  font-size: 12px; font-weight: 900; color: var(--muted);
  transition: border-color .2s, color .2s; min-height: 38px;
}
.view-all:hover { border-color: var(--border2); color: var(--txt); }

/* ═══ TABLE ═══ */
.entries-header { align-items: flex-start; }
.filters { display: flex; gap: 10px; flex-wrap: wrap; }
.filter-input  { width: 220px; }
.filter-select { width: 160px; }
select.input   { cursor: pointer; }
select.input option { background: var(--surface); }

.table-wrap {
  border: 1px solid var(--border); border-radius: var(--r);
  background: var(--surface); overflow: hidden;
}
.table-head {
  display: grid; grid-template-columns: 1.2fr 1fr .9fr 1fr;
  gap: 12px; padding: 12px 18px; border-bottom: 1px solid var(--border);
  font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted2);
}
.table-row {
  display: grid; grid-template-columns: 1.2fr 1fr .9fr 1fr;
  gap: 12px; align-items: baseline;
  padding: 14px 18px; border-bottom: 1px solid var(--border);
  transition: background .15s;
}
.table-row:last-child { border-bottom: none; }
.table-row:hover      { background: rgba(255,255,255,.02); }
.table-empty  { padding: 24px 18px; }
.cell         { font-size: 13px; }
.cell-name    { font-weight: 900; }
.cell-muted   { color: var(--muted); }
.cell-date    { font-family: var(--mono); font-size: 12px; }

.tag-badge {
  display: inline-flex; padding: 5px 10px; border-radius: 999px;
  border: 1px solid var(--border); font-size: 11px; font-weight: 700;
  color: var(--muted); background: rgba(255,255,255,.02);
}
.msg-expand {
  grid-column: 1 / -1; display: grid; grid-template-columns: 90px 1fr;
  gap: 12px; margin-top: 10px; padding-top: 10px;
  border-top: 1px dashed rgba(255,255,255,.07);
}
.msg-label { font-size: 11px; color: var(--muted2); letter-spacing: .06em; text-transform: uppercase; padding-top: 2px; }
.msg-body  { font-size: 13px; color: var(--muted); line-height: 1.7; }

/* ═══ FOOTER ═══ */
.footer {
  margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  font-size: 12px; color: var(--muted2); font-family: var(--mono);
}

/* ═══════════════════════════════
   RESPONSIVE BREAKPOINTS
═══════════════════════════════ */

/* ── TABLET (≤ 960px) ── */
@media (max-width: 960px) {
  /* Show hamburger, hide desktop nav */
  .desktop-nav { display: none; }
  .hamburger   { display: flex; }

  /* Info grid: 2-col, links full-width */
  .info-grid  { grid-template-columns: 1fr 1fr; }
  .links-card { grid-column: 1 / -1; }
  .link-list  { flex-direction: row; gap: 8px; }
  .link-row   { flex: 1; min-width: 130px; }

  /* Filters */
  .filter-input  { width: 200px; }
  .filter-select { width: 150px; }
}

/* ── LARGE MOBILE (≤ 720px) ── */
@media (max-width: 720px) {
  .page { padding: 0 16px 52px; }

  /* Profile: 1-col info */
  .info-grid  { grid-template-columns: 1fr; }
  .links-card { grid-column: auto; }
  .link-list  { flex-direction: column; }

  /* Guestbook: 1-col */
  .guest-grid { grid-template-columns: 1fr; }

  /* Entries: stack header + full-width filters */
  .entries-header { flex-direction: column; gap: 14px; align-items: stretch; }
  .filters { flex-direction: column; width: 100%; }
  .filter-input, .filter-select { width: 100%; }

  /* Table: hide column headers */
  .table-head { display: none; }
  .table-row  { grid-template-columns: 1fr 1fr; padding: 14px; gap: 8px; }
  .msg-expand { grid-template-columns: 1fr; gap: 4px; }

  /* Section header: stack */
  .section-header { flex-direction: column; gap: 12px; }
  .section-right  { justify-content: flex-start; }
}

/* ── SMALL MOBILE (≤ 480px) ── */
@media (max-width: 480px) {
  .page { padding: 0 14px 44px; }

  /* Hero: stack layout */
  .hero       { flex-direction: column; align-items: flex-start; gap: 18px; }
  .hero-right { width: 100%; }
  .cta-btn    { width: 100%; justify-content: center; }

  /* Smaller avatar */
  .avatar-wrap  { width: 58px; height: 58px; }
  .avatar-ring  { inset: -2px; }
  .avatar-inner { width: 58px; height: 58px; font-size: 17px; }

  /* Name + location fields: stack */
  .row2 { grid-template-columns: 1fr; }

  /* Table: single column */
  .table-row { grid-template-columns: 1fr; }

  /* Pill tags: slightly smaller */
  .pill { padding: 8px 12px; font-size: 11px; }

  /* Badge: hide on tiny screens */
  .header-badge { display: none; }

  /* Footer: center */
  .footer { flex-direction: column; align-items: center; text-align: center; gap: 6px; }
}

/* ── VERY SMALL (≤ 360px) ── */
@media (max-width: 360px) {
  .page       { padding: 0 10px 36px; }
  .brand-name { font-size: 17px; }
  .hero-name  { font-size: 24px; }
  .card       { padding: 14px; }
  .hero-left  { gap: 12px; }
}
</style>