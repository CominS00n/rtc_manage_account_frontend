<template>
  <section>
    <h1 class="font-bold text-2xl mb-3">User Management</h1>
    <v-card>
      <v-card-text>
        <div class="flex justify-end items-center gap-x-4">
          <v-text-field
            v-model="search"
            label="Search"
            variant="outlined"
            density="compact"
            class="max-w-64"
            hide-details
            single-line
          >
            <template #prepend-inner>
              <nt_icon icon="search" />
            </template>
          </v-text-field>
          <v-btn color="#facc15" :to="'settings'">Add User</v-btn>
        </div>
        <v-data-table
          :items="users"
          :headers="headers"
          :search="search"
          class="text-nowrap max-h-[720px]"
          :items-per-page-options="[10, 25, 50]"
          :items-per-page="10"
          fixed-header
        >
          <template v-slot:item="{ item }">
            <tr class="text-capitalize">
              <td>{{ item.user_name }}</td>
              <td>{{ item.user_position }}</td>
              <td class="text-none">{{ item.user_email }}</td>
              <td>{{ item.user_phone }}</td>
              <td>{{ item.user_username }}</td>
              <td>
                <ul
                  v-for="subItem in item.roles"
                  :key="subItem.role_id"
                  class="md:inline-flex md:ml-2 first:ml-0"
                >
                  <li class="badge badge-ghost text-center">
                    <p>{{ subItem.role_name }}</p>
                  </li>
                </ul>
              </td>
              <td>
                <ul
                  v-for="subItem in item.groups"
                  :key="subItem.group_id"
                  class="md:inline-flex md:ml-2 first:ml-0"
                >
                  <li class="badge badge-ghost text-center">
                    <p>{{ subItem.group_name }}</p>
                  </li>
                </ul>
              </td>
              <td>
                <div class="flex gap-x-2">
                  <v-btn
                    variant="text"
                    icon
                    @click="handleEditClick(item.user_id)"
                  >
                    <edit-icon />
                  </v-btn>
                  <v-btn
                    variant="text"
                    icon
                    @click="handleDeleteClick(item.user_id)"
                    :disabled="user_id === item.user_id"
                  >
                    <trash-icon color="red" />
                  </v-btn>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </section>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[999]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Edit User
              </DialogTitle>
              <v-form
                class="mt-6 space-y-2"
                @submit.prevent="editSubmit"
                ref="userForm"
              >
                <v-text-field
                  v-model="userData.username"
                  label="Username"
                  variant="outlined"
                  density="compact"
                  validate-on="submit"
                  :rules="[v => !!v || 'Username is required']"
                />
                <v-text-field
                  v-model="userData.password"
                  label="Password"
                  variant="outlined"
                  density="compact"
                  :type="visible ? 'text' : 'password'"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :rules="userData.password === '' ? [] : inputPasswordRules"
                  @click:append-inner="visible = !visible"
                />
                <v-text-field
                  v-model="userData.name"
                  label="Fullname"
                  variant="outlined"
                  density="compact"
                  validate-on="submit"
                  :rules="[v => !!v || 'Fullname is required']"
                />
                <v-text-field
                  v-model="userData.position"
                  label="Position"
                  variant="outlined"
                  density="compact"
                  validate-on="submit"
                  :rules="[v => !!v || 'Position is required']"
                />
                <v-text-field
                  v-model="userData.company"
                  label="Company"
                  variant="outlined"
                  density="compact"
                  validate-on="submit"
                  :rules="[v => !!v || 'Company is required']"
                />
                <v-text-field
                  v-model="userData.division"
                  label="Division"
                  variant="outlined"
                  density="compact"
                  validate-on="submit"
                  :rules="[v => !!v || 'Division is required']"
                />
                <v-text-field
                  v-model="userData.email"
                  label="Email"
                  variant="outlined"
                  density="compact"
                  validate-on="submit"
                  :rules="emailRules"
                />
                <v-text-field
                  v-model="userData.phone"
                  label="Phone"
                  variant="outlined"
                  density="compact"
                  validate-on="submit"
                  :rules="[v => !!v || 'Phone is required']"
                />
                <v-select
                  v-model="roleId"
                  :items="roles"
                  item-title="name"
                  item-value="id"
                  label="Select Role"
                  density="compact"
                  variant="outlined"
                  clearable
                  multiple
                  chips
                  validate-on="submit"
                >
                </v-select>
                {{ roleId }}
                <v-select
                  v-model="groupId"
                  :items="groups"
                  item-title="name"
                  item-value="id"
                  label="Select Group"
                  density="compact"
                  variant="outlined"
                  clearable
                  multiple
                  chips
                  validate-on="submit"
                >
                </v-select>

                <div class="mt-4 flex gap-4">
                  <v-btn color="#facc15" class="flex-1" type="submit">
                    <p class="capitalize">Submit</p>
                  </v-btn>
                  <v-btn variant="outlined" @click="closeModal">
                    <p class="capitalize">Cancel</p>
                  </v-btn>
                </div>
              </v-form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import type { UserRegister } from '@/types/ntType'

import { onMounted, ref, computed, watchEffect, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useToast } from 'vue-toastification'
import { inputPasswordRules, emailRules } from '@/rules/inputRules'

