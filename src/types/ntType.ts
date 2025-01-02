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

export type UserRegister = {
  username: string
  password: string
  name: string
  position: string
  company: string
  division: string
  email: string
  phone: string
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

export type Role = {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string | null
}

export type RolePermission = {
  id: string
  name: string
  description: string
  permission: Permission[]
  created_at: string
  updated_at: string | null
}

export type Group = {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string | null
}
