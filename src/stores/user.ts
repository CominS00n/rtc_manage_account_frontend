import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', {
  state: () => ({
    permissions: useStorage('user-permissions', [
      'guest',
    ]) as unknown as string[],
    user: useStorage('user', '') as unknown as string,
  }),
  actions: {
    setPermissions(permissions: string[]) {
      this.permissions = permissions
    },
    setUser(user: string) {
      this.user = user
    },
  },
})
