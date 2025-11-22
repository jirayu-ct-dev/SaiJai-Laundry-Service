<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

useSeoMeta({
  title: 'Admin Panel'
})

const route = useRoute()
const open = ref(false)

const links = [
  [
    {
      label: 'หน้าแรก',
      icon: 'i-lucide-house',
      to: '/admin',
      exact: true,
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: 'จัดการออเดอร์',
      icon: 'i-lucide-shopping-basket',
      to: '/admin/orders',
      badge: '4',
      exact: true,
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: 'ลูกค้า',
      icon: 'i-lucide-shopping-basket',
      to: '/admin/customers',
      badge: '4',
      exact: true,
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: 'ตั้งค่าระบบ',
      to: '/admin/settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      type: 'trigger',
      children: [
        {
          label: 'ทั่วไป',
          to: '/admin/settings',
          exact: true,
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: 'สมาชิก',
          to: '/admin/settings/members',
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: 'แพ็คเกจรายเดือน',
          to: '/admin/settings/packages',
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: 'ราคาหน้าร้าน',
          to: '/admin/settings/storefront',
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: 'การแจ้งเตือน',
          to: '/admin/settings/notifications',
          onSelect: () => {
            open.value = false
          }
        }, 
        {
          label: 'ความปลอดภัย',
          to: '/admin/settings/security',
          onSelect: () => {
            open.value = false
          }
        }
      ]
    }
  ], 
  [
    {
      label: 'Feedback',
      icon: 'i-lucide-message-circle',
      to: 'https://github.com/nuxt-ui-templates/dashboard',
      target: '_blank'
    }, 
    {
      label: 'Help & Support',
      icon: 'i-lucide-info',
      to: 'https://github.com/nuxt-ui-templates/dashboard',
      target: '_blank'
    }
  ]
] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

// const breadcrumbSidebar = computed<BreadcrumbItem[]>(() => {
//   const path = route.path

//   if (path === '/admin') {
//     return [
//       { label: 'Dashboard', to: '/admin' }
//     ]
//   }

//   if (path.startsWith('/admin/orders')) {
//     return [
//       { label: 'หน้าหลัก', to: '/admin' },
//       { label: 'ออเดอร์', icon: 'i-lucide-shopping-basket', to: '/admin/orders' }
//     ]
//   }

//   if (path.startsWith('/admin/payments')) {
//     return [
//       { label: 'หน้าหลัก', to: '/admin' },
//       { label: 'อนุมัติการชำระเงิน', icon: 'i-lucide-users', to: '/admin/payments' }
//     ]
//   }

//   if (path.startsWith('/admin/users')) {
//     return [
//       { label: 'หน้าหลัก', to: '/admin' },
//       { label: 'ตั้งค่าระบบ' },
//       { label: 'จัดการผู้ใช้งาน', icon: 'i-lucide-user-round-cog', to: '/admin/users' }
//     ]
//   }

//   if (path.startsWith('/admin/packages')) {
//     return [
//       { label: 'หน้าหลัก', to: '/admin' },
//       { label: 'ตั้งค่าระบบ' },
//       { label: 'แพ็คเกจรายเดือน', icon: 'i-lucide-ticket-plus', to: '/admin/packages' }
//     ]
//   }
  
//   if (path.startsWith('/admin/storefront')) {
//     return [
//       { label: 'หน้าหลัก', to: '/admin' },
//       { label: 'ตั้งค่าระบบ' },
//       { label: 'ราคาหน้าร้าน', icon: 'i-lucide-ticket-plus', to: '/admin/storefront' }
//     ]
//   }

//   // ฯลฯ สำหรับ /admin/packages, /admin/storefront, /admin/payments

//   return [
//     { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/admin' }
//   ]
// })


// const DropdownProfile: DropdownMenuItem[][] = [
//   [
//     {
//       label: 'ตั้งค่าบัญชี',
//       icon: 'i-lucide-cog'
//     }
//   ],
//   [
//     {
//       label: 'ออกจากระบบ',
//       color: 'error',
//       icon: 'i-lucide-log-out',
//       onClick: () => logout()
//     }
//   ]
// ]

</script>

<template>
    <UDashboardGroup class="h-screen overflow-hidden">
      <UDashboardSidebar 
        id="default"
        v-model:open="open"
        collapsible
        resizable
        class="bg-elevated/25"
        :ui="{ footer: 'lg:border-t lg:border-default' }"
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
          <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[0]"
            orientation="vertical"
            tooltip
            popover
          />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[1]"
            orientation="vertical"
            tooltip
            class="mt-auto"
          />

        </template>

        <template #footer="{ collapsed }">
          <UserMenu :collapsed="collapsed" />
        </template>
      </UDashboardSidebar>

      <UDashboardSearch :groups="groups" />
        <slot />
    </UDashboardGroup>
</template>

<style scoped>
::v-slotted(*) {
  flex: 1 1 0%;
  min-width: 0;
  width: 100%;
  overflow-y: auto;
}
</style>