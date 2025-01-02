import api from '.'

import { ref } from 'vue'
import type { Group } from '@/types/ntType'

export default function useGroupApi() {
  const groups = ref<Group[]>([])
  const group = ref<Group>()

  const getGroups = async () => {
    try {
      const response = await api.get('/groups')
      groups.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const getGroupID = async (groupId: string) => {
    try {
      const response = await api.get(`/group/${groupId}`)
      group.value = response.data.data[0]
    } catch (error) {
      console.log(error)
    }
  }

  const createGroup = async (group: { name: string; description: string }) => {
    try {
      await api.post('/group', group)
    } catch (error) {
      console.log(error)
    }
  }
  return { groups, getGroups, group, getGroupID, createGroup }
}
