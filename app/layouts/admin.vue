<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem, DropdownMenuItem, BreadcrumbItem } from '@nuxt/ui'

useSeoMeta({
  title: 'Admin Panel'
})

const route = useRoute()

const { user, logout } = useUser()


const navigationSidebar = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: 'ภาพรวม',
      icon: 'i-lucide-layout-dashboard',
      to: '/admin',
      active: route.path.startsWith('/admin')
    },
    {
      label: 'จัดการออเดอร์',
      icon: 'i-lucide-shopping-basket',
      badge: '4',
      to: '/admin/orders',
      active: route.path.startsWith('/admin/orders')
    },
    {
      label: 'อนุมัติการชำระเงิน',
      icon: 'i-lucide-users',
      to: '/admin/payments',
      active: route.path.startsWith('/admin/payments')
    },
    {
      label: 'ตั้งค่าระบบ',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      children: [
        {
          label: 'จัดการผู้ใช้งาน',
          icon: 'i-lucide-user-round-cog',
          to: '/admin/users',
          active: route.path.startsWith('/admin/users')
        }, 
        {
          label: 'จัดการบริการ',
          icon: 'i-lucide-ticket-plus',
          defaultOpen: true,
          open: false,
          children: [
            {
              label: 'แพ็คเกจรายเดือน',
              to: '/admin/packages',
              active: route.path.startsWith('/admin/packages')
            }, 
            {
              label: 'ราคาหน้าร้าน',
              to: '/admin/storefront',
              active: route.path.startsWith('/admin/storefront')
            }
          ]
        }
      ]
    }
  ]
])


const breadcrumbSidebar = computed<BreadcrumbItem[]>(() => {
  const path = route.path

  if (path === '/admin') {
    return [
      { label: 'Dashboard', to: '/admin' }
    ]
  }

  if (path.startsWith('/admin/orders')) {
    return [
      { label: 'หน้าหลัก', to: '/admin' },
      { label: 'ออเดอร์', icon: 'i-lucide-shopping-basket', to: '/admin/orders' }
    ]
  }

  if (path.startsWith('/admin/payments')) {
    return [
      { label: 'หน้าหลัก', to: '/admin' },
      { label: 'อนุมัติการชำระเงิน', icon: 'i-lucide-users', to: '/admin/payments' }
    ]
  }

  if (path.startsWith('/admin/users')) {
    return [
      { label: 'หน้าหลัก', to: '/admin' },
      { label: 'ตั้งค่าระบบ' },
      { label: 'จัดการผู้ใช้งาน', icon: 'i-lucide-user-round-cog', to: '/admin/users' }
    ]
  }

  if (path.startsWith('/admin/packages')) {
    return [
      { label: 'หน้าหลัก', to: '/admin' },
      { label: 'ตั้งค่าระบบ' },
      { label: 'แพ็คเกจรายเดือน', icon: 'i-lucide-ticket-plus', to: '/admin/packages' }
    ]
  }
  
  if (path.startsWith('/admin/storefront')) {
    return [
      { label: 'หน้าหลัก', to: '/admin' },
      { label: 'ตั้งค่าระบบ' },
      { label: 'ราคาหน้าร้าน', icon: 'i-lucide-ticket-plus', to: '/admin/storefront' }
    ]
  }

  // ฯลฯ สำหรับ /admin/packages, /admin/storefront, /admin/payments

  return [
    { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/admin' }
  ]
})


const DropdownProfile: DropdownMenuItem[][] = [
  [
    {
      label: 'ตั้งค่าบัญชี',
      icon: 'i-lucide-cog'
    }
  ],
  [
    {
      label: 'ออกจากระบบ',
      color: 'error',
      icon: 'i-lucide-log-out',
      onClick: () => logout()
    }
  ]
]

</script>

<template>
  <div>
    <UDashboardGroup>
      <UDashboardSidebar 
        collapsible resizable 
        :ui="{ footer: 'border-t border-default' }"
        mode="slideover"
        toggle-side="right"
      >

        <template #header="{ collapsed }">
          <NuxtLink
              v-if="!collapsed"
              to="/admin"
              class="flex items-center gap-2 overflow-hidden"
            >
              <nuxt-img src="/logo-saijai-laundry-service.png" sizes="70" />
              <span class="flex min-w-0 items-center gap-1 overflow-hidden">
                <span class="truncate whitespace-nowrap text-lg font-bold text-primary">ใส่ใจ <span class="text-gray-800 dark:text-white">ผ้าเรียบ</span></span>
              </span>
            </NuxtLink>
            <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto" />
        </template>

        

        <template #default="{ collapsed }">
          <UButton 
            :label="collapsed ? undefined : 'Search...'" 
            icon="i-lucide-search" 
            color="neutral" 
            variant="outline"
            block :square="collapsed"
          >
            <template v-if="!collapsed" #trailing>
              <div class="flex items-center gap-0.5 ms-auto">
                <UKbd value="meta" variant="subtle" />
                <UKbd value="K" variant="subtle" />
              </div>
            </template>
          </UButton>

          <UNavigationMenu 
            highlight 
            highlight-color="primary" 
            color="primary" variant="pill" 
            :collapsed="collapsed"
            :items="navigationSidebar[0]" orientation="vertical" :ui="{
              item: 'cursor-pointer',
              link: 'cursor-pointer'
            }" 
          />

          <UNavigationMenu :collapsed="collapsed" :items="navigationSidebar[1]" orientation="vertical" class="mt-auto" />
        </template>

        <template #footer="{ collapsed }">
          <UDropdownMenu
            v-slot="{ open }"
            :items="DropdownProfile"
            :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width)' }"
          >
            <UButton
              :avatar="{
                src: 'https://github.com/benjamincanac.png'
              }"
              :block="collapsed"
              :label="collapsed ? undefined : user?.name"
              color="neutral"
              variant="ghost"
              class="w-full justify-start truncate whitespace-nowrap"
              :ui="{
                label: 'flex-1 truncate text-start',
                trailingIcon: 'ms-auto flex items-center justify-end'
              }"
            >
              <template v-if="!collapsed" #trailing>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="ms-auto transition-transform duration-200"
                  :class="{ 'rotate-180': open }"
                />
              </template>
            </UButton>
          </UDropdownMenu>
        </template>
      </UDashboardSidebar>

      <UDashboardPanel>
        <template #header>
          <UDashboardNavbar>
            <template #title>
              <UBreadcrumb :items="breadcrumbSidebar" />
            </template>

            <template #leading>
              <UDashboardSidebarCollapse />
            </template>

            <template #right>
              <UColorModeButton />
            </template>
          </UDashboardNavbar>
        </template>

        <template #body>
          <slot />
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
  </div>
</template>