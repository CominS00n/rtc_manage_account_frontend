<template>
  <div class="main-layout">
    <router-view
      v-slot="{ Component: LeftSidebarComponent }"
      name="LeftSidebar"
    >
      <template v-if="LeftSidebarComponent">
        <aside>
          <transition>
            <component :is="LeftSidebarComponent" :key="$route.path" />
          </transition>
        </aside>
      </template>
    </router-view>
    <main>
      <div class="content-body h-full overflow-y-auto rounded-md">
        <router-view v-slot="{ Component }" class="main-view">
          <transition name="slide-fade" mode="out-in">
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

<style lang="css" scoped>
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
  min-width: 280px;
  height: 100%;
  background: white;
  padding: 1rem;
  @apply hidden md:block;
}

.content-body {
  scrollbar-width: none;
}

main {
  flex: 1;
  padding: 1rem;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

/* Slide and fade transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
