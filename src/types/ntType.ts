export type User = {
  user_id: number
  user_name: string
  user_username: string
  user_email: string
  roles: string
}

export type ActivityLog = {
  id: number
  activityUser: string
  activityDetails: string
  activityDate: Date

}


