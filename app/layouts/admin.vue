<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

useSeoMeta({
  title: 'Admin Panel'
})

defineProps<{
  mode: 'drawer' | 'slideover' | 'modal'
}>()


const items: NavigationMenuItem[] = [{
  label: 'Home',
  icon: 'i-lucide-house',
  active: true
}, {
  label: 'Inbox',
  icon: 'i-lucide-inbox'
}, {
  label: 'Contacts',
  icon: 'i-lucide-users'
}]

</script>

<template>
    <UDashboardGroup>
      <UDashboardSidebar 
        :mode="mode"
        collapsible
        resizable
        :ui="{ footer: 'border-t border-default' }"
        toggle-side="right" 
        :min-size="19"
        :max-size="24"
      >
        <template #header="{ collapsed }">
          <Logo v-if="!collapsed" class="h-5 w-auto" />
          <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto" />
          
          
        </template>

        <UNavigationMenu
          :items="items"
          orientation="vertical"
          :ui="{
            item: 'cursor-pointer',
            link: 'cursor-pointer'
          }"
        />
        <template #footer>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-user"
            to="/profile"
            class="w-full"
          />
        </template>
      </UDashboardSidebar>

      <UDashboardPanel>
        <template #header>
          <UDashboardNavbar title="Dashboard">
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
    
    
</template>