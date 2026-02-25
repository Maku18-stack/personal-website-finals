<template>
  <div class="page">
    <!-- Header -->
    <header class="header">
      <div class="brand">
        <div class="brandTitle">Maku’s Profile</div>
        <div class="brandSub">Personal Profile • Guestbook</div>
      </div>

      <nav class="nav">
        <a href="#profile">Profile</a>
        <a href="#guestbook">Guestbook</a>
        <a href="#entries">Entries</a>
      </nav>
    </header>

    <!-- PROFILE FIRST -->
    <section id="profile" class="profile">
      <div class="profileGrid">
        <!-- Left: identity -->
        <div class="card">
          <div class="profileTop">
            <div class="avatar" aria-hidden="true"></div>
            <div class="who">
              <div class="name">Mark Ani</div>
              <div class="role muted">WEBPROG • Personal Website Finals</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="kv">
            <div class="kvItem">
              <div class="kvLabel">Email</div>
              <div class="kvValue">your-email@example.com</div>
            </div>
            <div class="kvItem">
              <div class="kvLabel">Location</div>
              <div class="kvValue">Philippines</div>
            </div>
            <div class="kvItem">
              <div class="kvLabel">Stack</div>
              <div class="kvValue">Vue • NestJS • Supabase</div>
            </div>
          </div>

          <div class="actionsRow">
            <a class="btn primary" href="#guestbook">Open Guestbook</a>
            <a class="btn" href="#entries">View Entries</a>
          </div>
        </div>

        <!-- Right: about + skills -->
        <div class="card">
          <div class="cardHead">
            <h2 class="h2">About</h2>
            <div class="metaPill">Formal</div>
          </div>

          <p class="p">
            This page contains my profile and a working guestbook. The guestbook uses REST API calls and stores entries in the database.
          </p>

          <div class="split">
            <div class="mini">
              <div class="miniTitle">Skills</div>
              <ul class="listClean">
                <li>Frontend (Vue)</li>
                <li>Backend (NestJS)</li>
                <li>Database (Supabase)</li>
                <li>Deployment (Vercel)</li>
              </ul>
            </div>

            <div class="mini">
              <div class="miniTitle">Links</div>
              <ul class="listClean">
                <li><a class="link" href="#" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a class="link" href="#" target="_blank" rel="noreferrer">Vercel</a></li>
                <li><a class="link" href="#" target="_blank" rel="noreferrer">Backend API</a></li>
              </ul>
            </div>
          </div>

          <div class="marquee" aria-label="tech marquee">
            <div class="track">
              <span class="chip">Vue</span>
              <span class="chip">Vite</span>
              <span class="chip">NestJS</span>
              <span class="chip">REST API</span>
              <span class="chip">Supabase</span>
              <span class="chip">Vercel</span>

              <span class="chip">Vue</span>
              <span class="chip">Vite</span>
              <span class="chip">NestJS</span>
              <span class="chip">REST API</span>
              <span class="chip">Supabase</span>
              <span class="chip">Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GUESTBOOK -->
    <section id="guestbook" class="section">
      <div class="sectionHead">
        <div>
          <h2 class="h2">Guestbook</h2>
          <p class="muted small">Leave an entry below.</p>
        </div>

        <div class="rightMeta">
          <div class="countBox">
            <div class="countLabel">Total entries</div>
            <div class="countValue">{{ messages.length }}</div>
          </div>
          <button class="btn" @click="load" :disabled="loading || apiMissing">
            {{ loading ? "Refreshing…" : "Refresh" }}
          </button>
        </div>
      </div>

      <div v-if="apiMissing" class="notice">
        <div class="noticeTitle">Configuration required</div>
        <div class="noticeText">
          Set <code>VITE_API_URL</code> in your frontend Vercel project to your backend URL, then redeploy.
        </div>
      </div>

      <div class="guestGrid">
        <!-- Form -->
        <form class="card" @submit.prevent="submit" aria-label="Guestbook form">
          <h3 class="h3">Sign the guestbook</h3>

          <div class="row2">
            <label class="field">
              <span>Name</span>
              <input v-model="name" class="input" placeholder="Full name" maxlength="40" />
            </label>

            <label class="field">
              <span>Location</span>
              <input v-model="location" class="input" placeholder="City / Country" maxlength="60" />
            </label>
          </div>

          <div class="field">
            <div class="fieldTop">
              <span class="fieldLabel">Category</span>
              <span class="muted small">Selected: {{ selectedTagLabel }}</span>
            </div>

            <div class="pillGrid" role="list">
              <button
                v-for="t in tags"
                :key="t.id"
                type="button"
                class="pill"
                :class="{ active: tag === t.id }"
                @click="tag = t.id"
                role="listitem"
              >
                {{ t.label }}
              </button>
            </div>
          </div>

          <label class="field">
            <span>Message</span>
            <textarea
              v-model="message"
              class="input textarea"
              placeholder="Write a message (max 200)"
              maxlength="200"
            ></textarea>
            <div class="counter">{{ (message || "").length }}/200</div>
          </label>

          <div class="actions">
            <button class="btn primary" :disabled="loading || apiMissing">
              {{ loading ? "Posting…" : "Submit" }}
            </button>
            <button class="btn" type="button" @click="resetForm" :disabled="loading">
              Clear
            </button>
          </div>

          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="ok" class="ok">Submitted.</p>
        </form>

        <!-- Entries preview -->
        <div class="card" aria-label="Guestbook preview">
          <h3 class="h3">Latest entries</h3>
          <div class="previewList">
            <div v-if="messages.length === 0" class="empty muted">No entries.</div>

            <article v-for="m in messages.slice(0, 4)" :key="m.id" class="previewItem">
              <div class="previewTop">
                <div class="strong">{{ m.name }}</div>
                <div class="muted small">{{ formatDate(m.created_at) }}</div>
              </div>
              <div class="muted small">{{ m.location || "—" }} • {{ m.tag ? tagLabel(m.tag) : "—" }}</div>
              <div class="previewMsg">{{ m.message }}</div>
            </article>

            <a class="linkBtn" href="#entries">View all entries →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ENTRIES -->
    <section id="entries" class="section">
      <div class="sectionHead">
        <div>
          <h2 class="h2">Entries</h2>
          <p class="muted small">Search and filter entries.</p>
        </div>

        <div class="filters">
          <input v-model="query" class="input filterInput" placeholder="Search" maxlength="40" />
          <select v-model="filterTag" class="input filterSelect">
            <option value="">All categories</option>
            <option v-for="t in tags" :key="t.id" :value="t.id">{{ t.label }}</option>
          </select>
        </div>
      </div>

      <div class="table">
        <div class="tableHead">
          <div>Name</div>
          <div>Location</div>
          <div>Category</div>
          <div>Date</div>
        </div>

        <div v-if="filteredMessages.length === 0" class="empty muted">No entries found.</div>

        <article v-for="m in filteredMessages" :key="m.id" class="tableRow">
          <div class="cell strong">{{ m.name }}</div>
          <div class="cell muted">{{ m.location || "—" }}</div>
          <div class="cell">
            <span v-if="m.tag" class="tagPill">{{ tagLabel(m.tag) }}</span>
            <span v-else class="muted">—</span>
          </div>
          <div class="cell muted">{{ formatDate(m.created_at) }}</div>

          <div class="msgRow">
            <div class="msgLabel muted">Message</div>
            <div class="msgText">{{ m.message }}</div>
          </div>
        </article>
      </div>
    </section>

    <footer class="footer">
      <div class="muted small">© {{ new Date().getFullYear() }} Maku</div>
      <div class="muted small">Profile • Guestbook</div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const API = import.meta.env.VITE_API_URL || "";
