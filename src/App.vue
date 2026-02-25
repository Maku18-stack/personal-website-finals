<template>
  <div class="app">

    <!-- ═══════════════════════════
         STICKY HEADER
    ═══════════════════════════ -->
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

    <!-- Mobile nav drawer (FIXED overlay) -->
    <div class="mobile-drawer" :class="{ visible: mobileOpen }" role="navigation">
      <a v-for="link in navLinks" :key="link.id" :href="'#'+link.id" @click="closeMenu">
        <span class="drawer-num">{{ String(link.num).padStart(2,'0') }}</span>
        {{ link.label }}
      </a>
    </div>

    <main>

      <!-- ═══════════════════════════
           HERO
      ═══════════════════════════ -->
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
              <span
                class="orbit-dot"
                v-for="(t,i) in orbitTech"
                :key="i"
                :style="`--angle:${i * (360/orbitTech.length)}deg`"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════
           ABOUT
      ═══════════════════════════ -->
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

      <!-- ═══════════════════════════
           TECH STACK
      ═══════════════════════════ -->
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

        <!-- Scrolling chip marquee -->
        <div class="marquee-wrap" aria-hidden="true">
          <div class="marquee-track">
            <span class="m-chip" v-for="(c,i) in [...allChips,...allChips]" :key="i">{{ c }}</span>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════
           PROJECTS
      ═══════════════════════════ -->
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
                GitHub
              </a>
              <a v-if="p.live" :href="p.live" target="_blank" rel="noreferrer" class="proj-link primary">
                Live Demo ↗
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══════════════════════════
           GUESTBOOK
      ═══════════════════════════ -->
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
          <!-- Form -->
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
                >
                  {{ t.label }}
                </button>
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

          <!-- Entries preview -->
          <div class="gb-entries card">
            <h3 class="card-heading">Recent entries</h3>

            <div v-if="messages.length === 0" class="empty-msg">
              No entries yet — be the first to sign! 🎉
            </div>

            <article
              v-for="(m, i) in messages.slice(0, 5)"
              :key="m.id"
              class="entry-card"
              :style="`--i:${i}`"
            >
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

      <!-- ═══════════════════════════
           ALL ENTRIES TABLE
      ═══════════════════════════ -->
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

          <div v-if="filteredMessages.length === 0" class="table-empty">
            No entries found.
          </div>

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

    <!-- ═══════════════════════════
         FOOTER
    ═══════════════════════════ -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="brand-dot sm"></span>
          <span>maku<span class="brand-accent">.</span></span>
        </div>
        <p class="footer-copy">
          Built by <strong>Mark Benedict D. Ani</strong> · Vue · NestJS · Supabase
        </p>
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
import { computed, onMounted, ref } from "vue";

/* ── API ── */
const API        = import.meta.env.VITE_API_URL || "";
const apiMissing = computed(() => !API || !API.startsWith("http"));

/* ── NAV ── */
const navLinks = [
  { id: "home",       label: "Home",       num: 0 },
  { id: "about",      label: "About",      num: 1 },
  { id: "stack",      label: "Stack",      num: 2 },
  { id: "projects",   label: "Projects",   num: 3 },
  { id: "guestbook",  label: "Guestbook",  num: 4 },
  { id: "entries",    label: "Entries",    num: 5 },
];

const mobileOpen = ref(false);
function closeMenu() { mobileOpen.value = false; }

/* ── HERO ── */
const orbitTech = ["Vue", "React", "TS", "NestJS", "SB"];

/* ── TECH STACK ── */
const techStack = [
  {
    label: "Frontend",
    items: [
      { name: "React.js",   icon: "⚛",  level: 80 },
      { name: "Vue.js",     icon: "◈",  level: 85 },
      { name: "TypeScript", icon: "TS", level: 70 },
      { name: "Tailwind",   icon: "🌊", level: 75 },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "NestJS",     icon: "🏗",  level: 72 },
      { name: "Node.js",    icon: "⬡",  level: 75 },
      { name: "REST API",   icon: "⇌",  level: 80 },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "Supabase",   icon: "◎",  level: 82 },
      { name: "Firebase",   icon: "🔥", level: 78 },
      { name: "MySQL",      icon: "🐬", level: 70 },
      { name: "MongoDB",    icon: "🍃", level: 65 },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git",        icon: "⎇",  level: 80 },
      { name: "Vite",       icon: "⚡", level: 78 },
      { name: "Vercel",     icon: "▲",  level: 75 },
      { name: "VS Code",    icon: "⬡",  level: 90 },
    ],
  },
];

