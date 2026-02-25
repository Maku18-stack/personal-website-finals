<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-word">maku<span class="brand-accent">.</span></span>
        </div>

        <nav class="desktop-nav">
          <a v-for="link in navLinks" :key="link.id" :href="'#'+link.id" @click="closeMenu">
            {{ link.label }}
          </a>
        </nav>

        <div class="header-actions">
          <a href="https://github.com/Maku18-stack" target="_blank" rel="noreferrer" class="icon-btn" title="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
            </svg>
          </a>

          <a href="https://www.linkedin.com/in/mark-benedict-d-ani" target="_blank" rel="noreferrer" class="icon-btn" title="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          <button class="hamburger" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen" aria-label="Toggle menu">
            <span :class="{ open: mobileOpen }"></span>
            <span :class="{ open: mobileOpen }"></span>
            <span :class="{ open: mobileOpen }"></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile nav drawer -->
    <div class="mobile-drawer" :class="{ visible: mobileOpen }" role="navigation">
      <a v-for="link in navLinks" :key="link.id" :href="'#'+link.id" @click="closeMenu">
        <span class="drawer-num">{{ String(link.num).padStart(2,'0') }}</span>
        {{ link.label }}
      </a>
    </div>

    <main>
      <!-- HERO -->
      <section id="home" class="hero-section">
        <div class="hero-bg-grid" aria-hidden="true"></div>
        <div class="hero-glow" aria-hidden="true"></div>

        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            Available for opportunities
          </div>

          <h1 class="hero-title">
            <span class="hero-greeting">Hey, I'm</span>
            <span class="hero-name">Mark Benedict</span>
            <span class="hero-aka">
              <span class="aka-line"></span>
              <span class="aka-text">Maku18-stack</span>
            </span>
          </h1>

          <p class="hero-desc">
            2nd Year IT student from the Philippines building modern web apps
            with <em>React.js</em>, <em>Vue.js</em>, and backend solutions
            powered by <em>Supabase</em> &amp; <em>Firebase</em>.
          </p>

          <div class="hero-cta-row">
            <a href="#projects" class="btn-primary">View Projects <span>↓</span></a>
            <a href="#guestbook" class="btn-outline">Sign Guestbook</a>
          </div>

          <div class="hero-stats">
            <div class="stat">
              <span class="stat-num">2</span>
              <span class="stat-label">Projects</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">3+</span>
              <span class="stat-label">Frameworks</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">2nd</span>
              <span class="stat-label">Year IT</span>
            </div>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="avatar-frame">
            <div class="avatar-spin-ring"></div>
            <div class="avatar-core">
              <span class="avatar-initials">MA</span>
            </div>
            <div class="avatar-orbit">
              <span class="orbit-dot" v-for="(t,i) in orbitTech" :key="i"
                :style="`--angle:${i * (360/orbitTech.length)}deg`">
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT -->
      <section id="about" class="section">
        <div class="section-label">
          <span class="label-num">01</span>
          <span class="label-line"></span>
          <span>About Me</span>
        </div>

        <div class="about-grid">
          <div class="about-left">
            <h2 class="section-title">Crafting digital <br/><em>experiences</em> that matter</h2>
            <p class="about-body">
              I'm <strong>Mark Benedict D. Ani</strong> — a 2nd Year IT student passionate
              about building full-stack web applications. I love turning ideas into
              clean, functional products from the UI down to the database layer.
            </p>
            <p class="about-body">
              When I'm not coding, I'm leveling up my skills in modern frameworks,
              experimenting with new tech, and contributing to projects that solve
              real-world problems.
            </p>

            <div class="about-info-grid">
              <div class="info-tile">
                <span class="info-icon">📍</span>
                <div>
                  <div class="info-key">Location</div>
                  <div class="info-val">Philippines</div>
                </div>
              </div>
              <div class="info-tile">
                <span class="info-icon">🎓</span>
                <div>
                  <div class="info-key">Course</div>
                  <div class="info-val">BS Information Technology</div>
                </div>
              </div>
              <div class="info-tile">
                <span class="info-icon">⚡</span>
                <div>
                  <div class="info-key">Focus</div>
                  <div class="info-val">Full-Stack Web Dev</div>
                </div>
              </div>
              <div class="info-tile">
                <span class="info-icon">🐙</span>
                <div>
                  <div class="info-key">GitHub</div>
                  <div class="info-val">
                    <a href="https://github.com/Maku18-stack" target="_blank" rel="noreferrer" class="inline-link">
                      Maku18-stack ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="about-right">
            <div class="terminal-card">
              <div class="terminal-bar">
                <span class="t-dot red"></span>
                <span class="t-dot yellow"></span>
                <span class="t-dot green"></span>
                <span class="t-title">~/maku — profile.ts</span>
              </div>
              <div class="terminal-body">
                <div class="t-line"><span class="t-kw">const</span> <span class="t-var">dev</span> <span class="t-op">=</span> <span class="t-brace">&#123;</span></div>
                <div class="t-line t-indent"><span class="t-key">name</span><span class="t-op">:</span> <span class="t-str">"Mark Benedict D. Ani"</span><span class="t-op">,</span></div>
                <div class="t-line t-indent"><span class="t-key">alias</span><span class="t-op">:</span> <span class="t-str">"Maku18-stack"</span><span class="t-op">,</span></div>
                <div class="t-line t-indent"><span class="t-key">year</span><span class="t-op">:</span> <span class="t-num">2</span><span class="t-op">,</span></div>
                <div class="t-line t-indent"><span class="t-key">course</span><span class="t-op">:</span> <span class="t-str">"BS-IT"</span><span class="t-op">,</span></div>
                <div class="t-line t-indent"><span class="t-key">frontend</span><span class="t-op">:</span> <span class="t-brace">[</span><span class="t-str">"React"</span><span class="t-op">,</span> <span class="t-str">"Vue"</span><span class="t-brace">]</span><span class="t-op">,</span></div>
                <div class="t-line t-indent"><span class="t-key">backend</span><span class="t-op">:</span> <span class="t-brace">[</span><span class="t-str">"NestJS"</span><span class="t-op">,</span> <span class="t-str">"Node"</span><span class="t-brace">]</span><span class="t-op">,</span></div>
                <div class="t-line t-indent"><span class="t-key">db</span><span class="t-op">:</span> <span class="t-brace">[</span><span class="t-str">"Supabase"</span><span class="t-op">,</span> <span class="t-str">"Firebase"</span><span class="t-brace">]</span><span class="t-op">,</span></div>
                <div class="t-line t-indent"><span class="t-key">status</span><span class="t-op">:</span> <span class="t-str">"open to work 🚀"</span></div>
                <div class="t-line"><span class="t-brace">&#125;</span></div>
                <div class="t-line t-blank"></div>
                <div class="t-line"><span class="t-cmt">// always learning, always building</span></div>
                <div class="t-cursor-line"><span class="t-cursor">▊</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STACK -->
      <section id="stack" class="section">
        <div class="section-label">
          <span class="label-num">02</span>
          <span class="label-line"></span>
          <span>Tech Stack</span>
        </div>

        <h2 class="section-title">Tools I <em>build with</em></h2>

        <div class="stack-categories">
          <div class="stack-cat" v-for="cat in techStack" :key="cat.label">
            <div class="stack-cat-label">{{ cat.label }}</div>
            <div class="stack-pills">
              <div class="stack-pill" v-for="(tech, i) in cat.items" :key="tech.name" :style="`--i:${i}`">
                <span class="pill-icon">{{ tech.icon }}</span>
                <span class="pill-name">{{ tech.name }}</span>
                <div class="pill-bar">
                  <div class="pill-fill" :style="`--pct:${tech.level}%`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="marquee-wrap" aria-hidden="true">
          <div class="marquee-track">
            <span class="m-chip" v-for="(c,i) in [...allChips,...allChips]" :key="i">{{ c }}</span>
          </div>
        </div>
      </section>

      <!-- PROJECTS -->
      <section id="projects" class="section">
        <div class="section-label">
          <span class="label-num">03</span>
          <span class="label-line"></span>
          <span>Projects</span>
        </div>

        <div class="projects-header">
          <h2 class="section-title">Things I've <em>built</em></h2>
          <a href="https://github.com/Maku18-stack" target="_blank" rel="noreferrer" class="btn-outline sm">
            View all on GitHub ↗
          </a>
        </div>

        <div class="projects-grid">
          <article class="project-card featured" v-for="(p, i) in projects" :key="i">
            <div class="project-top">
              <div class="project-num">{{ String(i+1).padStart(2,'0') }}</div>
              <div class="project-status" :class="p.statusClass">{{ p.status }}</div>
            </div>

            <div class="project-icon-wrap">
              <span class="project-icon">{{ p.icon }}</span>
            </div>

            <h3 class="project-name">{{ p.name }}</h3>
            <p class="project-desc">{{ p.desc }}</p>

            <div class="project-tags">
              <span class="project-tag" v-for="t in p.tags" :key="t">{{ t }}</span>
            </div>

            <div class="project-links">
              <a v-if="p.github" :href="p.github" target="_blank" rel="noreferrer" class="proj-link">
                GitHub
              </a>
              <a v-if="p.live" :href="p.live" target="_blank" rel="noreferrer" class="proj-link primary">
                Live Demo ↗
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- GUESTBOOK -->
      <section id="guestbook" class="section guestbook-section">
        <div class="section-label">
          <span class="label-num">04</span>
          <span class="label-line"></span>
          <span>Guestbook</span>
        </div>

        <div class="gb-header">
          <div>
            <h2 class="section-title">Leave a <em>message</em></h2>
            <p class="gb-sub">Visited my portfolio? Drop a note — I'd love to hear from you!</p>
          </div>
          <div class="gb-meta">
            <div class="entry-count">
              <span class="count-big">{{ messages.length }}</span>
              <span class="count-text">entries</span>
            </div>
            <button class="btn-outline sm" @click="load" :disabled="loading || apiMissing">
              {{ loading ? '…' : '↺ Refresh' }}
            </button>
          </div>
        </div>

        <div v-if="apiMissing" class="api-notice">
          <span>⚠</span>
          <div>Set <code>VITE_API_URL</code> in your Vercel frontend project, then redeploy.</div>
        </div>

        <div class="gb-grid">
          <form class="gb-form card" @submit.prevent="submit" aria-label="Guestbook form">
            <h3 class="card-heading">Sign the guestbook</h3>

            <div class="form-row">
              <label class="form-field">
                <span class="form-label">Name <span class="req">*</span></span>
                <input v-model="name" class="form-input" placeholder="Your full name" maxlength="40" />
              </label>
              <label class="form-field">
                <span class="form-label">Location</span>
                <input v-model="location" class="form-input" placeholder="City / Country" maxlength="60" />
              </label>
            </div>

            <div class="form-field">
              <div class="form-label-row">
                <span class="form-label">Vibe <span class="req">*</span></span>
                <span class="form-hint">{{ selectedTagLabel }}</span>
              </div>
              <div class="tag-grid">
                <button
                  v-for="t in tags"
                  :key="t.id"
                  type="button"
                  class="tag-btn"
                  :class="{ active: tag === t.id }"
                  @click="tag = t.id"
                >{{ t.label }}</button>
              </div>
            </div>

            <label class="form-field">
              <span class="form-label">Message <span class="req">*</span></span>
              <textarea
                v-model="message"
                class="form-input form-textarea"
                placeholder="Leave a kind message, feedback, or just say hi 👋"
                maxlength="200"
              ></textarea>
              <div class="char-bar">
                <div class="char-fill" :style="`width:${((message||'').length/200)*100}%`"></div>
              </div>
              <span class="char-label">{{ (message || '').length }}/200</span>
            </label>

            <div class="form-actions">
              <button class="btn-primary" type="submit" :disabled="loading || apiMissing">
                {{ loading ? 'Posting…' : 'Post Message' }}
              </button>
              <button class="btn-ghost" type="button" @click="resetForm" :disabled="loading">
                Clear
              </button>
            </div>

            <p v-if="error" class="form-error">⚠ {{ error }}</p>
            <p v-if="ok" class="form-ok">✓ Message posted!</p>
          </form>

          <div class="gb-entries card">
            <h3 class="card-heading">Recent entries</h3>

            <div v-if="messages.length === 0" class="empty-msg">
              No entries yet — be the first to sign! 🎉
            </div>

            <article v-for="(m, i) in messages.slice(0, 5)" :key="m.id" class="entry-card" :style="`--i:${i}`">
              <div class="entry-head">
                <div class="entry-avatar">{{ (m.name || '?')[0].toUpperCase() }}</div>
                <div class="entry-who">
                  <div class="entry-name">{{ m.name }}</div>
                  <div class="entry-loc">{{ m.location || 'Unknown' }} · {{ m.tag ? tagLabel(m.tag) : '' }}</div>
                </div>
                <div class="entry-date">{{ formatDate(m.created_at) }}</div>
              </div>
              <p class="entry-msg">{{ m.message }}</p>
            </article>

            <a href="#entries" class="view-more-link">Browse all entries →</a>
          </div>
        </div>
      </section>

      <!-- ENTRIES -->
      <section id="entries" class="section">
        <div class="section-label">
          <span class="label-num">05</span>
          <span class="label-line"></span>
          <span>All Entries</span>
        </div>

        <div class="entries-top">
          <h2 class="section-title">All <em>messages</em></h2>
          <div class="entries-filters">
            <input v-model="query" class="form-input filter-input" placeholder="Search…" maxlength="40" />
            <select v-model="filterTag" class="form-input filter-select">
              <option value="">All vibes</option>
              <option v-for="t in tags" :key="t.id" :value="t.id">{{ t.label }}</option>
            </select>
          </div>
        </div>

        <div class="entries-table">
          <div class="table-head">
            <span>Name</span>
            <span>Location</span>
            <span>Vibe</span>
            <span>Date</span>
          </div>

          <div v-if="filteredMessages.length === 0" class="table-empty">No entries found.</div>

          <article v-for="m in filteredMessages" :key="m.id" class="table-row">
            <div class="tc tc-name">
              <div class="tc-avatar">{{ (m.name || '?')[0].toUpperCase() }}</div>
              {{ m.name }}
            </div>
            <div class="tc tc-muted">{{ m.location || '—' }}</div>
            <div class="tc">
              <span v-if="m.tag" class="vibe-badge">{{ tagLabel(m.tag) }}</span>
              <span v-else class="tc-muted">—</span>
            </div>
            <div class="tc tc-muted tc-mono">{{ formatDate(m.created_at) }}</div>

            <div class="tc-message">
              <span class="tc-msg-label">Message</span>
              <span class="tc-msg-body">{{ m.message }}</span>
            </div>
          </article>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="brand-dot sm"></span>
          <span>maku<span class="brand-accent">.</span></span>
        </div>
        <p class="footer-copy">Built by <strong>Mark Benedict D. Ani</strong> · Vue · NestJS · Supabase</p>
        <div class="footer-links">
          <a href="https://github.com/Maku18-stack" target="_blank" rel="noreferrer">GitHub</a>
          <span class="f-sep">·</span>
          <a href="https://www.linkedin.com/in/mark-benedict-d-ani" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

