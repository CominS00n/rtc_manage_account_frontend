export interface ApprovedInformation {
  id: string
  acc_req_id: string
  type: string
  name: string
  email: string
  signature: string | null
  remark: string | null
  status: string
  date: string | null
  created_at: string
  updated_at: string
}

export interface AccReq {
  id: string
  full_name: string
  position: string
  company: string
  division: string
  telephone: string
  email: string
  req_type: string
  system: string[]
  req_date: string
  account_type: string
  expiry_date: string | null
  service_type: string[]
  user_type: string[]
  status: string
  remarks: string | null
  created_at?: string
  updated_at?: string
  approved?: ApprovedInformation[]
}

export interface ApiResponse {
  message: string
  data: AccReq[]
  status: number
}
