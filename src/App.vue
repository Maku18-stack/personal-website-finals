<template>
  <div class="page">
    <!-- Top bar -->
    <header class="topbar">
      <div class="brand">
        <span class="dot" aria-hidden="true"></span>
        <div>
          <div class="brandName">Mark Ani</div>
          <div class="brandSub">WEBPROG Finals • Interactive Guestbook</div>
        </div>
      </div>

      <nav class="nav">
        <a href="#guestbook">Guestbook</a>
        <a href="#log">Log</a>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="heroCard">
        <div class="heroLeft">
          <p class="kicker">Sign the Guestbook</p>
          <h1 class="h1">Clean UI, interactive flow.</h1>
          <p class="lead">
            Pick a style tag, add where you’re from, and leave a message. Entries are saved via REST API + Supabase.
          </p>
          <div class="pillRow">
            <span class="pill">GET + POST ✅</span>
            <span class="pill">Responsive ✅</span>
            <span class="pill">API + DB ✅</span>
          </div>
        </div>

        <div class="heroRight">
          <div class="stat">
            <div class="statLabel">Messages signed</div>
            <div class="statValue">{{ messages.length }}</div>
          </div>
          <button class="btn ghost" @click="load" :disabled="loading || apiMissing">
            {{ loading ? "Refreshing..." : "Refresh log" }}
          </button>
        </div>
      </div>
    </section>

    <!-- Main -->
    <main class="layout">
      <!-- Center panel -->
      <section id="guestbook" class="panel">
        <div class="panelHead">
          <div>
            <h2 class="h2">Guestbook Panel</h2>
            <p class="muted small">
              Fill in details and post. The log updates automatically.
            </p>
          </div>

          <div class="badgeRow">
            <span class="badge">{{ apiMissing ? "API not set" : "API connected" }}</span>
          </div>
        </div>

        <div v-if="apiMissing" class="notice">
          <div class="noticeTitle">VITE_API_URL missing</div>
          <div class="noticeText">
            In your <b>frontend</b> Vercel project, set
            <code>VITE_API_URL</code> to your backend, e.g.
            <code>https://personal-website-finals-4eb4.vercel.app</code>, then redeploy.
          </div>
        </div>

        <form class="form" @submit.prevent="submit">
          <!-- Name -->
          <label class="field">
            <span>Your name</span>
            <input v-model="name" class="input" placeholder="Enter your name" maxlength="40" />
          </label>

          <!-- Character / Tag picker (interactive like the sample, but minimal) -->
          <div class="picker">
            <div class="pickerTop">
              <span class="pickerLabel">Choose your tag</span>
              <span class="muted small">{{ selectedTagLabel }}</span>
            </div>

            <div class="tagGrid" role="list">
              <button
                v-for="t in tags"
                :key="t.id"
                type="button"
                class="tagBtn"
                :class="{ active: tag === t.id }"
                @click="tag = t.id"
                role="listitem"
              >
                <span class="tagIcon" aria-hidden="true">{{ t.icon }}</span>
                <span class="tagText">{{ t.label }}</span>
              </button>
            </div>
          </div>

          <!-- Location -->
          <label class="field">
            <span>Where you from</span>
            <input v-model="location" class="input" placeholder="City / Country" maxlength="60" />
          </label>

          <!-- Message -->
          <label class="field">
            <span>Your message</span>
            <textarea
              v-model="message"
              class="input textarea"
              placeholder="Leave a message..."
              maxlength="200"
            ></textarea>
            <div class="counter">{{ (message || "").length }}/200</div>
          </label>

          <div class="actions">
            <button class="btn" :disabled="loading || apiMissing">
              {{ loading ? "Posting..." : "Post entry" }}
            </button>
            <button class="btn ghost" type="button" @click="resetForm" :disabled="loading">
              Clear
            </button>
          </div>

          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="ok" class="ok">Posted successfully.</p>
        </form>
      </section>

      <!-- Log -->
      <section id="log" class="log">
        <div class="logHead">
          <h2 class="h2">Adventurer Log</h2>
          <div class="logTools">
            <input
              v-model="query"
              class="input search"
              placeholder="Search name/message..."
              maxlength="40"
            />
            <select v-model="filterTag" class="input select">
              <option value="">All tags</option>
              <option v-for="t in tags" :key="t.id" :value="t.id">{{ t.label }}</option>
            </select>
          </div>
        </div>

        <div class="logList">
          <div v-if="filteredMessages.length === 0" class="empty muted">
            No entries found.
          </div>

          <article v-for="m in filteredMessages" :key="m.id" class="entry">
            <div class="entryTop">
              <div class="entryName">
                {{ m.name }}
                <span v-if="getTag(m).label" class="entryTag">{{ getTag(m).label }}</span>
              </div>
              <div class="entryMeta muted">
                <span v-if="m.location">📍 {{ m.location }}</span>
                <span v-else>—</span>
                <span class="dotSep">•</span>
                <span>{{ formatDate(m.created_at) }}</span>
              </div>
            </div>
            <div class="entryMsg">{{ m.message }}</div>
          </article>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="muted small">© {{ new Date().getFullYear() }} Mark Ani</div>
      <div class="muted small">Vue • NestJS • Supabase • Vercel</div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const API = import.meta.env.VITE_API_URL || "";
