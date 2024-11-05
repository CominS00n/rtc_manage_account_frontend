import axios from "axios";
import { ref } from "vue";
// import type { User } from "@/types/user";

axios.defaults.baseURL = "http://localhost:8000/api/v2";
axios.defaults.withCredentials = true;

export default function useActivityLogApi() {
  const activityLogs = ref([]);
  const getActivityLogs = async () => {
    try {
      const response = await axios.get("/log_activity");
      activityLogs.value = response.data.data;
      console.log(activityLogs.value);
    } catch (error) {
      console.log(error);
    }
  };
  return { activityLogs, getActivityLogs };
}