/* ── API ── */
const API = import.meta.env.VITE_API_URL || "";
const apiMissing = computed(() => !API || !API.startsWith("http"));

/* ── NAV ── */
const navLinks = [
  { id: "home", label: "Home", num: 0 },
  { id: "about", label: "About", num: 1 },
  { id: "stack", label: "Stack", num: 2 },
  { id: "projects", label: "Projects", num: 3 },
  { id: "guestbook", label: "Guestbook", num: 4 },
  { id: "entries", label: "Entries", num: 5 },
];

const mobileOpen = ref(false);
function closeMenu() { mobileOpen.value = false; }

/* ✅ Prevent background scroll when drawer is open */
watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

/* ── HERO ── */
const orbitTech = ["Vue", "React", "TS", "NestJS", "SB"];

/* ── TECH STACK ── */
const techStack = [
  { label: "Frontend", items: [
    { name: "React.js", icon: "⚛", level: 80 },
    { name: "Vue.js", icon: "◈", level: 85 },
    { name: "TypeScript", icon: "TS", level: 70 },
    { name: "Tailwind", icon: "🌊", level: 75 },
  ]},
  { label: "Backend", items: [
    { name: "NestJS", icon: "🏗", level: 72 },
    { name: "Node.js", icon: "⬡", level: 75 },
    { name: "REST API", icon: "⇌", level: 80 },
  ]},
  { label: "Database", items: [
    { name: "Supabase", icon: "◎", level: 82 },
    { name: "Firebase", icon: "🔥", level: 78 },
    { name: "MySQL", icon: "🐬", level: 70 },
    { name: "MongoDB", icon: "🍃", level: 65 },
  ]},
  { label: "Tools", items: [
    { name: "Git", icon: "⎇", level: 80 },
    { name: "Vite", icon: "⚡", level: 78 },
    { name: "Vercel", icon: "▲", level: 75 },
    { name: "VS Code", icon: "⬡", level: 90 },
  ]},
];