const apiMissing = computed(() => !API || typeof API !== "string" || !API.startsWith("http"));

const tags = [
  { id: "formal", label: "Formal" },
  { id: "respectful", label: "Respectful" },
  { id: "professional", label: "Professional" },
  { id: "friendly", label: "Friendly" },
  { id: "neutral", label: "Neutral" },
  { id: "feedback", label: "Feedback" },
];

const name = ref("");
const location = ref("");
const tag = ref("formal");
const message = ref("");

const messages = ref([]);
const loading = ref(false);
const error = ref("");
const ok = ref(false);

const query = ref("");
const filterTag = ref("");

const selectedTagLabel = computed(() => tagLabel(tag.value));

function tagLabel(id) {
  const t = tags.find((x) => x.id === id);
  return t ? t.label : id || "";
}

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleString();
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
    error.value = "Failed to load entries. Check API URL or backend status.";
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  name.value = "";
  location.value = "";
  message.value = "";
  tag.value = "formal";
  error.value = "";
  ok.value = false;
}

async function submit() {
  error.value = "";
  ok.value = false;

  const n = (name.value || "").trim();
  const loc = (location.value || "").trim();
  const msg = (message.value || "").trim();

  if (!n || !msg) {
    error.value = "Please enter your name and message.";
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
      location.value = "";
      message.value = "";
      await load();
    }
  } catch (e) {
    error.value = "Failed to post. Check backend and env vars.";
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<style>
:root{
  --bg:#0b0b0b;
  --card:#121212;
  --border:#232323;
  --text:#fff;
  --muted:rgba(255,255,255,.68);
  --muted2:rgba(255,255,255,.45);
  --shadow:0 14px 44px rgba(0,0,0,.45);
  --radius:16px;
}
*{ box-sizing:border-box; }
html,body{ margin:0; padding:0; background:var(--bg); color:var(--text); }
a{ color:inherit; text-decoration:none; }

.page{ max-width:1160px; margin:0 auto; padding:26px 18px 44px; }

/* Header */
.header{
  display:flex; justify-content:space-between; align-items:flex-end; gap:16px;
  padding:14px 2px 18px;
  border-bottom:1px solid var(--border);
}
.brandTitle{ font-weight:900; font-size:22px; letter-spacing:-.01em; }
.brandSub{
  margin-top:6px; font-size:12px; color:var(--muted);
  letter-spacing:.08em; text-transform:uppercase;
}
.nav{ display:flex; gap:10px; }
.nav a{
  font-size:13px; color:var(--muted); padding:8px 10px; border-radius:999px;
}
.nav a:hover{ background:rgba(255,255,255,.06); color:#fff; }

/* Profile */
.profile{ padding-top:18px; }
.profileGrid{
  display:grid; grid-template-columns: 1fr 1fr; gap:18px; align-items:stretch;
}
.profileTop{ display:flex; gap:14px; align-items:center; }
.avatar{
  width:44px; height:44px; border-radius:12px;
  border:1px solid var(--border);
  background:linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,0));
}
.name{ font-weight:900; font-size:18px; }
.role{ font-size:12px; }
.divider{ height:1px; background:var(--border); margin:14px 0; }

