export type User = {
  user_id: string
  user_name: string
  user_username: string
  user_password: string
  user_email: string
  user_phone: string
  user_position: string
  user_company: string
  user_division: string
  user_status: string
  user_created_at: string
  user_updated_at: string | null
  roles: {
    role_id: string
    role_name: string
  }[]
  groups: {
    group_id: string
    group_name: string
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
  activityCode: string
  activityUser: string
  activityAction: string
  activityDetails: string
  activityDate: string
  created_at: string
  updated_at: string | null
  deleted_at: string | null
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