const allChips = [
  "React.js","Vue.js","TypeScript","NestJS","Node.js","Supabase",
  "Firebase","MySQL","MongoDB","Tailwind CSS","Vite","Vercel","Git","REST API",
];

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
  { id: "friendly",     label: "Friendly 👋"   },
  { id: "formal",       label: "Formal 🎩"     },
  { id: "professional", label: "Professional 💼"},
  { id: "respectful",   label: "Respectful 🙏" },
  { id: "feedback",     label: "Feedback 💬"   },
  { id: "neutral",      label: "Neutral 😐"    },
];

const name      = ref("");
const location  = ref("");
const tag       = ref("friendly");
const message   = ref("");
const messages  = ref([]);
const loading   = ref(false);
const error     = ref("");
const ok        = ref(false);
const query     = ref("");
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
    const matchTag  = !filterTag.value || m.tag === filterTag.value;
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
  const n   = name.value.trim();
  const msg = message.value.trim();
  if (!n || !msg) { error.value = "Name and message are required."; return; }
  if (apiMissing.value) { error.value = "API URL missing — set VITE_API_URL."; return; }
  loading.value = true;
  try {
    const data = await (await fetch(`${API}/guestbook`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name: n, message: msg, location: location.value.trim(), tag: tag.value }),
    })).json();
    if (data?.error) { error.value = data.error; }
    else { ok.value = true; name.value = ""; location.value = ""; message.value = ""; await load(); }
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

/* ════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════ */
:root {
  --bg:         #07080a;
  --bg2:        #0d0f12;
  --surface:    #111318;
  --surface2:   #161a1f;
  --border:     rgba(255,255,255,.07);
  --border2:    rgba(255,255,255,.13);

  --txt:        #eceef2;
  --txt2:       rgba(236,238,242,.6);
  --txt3:       rgba(236,238,242,.35);

  --accent:     #64ffda;
  --accent-rgb: 100,255,218;
  --accent2:    #f7c948;

  --font:  'Cabinet Grotesk', sans-serif;
  --mono:  'JetBrains Mono', monospace;

  --r:    16px;
  --r-sm: 10px;
  --r-xs: 7px;
}

/* ════════════════════════════════════
   RESET & VIEWPORT FIX
════════════════════════════════════ */
html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  width: 100%;
  overflow-x: clip;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--txt);
  font-family: var(--font);
  line-height: 1.6;
  overflow-x: clip;
  width: 100%;
}
a { color: inherit; text-decoration: none; }
button { font-family: var(--font); }
input, textarea, select { font-family: var(--font); }
em { font-style: normal; color: var(--accent); }
strong { font-weight: 800; }

/* Prevent mystery overflow */
.app, main, section, header, footer { max-width: 100%; overflow-x: clip; }
.hero-title, .hero-desc, .project-desc, .tc-msg-body, .entry-msg { overflow-wrap: anywhere; word-break: break-word; }

/* ════════════════════════════════════
   SCROLLBAR
════════════════════════════════════ */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 99px; }

/* ════════════════════════════════════
   LAYOUT
════════════════════════════════════ */
.app { min-height: 100vh; width: 100%; overflow-x: clip; }
main {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
}
.section { padding: 96px 0 0; }

/* ════════════════════════════════════
   SECTION LABEL
════════════════════════════════════ */
.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
  font-family: var(--mono);
}
.label-num  { color: var(--txt3); }
.label-line { flex: 0 0 40px; height: 1px; background: var(--border2); }

