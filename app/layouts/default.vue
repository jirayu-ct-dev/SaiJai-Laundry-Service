<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

// const user = useUser()

// ทำ active จาก hash เฉพาะฝั่ง client ป้องกัน SSR/CSR ไม่ตรงกัน
const activeHash = ref('')
const open = ref(false)
const onHash = () => { activeHash.value = window.location.hash || '' }
onMounted(() => { onHash(); window.addEventListener('hashchange', onHash, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('hashchange', onHash))


const items: NavigationMenuItem[] = [
  {
    label: 'ค่าบริการ',
    to: { path: '/', hash: '#per-item-pricing', force: true },
    exact: true,
    exactHash: true
  },
  {
    label: 'สมัครสมาชิก',
    to: { path: '/', hash: '#monthly-membership', force: true },
    exact: true,
    exactHash: true
  },
  {
    label: 'เช็คสถานะ',
    to: { path: '/', hash: '#status-tracking', force: true },
    exact: true,
    exactHash: true
  },
  {
    label: 'คำถามที่พบบ่อย',
    to: { path: '/', hash: '#faq', force: true },
    exact: true,
    exactHash: true
  },
  {
    label: 'ติดต่อเรา',
    to: { path: '/', hash: '#contact', force: true },
    exact: true,
    exactHash: true
  }
]

</script>

<template>
  <UApp>
    <div>
      <UHeader 
        v-model:open="open"
        mode="slideover"
        title="ใส่ใจผ้าเรียบ"
      >
        <template #title>
          <ClientOnly fallback="ใส่ใจผ้าเรียบ">
            <Logo class="h-6 w-auto" />
          </ClientOnly>
        </template>

        <ClientOnly fallback="">
          <UNavigationMenu :items="items" class="hidden lg:flex" />
        </ClientOnly>

        <template #right>
          <div v-show="!open" class="hidden md:flex items-center  gap-1.5 whitespace-nowrap shrink-0">
              <UButton 
                color="neutral" 
                variant="ghost" 
                to="https://line.me/R/ti/p/@883vmdct" 
                target="_blank"
                icon="i-simple-icons-line" aria-label="Line"
                class="bg-[#06C755] shrink-0 hover:bg-[#06C755]/80 text-white rounded p-2 border border-[#000000]/8 font-medium text-sm transition-all duration-150 hover:shadow-[inset_0_0_0_100vmax_rgba(0,0,0,0.1)] active:shadow-[inset_0_0_0_100vmax_rgba(0,0,0,0.3)] disabled:bg-white disabled:text-[#1E1E1E]/20 disabled:border-[#E5E5E5]/60"
              >
                <span class="hidden md:inline">เพิ่มเพื่อน</span></UButton>

            <!-- Login and Register -->
            <div class="flex gap-2">
              <NuxtLink 
                to="/login"
                class="px-4 py-2.5 text-sm font-semibold transition rounded-lg border border-[#000000]/8 text-primary hover:bg-[#000000]/8 hover:text-primary/80 dark:border-[#FFFFFF]/8 dark:hover:bg-[#FFFFFF]/8"
              >
                Login
              </NuxtLink>
              <NuxtLink 
                to="/sign-up"
                class="px-4 py-2.5 shrink-0 text-sm bg-primary text-white font-semibold transition rounded-lg border border-[#000000]/8 hover:bg-primary/80 hover:text-white/80"
              >
                Sign up
              </NuxtLink>
            </div>
            <UColorModeButton />
          </div>
        </template>

        <template #body>
          <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />

          <div class="mt-3 flex flex-col gap-2">
            <UButton 
              color="neutral" 
              variant="ghost" 
              to="https://line.me/R/ti/p/@883vmdct" 
              target="_blank"
              icon="i-simple-icons-line">
              เพิ่มเพื่อน
            </UButton>
            <UButton 
              color="primary" 
              variant="solid" 
              icon="i-lucide-log-in" 
              to="/login">
              Sign up
            </UButton>
            <UColorModeSelect class="w-full" />
          </div>
        </template>
      </UHeader>

      <UMain>
        <UContainer class="py-6 px-7 sm:px-10 md:px-10 lg:px-12 ">
          <slot />
        </UContainer>
      </UMain>
      <UFooter />
    </div>
  </UApp>
</template>
