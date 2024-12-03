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
// import navigationBar from '@/components/layouts/navigationBar.vue'
</script>

<style lang="css">
:root {
  --scrollbar-thumb: #363636;
  --scrollbar-track: #f1f1f1;
}

#app {
  display: block;
  margin: 0;
  border: .5rem solid red;
  /* height: 100vh; */
  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

}
.main-layout {
  /* border: 5rem solid red;
  height: 100vh;
  width: 100vw; */
  /* overflow: hidden;
  @apply flex; */
  /* overflow: hidden; */
}

/* aside {
  @apply hidden md:block w-[280px] h-screen bg-white p-5;
}
main {
  @apply flex-1 p-6 h-screen;
} */
</style>
<!-- <template>
  <main>
    <router-view v-slot="{ Component }" name="LeftSidebar">
      <aside>
        <Component :is="Component" :key="$route.path" />
      </aside>
    </router-view>
    <router-view v-slot="{ Component }" class="main-view">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script> -->

<!-- <style lang="css">

:root {
  --scrollbar-thumb: #363636;
  --scrollbar-track: #f1f1f1;
}

#app {
  @apply grid grid-cols-5 h-screen;
}
;
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



</style> -->
