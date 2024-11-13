export type User = {
  user_id: number
  user_name: string
  user_username: string
  user_email: string
  roles: {
    role_id: number
    role_name: string
  }[]
}

export type ActivityLog = {
  id: number
  activityUser: string
  activityDetails: string
  activityDate: Date
}

export type Permission = {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}