const allChips = ["React.js","Vue.js","TypeScript","NestJS","Node.js","Supabase","Firebase","MySQL","MongoDB","Tailwind CSS","Vite","Vercel","Git","REST API"];

/* ── PROJECTS ── */
const projects = [
  {
    icon: "🐾",
    name: "Happy Paws Vet Clinic",
    desc: "A full-featured veterinary clinic appointment booking system. Allows pet owners to schedule visits, manage appointments, and track their pet's history online.",
    tags: ["React.js", "Supabase", "TypeScript", "Tailwind CSS"],
    status: "Completed",
    statusClass: "status-done",
    github: "https://github.com/Maku18-stack",
    live: null,
  },
  {
    icon: "🧑‍💻",
    name: "Personal Portfolio",
    desc: "A responsive developer portfolio site built with React.js, showcasing projects, skills, and contact information — the foundation of my online presence.",
    tags: ["React.js", "CSS Modules", "Vite"],
    status: "Live",
    statusClass: "status-live",
    github: "https://github.com/Maku18-stack",
    live: null,
  },
];

/* ── GUESTBOOK ── */
const tags = [
  { id: "friendly", label: "Friendly 👋" },
  { id: "formal", label: "Formal 🎩" },
  { id: "professional", label: "Professional 💼" },
  { id: "respectful", label: "Respectful 🙏" },
  { id: "feedback", label: "Feedback 💬" },
  { id: "neutral", label: "Neutral 😐" },
];

