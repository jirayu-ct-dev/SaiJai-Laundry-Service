<script setup lang="ts">
import type { User } from '~/types'

// Props
const props = withDefaults(defineProps<{
  count?: number
  selectedUsers?: User[]
}>(), {
  count: 0,
  selectedUsers: () => []
})

// Emits
const emit = defineEmits<{
  'users-removed-selected': [users: User[]]
  'users-removed': [users: User[]]
}>()

// State
const { user } = useUser()
const isOpen = ref(false)

// Handlers
function handleRemoveUser(user: User) {
  emit('users-removed-selected', [user])
}

async function handleDelete() {
  // TODO: Implement bulk delete API call
  // const { data, error } = await useFetch('/api/admin/users/bulk-delete', {
  //   method: 'POST',
  //   body: { 
  //      ids: props.selectedUsers.map(user => user.id),
          // deleteBy: user.value?.id
  //   }
  // })
  
  if (user.value?.role !== 'ADMIN') {
    isOpen.value = false
    return
  }
  // if (!error.value) {
  //   isOpen.value = false
  //   emit('users-removed', props.selectedUsers)
  // }
  
  // Temporary: Just emit for now
  emit('users-removed', props.selectedUsers)
  isOpen.value = false
}

function handleCancel() {
  isOpen.value = false
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="`ลบ ${count} ผู้ใช้`"
    :description="`คุณแน่ใจหรือไม่ การกระทำนี้ไม่สามารถย้อนกลับได้`"
  >
    <slot />

    <template #body>
      <div v-if="selectedUsers.length > 0" class="space-y-3">
        <p class="text-sm text-muted mb-4">
          รายการผู้ใช้ที่จะถูกลบ:
        </p>
        <div
          v-for="user in selectedUsers"
          :key="user.id"
          class="flex items-center gap-3 p-3 rounded-lg border border-default hover:bg-elevated/50 transition-colors"
        >
          <UAvatar
            v-bind="user.avatar"
            size="md"
          />
          <div class="flex-1 min-w-0">
            <p class="font-medium text-highlighted truncate">
              {{ user.name }}
            </p>
            <p class="text-sm text-muted truncate">
              {{ user.email }}
            </p>
          </div>
          

          <UButton
            label="ยกเลิก"
            variant="subtle"
            @click="handleRemoveUser(user)"
          />

          
        </div>
      </div>
      <div v-else class="text-center py-8 text-muted">
        <p>ไม่มีรายการที่เลือก</p>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 ml-auto">
        
        <UButton
          label="ยกเลิก"
          color="neutral"
          variant="subtle"
          @click="handleCancel"
        />
        <UButton
          label="ลบ"
          color="error"
          variant="solid"
          loading-auto
          @click="handleDelete"
        />
      </div>
    </template>
  </UModal>
</template>
