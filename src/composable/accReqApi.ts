import axios from "axios";
import { ref } from "vue";
import type { AccReq } from "@/types/accReqs";

axios.defaults.baseURL = "http://localhost:8000/api/v2";

export const useAccReqApi = () => {
  const accReqs = ref<AccReq[]>([]);
  const getAccReqs = async (id: number) => {
    try {
      const response = await axios.get("/account_request/" + id);
      accReqs.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { accReqs, getAccReqs };
}


