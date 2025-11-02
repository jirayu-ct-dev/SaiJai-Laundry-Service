<script setup lang="ts">
// const { user } = useUser()

await callOnce( async() => {
  const { getCurrentUser } = useUser()
  await getCurrentUser()
})

</script>

<template>
  <div>
    <UApp>
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
