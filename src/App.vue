<template>
  <aside>
    <navigationBar />
  </aside>
  <main>
    <div class="content-body h-full overflow-y-auto rounded-md">
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import navigationBar from '@/components/layouts/navigationBar.vue'
</script>

<style lang="css">

:root {
  --scrollbar-thumb: #363636;
  --scrollbar-track: #f1f1f1;
}

#app {
  @apply grid grid-cols-5 h-screen;
}

aside {
  @apply hidden md:block col-span-1 bg-white p-5;
}

main {
  @apply col-span-full md:col-span-4 p-5 h-screen overflow-hidden;
}

.content-body {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}



</style>
