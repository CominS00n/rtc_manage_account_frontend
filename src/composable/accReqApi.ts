import axios from 'axios'
import { ref } from 'vue'
import type { AccReq } from '@/types/accReqs'
import type { sendReq } from '@/types/sendReq'

axios.defaults.baseURL = 'http://localhost:8000/api/v2'

export const useAccReqApi = () => {
  const accReqs = ref<AccReq[]>([])
  const getAccReqs = async (id: number) => {
    try {
      const response = await axios.get('/account_request/' + id)
      accReqs.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const postAccReq = async (result: sendReq) => {
    try {
      console.log(result)
      const response = await axios({
        method: 'post',
        url: '/account_request/',
        data: result,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return { accReqs, getAccReqs, postAccReq }
}
