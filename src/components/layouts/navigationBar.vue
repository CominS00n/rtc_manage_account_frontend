<template>
  <nav class="hidden xl:flex flex-col justify-between h-full w-[280px]">
    <ul class="space-y-2">
      <li class="flex justify-center mt-6 mb-10">
        <img src="/src/assets/logo/ntlogo.png" alt="" class="h-16" />
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

  <nav class="mobile-menu xl:hidden">
    <div class="flex items-center justify-between">
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
    </div>
  </nav>
  <transition name="slide-fade" mode="out-in">
    <div
      class="grid grid-cols-4 gap-y-2 h-[360px] overflow-hidden"
      v-if="isOpen"
    >
      <ul
        v-for="(group, index) in splitMenuList(menuList, 5)"
        :key="index"
        class="space-y-1 block mt-6"
      >
        <li
          v-for="menu in group"
          :key="menu.title"
          :class="
            router.currentRoute.value.path === menu.link
              ? 'menu-activate'
              : 'menu'
          "
          class="w-full"
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
      <div class="col-span-full">
        <v-btn to="/login" class="w-full mt-2">
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

interface Menu {
  title: string
  link: string
  icon: string
}

const splitMenuList = (list: Menu[], size: number): Menu[][] => {
  const result: Menu[][] = []
  for (let i = 0; i < list.length; i += size) {
    result.push(list.slice(i, i + size))
  }
  return result
}
</script>

<style scoped>
.menu-activate {
  background-color:  #facc15;
  border-radius: 6px;
  /* @apply bg-yellow-400 rounded-md; */
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
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
