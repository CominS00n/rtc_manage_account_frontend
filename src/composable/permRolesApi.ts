import api from '.'

import { ref } from 'vue'
import type { RolePermission } from '@/types/ntType'

export default function usePermRoleAip() {
  const roles = ref<RolePermission[]>([])
  const role = ref<RolePermission[]>([])
  const getPermission = async () => {
    try {
      const response = await api.get('/permissions')
      return response.data.data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const createRoles = async (
    roleName: string,
    description: string,
    permissions: string[],
  ) => {
    try {
      const response = await api({
        method: 'POST',
        url: '/roles',
        data: {
          name: roleName,
          description,
          permissions,
        },
      })
      return response.data.data
    } catch (error) {
      console.log(error)
      return
    }
  }

  const getRoles = async () => {
    try {
      const response = await api.get('/role-perm')
      roles.value = response.data.data
      return response.data.data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const getRole = async (id: string) => {
    try {
      const response = await api.get(`/role-perm/${id}`)
      role.value = response.data.data
      return response.data.data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const deleteRole = async (id: string) => {
    try {
      const response = await api.delete(`/roles/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const updateRole = async (
    id: string,
    data: {
      name: string
      description: string
      permissions: string[]
    },
  ) => {
    try {
      const response = await api({
        method: 'PUT',
        url: '/roles/' + id,
        data: {
          name: data.name,
          description: data.description,
          permissions: data.permissions,
        },
      })
      return response.data.data
    } catch (error) {
      console.log(error)
      return
    }
  }
  return {
    getPermission,
    createRoles,
    getRoles,
    roles,
    deleteRole,
    updateRole,
    getRole,
    role,
  }
}
