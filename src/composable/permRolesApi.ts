import api from '.'
// import type { Permission, Role } from '@/types/ntType'

export default function usePermRoleAip() {
  const getPermission = async () => {
    try {
      const response = await api.get('/permissions', {
        withCredentials: true,
      })
      return response.data.data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const createRoles = async (role: string, permissions: string[]) => {
    try {
      const response = await api.post('/roles', {
        name: role,
      })
      console.log(permissions)
      return response.data.data
    } catch (error) {
      console.log(error)
      return
    }
  }

  return { getPermission }
}
