import { useUserStore } from '@/stores/user'

export function checkPermission(permissionsCheck: string) {
  return useUserStore().permissions.some(
    permission => permissionsCheck.includes(permission) || permission === 'allowAll',
  )
}