/* ════════════════════════════════════
   SECTION TITLE
════════════════════════════════════ */
.section-title {
  font-size: clamp(26px, 4vw, 42px);
  font-weight: 900;
  letter-spacing: -.02em;
  line-height: 1.15;
  margin-bottom: 32px;
}

/* ════════════════════════════════════
   BUTTONS
════════════════════════════════════ */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: #07080a;
  font-weight: 800;
  font-size: 14px;
  padding: 13px 24px;
  border-radius: var(--r-sm);
  border: none;
  cursor: pointer;
  transition: transform .2s, box-shadow .2s, opacity .15s;
  box-shadow: 0 0 28px rgba(var(--accent-rgb), .2);
  min-height: 46px;
  white-space: nowrap;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 36px rgba(var(--accent-rgb), .35); }
.btn-primary:disabled { opacity: .5; cursor: not-allowed; }

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  color: var(--txt2);
  font-weight: 700;
  font-size: 14px;
  padding: 12px 22px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border2);
  cursor: pointer;
  transition: border-color .2s, color .2s, transform .2s;
  min-height: 46px;
  white-space: nowrap;
}
.btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }
.btn-outline.sm { font-size: 13px; padding: 9px 16px; min-height: 38px; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--txt3);
  font-weight: 700;
  font-size: 13px;
  padding: 12px 18px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: border-color .2s, color .2s;
  min-height: 46px;
}
.btn-ghost:hover:not(:disabled) { border-color: var(--border2); color: var(--txt2); }
.btn-ghost:disabled { opacity: .4; cursor: not-allowed; }

/* ════════════════════════════════════
   HEADER
════════════════════════════════════ */
.header {
  position: sticky;
  top: 0;
  z-index: 300;
  background: rgba(7,8,10,.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.header-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}

.brand { display: flex; align-items: center; gap: 8px; margin-right: auto; font-size: 20px; font-weight: 900; letter-spacing: -.02em; }
.brand-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); flex-shrink: 0; }
.brand-dot.sm{ width: 6px; height: 6px; }
.brand-accent{ color: var(--accent); }

.desktop-nav { display: flex; gap: 2px; }
.desktop-nav a {
  font-size: 13px; font-weight: 600; color: var(--txt3);
  padding: 7px 13px; border-radius: var(--r-xs);
  transition: color .2s, background .2s;
  white-space: nowrap;
}
.desktop-nav a:hover { color: var(--txt); background: rgba(255,255,255,.05); }

.header-actions { display: flex; align-items: center; gap: 6px; }
.icon-btn {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: var(--r-xs);
  border: 1px solid var(--border); color: var(--txt3);
  transition: border-color .2s, color .2s;
  flex-shrink: 0;
}
.icon-btn:hover { border-color: var(--accent); color: var(--accent); }

.hamburger {
  display: none;
  flex-direction: column; justify-content: center; align-items: center;
  gap: 4px; width: 38px; height: 38px;
  background: transparent; border: 1px solid var(--border);
  border-radius: var(--r-xs); cursor: pointer; transition: border-color .2s;
  flex-shrink: 0;
}
.hamburger:hover { border-color: var(--border2); }
.hamburger span { display: block; width: 16px; height: 2px; background: var(--txt3); border-radius: 2px; transition: transform .25s, opacity .2s; }
.hamburger span:nth-child(1).open { transform: translateY(6px) rotate(45deg); }
.hamburger span:nth-child(2).open { opacity: 0; }
.hamburger span:nth-child(3).open { transform: translateY(-6px) rotate(-45deg); }

