import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v2', // Change this to the correct URL if needed
  withCredentials: true,
})

export default api
