<script setup lang="ts">
import { computed } from 'vue'
import type { AppNavLink } from '~/utils/links'
import { authNavLinks, primaryNavLinks } from '~/utils/links'

const router = useRouter()
const route = useRoute()

const primaryNav = computed<AppNavLink[]>(() => Object.values(primaryNavLinks))
const authNav = computed<AppNavLink[]>(() => Object.values(authNavLinks))


const isActive = (link: AppNavLink) => {
    if (link.external) {
        return false
    }
    const resolved = router.resolve(link.to)
    return route.path === resolved.path && route.hash === resolved.hash
}


</script>

<template>
  <div class="min-h-screen mx-auto px-5">
    <header class="bg-slate-50">
      <nav class="mx-auto flex items-center justify-between gap-6 py-2">
        <nuxt-link to="/" class="flex items-center">
            <nuxt-img src="/logo-saijai-laundry-service.png" sizes="100" />
            <div>
              <h2 class="xl:text-2xl lg:text-xl font-bold text-sky-900">ใส่ใจ ผ้าเรียบ</h2>
              <p class="tracking-wide xl:text-sm lg:text-xs text-gray-500 text-sm">LAUNDRY SERVICE</p>
            </div>
        </nuxt-link>

        <ul class="flex items-center gap-8 text-xs lg:text-xs lg:font-normal xl:text-sm xl:font-medium">
          <li v-for="navLink in primaryNav" :key="navLink.label">
            <NuxtLink
              :to="navLink.to"
              :target="navLink.target"
              :rel="navLink.external ? 'noopener noreferrer' : undefined"
              :class="[
                isActive(navLink)
                  ? 'text-sky-600 font-semibold'
                  : 'text-gray-900 hover:text-gray-900/80'
              ]"
            >
              <!-- <UIcon v-if="navLink.icon" :name="navLink.icon" class="h-5 w-5" /> -->
              {{ navLink.label }}
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink
          v-if="lineNavLinks"
          :to="lineNavLinks.to"
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
          <span class="flex items-center whitespace-nowrap px-6">{{ lineNavLinks.label }}</span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <NuxtLink
            v-for="link in authNav"
            :key="link.label"
            :to="link.to"
            :class="[
              'px-4 py-2.5 text-sm font-semibold transition rounded-lg',
              link.to === '/login'
                ? 'border border-sky-500 text-sky-600 hover:bg-sky-200'
                : 'bg-sky-500 border border-sky-500 text-white hover:bg-sky-600'
            ]"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="mx-auto">
      <slot />
    </main>
  </div>
</template>


