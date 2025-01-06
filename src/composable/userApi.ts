// import axios from 'axios'
import api from '.'
import { ref } from 'vue'
import type { User, UserRegister } from '@/types/ntType'

export default function useUserApi() {
  const users = ref<User[]>([])
  const user = ref<User[]>([])

  const getUsers = async () => {
    try {
      const response = await api.get('/users')
      users.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const getUserGroups = async (groupId: string) => {
    try {
      const response = await api.get(`/users/group/${groupId}`)
      users.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const postUser = async (
    user: UserRegister,
    role_id: string[],
    group_id: string[],
  ) => {
    try {
      const user_data = {
        username: user.username,
        password: user.password,
        name: user.name,
        position: user.position,
        company: user.company,
        division: user.division,
        email: user.email,
        phone: user.phone,
        role_id,
        group_id,
      }
      const response = await api.post('/users', user_data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const response = await api.delete(`/users/${userId}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}`)
      user.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  return { users, getUsers, getUserGroups, postUser, deleteUser, getUser, user }
}
