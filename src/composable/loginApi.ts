// import axios from 'axios'
import api from '.'

export default function useLoginApi() {
  const login = async (username: string, password: string) => {
    // console.log(username, password)
    try {
      await api.post(
        '/login',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,

        },
      )
    } catch (error) {
      console.log(error)
      return error
    }
  }
  return { login }
}

// const handleLogin = async () => {
//   try {
//     const response = await axios.post(
//       'http://localhost:8000/api/v1/login',
//       {
//         username: username.value,
//         password: password.value,
//       },
//       { withCredentials: true },
//     ).then((res) => {
//       console.log(res)
//     })
//     console.log(response.data)
//     alert('Login Success' + response.data.message)
//   } catch (error) {
//     alert('Error' + error)
//     console.log(error)
//   }
// }