/* ✅ FIXED: mobile drawer overlay */
.mobile-drawer {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 400;

  background: var(--surface);
  border-bottom: 1px solid var(--border);

  transform: translateY(-10px);
  opacity: 0;
  pointer-events: none;

  max-height: calc(100dvh - 60px);
  overflow-y: auto;

  transition: transform .2s ease, opacity .2s ease;
}
.mobile-drawer.visible {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.mobile-drawer a {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 24px; font-size: 15px; font-weight: 700;
  color: var(--txt2); border-bottom: 1px solid var(--border);
  transition: background .15s, color .15s;
  width: 100%;
  box-sizing: border-box;
}
.mobile-drawer a:hover { background: rgba(255,255,255,.04); color: var(--txt); }
.drawer-num { font-family: var(--mono); font-size: 11px; color: var(--txt3); flex-shrink: 0; }

/* ════════════════════════════════════
   HERO (✅ FIXED: no double side padding)
════════════════════════════════════ */
.hero-section {
  padding: 80px 0 96px; /* only vertical padding */
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.hero-bg-grid {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent);
}
.hero-glow {
  position: absolute; top: -80px; left: -80px;
  width: 500px; height: 500px; pointer-events: none; z-index: 0;
  background: radial-gradient(circle, rgba(var(--accent-rgb),.08) 0%, transparent 65%);
}

.hero-content { position: relative; z-index: 1; min-width: 0; }
.hero-visual  { position: relative; z-index: 1; flex-shrink: 0; }

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--accent); border: 1px solid rgba(var(--accent-rgb),.25);
  background: rgba(var(--accent-rgb),.06);
  padding: 7px 14px; border-radius: 999px; margin-bottom: 24px;
  font-family: var(--mono);
  white-space: nowrap;
}
.badge-dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.6; transform:scale(.85); } }

.hero-greeting { display: block; font-size: clamp(16px,2vw,20px); font-weight: 600; color: var(--txt3); margin-bottom: 4px; }
.hero-name     { display: block; font-size: clamp(40px,6vw,72px); font-weight: 900; letter-spacing: -.035em; line-height: 1; }
.hero-aka      {
  display: flex; align-items: center; gap: 12px;
  margin-top: 8px; font-size: clamp(16px,2vw,22px);
  font-weight: 700; color: var(--txt3); font-family: var(--mono);
  flex-wrap: wrap;
}
.aka-line { width: 28px; height: 2px; background: var(--border2); flex-shrink: 0; }
.aka-text { color: var(--accent); }

.hero-desc {
  margin-top: 20px;
  max-width: 540px;
  font-size: clamp(14px,1.5vw,16px);
  color: var(--txt2);
  line-height: 1.75;
}

.hero-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }

.hero-stats {
  display: flex; align-items: center; gap: 20px;
  margin-top: 36px;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.stat { text-align: center; }
.stat-num   { display: block; font-size: 26px; font-weight: 900; color: var(--accent); line-height: 1; }
.stat-label { display: block; font-size: 11px; color: var(--txt3); text-transform: uppercase; letter-spacing: .08em; margin-top: 3px; font-family: var(--mono); }
.stat-divider{ width: 1px; height: 36px; background: var(--border2); }

.avatar-frame { position: relative; width: 220px; height: 220px; flex-shrink: 0; }
.avatar-spin-ring {
  position: absolute; inset: 0; border-radius: 50%;
  background: conic-gradient(var(--accent), var(--accent2), var(--accent));
  animation: spin 8s linear infinite;
  opacity: .6;
}
@keyframes spin { to { transform: rotate(360deg); } }
.avatar-core {
  position: absolute; inset: 4px; border-radius: 50%;
  background: var(--surface);
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--bg);
}
.avatar-initials { font-size: 48px; font-weight: 900; color: var(--accent); letter-spacing: -.04em; }
.avatar-orbit { position: absolute; inset: 0; }
.orbit-dot {
  position: absolute;
  top: 50%; left: 50%;
  transform: rotate(var(--angle)) translateX(118px) rotate(calc(-1 * var(--angle)));
  font-size: 10px; font-weight: 800; font-family: var(--mono);
  color: var(--accent2);
  background: var(--surface);
  border: 1px solid var(--border2);
  padding: 4px 7px; border-radius: 6px;
  white-space: nowrap;
}

/* ════════════════════════════════════
   ABOUT
════════════════════════════════════ */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
.about-body { color: var(--txt2); line-height: 1.8; margin-bottom: 16px; font-size: 15px; }

