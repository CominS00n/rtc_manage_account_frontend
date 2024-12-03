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

#app {
  display: block;
  margin: 0;
  /* border: .5rem solid red; */
  height: 100vh;
  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
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

.content-body {
  scrollbar-width: none;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);

  ::-webkit-scrollbar {
    width: 0;
  }
}
</style>
