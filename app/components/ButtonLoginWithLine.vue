<script setup lang="ts">
import type { Liff } from '@line/liff'

const toast = useToast()
const { $liff } = useNuxtApp()
const liff = await ($liff as Promise<Liff>)
const profile = ref<Profile | null>(null)
const loading = ref(false)
const loggedIn = ref(false)
const error = ref<string | null>(null)

const ensureInit = async () => {
  // ปลั๊กอินเรา init แล้วตั้งแต่ตอนโหลดหน้าอยู่แล้ว
  // รอให้ event loop ทำงานจบรอบหนึ่งเพื่อให้แน่ใจว่า LIFF ได้ init เรียบร้อยแล้ว
  await Promise.resolve()
}

const onloginWithLine = async () => {
  try {
    loading.value = true
    await ensureInit()
    if (!liff.isLoggedIn()) {
      liff.login()
      return
    }
    loggedIn.value = true
    profile.value = await liff.getProfile()
    toast.add({
      title: `Login Successful! on Line`,
      color: 'success'
    })
    await navigateTo('/')
  } catch (err: unknown) {
    loading.value = false
    error.value = err instanceof Error ? err.message : String(err)
    toast.add({
      title: `Login Failed! on Line`,
      color: 'error'
    })
  }
}

</script>

<template>
    <div>
        <button
          class="group relative flex items-stretch justify-center gap-0 bg-[#06C755] text-white rounded px-2 py-2.5 border border-[#000000]/8 font-medium text-sm transition-all duration-150 hover:shadow-[inset_0_0_0_100vmax_rgba(0,0,0,0.1)] active:shadow-[inset_0_0_0_100vmax_rgba(0,0,0,0.3)] disabled:bg-white disabled:text-[#1E1E1E]/20 disabled:border-[#E5E5E5]/60" 
          @click="onloginWithLine"
          :disabled="loading"
        >
          <span class="flex items-center self-stretch pr-3 -my-2.5 border-r border-[#000000]/8 group-disabled:border-[#E5E5E5]/60">
            <UPageLogos
              :items="['i-simple-icons-line']" 
              class="group-disabled:opacity-60"
            />
          </span>
          <span class="flex items-center whitespace-nowrap px-6">Log in With Line</span>
        </button>
    </div>

    <!-- <NuxtLink
          v-if="lineLink"
          :to="lineLink.to"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative flex items-stretch justify-center gap-0 bg-[#06C755] text-white rounded px-2 py-2.5 border border-[#000000]/8 font-medium text-sm transition-all duration-150 hover:shadow-[inset_0_0_0_100vmax_rgba(0,0,0,0.1)] active:shadow-[inset_0_0_0_100vmax_rgba(0,0,0,0.3)] disabled:bg-white disabled:text-[#1E1E1E]/20 disabled:border-[#E5E5E5]/60" 
        >
          <span class="flex items-center self-stretch pr-3 -my-2.5 border-r border-[#000000]/8 group-disabled:border-[#E5E5E5]/60">
            <UPageLogos
              :items="['i-simple-icons-line']" 
              class="group-disabled:opacity-60"
            />
          </span>
          <span class="flex items-center whitespace-nowrap px-6">{{ lineLink.label }}</span>
        </NuxtLink> -->
</template>