<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Liff } from '@line/liff'

const config = useRuntimeConfig()
const liffId = config.public.liffId
const { $liff } = useNuxtApp()
const liff = await ($liff as Promise<Liff>)

interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface LineResponse {
  profile: Profile | null
  accessToken: string
  idToken: string
  email: string | null
}

const message = ref('')
const error = ref<string | null>(null)
const loggedIn = ref(false)
const profile = ref<Profile | null>(null)
const lineResponse = ref<LineResponse>({
  profile: null,
  idToken: '',
  accessToken: '',
  email: null
})

const ensureInit = async () => {
  // ปลั๊กอินเรา init แล้วตั้งแต่ตอนโหลดหน้าอยู่แล้ว
  // รอให้ event loop ทำงานจบรอบหนึ่งเพื่อให้แน่ใจว่า LIFF ได้ init เรียบร้อยแล้ว
  await Promise.resolve()
}

const login = async () => {
  try {
    await ensureInit()
    if (!liff.isLoggedIn()) {
      liff.login()
      return
    }

    lineResponse.value.accessToken = liff.getAccessToken() ?? ''
    lineResponse.value.idToken = liff.getIDToken() ?? ''
    const decodedToken = liff.getDecodedIDToken()
    lineResponse.value.email = decodedToken?.email ?? null

    if (!lineResponse.value.idToken || !lineResponse.value.accessToken) {
      throw new Error('Missing required tokens');
    }

    const result = await authClient.signIn.social({
      provider: "line",
      idToken: {
        token: lineResponse.value.idToken,
        accessToken: lineResponse.value.accessToken,
      },
    });

    console.log('Better Auth LINE result', result);

    loggedIn.value = true
    profile.value = await liff.getProfile()
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
  }
}

const logout = async () => {
  try {
    await ensureInit()
    if (liff.isLoggedIn()) {
      liff.logout()
      location.reload()
    }
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
  }
}

onMounted(async () => {
  try {
    await ensureInit()
    message.value = 'LIFF init succeeded.'
    loggedIn.value = liff.isLoggedIn()
    if (loggedIn.value) {
      lineResponse.value.profile = await liff.getProfile()
      lineResponse.value.accessToken = liff.getAccessToken() ?? ''
      lineResponse.value.idToken = liff.getIDToken() ?? ''
      const decodedToken = liff.getDecodedIDToken()
      lineResponse.value.email = decodedToken?.email ?? null

      if (!lineResponse.value.idToken || !lineResponse.value.accessToken) {
        throw new Error('Missing required tokens');
      }

      await authClient.signIn.social({
        provider: "line",
        idToken: {
          token: lineResponse.value.idToken,
          accessToken: lineResponse.value.accessToken,
        },
      });
    }
  } catch (err: unknown) {
    message.value = 'LIFF init failed.'
    error.value = err instanceof Error ? err.message : String(err)
  }
})
</script>


<template>
  <main>
    <h1>LINE LIFF App</h1>

    <div class="status-container">
      <p v-if="liffId">LIFF ID: {{ liffId }}</p>
      <p v-if="message" :class="{ 'success': message.includes('succeeded'), 'error': message.includes('failed') }">
        {{ message }}
      </p>
      <p v-if="error" class="error"><code>{{ error }}</code></p>
    </div>

    <div v-if="profile" class="profile-container">
      <img v-if="profile.pictureUrl" :src="profile.pictureUrl" :alt="profile.displayName" class="profile-image">
      <div class="profile-info">
        <h2>{{ profile.displayName }}</h2>
        <p>Access Token: {{ lineResponse.accessToken }}</p>
        <p>ID Token: {{ lineResponse.idToken }}</p>
        <p v-if="lineResponse.email">Email: {{ lineResponse.email }}</p>
        <p v-if="profile.statusMessage" class="status-message">{{ profile.statusMessage }}</p>
      </div>

    </div>

    <dev-only class="flex justify-start">
      <pre>
        {{ lineResponse }}
      </pre>
    </dev-only>

    <div class="button-container">
      <button v-if="!loggedIn" class="line-button" @click="login">
        Login with LINE
      </button>
      <button v-else class="line-button logout" @click="logout">
        Logout
      </button>
    </div>

    <footer>
      <p>
        <a href="https://developers.line.biz/ja/docs/liff/" target="_blank" rel="noreferrer">
          LIFF Documentation
        </a>
      </p>
    </footer>
  </main>
</template>


<style>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 800px;
  padding: 2rem;
}

.status-container {
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.success {
  color: #28a745;
}

.error {
  color: #dc3545;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  padding: 2rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00b900;
}

.profile-info {
  text-align: center;
}

.profile-info h2 {
  margin: 0.5rem 0;
  color: #1d1d1d;
}

.status-message {
  color: #666;
  font-style: italic;
}

.button-container {
  margin: 2rem 0;
}

.line-button {
  background-color: #00b900;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.line-button:hover {
  background-color: #009900;
}

.line-button.logout {
  background-color: #dc3545;
}

.line-button.logout:hover {
  background-color: #c82333;
}

footer {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

footer a {
  color: #00b900;
  text-decoration: none;
  font-weight: 500;
}

footer a:hover {
  text-decoration: underline;
}
</style>
