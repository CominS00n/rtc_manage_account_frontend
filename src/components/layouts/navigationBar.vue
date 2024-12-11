<template>
  <div class="flex flex-col justify-between h-full">
    <nav>
      <ul class="space-y-2">
        <li class="flex justify-center my-6"><img src="/src/assets/logo/ntlogo.png" alt="" class="h-24"></li>
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
    </nav>

    <div>
      <router-link to="/login">Login </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { menuList } from '@/constants/menuList'

import nt_icon from '@/components/icon/nt_icon.vue'

const router = useRouter()
</script>

<style scoped>
.menu-activate {
  @apply bg-yellow-400 rounded-md;
}
</style>
