<template>
  <div class="min-h-screen mx-auto px-50">
    <header class="bg-slate-50">
      <nav class="mx-auto flex items-center justify-between gap-6 py-2">
        <nuxt-link to="/" class="flex items-center">
            <nuxt-img src="/logo-saijai-laundry-service.png" sizes="100" />
            <div>
              <h2 class="text-2xl font-bold text-sky-900">ใส่ใจ ผ้าเรียบ</h2>
              <p class="tracking-wide text-sm">LAUNDRY SERVICE</p>
            </div>
        </nuxt-link>

        <ul class="flex items-center gap-8 text-sm font-medium">
          <li v-for="navLink in primaryNav" :key="navLink.label">
            <NuxtLink
              :to="navLink.to"
              :target="navLink.target"
              :rel="navLink.external ? 'noopener noreferrer' : undefined"
              :class="[
                'flex items-center gap-2 text-base transition',
                isActive(navLink)
                  ? 'text-sky-600 font-semibold'
                  : 'text-gray-900 hover:text-gray-900/80'
              ]"
            >
              <UIcon v-if="navLink.icon" :name="navLink.icon" class="h-5 w-5" />
              {{ navLink.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="flex items-center gap-4">
          <a
            v-if="lineLink"
            :href="lineLink.to as string"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-400"
          >
            <UIcon v-if="lineLink.icon" :name="lineLink.icon" class="h-5 w-5" />
            {{ lineLink.label }}
          </a>

          <NuxtLink
            v-for="link in authNav"
            :key="link.label"
            :to="link.to"
            :class="[
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              link.to === '/login'
                ? 'border border-sky-500 text-sky-600 hover:bg-sky-50'
                : 'bg-sky-500 text-white hover:bg-sky-600'
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

<script setup lang="ts">
import { computed } from 'vue'
import type { AppNavLink } from '~/utils/links'
import { authNavLinks, lineNavLinks, primaryNavLinks } from '~/utils/links'

const router = useRouter()
const route = useRoute()

const primaryNav = computed<AppNavLink[]>(() => Object.values(primaryNavLinks))
const authNav = computed<AppNavLink[]>(() => Object.values(authNavLinks))
const lineLink = computed<AppNavLink | undefined>(() => Object.values(lineNavLinks)[0])


const isActive = (link: AppNavLink) => {
    if (link.external) {
        return false
    }
    const resolved = router.resolve(link.to)
    return route.path === resolved.path && route.hash === resolved.hash
}


</script>
