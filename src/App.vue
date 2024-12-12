<template>
  <div class="main-layout">
    <router-view
      v-slot="{ Component: LeftSidebarComponent }"
      name="LeftSidebar"
    >
      <template v-if="LeftSidebarComponent">
        <aside>
          <transition>
            <component :is="LeftSidebarComponent" :key="route.path" />
          </transition>
        </aside>
      </template>
    </router-view>
    <main>
      <v-container class="content-body h-full overflow-y-auto rounded-md">
        <v-col>
          <div >
            <router-view v-slot="{ Component }" class="main-view">
              <transition name="slide-fade" mode="out-in">
                <component :is="Component" :key="route.path"></component>
              </transition>
            </router-view>
          </div>
        </v-col>
      </v-container>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
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
  /* border: 1px solid red; */
  @apply flex flex-col xl:flex-row;
}

aside {
  min-width: 280px;
  /* height: 100%; */
  background: white;
  /* border-right: 2px solid black; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 100;
  /* @apply hidden xl:block ; */
}

.content-body {
  scrollbar-width: none;
}

main {
  flex: 1;
  /* padding: 1rem; */
  height: 100vh;
  overflow: hidden;
  /* border: 2px solid blue; */
  @apply xl:overflow-hidden;
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
