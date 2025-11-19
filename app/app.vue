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


<!-- <style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style> -->