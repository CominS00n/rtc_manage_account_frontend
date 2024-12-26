export type User = {
  user_id: string
  user_name: string
  user_username: string
  user_email: string
  roles: {
    role_id: string
    role_name: string
  }[]
}

export type ActivityLog = {
  id: string
  activityUser: string
  activityDetails: string
  activityDate: Date
}

export type Permission = {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}
