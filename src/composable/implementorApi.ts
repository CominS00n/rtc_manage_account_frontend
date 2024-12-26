import api from '.'
import { ref } from 'vue'

type Implementor = {
  id: string
  name: string
  email: string
}

type saveImplementor = {
  name: string
  email: string
}

export const useImplementorApi = () => {
  const allImplementors = ref<Implementor[]>([])
  const implementor = ref<Implementor[]>([])

  const getAllImplementors = async () => {
    try {
      const response = await api.get('/implementor')
      allImplementors.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const getImplementor = async (id: string) => {
    try {
      const response = await api.get('/implementor/' + id)
      implementor.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const postImplementor = async (result: saveImplementor) => {
    try {
      console.log(result)
      const response = await api({
        method: 'post',
        url: '/implementor/',
        data: result,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteImplementor = async (id: string) => {
    try {
      const response = await api({
        method: 'delete',
        url: '/implementor/' + id,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const updateImplementor = async (result: Implementor) => {
    try {
      const response = await api({
        method: 'put',
        url: '/implementor/' + result.id,
        data: result,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    allImplementors,
    getAllImplementors,
    implementor,
    getImplementor,
    postImplementor,
    deleteImplementor,
    updateImplementor,
  }
}
