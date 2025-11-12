<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: 'only-admin'
})
</script>

<template>
  <NuxtPage />
</template>