import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,// Change this to the correct URL if needed
  withCredentials: true,
})

//192.168.127.174 172.17.0.1 172.18.0.1

export default api
