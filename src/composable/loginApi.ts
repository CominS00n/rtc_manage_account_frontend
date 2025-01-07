import api from '.'
import { useToast } from 'vue-toastification'

const toast = useToast()

export default function useLoginApi() {
  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/login', {
        username: username,
        password: password,
      })
      if (response.status === 200) {
        return { data: response.data, status: response.status }
      }
    } catch (err) {
      console.log(err)
      toast.error('Invalid username or password')
      return false
    }
  }

  const logout = async () => {
    try {
      await api.post('/logout')
    } catch (error) {
      console.log(error)
      return error
    }
  }
  return { login, logout }
}