.about-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 24px; }
.info-tile {
  display: flex; align-items: flex-start; gap: 10px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r-sm); padding: 13px;
  transition: border-color .2s;
}
.info-tile:hover { border-color: var(--border2); }
.info-icon { font-size: 18px; flex-shrink: 0; }
.info-key  { font-size: 11px; color: var(--txt3); text-transform: uppercase; letter-spacing: .08em; font-family: var(--mono); margin-bottom: 3px; }
.info-val  { font-size: 13px; font-weight: 700; }
.inline-link { color: var(--accent); border-bottom: 1px dashed rgba(var(--accent-rgb),.4); }
.inline-link:hover { border-bottom-color: var(--accent); }

/* Terminal card */
.terminal-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.4); }
.terminal-bar { display: flex; align-items: center; gap: 8px; background: var(--surface2); padding: 12px 16px; border-bottom: 1px solid var(--border); }
.t-dot { width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0; }
.t-dot.red { background: #ff5f57; }
.t-dot.yellow { background: #febc2e; }
.t-dot.green { background: #28c840; }
.t-title { margin-left: 8px; font-size: 12px; color: var(--txt3); font-family: var(--mono); }
.terminal-body { padding: 18px 20px; font-family: var(--mono); font-size: 13px; line-height: 1.8; overflow-x: auto; }
.t-indent { padding-left: 20px; }
.t-blank { height: 8px; }
.t-kw { color: #c792ea; }
.t-var { color: var(--accent2); }
.t-op { color: var(--txt3); }
.t-brace { color: var(--txt2); }
.t-key { color: var(--accent); }
.t-str { color: #c3e88d; }
.t-num { color: #f78c6c; }
.t-cmt { color: var(--txt3); font-style: italic; }
.t-cursor { color: var(--accent); animation: blink 1.1s step-end infinite; }
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }

/* ════════════════════════════════════
   TECH STACK
════════════════════════════════════ */
.stack-categories { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.stack-cat-label { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--txt3); font-family: var(--mono); margin-bottom: 12px; }
.stack-pills { display: flex; flex-direction: column; gap: 8px; }
.stack-pill {
  display: flex; align-items: center; gap: 10px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r-sm); padding: 10px 13px;
  transition: border-color .2s, transform .2s;
  animation: fadeIn .4s ease both;
  animation-delay: calc(var(--i) * .06s);
  min-width: 0;
}
.stack-pill:hover { border-color: rgba(var(--accent-rgb),.3); transform: translateX(3px); }
@keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
.pill-icon { font-size: 14px; width: 20px; text-align: center; flex-shrink: 0; }
.pill-name { font-size: 13px; font-weight: 700; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pill-bar  { width: 44px; height: 3px; background: var(--border2); border-radius: 99px; overflow: hidden; flex-shrink: 0; }
.pill-fill { height: 100%; width: var(--pct); background: var(--accent); border-radius: 99px; transition: width 1s ease; }

.marquee-wrap { overflow: hidden; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); }
.marquee-track { display: flex; gap: 10px; padding: 10px; width: max-content; animation: scroll 24s linear infinite; }
@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.m-chip {
  padding: 7px 14px; border: 1px solid var(--border); border-radius: 999px;
  font-size: 12px; font-weight: 700; white-space: nowrap;
  color: var(--txt3); font-family: var(--mono); background: rgba(255,255,255,.02);
}

/* ════════════════════════════════════
   PROJECTS
════════════════════════════════════ */
.projects-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
.projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 32px; }
.project-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r); padding: 24px;
  display: flex; flex-direction: column; gap: 12px;
  transition: border-color .25s, transform .25s, box-shadow .25s;
  position: relative; overflow: hidden;
}
.project-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(300px circle at 0% 0%, rgba(var(--accent-rgb),.04), transparent 70%);
  pointer-events: none;
}
.project-card:hover { border-color: rgba(var(--accent-rgb),.25); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,.35); }

