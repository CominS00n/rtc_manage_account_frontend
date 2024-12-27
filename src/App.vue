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
      <div class="content-body flex flex-col h-screen">
        <router-view v-slot="{ Component }">
          <nav
            class="w-full bg-white h-14 shadow-md sticky z-[999] top-0 left-0 xl:flex items-center px-4 hidden"
            v-show="route.path !== '/login'"
          >
            <v-container>
              <div
                :class="
                  route.path === '/' || route.name === 'tracking status'
                    ? 'flex items-center justify-between'
                    : 'flex items-center justify-end'
                "
              >
                <img
                  src="/ntlogo.ico"
                  alt=""
                  class="h-10 cursor-pointer"
                  v-show="
                    route.path === '/' || route.name === 'tracking status'
                  "
                  @click="router.push('/')"
                />
                <v-btn color="#facc15" to="/login" v-if="userInfo === ''">
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
                <div v-else class="flex items-center gap-4">
                  <p>
                    Welcome, <span class="font-bold">{{ userInfo }}</span>
                  </p>
                  <v-btn color="#facc15" @click="handleLogout"> Logout </v-btn>
                </div>
              </div>
            </v-container>
          </nav>
          <v-container class="overflow-y-auto h-svh">
            <div>
              <transition name="slide-fade" mode="out-in">
                <component :is="Component" :key="route.path"></component>
              </transition>
              <div class="mt-4">
                <p class="text-center text-[#53595f] text-xs">
                  &copy; 2024 CominS00n. All rights reserved.
                </p>
              </div>
            </div>
          </v-container>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import useLoginApi from '@/composable/loginApi'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { logout } = useLoginApi()

const userInfo = ref(userStore.user)

const handleLogout = async () => {
  userStore.setPermissions([])
  userStore.setUser('')
  await logout()
  router.push('/').finally(() => {
    location.reload()
  })
}
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
/* .main-view {
  border-right: 5px solid red;
  height: 100%;
  width: 100%;
  overflow: hidden;
} */

aside {
  min-width: 100px;
  /* height: 100%; */
  background: white;
  /* border-right: 2px solid black; */
  /* background: #222; */
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
  /* height: 100vh; */
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
