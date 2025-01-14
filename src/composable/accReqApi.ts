// import axios from 'axios'
import api from '.'
import { ref } from 'vue'
import type { AccReq } from '@/types/accReqs'
import type { sendReq, approved } from '@/types/sendReq'

export const useAccReqApi = () => {
  const allAccReqs = ref<AccReq[]>([])
  const accReq = ref<AccReq[]>([])
  const resMessage = ref<string>('')
  const getAllAccReqs = async () => {
    try {
      const response = await api.get('/account_request')
      allAccReqs.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }
  const getAccReq = async (id: string) => {
    try {
      const response = await api.get('/account_request/' + id)
      accReq.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const postAccReq = async (result: sendReq) => {
    try {
      console.log(result)
      const response = await api({
        method: 'post',
        url: '/account_request',
        data: result,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const putAccReqComment = async (id: string, result: AccReq) => {
    try {
      console.log(result)
      const response = await api({
        method: 'put',
        url: '/account_request/' + id,
        data: result,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const approveAccReq = async (data: approved) => {
    try {
      const res = await api({
        method: 'put',
        url: '/account_request',
        data: data,
      })
      resMessage.value = res.data.message
      location.reload()
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
    resMessage,
    putAccReqComment,
  }
}