import useUserApi from '@/composable/userApi'
import useGroupApi from '@/composable/groupApi'
import usePermRoleApi from '@/composable/permRolesApi'
import useActivityLogApi from '@/composable/activityLogApi'
import Swal from 'sweetalert2'

import nt_icon from '@/components/icon/nt_icon.vue'
import trashIcon from '@/assets/logo/icons/trashIcon.vue'
import editIcon from '@/assets/logo/icons/editIcon.vue'

const {
  getUsers,
  users,
  getUserGroups,
  deleteUser,
  getUser,
  user,
  updateUser,
} = useUserApi()
const { group, getGroupID, getGroups, groups } = useGroupApi()
const { getRoles, roles } = usePermRoleApi()
const { postActivityLog } = useActivityLogApi()

const toast = useToast()
const userStore = useUserStore()
const groupID = ref(userStore.groups)
const isOpen = ref(false)
const visible = ref<boolean>(false)
const userData = reactive<UserRegister>({
  username: '',
  password: '',
  name: '',
  position: '',
  company: '',
  division: '',
  email: '',
  phone: '',
})
const roleId = ref<string[]>([])
const groupId = ref<string[]>([])

const userForm = ref()

const handleEditClick = async (id: string) => {
  isOpen.value = true
  await getGroups()
  await getRoles()
  await getUser(id).finally(() => {
    if (user.value) {
      userData.username = user.value[0].user_username
      userData.name = user.value[0].user_name
      userData.position = user.value[0].user_position
      userData.company = user.value[0].user_company
      userData.division = user.value[0].user_division
      userData.email = user.value[0].user_email
      userData.phone = user.value[0].user_phone
    }

    roleId.value = user.value[0].roles.map(
      (role: { role_id: string; role_name: string }) => role.role_id,
    )
    groupId.value = user.value[0].groups.map(
      (group: { group_id: string; group_name: string }) => group.group_id,
    )

    // ลบ role ที่ role_name === 'super_admin' ออกจาก roleId
    roleId.value = roleId.value.filter(
      (role: string) =>
        user.value[0].roles.find(
          (roleItem: { role_id: string; role_name: string }) =>
            roleItem.role_name === 'super_admin' && roleItem.role_id === role,
        ) === undefined,
    )
    // ลบ group ที่ group_name === 'super_admin' ออกจาก groupId
    groupId.value = groupId.value.filter(
      (group: string) =>
        user.value[0].groups.find(
          (groupItem: { group_id: string; group_name: string }) =>
            groupItem.group_name === 'super_admin' &&
            groupItem.group_id === group,
        ) === undefined,
    )
  })
}

const headers = [
  { key: 'user_name', title: 'Full Name' },
  { key: 'user_position', title: 'Position' },
  { key: 'user_email', title: 'Email' },
  { key: 'user_phone', title: 'Phone' },
  { key: 'user_username', title: 'Username' },
  { key: 'roles', title: 'Roles' },
  { key: 'groups', title: 'Groups' },
  { key: 'actions', title: 'Actions' },
]

const getGroupNames = async (groupID: string) => {
  await getGroupID(groupID)
  return group.value[0].name
}
const group_name = ref<string[]>([])

const user_id = ref<string>('')
const search = ref<string>('')

onMounted(async () => {
  user_id.value = userStore.user_id
  groupID.value.forEach(async (id: string) => {
    const response = await getGroupNames(id)
    if (response) {
      group_name.value.push(response.toString())
    }
  })
})

const isAdmin = computed(() => group_name.value.includes('super_admin'))
watchEffect(async () => {
  if (isAdmin.value) {
    await getUsers()
  } else {
    for (const name of group_name.value) {
      await getUserGroups(name)
    }
  }
})

const handleDeleteClick = (id: string) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button',
    },
  }).then(async result => {
    if (result.isConfirmed) {
      await deleteUser(id) // Delete user
      await postActivityLog(
        'DELETE-USER-' + new Date().getTime(),
        localStorage.getItem('user') || '',
        'Delete user',
        `Deleted user with id ${id}`,
      )
      toast.success('Group deleted successfully')
      await getUsers()
    }
  })
}

const closeModal = () => {
  isOpen.value = false
}

const editSubmit = async () => {
  if (roleId.value.length === 0) {
    roleId.value.push(user.value[0].roles[0].role_id)
  }
  if (groupId.value.length === 0) {
    groupId.value.push(user.value[0].groups[0].group_id)
  }

  if (user.value[0].roles[0].role_name.includes('super_admin')) {
    roleId.value.push(user.value[0].roles[0].role_id)
  }

  if (user.value[0].groups[0].group_name.includes('super_admin')) {
    groupId.value.push(user.value[0].groups[0].group_id)
  }
  // remove duplicate roleId and groupId
  roleId.value = Array.from(new Set(roleId.value))
  groupId.value = Array.from(new Set(groupId.value))

  const isValid = await userForm.value.validate()
  if (!isValid.valid) {
    toast.error('Please fill in all required fields')
    return false
  }

  // Update user data here
  const userId = user.value[0].user_id
  await updateUser(userData, userId, roleId.value, groupId.value)
  for (const name of group_name.value) {
    await getUserGroups(name)
  }
  await postActivityLog(
    'UPDATE-USER-' + new Date().getTime(),
    localStorage.getItem('user') || '',
    'Update user',
    `Updated user with id ${userId}`,
  )
  toast.success('User has been updated')
  closeModal()
}
</script>
