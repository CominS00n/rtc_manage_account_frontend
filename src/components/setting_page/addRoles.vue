<template>
  <v-card>
    <v-card-title>
      <h1 class="font-bold text-xl">Roles</h1>
    </v-card-title>
    <v-card-text class="grid gap-4 lg:grid-cols-2">
      <v-form @submit.prevent="addRoles" ref="roleRef" class="mt-6 space-y-2">
        <v-text-field
          v-model="roleName"
          label="Role name"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :rules="inputDefaultRules"
        />
        <v-textarea
          v-model="roleDescription"
          label="Description"
          variant="outlined"
          density="compact"
          validate-on="submit"
          no-resize
          :rules="inputDefaultRules"
        ></v-textarea>
        <h1 class="font-bold text-lg">Permission</h1>
        <div v-for="group in perm_group" :key="group.title" class="">
          <h2 class="font-bold capitalize py-4">{{ group.title }}</h2>
          <div
            class="inline-flex gap-x-6 flex-wrap gap-y-4"
            :class="error && permSelected.length === 0 ? 'text-[#b00020]' : ''"
          >
            <label
              class="flex items-center gap-2"
              v-for="item in group.perm"
              :key="item.id"
            >
              <input
                type="checkbox"
                class="checkbox checkbox-sm border"
                :value="item.id"
                v-model="permSelected"
              />
              <span class="capitalize">
                {{ item.description }}
              </span>
            </label>
          </div>
        </div>

        <v-btn type="submit" color="#facc15" class="w-full mt-4">
          <p class="capitalize">Create</p>
        </v-btn>
      </v-form>
      <div class="flex flex-col h-full" v-show="checkPermission('roleRead')">
        <p class="text-md font-bold">View all roles</p>
        <div
          class="h-full max-h-[600px] overflow-y-auto border border-gray-200 rounded-lg"
        >
          <v-list lines="one">
            <v-list-item
              v-for="role in roles"
              :key="role.id"
              :title="role.name"
            >
              <template #subtitle>
                <p class="gap-x-2 gap-y-1 flex flex-wrap items-center">
                  <span class="text-sm">{{ role.description }}</span>
                  <span v-for="perm in role.permission" :key="perm.id">
                    <v-chip size="small" class="capitalize">
                      {{ perm.description }}
                    </v-chip>
                  </span>
                </p>
              </template>
              <template #append>
                <div class="flex gap-x-4">
                  <edit-icon
                    class="cursor-pointer"
                    @click="handleEditClick(role.id)"
                    v-show="checkPermission('roleUpdate')"
                  />
                  <trash-icon
                    color="red"
                    class="cursor-pointer"
                    @click="handleDeleteClick(role.id)"
                    v-show="checkPermission('roleDelete')"
                  />
                </div>
              </template>
              <v-divider class="border-opacity-100 mt-2"></v-divider>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-card-text>
  </v-card>

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
                Update Implementor
              </DialogTitle>
              <v-form class="mt-6" @submit.prevent="editSubmit" ref="roleRef">
                <div class="text-sm text-gray-500">
                  <v-text-field
                    v-model="editNameRole"
                    label="Name"
                    variant="outlined"
                    density="compact"
                    validate-on="submit"
                    :rules="inputDefaultRules"
                  />
                  <v-textarea
                    v-model="editDescription"
                    label="Description"
                    variant="outlined"
                    density="compact"
                    validate-on="submit"
                    no-resize
                    :rules="inputDefaultRules"
                  ></v-textarea>
                </div>
                <div v-for="group in perm_group" :key="group.title" class="">
                  <h2 class="font-bold capitalize py-4">{{ group.title }}</h2>
                  <div
                    class="inline-flex gap-x-6 flex-wrap gap-y-4"
                    :class="
                      error && permSelected.length === 0 ? 'text-[#b00020]' : ''
                    "
                  >
                    <label
                      class="flex items-center gap-2"
                      v-for="item in group.perm"
                      :key="item.id"
                    >
                      <input
                        type="checkbox"
                        class="checkbox checkbox-sm border"
                        :value="item.id"
                        v-model="editPermSelected"
                      />
                      <span class="capitalize">
                        {{ item.description }}
                      </span>
                    </label>
                  </div>
                </div>
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
import { onMounted, ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import { checkPermission } from '@/constants/checkPermission'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import type { Role } from '@/types/ntType'
import { inputDefaultRules } from '@/rules/inputRules'

import usePermRoleApi from '@/composable/permRolesApi'
import useActivityLogApi from '@/composable/activityLogApi'
import trashIcon from '@/assets/logo/icons/trashIcon.vue'
import editIcon from '@/assets/logo/icons/editIcon.vue'
import Swal from 'sweetalert2'

const {
  getPermission,
  getRoles,
  roles,
  createRoles,
  deleteRole,
  getRole,
  role,
  updateRole,
} = usePermRoleApi()
const { postActivityLog } = useActivityLogApi()
const toast = useToast()

const perm_group = reactive({
  user: {
    title: 'User',
    perm: <Role[]>[],
  },
  role: {
    title: 'Role',
    perm: <Role[]>[],
  },
  req: {
    title: 'Request Account',
    perm: <Role[]>[],
  },
  log: {
    title: 'Log',
    perm: <Role[]>[],
  },
})

const response = ref<Role[]>([])
const roleName = ref<string>('')
const roleDescription = ref<string>('')
const permSelected = ref<string[]>([])
const error = ref<boolean>(false)
const roleRef = ref()
const isOpen = ref(false)

const editNameRole = ref<string>('')
const editPermSelected = ref<string[]>([])
const editDescription = ref<string>('')

const closeModal = () => {
  isOpen.value = false
}

const handleEditClick = async (id: string) => {
  await getRole(id)
  isOpen.value = true
  if (role.value) {
    editNameRole.value = role.value[0].name
    editPermSelected.value = role.value[0].permission.map(item => item.id)
    editDescription.value = role.value[0].description
  }
}

const editSubmit = async () => {
  const isValid = await roleRef.value.validate()
  if (!isValid.valid) {
    toast.error('Please fill in all required fields')
    return false
  }

  if (editPermSelected.value.length === 0 || editNameRole.value === '') {
    error.value = true
    toast.error('Please fill in all required fields')
    return
  }

  const data: { name: string; description: string; permissions: string[] } = {
    name: editNameRole.value,
    description: editDescription.value,
    permissions: editPermSelected.value,
  }

  await updateRole(role.value[0].id, data).finally(async () => {
    await postActivityLog(
      'UPDATE-ROLE-' + new Date().getTime(),
      localStorage.getItem('user') || '',
      'Edit role',
      `Edit role [${role.value[0].id}]`,
    )
    // clear data
    await roleRef.value.reset()
    error.value = false
    toast.success('Role updated successfully')
  })
  await getRoles()
  closeModal()
}

const handleDeleteClick = async (id: string) => {
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
      await deleteRole(id).finally(async () => {
        await postActivityLog(
          'DELETE-ROLE-' + new Date().getTime(),
          localStorage.getItem('user') || '',
          'Delete role',
          `Delete role [${id}]`,
        )
        toast.success('Role deleted successfully')
      })
      await getRoles()
    }
  })
}

