export enum status_type {
  pending = 'Pending',
  approved = 'Approved',
  rejected = 'Rejected',
}

export type accountInformation = {
  full_name: string
  position: string
  company: string
  division: string
  telephone: string
  email: string
  req_type: string
  system: string[] | null
  req_date: string | null
  account_type: string | null
  expiry_date: string | null
  service_type: string[]
  user_type: string[]
  status: string
}

export interface approvedInformation {
  name: string
  type: string
  email: string
}

export interface sendReq {
  account_request: accountInformation
  approved_result: approvedInformation[]
}

export type approved = {
  acc_req_id: number
  name: string
  email: string
  status: status_type
  signature: string
  remark: string | null
  date: string
}
