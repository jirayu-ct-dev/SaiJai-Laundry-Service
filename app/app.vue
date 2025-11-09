<script setup lang="ts">
const showApp = ref(false)
const { start, finish } = useLoadingIndicator()

onMounted(async () => {
  const { getCurrentUser } = useUser()
  start()
  try {
    await getCurrentUser()
  } finally {
    finish()
    showApp.value = true
  }
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <div v-show="showApp">
      <UApp>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </UApp>
    </div>
  </div>
</template>
