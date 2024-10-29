<template>
  <div class="flex flex-col justify-between h-full">
    <nav>
      <ul class="space-y-2">
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
      <login-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { menuList } from '@/constants/menuList'

import nt_icon from '@/components/icon/nt_icon.vue'
import LoginView from '@/views/LoginView.vue'
// import LoginView from '@/views/LoginView.vue'

const router = useRouter()

console.log(router.currentRoute.value.path)
</script>

<style scoped>
.menu-activate {
  @apply bg-yellow-400 rounded-md text-white;
}
</style>
