<template>
  <div class="page">
    <!-- Header -->
    <header class="topbar">
      <div class="titleWrap">
        <div class="title">Maku&apos;s Guestbook</div>
        <div class="subtitle">Formal</div>
      </div>

      <div class="topActions">
        <button class="btn ghost" @click="load" :disabled="loading || apiMissing">
          {{ loading ? "Refreshing..." : "Refresh" }}
        </button>
      </div>
    </header>

    <!-- Main -->
    <main class="layout">
      <!-- Guest panel -->
      <section class="panel" aria-label="Guestbook form">
        <div class="panelHead">
          <div class="panelTitle">
            <h2 class="h2">Sign the guestbook</h2>
            <p class="muted small">
              Entries are displayed on the right. Use search and filters to view.
            </p>
          </div>

          <div class="stats">
            <div class="statBox">
              <div class="statLabel">Guests signed</div>
              <div class="statValue">{{ messages.length }}</div>
            </div>
          </div>
        </div>

        <div v-if="apiMissing" class="notice">
          <div class="noticeTitle">API URL missing</div>
          <div class="noticeText">
            Set <code>VITE_API_URL</code> in your <b>frontend</b> Vercel project to your backend URL, then redeploy.
          </div>
        </div>

        <form class="form" @submit.prevent="submit">
          <label class="field">
            <span>Name</span>
            <input v-model="name" class="input" placeholder="Your name" maxlength="40" />
          </label>

          <label class="field">
            <span>Where you&apos;re from</span>
            <input v-model="location" class="input" placeholder="City / Country" maxlength="60" />
          </label>

          <div class="field">
            <div class="fieldRow">
              <span class="fieldLabel">Select a tag</span>
              <span class="muted small">Selected: {{ selectedTagLabel }}</span>
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
                <span class="tagDot" aria-hidden="true"></span>
                <span class="tagText">{{ t.label }}</span>
              </button>
            </div>
          </div>

          <label class="field">
            <span>Message</span>
            <textarea
              v-model="message"
              class="input textarea"
              placeholder="Write a message"
              maxlength="200"
            ></textarea>
            <div class="counter">{{ (message || "").length }}/200</div>
          </label>

          <div class="actions">
            <button class="btn" :disabled="loading || apiMissing">
              {{ loading ? "Posting..." : "Post message" }}
            </button>
            <button class="btn ghost" type="button" @click="resetForm" :disabled="loading">
              Clear
            </button>
          </div>

          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="ok" class="ok">Posted.</p>
        </form>
      </section>

      <!-- Guest list -->
      <section class="log" aria-label="Guestbook entries">
        <div class="logHead">
          <div>
            <h2 class="h2">Guest entries</h2>
            <p class="muted small">Search and filter to find entries.</p>
          </div>

          <div class="tools">
            <input v-model="query" class="input tool" placeholder="Search name/message/location" maxlength="40" />
            <select v-model="filterTag" class="input tool select">
              <option value="">All tags</option>
              <option v-for="t in tags" :key="t.id" :value="t.id">{{ t.label }}</option>
            </select>
          </div>
        </div>

        <div class="list">
          <div v-if="filteredMessages.length === 0" class="empty muted">
            No entries found.
          </div>

          <article v-for="m in filteredMessages" :key="m.id" class="entry">
            <div class="entryTop">
              <div class="entryName">
                {{ m.name }}
                <span v-if="m.tag" class="tagPill">{{ tagLabel(m.tag) }}</span>
              </div>
              <div class="entryMeta muted">
                <span>{{ m.location || "—" }}</span>
                <span class="sep">•</span>
                <span>{{ formatDate(m.created_at) }}</span>
              </div>
            </div>

            <div class="entryMsg">{{ m.message }}</div>
          </article>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="muted small">© {{ new Date().getFullYear() }} Maku</div>
      <div class="muted small">Guestbook</div>
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
  { id: "friendly", label: "Friendly" },
  { id: "professional", label: "Professional" },
  { id: "short", label: "Short" },
  { id: "detailed", label: "Detailed" },
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
      body: JSON.stringify({
        name: n,
        message: msg,
        location: loc,
        tag: tag.value,
      }),
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
  --card:#101010;
  --border:#1f1f1f;
  --text:#ffffff;
  --muted:rgba(255,255,255,.65);
  --muted2:rgba(255,255,255,.45);
  --shadow:0 12px 34px rgba(0,0,0,.4);
  --radius:20px;
}
*{ box-sizing:border-box; }
html,body{ margin:0; padding:0; background:var(--bg); color:var(--text); }
.page{
  max-width:1180px;
  margin:0 auto;
  padding:22px 18px 40px;
}

