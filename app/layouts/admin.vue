<script setup lang="ts">
useSeoMeta({
  title: 'Admin Panel'
})
</script>

<template>
  <div class="admin-layout">
    <nav>
      <h1>Admin Panel</h1>
    </nav>

    <main>
      <slot />
    </main>
  </div>
</template>