.project-top { display: flex; justify-content: space-between; align-items: center; }
.project-num { font-size: 12px; font-weight: 800; color: var(--txt3); font-family: var(--mono); }
.project-status { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; }
.status-live { color: #64ffda; background: rgba(100,255,218,.1); border: 1px solid rgba(100,255,218,.2); }
.status-done { color: var(--accent2); background: rgba(247,201,72,.1); border: 1px solid rgba(247,201,72,.2); }

.project-icon-wrap { width: 48px; height: 48px; border-radius: var(--r-sm); background: var(--surface2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.project-icon { font-size: 24px; }

.project-name { font-size: 18px; font-weight: 900; letter-spacing: -.01em; }
.project-desc { font-size: 14px; color: var(--txt2); line-height: 1.7; flex: 1; }

.project-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.project-tag {
  font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
  border: 1px solid var(--border); color: var(--txt3); font-family: var(--mono);
  background: rgba(255,255,255,.02);
}

.project-links { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
.proj-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 700; padding: 8px 14px; border-radius: var(--r-xs);
  border: 1px solid var(--border); color: var(--txt3);
  transition: border-color .2s, color .2s;
  min-height: 34px;
  white-space: nowrap;
}
.proj-link:hover { border-color: var(--border2); color: var(--txt); }
.proj-link.primary { background: var(--accent); color: #07080a; border-color: var(--accent); }
.proj-link.primary:hover { opacity: .9; }

/* ════════════════════════════════════
   CARD (shared)
════════════════════════════════════ */
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); padding: 24px; position: relative; overflow: hidden; }
.card-heading { font-size: 16px; font-weight: 900; letter-spacing: -.01em; margin-bottom: 20px; }

/* ════════════════════════════════════
   GUESTBOOK
════════════════════════════════════ */
.guestbook-section { border-top: 1px solid var(--border); padding-top: 96px; }
.gb-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-bottom: 24px; }
.gb-sub { font-size: 14px; color: var(--txt3); margin-top: 4px; }
.gb-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.entry-count { display: flex; flex-direction: column; align-items: flex-end; border: 1px solid var(--border); border-radius: var(--r-sm); padding: 8px 14px; background: var(--surface); }
.count-big { font-size: 24px; font-weight: 900; color: var(--accent); line-height: 1; }
.count-text { font-size: 11px; color: var(--txt3); text-transform: uppercase; letter-spacing: .08em; font-family: var(--mono); }

.api-notice { display: flex; align-items: flex-start; gap: 12px; background: rgba(255,160,60,.06); border: 1px solid rgba(255,160,60,.2); border-radius: var(--r); padding: 14px 18px; font-size: 13px; color: var(--txt2); margin-bottom: 20px; }
.api-notice code { font-family: var(--mono); background: rgba(255,255,255,.08); padding: 1px 6px; border-radius: 4px; }

.gb-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-field { display: flex; flex-direction: column; margin-bottom: 0; }
.form-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--txt3); margin-bottom: 8px; font-family: var(--mono); }
.req { color: var(--accent); }
.form-label-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.form-hint { font-size: 11px; color: var(--txt3); }

.form-input {
  width: 100%; padding: 11px 14px;
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
  border-radius: var(--r-sm); color: var(--txt); font-size: 14px;
  outline: none; transition: border-color .2s;
  -webkit-appearance: none;
  box-sizing: border-box;
}
.form-input:focus { border-color: rgba(var(--accent-rgb),.5); }
.form-input::placeholder { color: var(--txt3); }
.form-textarea { min-height: 110px; resize: vertical; line-height: 1.6; }

.char-bar { height: 2px; background: var(--border); border-radius: 99px; margin-top: 8px; overflow: hidden; }
.char-fill { height: 100%; background: var(--accent); border-radius: 99px; transition: width .3s; }
.char-label { font-size: 11px; color: var(--txt3); display: block; text-align: right; margin-top: 4px; font-family: var(--mono); }

