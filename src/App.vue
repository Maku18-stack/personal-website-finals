<template>
  <div class="wrap">
    <header class="card">
      <h1 class="title">Mark Ani</h1>
      <p class="subtitle">Personal Profile • WEBPROG Finals</p>
    </header>

    <section class="card">
      <h2 class="h2">Guestbook</h2>

      <form class="form" @submit.prevent="submit">
        <input v-model="name" class="input" placeholder="Your name" />
        <textarea v-model="message" class="input textarea" placeholder="Your message"></textarea>
        <button class="btn" :disabled="loading">
          {{ loading ? 'Sending...' : 'Post Message' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </section>

    <section class="card">
      <h2 class="h2">Messages</h2>

      <button class="btn ghost" @click="load" :disabled="loading">
        Refresh
      </button>

      <div v-if="messages.length === 0" class="muted">No messages yet.</div>

      <div class="msg" v-for="m in messages" :key="m.id">
        <div class="msgTop">
          <strong>{{ m.name }}</strong>
          <span class="muted">{{ formatDate(m.created_at) }}</span>
        </div>
        <div>{{ m.message }}</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const API = import.meta.env.VITE_API_URL

const name = ref('')
const message = ref('')
const messages = ref([])
const loading = ref(false)
const error = ref('')

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleString()
}

async function load() {
  error.value = ''
  loading.value = true
  try {
    const res = await fetch(`${API}/guestbook`)
    const data = await res.json()
    messages.value = Array.isArray(data) ? data : []
  } catch (e) {
    error.value = 'Failed to load messages.'
  } finally {
    loading.value = false
  }
}

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const res = await fetch(`${API}/guestbook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, message: message.value }),
    })
    const data = await res.json()
    if (data?.error) {
      error.value = data.error
    } else {
      name.value = ''
      message.value = ''
      await load()
    }
  } catch (e) {
    error.value = 'Failed to submit message.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style>
.wrap { max-width: 720px; margin: 40px auto; padding: 16px; font-family: Arial, sans-serif; }
.card { background: #111; color: #fff; border: 1px solid #222; border-radius: 16px; padding: 18px; margin-bottom: 14px; }
.title { margin: 0; font-size: 28px; }
.subtitle { margin: 6px 0 0; opacity: .75; }
.h2 { margin: 0 0 12px; font-size: 18px; }
.form { display: grid; gap: 10px; }
.input { width: 100%; padding: 10px 12px; border-radius: 12px; border: 1px solid #333; background: #0b0b0b; color: #fff; }
.textarea { min-height: 90px; resize: vertical; }
.btn { padding: 10px 12px; border-radius: 12px; border: 1px solid #333; background: #fff; color: #000; cursor: pointer; }
.btn:disabled { opacity: .6; cursor: not-allowed; }
.ghost { background: transparent; color: #fff; }
.error { color: #ff8080; margin: 0; }
.muted { opacity: .7; font-size: 12px; }
.msg { border-top: 1px solid #222; padding-top: 10px; margin-top: 10px; }
.msgTop { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 6px; }
</style>