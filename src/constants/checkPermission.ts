import { useUserStore } from '@/stores/user'

export function checkPermission(permissions: string) {
  return useUserStore().permissions.some(
    permission => permissions.includes(permission) || permission === 'allowAll',
  )
}