const apiMissing = computed(() => !API || typeof API !== "string" || !API.startsWith("http"));

const tags = [
  { id: "focus", label: "Focused", icon: "◎" },
  { id: "friendly", label: "Friendly", icon: "◌" },
  { id: "bold", label: "Bold", icon: "⬤" },
  { id: "curious", label: "Curious", icon: "◍" },
  { id: "chill", label: "Chill", icon: "○" },
  { id: "builder", label: "Builder", icon: "◉" },
  { id: "helper", label: "Helper", icon: "◐" },
  { id: "hero", label: "Hero", icon: "◑" },
];

const name = ref("");
const message = ref("");
const location = ref("");
const tag = ref("focus");

const messages = ref([]);
const loading = ref(false);
const error = ref("");
const ok = ref(false);

const query = ref("");
const filterTag = ref("");

const selectedTagLabel = computed(() => {
  const t = tags.find((x) => x.id === tag.value);
  return t ? t.label : "—";
});

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleString();
}

/**
 * Some backends only store {name,message,created_at}.
 * This helper safely reads optional fields if present.
 */
function getTag(m) {
  const t = tags.find((x) => x.id === m.tag);
  return t || { id: "", label: "", icon: "" };
}

const filteredMessages = computed(() => {
  const q = (query.value || "").toLowerCase().trim();
  return messages.value.filter((m) => {
    const matchesText =
      !q ||
      (m.name || "").toLowerCase().includes(q) ||
      (m.message || "").toLowerCase().includes(q) ||
      (m.location || "").toLowerCase().includes(q);

    const matchesTag = !filterTag.value || m.tag === filterTag.value;
    return matchesText && matchesTag;
  });
});

