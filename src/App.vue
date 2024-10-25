<template>
  <aside>
    <navigationBar />
  </aside>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import navigationBar from '@/components/layouts/navigationBar.vue'
</script>

<style>
#app {
  @apply grid grid-cols-5 h-screen;
}

aside {
  @apply hidden md:block col-span-1 bg-white p-5;
}

main {
  @apply col-span-full md:col-span-4 p-5;
}
</style>
