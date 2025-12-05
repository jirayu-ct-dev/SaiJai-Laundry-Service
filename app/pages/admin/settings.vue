<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

// Dynamic max-width based on route
const maxWidthClass = computed(() => {
  return route.path === '/admin/settings/packages' 
    ? 'lg:max-w-7xl' 
    : 'lg:max-w-3xl'
})

const links = [
  [
    {
      label: 'ทั่วไป',
      icon: 'i-lucide-user',
      to: '/admin/settings',
      exact: true
    },
    {
      label: 'สมาชิก',
      icon: 'i-lucide-users',
      to: '/admin/settings/members'
    },
    {
      label: 'แพ็คเกจรายเดือน',
      icon: 'i-lucide-ticket-plus',
      to: '/admin/settings/packages'
    },
    {
      label: 'ราคาหน้าร้าน',
      icon: 'i-lucide-ticket-plus',
      to: '/admin/settings/storefront'
    },
    {
      label: 'การแจ้งเตือน',
      icon: 'i-lucide-bell',
      to: '/admin/settings/notifications'
    },
    {
      label: 'ความปลอดภัย',
      icon: 'i-lucide-shield',
      to: '/admin/settings/security'
    }
  ], 
  [
    {
      label: 'เอกสาร',
      icon: 'i-lucide-book-open',
      to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
      target: '_blank'
    }
  ]
] satisfies NavigationMenuItem[][]

</script>

<template>
  <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="ตั้งค่าระบบ">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <!-- NOTE: The `-mx-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
        <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
      </UDashboardToolbar>
    </template>

    <template #body>
      <div :class="['flex flex-col gap-4 sm:gap-6 min-w-2xl lg:gap-12 w-full mx-auto', maxWidthClass]">
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
