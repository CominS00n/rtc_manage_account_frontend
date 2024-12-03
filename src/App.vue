<template>
  <div class="main-layout">
    <router-view
      v-slot="{ Component: LeftSidebarComponent }"
      name="LeftSidebar"
    >
      <template v-if="LeftSidebarComponent">
        <aside>
          <transition name="fade" mode="out-in">
            <component :is="LeftSidebarComponent" :key="$route.path" />
          </transition>
        </aside>
      </template>
    </router-view>
    <main>
      <div class="content-body h-full overflow-y-auto rounded-md">
        <router-view v-slot="{ Component }" class="main-view">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.path"></component>
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="css">
:root {
  --scrollbar-thumb: #363636;
  --scrollbar-track: #f1f1f1;
}

.main-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @apply flex;
}

aside {
  @apply hidden md:block w-[280px] h-screen bg-white p-5;
}
main {
  @apply flex-1 p-6 h-screen;
}
</style>