.tag-grid { display: flex; flex-wrap: wrap; gap: 7px; }
.tag-btn {
  border: 1px solid var(--border); background: transparent;
  color: var(--txt3); padding: 7px 13px; border-radius: 999px;
  font-size: 12px; font-weight: 700; cursor: pointer;
  transition: all .15s; min-height: 34px;
}
.tag-btn:hover { border-color: var(--border2); color: var(--txt2); }
.tag-btn.active { background: var(--accent); color: #07080a; border-color: var(--accent); }

.form-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
.form-error { font-size: 13px; color: #ff8e8e; margin-top: 4px; }
.form-ok { font-size: 13px; color: var(--accent); margin-top: 4px; }

.gb-entries { display: flex; flex-direction: column; gap: 12px; }
.empty-msg { padding: 32px 0; text-align: center; font-size: 13px; color: var(--txt3); font-style: italic; }

.entry-card {
  border: 1px solid var(--border); border-radius: var(--r-sm);
  padding: 14px; background: rgba(255,255,255,.02);
  animation: fadeUp .4s ease both;
  animation-delay: calc(var(--i) * .06s);
  transition: border-color .2s;
}
.entry-card:hover { border-color: var(--border2); }
@keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }

.entry-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
.entry-avatar {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  background: var(--surface2); border: 1px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 900; color: var(--accent);
}
.entry-who { flex: 1; min-width: 0; }
.entry-name { font-weight: 800; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.entry-loc { font-size: 11px; color: var(--txt3); font-family: var(--mono); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.entry-date { font-size: 11px; color: var(--txt3); flex-shrink: 0; font-family: var(--mono); white-space: nowrap; }
.entry-msg { font-size: 13px; color: var(--txt2); line-height: 1.6; }
.view-more-link { display: inline-flex; align-items: center; font-size: 13px; font-weight: 700; color: var(--txt3); padding: 8px 0; transition: color .2s; margin-top: 4px; }
.view-more-link:hover { color: var(--accent); }

/* ════════════════════════════════════
   ENTRIES TABLE
════════════════════════════════════ */
.entries-top { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
.entries-filters { display: flex; gap: 10px; flex-wrap: wrap; }
.filter-input { width: 220px; }
.filter-select { width: 150px; cursor: pointer; }
select.form-input option { background: var(--surface); }

.entries-table { border: 1px solid var(--border); border-radius: var(--r); background: var(--surface); overflow: hidden; margin-top: 24px; }
.table-head {
  display: grid; grid-template-columns: 1.3fr 1fr .9fr 1fr;
  gap: 12px; padding: 12px 20px;
  border-bottom: 1px solid var(--border);
  font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--txt3); font-family: var(--mono);
}
.table-row {
  display: grid; grid-template-columns: 1.3fr 1fr .9fr 1fr;
  gap: 12px; align-items: center;
  padding: 14px 20px; border-bottom: 1px solid var(--border);
  transition: background .15s;
}
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: rgba(255,255,255,.02); }
.table-empty { padding: 24px 20px; font-size: 13px; color: var(--txt3); }
.tc { font-size: 13px; min-width: 0; }
.tc-name { display: flex; align-items: center; gap: 10px; font-weight: 800; min-width: 0; }
.tc-avatar {
  width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
  background: var(--surface2); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 900; color: var(--accent);
}
.tc-muted { color: var(--txt3); }
.tc-mono  { font-family: var(--mono); font-size: 12px; }
.vibe-badge {
  display: inline-flex; padding: 4px 10px; border-radius: 999px;
  border: 1px solid var(--border); font-size: 11px; font-weight: 700;
  color: var(--txt3); background: rgba(255,255,255,.02);
}
.tc-message {
  grid-column: 1 / -1; display: grid; grid-template-columns: 80px 1fr; gap: 12px;
  margin-top: 8px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,.06);
}
.tc-msg-label { font-size: 11px; color: var(--txt3); text-transform: uppercase; letter-spacing: .06em; font-family: var(--mono); padding-top: 2px; }
.tc-msg-body  { font-size: 13px; color: var(--txt2); line-height: 1.7; }

/* ════════════════════════════════════
   FOOTER
════════════════════════════════════ */
.footer { border-top: 1px solid var(--border); margin-top: 96px; }
.footer-inner {
  max-width: 1120px; margin: 0 auto; padding: 24px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}
.footer-brand { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 900; letter-spacing: -.02em; }
.footer-copy { font-size: 12px; color: var(--txt3); font-family: var(--mono); }
.footer-links { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--txt3); }
.footer-links a { transition: color .2s; }
.footer-links a:hover { color: var(--accent); }
.f-sep { color: var(--border2); }

