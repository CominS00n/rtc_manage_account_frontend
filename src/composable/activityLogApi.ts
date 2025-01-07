import api from '.'
import { ref } from 'vue'
import type { ActivityLog } from '../types/ntType'

export default function useActivityLogApi() {
  const activityLogs = ref<ActivityLog[]>([])
  const getActivityLogs = async () => {
    try {
      const response = await api.get('/log_activity')
      activityLogs.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const postActivityLog = async (
    code: string,
    username: string,
    action: string,
    details: string,
  ) => {
    try {
      const response = await api({
        method: 'post',
        url: '/log_activity',
        data: {
          code,
          name: username,
          action,
          details,
        },
      })
      console.log(response)
      return true
    } catch (error) {
      console.log(error)
    }
  }
  return { activityLogs, getActivityLogs, postActivityLog }
}