/* Header */
.topbar{
  position:sticky; top:0; z-index:20;
  display:flex; align-items:center; justify-content:space-between;
  gap:12px;
  padding:14px 12px;
  margin:-10px 0 18px;
  border-bottom:1px solid var(--border);
  background:rgba(11,11,11,.85);
  backdrop-filter: blur(10px);
}
.titleWrap{ display:grid; gap:4px; }
.title{ font-weight:900; letter-spacing:.2px; font-size:16px; }
.subtitle{ font-size:12px; color:var(--muted); }
.nav{ display:flex; gap:10px; }
.nav a{
  font-size:13px;
  color:var(--muted);
  padding:8px 10px;
  border-radius:999px;
  text-decoration:none;
}
.nav a:hover{ background:rgba(255,255,255,.06); color:#fff; }
.topActions{ display:flex; gap:10px; align-items:center; }

/* Layout */
.layout{
  display:grid;
  grid-template-columns: 0.98fr 1.02fr;
  gap:18px;
  align-items:start;
}

/* Panels */
.panel, .log{
  border:1px solid var(--border);
  background:var(--card);
  border-radius:var(--radius);
  padding:22px;
  box-shadow:var(--shadow);
}
.panelHead{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
  margin-bottom:14px;
}
.h2{ margin:0 0 6px; font-size:18px; letter-spacing:-.01em; }
.muted{ color:var(--muted); }
.small{ font-size:12px; }
.stats{ display:flex; gap:10px; }
.statBox{
  border:1px solid var(--border);
  border-radius:16px;
  padding:12px 14px;
  background:rgba(255,255,255,.02);
  min-width:140px;
}
.statLabel{ font-size:12px; color:var(--muted2); margin-bottom:6px; }
.statValue{ font-size:22px; font-weight:900; }

/* Notice */
.notice{
  border:1px solid #3a3a3a;
  background:rgba(255,255,255,.03);
  border-radius:16px;
  padding:14px;
  margin-bottom:14px;
}
.noticeTitle{ font-weight:900; margin-bottom:6px; }
.noticeText{ font-size:13px; color:var(--muted); line-height:1.55; }
code{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace; font-size:12px; }

/* Form */
.form{ display:grid; gap:12px; }
.field span{ display:block; font-size:12px; color:var(--muted2); margin-bottom:7px; }
.fieldRow{ display:flex; justify-content:space-between; align-items:baseline; gap:10px; }
.fieldLabel{ font-size:12px; color:var(--muted2); }

.input{
  width:100%;
  padding:12px 14px;
  border-radius:16px;
  border:1px solid #2a2a2a;
  background:#0b0b0b;
  color:#fff;
  outline:none;
}
.input:focus{ border-color:#4a4a4a; }
.textarea{ min-height:120px; resize:vertical; }
.counter{ text-align:right; font-size:12px; color:var(--muted); margin-top:6px; }

.tagGrid{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap:10px;
  margin-top:8px;
}
.tagBtn{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  padding:12px 10px;
  border-radius:16px;
  border:1px solid #2a2a2a;
  background:rgba(255,255,255,.02);
  color:#fff;
  cursor:pointer;
}
.tagBtn:hover{ transform: translateY(-1px); border-color:#3a3a3a; }
.tagBtn.active{
  background:#fff;
  color:#000;
  border-color:#fff;
}
.tagDot{
  width:10px; height:10px;
  border-radius:999px;
  background: currentColor;
  opacity:.9;
}
.tagText{ font-size:12px; font-weight:900; }

.actions{ display:flex; gap:10px; flex-wrap:wrap; }

/* Buttons */
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:12px 14px;
  border-radius:16px;
  border:1px solid #2a2a2a;
  background:#fff;
  color:#000;
  font-weight:900;
  font-size:13px;
  cursor:pointer;
}
.btn:hover{ transform: translateY(-1px); }
.btn:disabled{ opacity:.6; cursor:not-allowed; transform:none; }
.btn.ghost{ background:transparent; color:#fff; }
.error{ color:#ff8e8e; margin:0; font-size:13px; }
.ok{ color:#9dffb3; margin:0; font-size:13px; }

/* Log */
.logHead{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
  margin-bottom:12px;
}
.tools{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
  justify-content:flex-end;
}
.tool{ width:260px; }
.select{ width:160px; }

.list{
  border:1px solid var(--border);
  border-radius:18px;
  padding:14px;
  background:rgba(255,255,255,.02);
  max-height:560px;
  overflow:auto;
}
.empty{ padding:10px 6px; }
.entry{
  border-top:1px solid var(--border);
  padding:12px 6px;
}
.entry:first-child{ border-top:none; }
.entryTop{ display:grid; gap:6px; margin-bottom:6px; }
.entryName{ font-weight:900; display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
.tagPill{
  font-size:11px;
  padding:6px 9px;
  border-radius:999px;
  border:1px solid var(--border);
  color:var(--muted);
  background:rgba(255,255,255,.03);
}
.entryMeta{ font-size:12px; display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
.sep{ opacity:.5; }
.entryMsg{ line-height:1.65; }

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
  .layout{ grid-template-columns: 1fr; }
}
@media (max-width: 920px){
  .page{ padding:18px 14px 30px; }
  .nav{ display:none; }
  .panel, .log{ padding:18px; }
  .tagGrid{ grid-template-columns: repeat(2, 1fr); }
  .tool, .select{ width:100%; }
}
</style>