/* ════════════════════════════════════
   RESPONSIVE — TABLET (≤ 1024px)
════════════════════════════════════ */
@media (max-width: 1024px) {
  .desktop-nav { display: none; }
  .hamburger   { display: flex; }

  .stack-categories { grid-template-columns: repeat(2, 1fr); }
  .hero-section     { grid-template-columns: 1fr; }
  .hero-visual      { display: none; }
  .about-grid       { grid-template-columns: 1fr; }
  .about-info-grid  { grid-template-columns: 1fr 1fr; }
}

/* ════════════════════════════════════
   RESPONSIVE — LARGE MOBILE (≤ 768px)
════════════════════════════════════ */
@media (max-width: 768px) {
  main { padding: 0 16px; }
  .section { padding-top: 64px; }
  .hero-section { padding: 56px 0 64px; }

  .projects-grid { grid-template-columns: 1fr; }
  .gb-grid       { grid-template-columns: 1fr; }
  .form-row      { grid-template-columns: 1fr; }

  .stack-categories { grid-template-columns: 1fr; }

  .entries-top { flex-direction: column; align-items: stretch; }
  .entries-filters { flex-direction: column; }
  .filter-input, .filter-select { width: 100%; }

  /* ✅ FIX: entries become cards (no horizontal scroll) */
  .entries-table { overflow: visible; }
  .table-head { display: none; }
  .table-row { display: block; padding: 14px 16px; }
  .tc { margin-bottom: 6px; }
  .tc-message { display: block; margin-top: 10px; padding-top: 10px; }
  .tc-msg-label { display: block; margin-bottom: 4px; padding-top: 0; }

  .footer-inner { flex-direction: column; align-items: flex-start; gap: 8px; }
  .projects-header { flex-direction: column; align-items: stretch; }
  .projects-header .btn-outline { width: 100%; justify-content: center; }
}

/* ════════════════════════════════════
   RESPONSIVE — MEDIUM MOBILE (≤ 640px)
════════════════════════════════════ */
@media (max-width: 640px) {
  main { padding: 0 14px; }
  .header-inner { padding: 0 14px; }
  .hero-section { padding: 48px 0 56px; }

  .hero-cta-row { flex-direction: column; gap: 8px; }
  .btn-primary, .btn-outline { width: 100%; justify-content: center; }

  .stat-divider { display: none; }
  .hero-stats { gap: 10px; }
  .stat { text-align: left; }
  .stat-num { font-size: 20px; }

  .about-info-grid { grid-template-columns: 1fr; }
  .gb-header { flex-direction: column; align-items: stretch; }
  .gb-meta { justify-content: flex-start; }

  .tag-grid { gap: 6px; }
  .tag-btn { font-size: 11px; padding: 6px 11px; }

  .footer-inner { padding: 16px 14px; }
  .section-label { font-size: 11px; }
  .label-line { width: 24px; }
}

/* ════════════════════════════════════
   RESPONSIVE — SMALL MOBILE (≤ 480px)
════════════════════════════════════ */
@media (max-width: 480px) {
  main { padding: 0 12px; }
  .header-inner { padding: 0 12px; gap: 8px; }
  .hero-section { padding: 40px 0 48px; }

  .hero-name { font-size: clamp(32px, 8vw, 50px); }
  .section-title { font-size: clamp(22px, 5vw, 32px); }

  .card, .project-card { padding: 16px; }
  .hero-badge { font-size: 10px; padding: 5px 10px; }

  .terminal-body { padding: 12px 14px; font-size: 12px; }

  .icon-btn { width: 32px; height: 32px; }
  .hamburger { width: 34px; height: 34px; }
}

/* ════════════════════════════════════
   RESPONSIVE — VERY SMALL (≤ 360px)
════════════════════════════════════ */
@media (max-width: 360px) {
  .hero-name { font-size: 28px; }
  main { padding: 0 10px; }
  .header-inner { padding: 0 10px; }
}
</style>