const name = ref("");
const location = ref("");
const tag = ref("friendly");
const message = ref("");
const messages = ref([]);
const loading = ref(false);
const error = ref("");
const ok = ref(false);
const query = ref("");
const filterTag = ref("");

const selectedTagLabel = computed(() => tagLabel(tag.value));
function tagLabel(id) { return tags.find(x => x.id === id)?.label ?? id ?? ""; }
function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const filteredMessages = computed(() => {
  const q = (query.value || "").toLowerCase().trim();
  return messages.value.filter(m => {
    const matchText = !q || [m.name, m.message, m.location].some(f => (f||"").toLowerCase().includes(q));
    const matchTag = !filterTag.value || m.tag === filterTag.value;
    return matchText && matchTag;
  });
});

async function load() {
  error.value = ""; ok.value = false;
  if (apiMissing.value) { messages.value = []; return; }
  loading.value = true;
  try {
    const data = await (await fetch(`${API}/guestbook`)).json();
    messages.value = Array.isArray(data) ? data : [];
  } catch {
    error.value = "Failed to load entries. Check your API URL.";
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  name.value = ""; location.value = ""; message.value = "";
  tag.value = "friendly"; error.value = ""; ok.value = false;
}

async function submit() {
  error.value = ""; ok.value = false;
  const n = name.value.trim();
  const msg = message.value.trim();
  if (!n || !msg) { error.value = "Name and message are required."; return; }
  if (apiMissing.value) { error.value = "API URL missing — set VITE_API_URL."; return; }
  loading.value = true;
  try {
    const data = await (await fetch(`${API}/guestbook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: n, message: msg, location: location.value.trim(), tag: tag.value }),
    })).json();
    if (data?.error) error.value = data.error;
    else { ok.value = true; resetForm(); await load(); }
  } catch {
    error.value = "Failed to post. Check your backend.";
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&display=swap');

:root{
  --bg:#07080a;
  --surface:#111318;
  --surface2:#161a1f;
  --border:rgba(255,255,255,.07);
  --border2:rgba(255,255,255,.13);

  --txt:#eceef2;
  --txt2:rgba(236,238,242,.6);
  --txt3:rgba(236,238,242,.35);

  --accent:#64ffda;
  --accent-rgb:100,255,218;
  --accent2:#f7c948;

  --font:'Cabinet Grotesk',sans-serif;
  --mono:'JetBrains Mono',monospace;

  --r:16px;
  --r-sm:10px;
  --r-xs:7px;

  /* ✅ ONE responsive padding token (fixes "not following") */
  --pad: clamp(12px, 4vw, 24px);
}

html, body{
  width:100%;
  max-width:100%;
  overflow-x:hidden;
}

*{ box-sizing:border-box; margin:0; padding:0; }
body{
  background:var(--bg);
  color:var(--txt);
  font-family:var(--font);
  line-height:1.6;
}

a{ color:inherit; text-decoration:none; }

.app{ min-height:100vh; width:100%; overflow-x:hidden; }

main{
  max-width:1120px;
  margin:0 auto;
  padding-inline:var(--pad);
  width:100%;
}

.section{ padding:96px 0 0; }

.section-label{
  display:flex; align-items:center; gap:12px;
  font-size:12px; font-weight:700; letter-spacing:.12em;
  text-transform:uppercase; color:var(--accent);
  margin-bottom:20px; font-family:var(--mono);
}
.label-num{ color:var(--txt3); }
.label-line{ flex:0 0 40px; height:1px; background:var(--border2); }

.section-title{
  font-size:clamp(26px,4vw,42px);
  font-weight:900;
  letter-spacing:-.02em;
  line-height:1.15;
  margin-bottom:32px;
}

.btn-primary{
  display:inline-flex; align-items:center; gap:8px;
  background:var(--accent); color:#07080a;
  font-weight:800; font-size:14px;
  padding:13px 24px; border-radius:var(--r-sm);
  border:none; cursor:pointer;
  min-height:46px;
}
.btn-outline{
  display:inline-flex; align-items:center; gap:6px;
  background:transparent; color:var(--txt2);
  font-weight:700; font-size:14px;
  padding:12px 22px; border-radius:var(--r-sm);
  border:1px solid var(--border2);
  cursor:pointer; min-height:46px;
}
.btn-outline.sm{ font-size:13px; padding:9px 16px; min-height:38px; }
.btn-ghost{
  display:inline-flex; align-items:center;
  background:transparent; color:var(--txt3);
  font-weight:700; font-size:13px;
  padding:12px 18px; border-radius:var(--r-sm);
  border:1px solid var(--border);
  cursor:pointer; min-height:46px;
}

/* HEADER */
.header{
  position:sticky; top:0; z-index:300;
  background:rgba(7,8,10,.88);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);
}
.header-inner{
  max-width:1120px;
  margin:0 auto;
  padding-inline:var(--pad);
  height:60px;
  display:flex; align-items:center; gap:12px;
}
.brand{ display:flex; align-items:center; gap:8px; margin-right:auto; font-size:20px; font-weight:900; }
.brand-dot{ width:8px; height:8px; border-radius:50%; background:var(--accent); box-shadow:0 0 10px var(--accent); }
.brand-accent{ color:var(--accent); }

.desktop-nav{ display:flex; gap:2px; }
.desktop-nav a{ font-size:13px; font-weight:600; color:var(--txt3); padding:7px 13px; border-radius:var(--r-xs); }
.header-actions{ display:flex; align-items:center; gap:6px; }
.icon-btn{
  display:flex; align-items:center; justify-content:center;
  width:36px; height:36px; border-radius:var(--r-xs);
  border:1px solid var(--border); color:var(--txt3);
}
.hamburger{
  display:none;
  flex-direction:column; justify-content:center; align-items:center;
  gap:4px; width:38px; height:38px;
  background:transparent; border:1px solid var(--border);
  border-radius:var(--r-xs); cursor:pointer;
}
.hamburger span{ width:16px; height:2px; background:var(--txt3); border-radius:2px; transition:.25s; }
.hamburger span:nth-child(1).open{ transform:translateY(6px) rotate(45deg); }
.hamburger span:nth-child(2).open{ opacity:0; }
.hamburger span:nth-child(3).open{ transform:translateY(-6px) rotate(-45deg); }

/* ✅ MOBILE DRAWER OVERLAY */
.mobile-drawer{
  position:fixed;
  top:60px; left:0; right:0;
  z-index:400;
  background:var(--surface);
  border-bottom:1px solid var(--border);
  transform:translateY(-10px);
  opacity:0;
  pointer-events:none;
  max-height:calc(100dvh - 60px);
  overflow:auto;
  transition:.2s ease;
}
.mobile-drawer.visible{
  transform:translateY(0);
  opacity:1;
  pointer-events:auto;
}
.mobile-drawer a{
  display:flex; align-items:center; gap:14px;
  padding:14px var(--pad);
  font-size:15px; font-weight:700;
  color:var(--txt2);
  border-bottom:1px solid var(--border);
}
.drawer-num{ font-family:var(--mono); font-size:11px; color:var(--txt3); }

/* HERO (✅ no side padding here, main controls it) */
.hero-section{
  padding-block: clamp(40px, 8vw, 80px);
  display:grid;
  grid-template-columns:1fr auto;
  gap:clamp(16px, 4vw, 40px);
  align-items:center;
  position:relative;
  overflow:hidden;
}
.hero-bg-grid{
  position:absolute; inset:0; z-index:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
  background-size:48px 48px;
  mask-image:radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent);
}
.hero-glow{
  position:absolute; top:-80px; left:-80px;
  width:500px; height:500px;
  background:radial-gradient(circle, rgba(var(--accent-rgb),.08) 0%, transparent 65%);
  pointer-events:none; z-index:0;
}
.hero-content{ position:relative; z-index:1; }
.hero-visual{ position:relative; z-index:1; }
.hero-badge{
  display:inline-flex; align-items:center; gap:8px;
  font-size:12px; font-weight:700;
  letter-spacing:.08em; text-transform:uppercase;
  color:var(--accent);
  border:1px solid rgba(var(--accent-rgb),.25);
  background:rgba(var(--accent-rgb),.06);
  padding:7px 14px; border-radius:999px;
  font-family:var(--mono);
  margin-bottom:24px;
}
.badge-dot{ width:7px; height:7px; border-radius:50%; background:var(--accent); box-shadow:0 0 8px var(--accent); }
.hero-greeting{ display:block; font-size:clamp(16px,2vw,20px); color:var(--txt3); margin-bottom:4px; }
.hero-name{ display:block; font-size:clamp(40px,6vw,72px); font-weight:900; letter-spacing:-.035em; line-height:1; }
.hero-aka{ display:flex; gap:12px; margin-top:8px; color:var(--txt3); font-family:var(--mono); flex-wrap:wrap; }
.aka-line{ width:28px; height:2px; background:var(--border2); }
.aka-text{ color:var(--accent); }
.hero-desc{ margin-top:20px; max-width:540px; color:var(--txt2); line-height:1.75; }
.hero-cta-row{ display:flex; gap:12px; flex-wrap:wrap; margin-top:28px; }
.hero-stats{ display:flex; gap:20px; margin-top:36px; flex-wrap:wrap; }
.stat-num{ display:block; font-size:26px; font-weight:900; color:var(--accent); }
.stat-label{ display:block; font-size:11px; color:var(--txt3); text-transform:uppercase; letter-spacing:.08em; font-family:var(--mono); }
.stat-divider{ width:1px; height:36px; background:var(--border2); }

.avatar-frame{ width:220px; height:220px; position:relative; }
.avatar-spin-ring{ position:absolute; inset:0; border-radius:50%; background:conic-gradient(var(--accent), var(--accent2), var(--accent)); opacity:.6; animation:spin 8s linear infinite; }
@keyframes spin{ to{ transform:rotate(360deg);} }
.avatar-core{ position:absolute; inset:4px; border-radius:50%; background:var(--surface); display:flex; align-items:center; justify-content:center; border:2px solid var(--bg); }
.avatar-initials{ font-size:48px; font-weight:900; color:var(--accent); }
.avatar-orbit{ position:absolute; inset:0; }
.orbit-dot{
  position:absolute; top:50%; left:50%;
  transform:rotate(var(--angle)) translateX(118px) rotate(calc(-1 * var(--angle)));
  font-size:10px; font-weight:800; font-family:var(--mono);
  color:var(--accent2);
  background:var(--surface);
  border:1px solid var(--border2);
  padding:4px 7px; border-radius:6px;
}

/* Grids & cards (keep your styles minimal but responsive) */
.about-grid{ display:grid; grid-template-columns:1fr 1fr; gap:40px; }
.about-body{ color:var(--txt2); margin-bottom:16px; }
.about-info-grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:24px; }
.info-tile{ display:flex; gap:10px; background:var(--surface); border:1px solid var(--border); border-radius:var(--r-sm); padding:13px; }
.info-key{ font-size:11px; color:var(--txt3); text-transform:uppercase; letter-spacing:.08em; font-family:var(--mono); margin-bottom:3px; }
.info-val{ font-size:13px; font-weight:700; }
.inline-link{ color:var(--accent); border-bottom:1px dashed rgba(var(--accent-rgb),.4); }

.terminal-card{ background:var(--surface); border:1px solid var(--border); border-radius:var(--r); overflow:hidden; }
.terminal-bar{ background:var(--surface2); padding:12px 16px; border-bottom:1px solid var(--border); display:flex; gap:8px; align-items:center; }
.t-dot{ width:11px; height:11px; border-radius:50%; }
.t-dot.red{ background:#ff5f57; } .t-dot.yellow{ background:#febc2e; } .t-dot.green{ background:#28c840; }
.t-title{ margin-left:8px; font-size:12px; color:var(--txt3); font-family:var(--mono); }
.terminal-body{ padding:18px 20px; font-family:var(--mono); font-size:13px; overflow:auto; color:var(--txt2); }

.stack-categories{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:28px; }
.stack-cat-label{ font-size:11px; color:var(--txt3); font-family:var(--mono); text-transform:uppercase; letter-spacing:.1em; margin-bottom:12px; }
.stack-pill{ display:flex; gap:10px; align-items:center; background:var(--surface); border:1px solid var(--border); border-radius:var(--r-sm); padding:10px 13px; }
.pill-name{ font-weight:700; font-size:13px; flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.pill-bar{ width:44px; height:3px; background:var(--border2); border-radius:99px; overflow:hidden; }
.pill-fill{ height:100%; width:var(--pct); background:var(--accent); }

.marquee-wrap{ overflow:hidden; border:1px solid var(--border); border-radius:12px; background:var(--surface); }
.marquee-track{ display:flex; gap:10px; padding:10px; width:max-content; animation:scroll 24s linear infinite; }
@keyframes scroll{ from{ transform:translateX(0);} to{ transform:translateX(-50%);} }
.m-chip{ padding:7px 14px; border:1px solid var(--border); border-radius:999px; font-size:12px; font-weight:700; color:var(--txt3); font-family:var(--mono); white-space:nowrap; background:rgba(255,255,255,.02); }

.projects-grid{ display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:32px; }
.project-card{ background:var(--surface); border:1px solid var(--border); border-radius:var(--r); padding:24px; display:flex; flex-direction:column; gap:12px; }
.project-desc{ color:var(--txt2); }
.project-tags{ display:flex; flex-wrap:wrap; gap:6px; }
.project-tag{ font-size:11px; border:1px solid var(--border); border-radius:999px; padding:4px 10px; color:var(--txt3); font-family:var(--mono); }
.project-links{ display:flex; gap:8px; flex-wrap:wrap; }

.card{ background:var(--surface); border:1px solid var(--border); border-radius:var(--r); padding:24px; }
.card-heading{ font-size:16px; font-weight:900; margin-bottom:20px; }

.gb-grid{ display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.form-row{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.form-label{ font-size:11px; color:var(--txt3); font-family:var(--mono); text-transform:uppercase; letter-spacing:.08em; margin-bottom:8px; }
.form-input{ width:100%; padding:11px 14px; background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--txt); }
.form-textarea{ min-height:110px; resize:vertical; }
.tag-grid{ display:flex; flex-wrap:wrap; gap:7px; }
.tag-btn{ border:1px solid var(--border); background:transparent; color:var(--txt3); padding:7px 13px; border-radius:999px; font-weight:700; cursor:pointer; }
.tag-btn.active{ background:var(--accent); color:#07080a; border-color:var(--accent); }

.entries-table{ border:1px solid var(--border); border-radius:var(--r); overflow:hidden; background:var(--surface); margin-top:24px; }
.table-head{ display:grid; grid-template-columns:1.3fr 1fr .9fr 1fr; gap:12px; padding:12px 20px; border-bottom:1px solid var(--border); font-size:11px; color:var(--txt3); font-family:var(--mono); text-transform:uppercase; letter-spacing:.08em; }
.table-row{ display:grid; grid-template-columns:1.3fr 1fr .9fr 1fr; gap:12px; padding:14px 20px; border-bottom:1px solid var(--border); }
.tc-name{ display:flex; gap:10px; align-items:center; font-weight:800; }
.tc-avatar{ width:28px; height:28px; border-radius:50%; background:var(--surface2); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; color:var(--accent); font-weight:900; font-size:11px; }
.tc-muted{ color:var(--txt3); }
.tc-message{ grid-column:1 / -1; display:grid; grid-template-columns:80px 1fr; gap:12px; margin-top:8px; padding-top:10px; border-top:1px dashed rgba(255,255,255,.06); }
.tc-msg-label{ font-size:11px; color:var(--txt3); font-family:var(--mono); text-transform:uppercase; }
.tc-msg-body{ color:var(--txt2); }

.footer{ border-top:1px solid var(--border); margin-top:96px; }
.footer-inner{ max-width:1120px; margin:0 auto; padding:24px var(--pad); display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
.footer-copy, .footer-links{ color:var(--txt3); font-family:var(--mono); font-size:12px; }
.f-sep{ color:var(--border2); }

/* ✅ RESPONSIVE */
@media (max-width:1024px){
  .desktop-nav{ display:none; }
  .hamburger{ display:flex; }
  .hero-section{ grid-template-columns:1fr; }
  .hero-visual{ display:none; }
  .stack-categories{ grid-template-columns:repeat(2,1fr); }
  .about-grid{ grid-template-columns:1fr; }
  .about-info-grid{ grid-template-columns:1fr; }
}

@media (max-width:768px){
  :root{
    --pad: clamp(12px, 3vw, 18px);
  }
  
  .section{ padding-top:56px; }
  
  /* ✅ Hero improvements */
  .hero-section{ padding-block: clamp(32px, 6vw, 56px); }
  .hero-badge{ margin-bottom:16px; }
  .hero-greeting{ font-size:14px; }
  .hero-name{ font-size:clamp(32px, 7vw, 48px); }
  .hero-desc{ margin-top:16px; font-size:14px; }
  .hero-cta-row{ margin-top:20px; flex-direction:column; gap:10px; }
  .hero-stats{ margin-top:24px; gap:12px; }
  .stat-divider{ height:28px; }
  
  .btn-primary, .btn-outline, .btn-ghost{ 
    width:100%; 
    justify-content:center;
    font-size:13px;
    padding:12px 20px;
  }

  /* ✅ Projects and sections */
  .projects-header{ flex-direction:column; gap:12px; }
  .projects-grid{ grid-template-columns:1fr; gap:16px; }
  .project-card{ padding:16px; }
  .project-name{ font-size:16px; }
  .project-desc{ font-size:13px; }
  
  /* ✅ Stack improvements */
  .gb-grid{ grid-template-columns:1fr; gap:16px; }
  .stack-categories{ grid-template-columns:1fr; gap:12px; margin-bottom:20px; }
  .stack-pill{ padding:8px 10px; font-size:12px; gap:8px; }
  .pill-name{ font-size:12px; }
  .pill-icon{ min-width:16px; }
  
  /* ✅ Form improvements */
  .form-row{ grid-template-columns:1fr; gap:10px; }
  .form-field{ margin-bottom:16px; }
  .form-input, .form-textarea{ padding:10px 12px; font-size:14px; }
  .form-textarea{ min-height:90px; }
  .form-actions{ flex-direction:column; gap:10px; }
  
  .card{ padding:16px; }
  .card-heading{ font-size:14px; margin-bottom:16px; }
  
  /* ✅ Info tiles stack */
  .about-info-grid{ grid-template-columns:1fr; gap:10px; }
  .info-tile{ padding:12px; }
  
  /* ✅ Terminal card */
  .terminal-card{ font-size:11px; }
  .terminal-body{ padding:14px 16px; }
  .t-line{ padding:0 2px; }
  
  /* ✅ Entries become stacked cards */
  .table-head{ display:none; }
  .table-row{ display:block; padding:12px 14px; }
  .tc{ display:block; margin-bottom:8px; }
  .tc-name{ display:flex; gap:8px; margin-bottom:8px; }
  .tc-avatar{ width:24px; height:24px; font-size:10px; }
  .tc-message{ display:block; grid-template-columns:1fr; margin-top:8px; padding-top:8px; }
  .tc-msg-label{ display:inline-block; margin-right:8px; }
  
  /* ✅ Mobile drawer */
  .mobile-drawer a{ padding:12px var(--pad); font-size:14px; }
  .drawer-num{ font-size:10px; }
  
  /* ✅ Footer */
  .footer-inner{ flex-direction:column; gap:8px; text-align:center; }
  .footer-copy, .footer-links{ font-size:11px; }
  
  .about-body{ font-size:14px; }
  .section-title{ font-size:clamp(24px, 5vw, 36px); margin-bottom:24px; }
  
  /* ✅ Guestbook entries layout */
  .entry-card{ padding:12px; }
  .entry-head{ flex-wrap:wrap; gap:8px; }
  .entry-avatar{ width:32px; height:32px; }
  .entry-who{ gap:2px; }
  .entry-name{ font-size:13px; }
  .entry-loc{ font-size:11px; }
  .entry-date{ font-size:11px; order:3; width:100%; }
  .entry-msg{ font-size:13px; margin-top:8px; }
  
  .gb-header{ flex-direction:column; gap:16px; }
  .gb-meta{ flex-direction:column; gap:10px; width:100%; }
  .entry-count{ text-align:center; }
}

@media (max-width:640px){
  :root{
    --pad: clamp(12px, 2vw, 16px);
  }
  
  .section{ padding-top:48px; }
  .section-label{ font-size:11px; margin-bottom:16px; }
  .section-title{ font-size:clamp(22px, 6vw, 32px); margin-bottom:20px; }
  
  .hero-greeting{ font-size:13px; }
  .hero-name{ font-size:clamp(28px, 8vw, 42px); letter-spacing:-.025em; }
  .hero-aka{ gap:8px; margin-top:6px; }
  .aka-line{ width:20px; }
  
  .hero-stats{ gap:10px; }
  .stat-num{ font-size:20px; }
  .stat-label{ font-size:10px; }
  
  .projects-grid{ gap:12px; }
  .project-card{ padding:14px; gap:10px; }
  .project-icon-wrap{ display:none; }
  .project-top{ margin-bottom:4px; }
  
  .btn-primary, .btn-outline, .btn-ghost{ 
    font-size:12px;
    padding:11px 18px;
    min-height:42px;
  }
  
  .desktop-nav{ display:none; }
  .header-inner{ height:56px; }
  .brand{ font-size:18px; }
  .icon-btn{ width:34px; height:34px; font-size:14px; }
  
  .form-input, .form-textarea{ font-size:16px; padding:10px 12px; }
  .tag-btn{ padding:6px 11px; font-size:12px; }
  .tag-grid{ gap:6px; }
  
  .terminal-card{ border-radius:var(--r-sm); }
  .terminal-body{ font-size:10px; padding:12px 14px; }
  
  .stack-pill{ padding:7px 9px; }
  .pill-bar{ width:36px; }
  .pill-icon{ font-size:12px; }
  
  .about-left{ order:2; }
  .about-right{ order:1; }
  
  .table-row{ padding:10px 12px; }
  .entry-head{ padding:0; }
  .entry-avatar{ width:28px; height:28px; font-size:11px; }
  
  .footer-inner{ padding:20px var(--pad); }
  
  /* ✅ Marquee scrolls slower on mobile */
  .marquee-track{ animation:scroll 32s linear infinite; }
  
  .form-textarea{ min-height:80px; }
  .char-label{ font-size:11px; }
  
  .projects-header{ margin-bottom:20px; }
  .view-more-link{ font-size:13px; }
}

@media (max-width:480px){
  :root{
    --pad: 14px;
  }
  
  .hero-section{ padding-block: 28px; gap:12px; }
  .hero-name{ font-size:clamp(24px, 7vw, 36px); }
  .hero-desc{ font-size:13px; line-height:1.6; }
  .hero-cta-row{ gap:8px; }
  .stat-num{ font-size:18px; }
  
  .section-label{ gap:8px; }
  .label-line{ flex:0 0 24px; }
  
  .about-info-grid{ gap:8px; }
  .info-tile{ padding:10px; gap:8px; }
  .info-icon{ font-size:18px; }
  .info-key{ font-size:10px; }
  .info-val{ font-size:12px; }
  
  .stack-categories{ gap:10px; }
  
  .projects-grid{ gap:10px; }
  .project-card{ padding:12px; }
  .project-name{ font-size:14px; }
  
  .card{ padding:14px; }
  
  .gb-meta{ align-items:flex-start; }
  .count-big{ font-size:24px; }
  .entry-card{ padding:10px; }
  
  .footer-inner{ padding:18px 14px; }
}
</style>