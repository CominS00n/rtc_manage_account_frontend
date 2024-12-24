// import axios from 'axios'
import api from '.'

export default function useLoginApi() {
  const login = async (username: string, password: string) => {
    try {
      const response = await api.post(
        '/login',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      return response.data.data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const logout = async () => {
    try {
      await api.post(
        '/logout',
        {},
        {
          withCredentials: true,
        },
      )
      // console.log(response.data)
    } catch (error) {
      console.log(error)
      return error
    }
  }
  return { login, logout }
}
