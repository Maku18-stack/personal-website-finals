<template>
  <div class="page">
    <!-- Header -->
    <header class="header">
      <div class="brand">
        <div class="brandTitle">Maku’s Guestbook</div>
        <div class="brandSub">Formal registry</div>
      </div>

      <div class="headerRight">
        <div class="meta">
          <div class="metaLabel">Total entries</div>
          <div class="metaValue">{{ messages.length }}</div>
        </div>
        <button class="btn" @click="load" :disabled="loading || apiMissing">
          {{ loading ? "Refreshing…" : "Refresh" }}
        </button>
      </div>
    </header>

    <!-- Content -->
    <main class="content">
      <section class="grid">
        <!-- Register -->
        <section class="panel" aria-label="Register entry">
          <div class="panelHead">
            <h2 class="h2">Register your entry</h2>
            <p class="muted small">Complete the form and submit.</p>
          </div>

          <div v-if="apiMissing" class="notice">
            <div class="noticeTitle">Configuration required</div>
            <div class="noticeText">
              Set <code>VITE_API_URL</code> in the <b>frontend</b> Vercel project to your backend URL, then redeploy.
            </div>
          </div>

          <form class="form" @submit.prevent="submit">
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
                placeholder="Write a short message (max 200 characters)"
                maxlength="200"
              ></textarea>
              <div class="counter">{{ (message || "").length }}/200</div>
            </label>

            <div class="actions">
              <button class="btn primary" :disabled="loading || apiMissing">
                {{ loading ? "Posting…" : "Submit entry" }}
              </button>
              <button class="btn" type="button" @click="resetForm" :disabled="loading">
                Clear
              </button>
            </div>

            <p v-if="error" class="error">{{ error }}</p>
            <p v-if="ok" class="ok">Entry submitted.</p>
          </form>
        </section>

        <!-- Entries -->
        <section class="panel" aria-label="Entries">
          <div class="panelHead rowBetween">
            <div>
              <h2 class="h2">Entries</h2>
              <p class="muted small">Search and filter.</p>
            </div>

            <div class="filters">
              <input
                v-model="query"
                class="input filterInput"
                placeholder="Search name/message/location"
                maxlength="40"
              />
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

            <div v-if="filteredMessages.length === 0" class="empty muted">
              No entries found.
            </div>

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
      </section>
    </main>

    <footer class="footer">
      <div class="muted small">© {{ new Date().getFullYear() }} Maku</div>
      <div class="muted small">Guestbook registry</div>
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
  --surface:#0f0f0f;
  --card:#121212;
  --border:#232323;
  --text:#ffffff;
  --muted:rgba(255,255,255,.68);
  --muted2:rgba(255,255,255,.45);
  --shadow:0 14px 44px rgba(0,0,0,.45);
  --radius:16px;
}

*{ box-sizing:border-box; }
html,body{ margin:0; padding:0; background:var(--bg); color:var(--text); }
.page{ max-width:1160px; margin:0 auto; padding:26px 18px 44px; }

/* Header */
.header{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:16px;
  padding:14px 2px 18px;
  border-bottom:1px solid var(--border);
}
.brandTitle{
  font-weight:900;
  font-size:22px;
  letter-spacing:-.01em;
}
.brandSub{
  margin-top:6px;
  font-size:12px;
  color:var(--muted);
  letter-spacing:.08em;
  text-transform:uppercase;
}

.headerRight{
  display:flex;
  align-items:center;
  gap:12px;
}
.meta{
  text-align:right;
  padding:10px 12px;
  border:1px solid var(--border);
  border-radius:14px;
  background:rgba(255,255,255,.02);
}
.metaLabel{ font-size:12px; color:var(--muted2); }
.metaValue{ font-size:18px; font-weight:900; margin-top:4px; }

/* Layout */
.content{ padding-top:18px; }
.grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:18px;
  align-items:start;
}

.panel{
  background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,0));
  border:1px solid var(--border);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  padding:20px;
}

.panelHead{ margin-bottom:14px; }
.rowBetween{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
}

.h2{ margin:0 0 6px; font-size:18px; letter-spacing:-.01em; }
.muted{ color:var(--muted); }
.small{ font-size:12px; }

/* Notice */
.notice{
  border:1px solid #3a3a3a;
  background:rgba(255,255,255,.02);
  border-radius:14px;
  padding:12px;
  margin-bottom:12px;
}
.noticeTitle{ font-weight:900; margin-bottom:6px; }
.noticeText{ color:var(--muted); font-size:13px; line-height:1.55; }
code{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace; font-size:12px; }

/* Form */
.form{ display:grid; gap:12px; }
.row2{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.field span{ display:block; font-size:12px; color:var(--muted2); margin-bottom:7px; }

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

.fieldTop{ display:flex; justify-content:space-between; align-items:baseline; gap:10px; }
.fieldLabel{ font-size:12px; color:var(--muted2); }

/* Category pills */
.pillGrid{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:8px;
}
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
.pill.active{
  background:#fff;
  color:#000;
  border-color:#fff;
}

/* Buttons */
.actions{ display:flex; gap:10px; flex-wrap:wrap; }
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
.btn.primary{
  background:#fff;
  color:#000;
  border-color:#fff;
}

.error{ color:#ff8e8e; margin:0; font-size:13px; }
.ok{ color:#9dffb3; margin:0; font-size:13px; }

/* Filters */
.filters{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
  justify-content:flex-end;
}
.filterInput{ width:260px; }
.filterSelect{ width:170px; }

/* Entries table */
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
  padding:12px 14px 14px;
  border-bottom:1px solid var(--border);
}
.tableRow:last-child{ border-bottom:none; }

.tableRow > .cell{
  display:inline-block;
}
.tableRow{
  display:grid;
  grid-template-columns: 1.1fr .9fr .8fr .9fr;
  gap:10px;
  align-items:baseline;
}
.cell{ font-size:13px; }
.strong{ font-weight:900; }

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

/* Message row under each entry */
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
  .grid{ grid-template-columns: 1fr; }
  .row2{ grid-template-columns: 1fr; }
  .filters{ justify-content:flex-start; }
  .filterInput, .filterSelect{ width:100%; }
  .tableHead{ display:none; }
  .tableRow{
    grid-template-columns: 1fr;
    gap:8px;
  }
  .msgRow{ grid-template-columns: 1fr; }
}
</style>