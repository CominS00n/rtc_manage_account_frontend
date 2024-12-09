import axios from 'axios'
import { ref } from 'vue'
import type { AccReq } from '@/types/accReqs'
import type { sendReq, approved } from '@/types/sendReq'

axios.defaults.baseURL = 'http://localhost:8000/api/v2'

export const useAccReqApi = () => {
  const allAccReqs = ref<AccReq[]>([])
  const accReq = ref<AccReq[]>([])
  const getAllAccReqs = async () => {
    try {
      const response = await axios.get('/account_request')
      allAccReqs.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }
  const getAccReq = async (id: string) => {
    try {
      const response = await axios.get('/account_request/' + id)
      accReq.value = response.data.data
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

  const approveAccReq = async (data: approved) => {
    try {
      const response = await axios({
        method: 'put',
        url: '/account_request',
        data: data,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    accReq,
    getAccReq,
    postAccReq,
    approveAccReq,
    getAllAccReqs,
    allAccReqs,
  }
}