const addRoles = async () => {
  if (permSelected.value.length === 0 || roleName.value === '') {
    error.value = true
    toast.error('Please fill in all required fields')
    return
  }

  const isValid = await roleRef.value.validate()
  if (!isValid.valid) {
    toast.error('Please fill in all required fields')
    return false
  }

  await createRoles(
    roleName.value,
    roleDescription.value,
    permSelected.value,
  ).finally(async () => {
    roleName.value = ''
    roleDescription.value = ''
    permSelected.value = []
    error.value = false
    await postActivityLog(
      'CREATE-ROLE-' + new Date().getTime(),
      localStorage.getItem('user') || '',
      'Create New Role',
      `Create role with name: ${roleName.value}`,
    )

    toast.success('Role created successfully')
  })
  await getRoles()
}

onMounted(async () => {
  response.value = await getPermission()
  perm_group.user.perm = response.value.filter(item => {
    return item.name.includes('user')
  })

  perm_group.role.perm = response.value.filter(item => {
    return item.name.includes('role') && !item.name.includes('rolePerm')
  })

  perm_group.req.perm = response.value.filter(item => {
    return item.name.includes('req')
  })

  perm_group.log.perm = response.value.filter(item => {
    return item.name.includes('log')
  })

  await getRoles()
})
</script>
