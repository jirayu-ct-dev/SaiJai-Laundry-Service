<script setup lang="ts">
// const { user } = useUser()

await callOnce( async() => {
  const { getCurrentUser } = useUser()
  await getCurrentUser()
})

</script>

<template>
  <div>
    <u-app>
      <nuxt-loading-indicator />
      <nuxt-layout>
        <nuxt-page />
      </nuxt-layout>
    </u-app>
  </div>
</template>
