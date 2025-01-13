<template>
  <nav
    class="hidden xl:flex flex-col justify-between h-full w-[230px] bg-inherit p-2"
    v-if="userInfo !== ''"
  >
    <ul class="space-y-2">
      <li class="flex justify-center mt-6 mb-10">
        <img src="/ntlogo.ico" alt="" class="h-16" />
      </li>
      <li
        v-for="menu in filteredMenuList"
        :key="menu.title"
        :class="
          router.currentRoute.value.name === menu.title
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

  <nav class="mobile-menu xl:hidden">
    <div class="flex items-center justify-between">
      <img src="/src/assets/logo/ntlogo.png" alt="" class="h-12 p-2" />
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
      class="grid grid-cols-2 sm:grid-cols-4 gap-y-2 h-[400px] overflow-hidden"
      v-if="isOpen"
    >
      <ul
        v-for="(group, index) in splitMenuList(filteredMenuList, 5)"
        :key="index"
        class="space-y-1 block mt-6"
      >
        <li
          v-for="menu in group"
          :key="menu.title"
          :class="
            router.currentRoute.value.name === menu.title
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
        <v-btn color="#facc15" to="/login" v-if="userInfo === ''" class="w-full">
          <template #append>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12H14.88"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.65 8.6499L16 11.9999L12.65 15.3499"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </template>
          Login
        </v-btn>
        <v-btn v-else color="#facc15" @click="handleLogout" class="w-full"> Logout </v-btn>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { menuList } from '@/constants/menuList'
import { useUserStore } from '@/stores/user'
import useLoginApi from '@/composable/loginApi'

import nt_icon from '@/components/icon/nt_icon.vue'

const { logout } = useLoginApi()
const router = useRouter()
const isOpen = ref(false)

// Get user's role from the store
const userStore = useUserStore()
const userPermissions = ref(userStore.permissions)
const userInfo = ref(userStore.user)

// Filter the menu list based on the user's role
const filteredMenuList = computed(() =>
  menuList.filter(
    menu =>
      userPermissions.value.includes(menu.role) ||
      menu.role === 'guest' ||
      userPermissions.value.includes('allowAll'),
  ),
)

const splitMenuList = (list: typeof menuList, size: number) => {
  const result: (typeof menuList)[] = []
  for (let i = 0; i < list.length; i += size) {
    result.push(list.slice(i, i + size))
  }
  return result
}

const handleLogout = async () => {
  userStore.setPermissions([])
  userStore.setUser('')
  await logout()
  router.push('/').finally(() => {
    location.reload()
  })
}
</script>

<style scoped>
.menu-activate {
  background-color: #facc15;
  border-radius: 6px;
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
