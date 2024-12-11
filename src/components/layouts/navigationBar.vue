<template>
  <nav class="hidden xl:flex flex-col justify-between h-full">
    <ul class="space-y-2">
      <li class="flex justify-center mt-6 mb-12">
        <img src="/src/assets/logo/ntlogo.png" alt="" class="h-24" />
      </li>
      <li
        v-for="menu in menuList"
        :key="menu.title"
        :class="
          router.currentRoute.value.path === menu.link
            ? 'menu-activate'
            : 'menu'
        "
      >
        <router-link
          :to="menu.link"
          class="flex items-center gap-x-2 w-full h-full p-2 capitalize"
        >
          <nt_icon :icon="menu.icon" />
          {{ menu.title }}
        </router-link>
      </li>
    </ul>
    <router-link to="/login">Login </router-link>
  </nav>

  <nav class="flex items-center justify-between xl:hidden">
    <img src="/src/assets/logo/ntlogo.png" alt="" class="h-12" />
    <v-btn variant="text" @click="isOpen = !isOpen">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
          fill="#292D32"
        />
        <path
          d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
          fill="#292D32"
        />
        <path
          d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
          fill="#292D32"
        />
      </svg>
    </v-btn>
  </nav>
  <transition name="slide-fade" mode="out-in">
    <div  class="flex flex-col mt-4 h-64 overflow-hidden py-2" v-show="isOpen">
      <div class="flex h-full overflow-hidden">
        <ul class="flex flex-col flex-wrap">
          <li
            v-for="menu in menuList"
            :key="menu.title"
            :class="
              router.currentRoute.value.path === menu.link
                ? 'menu-activate'
                : 'menu'
            "
            class="w-48"
          >
            <router-link
              :to="menu.link"
              class="flex items-center gap-x-2 w-full h-full p-2 capitalize"
            >
              <nt_icon :icon="menu.icon" />
              {{ menu.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <v-btn to="/login" class="w-full">
          <template #default>
            <p class="capitalize">Login</p>
          </template>
        </v-btn>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { menuList } from '@/constants/menuList'

import nt_icon from '@/components/icon/nt_icon.vue'

const router = useRouter()
const isOpen = ref(false)
</script>

<style scoped>
.menu-activate {
  @apply bg-yellow-400 rounded-md;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.1s ease,
    height 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  height: 0;
  transform: translateY(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  height: 0;
  transform: translateY(-10px);
}
</style>