async function load() {
  error.value = "";
  ok.value = false;

  if (apiMissing.value) {
    messages.value = [];
    error.value = "VITE_API_URL is not set. Add it in Vercel (frontend) and redeploy.";
    return;
  }

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

function resetForm() {
  name.value = "";
  message.value = "";
  location.value = "";
  tag.value = "focus";
  error.value = "";
  ok.value = false;
}

async function submit() {
  error.value = "";
  ok.value = false;

  const n = (name.value || "").trim();
  const msg = (message.value || "").trim();
  const loc = (location.value || "").trim();

  if (!n || !msg) {
    error.value = "Please enter both name and message.";
    return;
  }
  if (apiMissing.value) {
    error.value = "API URL missing. Set VITE_API_URL then redeploy.";
    return;
  }

  loading.value = true;
  try {
    const res = await fetch(`${API}/guestbook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: n, message: msg, location: loc, tag: tag.value }),
    });

    const data = await res.json();
    if (data?.error) {
      error.value = data.error;
    } else {
      ok.value = true;
      name.value = "";
      message.value = "";
      location.value = "";
      // keep tag selection (nice UX)
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
:root {
  --bg: #0b0b0b;
  --card: #101010;
  --border: #1f1f1f;
  --text: #ffffff;
  --muted: rgba(255, 255, 255, 0.65);
  --muted2: rgba(255, 255, 255, 0.45);
  --shadow: 0 12px 34px rgba(0, 0, 0, 0.4);
  --radius: 20px;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--bg); color: var(--text); }
a { color: inherit; text-decoration: none; }
a:hover { opacity: .9; }

.page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 22px 18px 40px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 12px;
  margin: -10px 0 18px;
  border-bottom: 1px solid var(--border);
  background: rgba(11, 11, 11, 0.85);
  backdrop-filter: blur(10px);
}

.brand { display: flex; align-items: center; gap: 10px; }
.dot { width: 12px; height: 12px; border-radius: 999px; background: #fff; }
.brandName { font-weight: 900; letter-spacing: .2px; }
.brandSub { font-size: 12px; color: var(--muted); margin-top: 2px; }

.nav { display: flex; gap: 10px; }
.nav a {
  font-size: 13px;
  color: var(--muted);
  padding: 8px 10px;
  border-radius: 999px;
}
.nav a:hover { background: rgba(255,255,255,.06); color: #fff; }

.hero { padding: 10px 0 8px; }
.heroCard {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0));
  box-shadow: var(--shadow);
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 18px;
  align-items: start;
}

.kicker {
  margin: 0 0 10px;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: .14em;
  text-transform: uppercase;
}

.h1 { margin: 0 0 10px; font-size: 34px; line-height: 1.15; letter-spacing: -0.02em; }
.lead { margin: 0 0 12px; color: var(--muted); line-height: 1.65; max-width: 70ch; }

.pillRow { display: flex; gap: 8px; flex-wrap: wrap; }
.pill {
  font-size: 12px;
  padding: 7px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--muted);
  background: rgba(255,255,255,.03);
}

.heroRight { display: grid; gap: 12px; justify-items: end; }
.stat {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 14px;
  background: rgba(255,255,255,.02);
}
.statLabel { font-size: 12px; color: var(--muted2); margin-bottom: 8px; }
.statValue { font-size: 28px; font-weight: 900; letter-spacing: -0.02em; }

.layout {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 18px;
  align-items: start;
}

.panel, .log {
  border: 1px solid var(--border);
  background: var(--card);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: var(--shadow);
}

.panelHead {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
}

.h2 { margin: 0 0 6px; font-size: 18px; letter-spacing: -0.01em; }
.muted { color: var(--muted); }
.small { font-size: 12px; }

.badgeRow { display: flex; gap: 8px; }
.badge {
  font-size: 12px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,.03);
  color: var(--muted);
}

.notice {
  border: 1px solid #3a3a3a;
  background: rgba(255,255,255,.03);
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 14px;
}
.noticeTitle { font-weight: 900; margin-bottom: 6px; }
.noticeText { color: var(--muted); font-size: 13px; line-height: 1.55; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; }

.form { display: grid; gap: 12px; }
.field span { display: block; font-size: 12px; color: var(--muted2); margin-bottom: 7px; }

.input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid #2a2a2a;
  background: #0b0b0b;
  color: #fff;
  outline: none;
}
.input:focus { border-color: #4a4a4a; }
.textarea { min-height: 120px; resize: vertical; }
.counter { text-align: right; font-size: 12px; color: var(--muted); margin-top: 6px; }

.picker { display: grid; gap: 10px; }
.pickerTop { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
.pickerLabel { font-size: 12px; color: var(--muted2); }

.tagGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.tagBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 10px;
  border-radius: 16px;
  border: 1px solid #2a2a2a;
  background: rgba(255,255,255,.02);
  color: #fff;
  cursor: pointer;
}
.tagBtn:hover { transform: translateY(-1px); border-color: #3a3a3a; }
.tagBtn.active {
  background: #fff;
  color: #000;
  border-color: #fff;
}
.tagIcon { font-size: 14px; }
.tagText { font-size: 12px; font-weight: 900; }

.actions { display: flex; gap: 10px; flex-wrap: wrap; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid #2a2a2a;
  background: #fff;
  color: #000;
  font-weight: 900;
  font-size: 13px;
  cursor: pointer;
}
.btn:hover { transform: translateY(-1px); }
.btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }
.btn.ghost { background: transparent; color: #fff; }

.error { color: #ff8e8e; margin: 0; font-size: 13px; }
.ok { color: #9dffb3; margin: 0; font-size: 13px; }

.logHead { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
.logTools { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
.search { width: 240px; }
.select { width: 160px; }

.logList {
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 14px;
  background: rgba(255,255,255,.02);
  max-height: 520px;
  overflow: auto;
}

.empty { padding: 10px 6px; }

.entry {
  border-top: 1px solid var(--border);
  padding: 12px 6px;
}
.entry:first-child { border-top: none; }

.entryTop { display: grid; gap: 6px; margin-bottom: 6px; }
.entryName { font-weight: 900; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.entryTag {
  font-size: 11px;
  padding: 6px 9px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
  background: rgba(255,255,255,.03);
}
.entryMeta { font-size: 12px; display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.dotSep { opacity: .5; }
.entryMsg { line-height: 1.65; }

.footer {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

@media (max-width: 980px) {
  .layout { grid-template-columns: 1fr; }
  .heroCard { grid-template-columns: 1fr; }
  .heroRight { justify-items: start; }
}

@media (max-width: 920px) {
  .page { padding: 18px 14px 30px; }
  .nav { display: none; }
  .h1 { font-size: 28px; }
  .panel, .log { padding: 18px; }
  .tagGrid { grid-template-columns: repeat(2, 1fr); }
  .search, .select { width: 100%; }
}
</style>