.kv{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.kvItem{ border:1px solid var(--border); border-radius:14px; padding:12px; background:rgba(255,255,255,.02); }
.kvLabel{ font-size:12px; color:var(--muted2); margin-bottom:6px; }
.kvValue{ font-size:13px; font-weight:800; }

.actionsRow{ display:flex; gap:10px; flex-wrap:wrap; margin-top:14px; }

/* Sections */
.section{ padding-top:18px; }
.sectionHead{
  display:flex; justify-content:space-between; align-items:flex-start; gap:12px;
  margin-bottom:12px;
}

.rightMeta{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content:flex-end; }
.countBox{
  border:1px solid var(--border);
  border-radius:14px;
  padding:10px 12px;
  background:rgba(255,255,255,.02);
  text-align:right;
}
.countLabel{ font-size:12px; color:var(--muted2); }
.countValue{ font-size:18px; font-weight:900; margin-top:4px; }

.card{
  background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,0));
  border:1px solid var(--border);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  padding:20px;
}
.cardHead{ display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
.metaPill{
  font-size:12px; padding:8px 10px; border-radius:999px;
  border:1px solid var(--border); background:rgba(255,255,255,.02); color:var(--muted);
}
.h2{ margin:0 0 6px; font-size:18px; letter-spacing:-.01em; }
.h3{ margin:0 0 12px; font-size:14px; letter-spacing:-.01em; }
.p{ margin:10px 0 0; color:var(--muted); line-height:1.6; }
.muted{ color:var(--muted); }
.small{ font-size:12px; }
.strong{ font-weight:900; }

/* Split + lists */
.split{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-top:14px; }
.mini{ border:1px solid var(--border); border-radius:14px; padding:14px; background:rgba(255,255,255,.02); }
.miniTitle{ font-weight:900; font-size:13px; margin-bottom:8px; }
.listClean{ margin:0; padding-left:18px; color:var(--muted); line-height:1.6; }
.link{ color:#fff; border-bottom:1px solid rgba(255,255,255,.25); }
.link:hover{ border-bottom-color:#fff; }

.linkBtn{
  display:inline-flex; margin-top:12px;
  padding:10px 12px; border-radius:12px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.02);
  font-weight:800; font-size:12px;
}

/* Marquee */
.marquee{
  border:1px solid var(--border);
  border-radius:14px;
  overflow:hidden;
  background:rgba(255,255,255,.02);
  margin-top:14px;
}
.track{
  display:flex; gap:10px; padding:10px;
  width:max-content;
  animation: scroll 18s linear infinite;
}
@keyframes scroll{ from{ transform:translateX(0);} to{ transform:translateX(-50%);} }
.chip{
  padding:8px 10px;
  border:1px solid var(--border);
  border-radius:999px;
  font-size:12px;
  background:rgba(255,255,255,.03);
  white-space:nowrap;
}

/* Guest grid */
.guestGrid{
  display:grid; grid-template-columns: 1fr 1fr; gap:18px; align-items:start;
}
.row2{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.field span{ display:block; font-size:12px; color:var(--muted2); margin-bottom:7px; }
.fieldTop{ display:flex; justify-content:space-between; align-items:baseline; gap:10px; }
.fieldLabel{ font-size:12px; color:var(--muted2); }

.input{
  width:100%;
  padding:12px 14px;
  border-radius:14px;
  border:1px solid #2a2a2a;
  background:#0b0b0b;
  color:#fff;
  outline:none;
}
.input:focus{ border-color:#4a4a4a; }
.textarea{ min-height:120px; resize:vertical; }
.counter{ text-align:right; font-size:12px; color:var(--muted); margin-top:6px; }

.pillGrid{ display:flex; flex-wrap:wrap; gap:10px; margin-top:8px; }
.pill{
  border:1px solid #2a2a2a;
  background:rgba(255,255,255,.02);
  color:#fff;
  padding:10px 12px;
  border-radius:999px;
  font-size:12px;
  font-weight:800;
  cursor:pointer;
}
.pill:hover{ border-color:#3a3a3a; transform: translateY(-1px); }
.pill.active{ background:#fff; color:#000; border-color:#fff; }

.actions{ display:flex; gap:10px; flex-wrap:wrap; margin-top:4px; }

.btn{
  border:1px solid #2a2a2a;
  background:transparent;
  color:#fff;
  padding:12px 14px;
  border-radius:14px;
  font-weight:900;
  font-size:13px;
  cursor:pointer;
}
.btn:hover{ transform: translateY(-1px); }
.btn:disabled{ opacity:.6; cursor:not-allowed; transform:none; }
.btn.primary{ background:#fff; color:#000; border-color:#fff; }

.error{ color:#ff8e8e; margin:0; font-size:13px; }
.ok{ color:#9dffb3; margin:0; font-size:13px; }

/* Preview */
.previewList{ display:grid; gap:12px; }
.previewItem{
  border:1px solid var(--border);
  border-radius:14px;
  padding:12px;
  background:rgba(255,255,255,.02);
}
.previewTop{ display:flex; justify-content:space-between; gap:10px; align-items:baseline; }
.previewMsg{ margin-top:8px; line-height:1.6; }

/* Filters + table */
.filters{ display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; }
.filterInput{ width:260px; }
.filterSelect{ width:170px; }

.table{
  border:1px solid var(--border);
  border-radius:14px;
  background:rgba(255,255,255,.02);
  overflow:hidden;
}
.tableHead{
  display:grid;
  grid-template-columns: 1.1fr .9fr .8fr .9fr;
  gap:10px;
  padding:12px 14px;
  border-bottom:1px solid var(--border);
  font-size:12px;
  color:var(--muted2);
  letter-spacing:.02em;
  text-transform:uppercase;
}
.tableRow{
  display:grid;
  grid-template-columns: 1.1fr .9fr .8fr .9fr;
  gap:10px;
  align-items:baseline;
  padding:12px 14px 14px;
  border-bottom:1px solid var(--border);
}
.tableRow:last-child{ border-bottom:none; }
.cell{ font-size:13px; }
.tagPill{
  display:inline-flex;
  padding:6px 10px;
  border-radius:999px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.03);
  font-size:12px;
  color:var(--muted);
  font-weight:800;
}

.msgRow{
  grid-column: 1 / -1;
  display:grid;
  grid-template-columns: 120px 1fr;
  gap:10px;
  margin-top:10px;
  padding-top:10px;
  border-top:1px dashed rgba(255,255,255,.08);
}
.msgLabel{ font-size:12px; color:var(--muted2); text-transform:uppercase; letter-spacing:.02em; }
.msgText{ line-height:1.6; }
.empty{ padding:14px; }

/* Footer */
.footer{
  margin-top:18px;
  padding-top:18px;
  border-top:1px solid var(--border);
  display:flex;
  justify-content:space-between;
  gap:12px;
  flex-wrap:wrap;
}

/* Responsive */
@media (max-width: 980px){
  .profileGrid{ grid-template-columns: 1fr; }
  .guestGrid{ grid-template-columns: 1fr; }
  .row2{ grid-template-columns: 1fr; }
  .filters{ justify-content:flex-start; }
  .filterInput,.filterSelect{ width:100%; }
  .tableHead{ display:none; }
  .tableRow{ grid-template-columns: 1fr; gap:8px; }
  .msgRow{ grid-template-columns: 1fr; }
  .split{ grid-template-columns: 1fr; }
}
@media (max-width: 820px){
  .nav{ display:none; }
}
</style>