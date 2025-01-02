import api from '.'

export default function useLoginApi() {
  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/login', {
        username: username,
        password: password,
      })
      return response.data.data
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const logout = async () => {
    try {
      await api.post('/logout')
      // console.log(response.data)
    } catch (error) {
      console.log(error)
      return error
    }
  }
  return { login, logout }
}
