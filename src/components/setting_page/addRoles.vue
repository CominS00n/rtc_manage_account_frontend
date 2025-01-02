<template>
  <v-card>
    <v-card-title>
      <h1 class="font-bold text-xl">Roles</h1>
    </v-card-title>
    <v-card-text class="grid gap-4 lg:grid-cols-2">
      <v-form
        @submit.prevent="submit_createRoles"
        v-model="valid"
        ref="roleRef"
        class="mt-6 space-y-2"
      >
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
      <div class="flex flex-col h-full">
        <p class="text-md font-bold">View all roles</p>
        <div class="h-full max-h-[600px] overflow-y-auto border border-gray-200 rounded-lg">
          <v-list lines="one">
            <v-list-item
              v-for="role in roles"
              :key="role.id"
              :title="role.name"
            >
              <template #subtitle>
                <p class="space-x-2">
                  <span class="text-sm">{{ role.description }}</span>
                  <span v-for="perm in role.permission" :key="perm.id">
                    <span class="text-xs bg-gray-200 rounded-full px-2 py-1">
                      {{ perm.description }}
                    </span>
                  </span>
                </p>
              </template>
              <template #append>
                <div class="flex gap-x-4">
                  <edit-icon
                    class="cursor-pointer"
                    @click="handleEditClick(role.id)"
                  />
                  <trash-icon
                    color="red"
                    class="cursor-pointer"
                    @click="handleDeleteClick(role.id)"
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
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'

import type { Role } from '@/types/ntType'
import { inputDefaultRules } from '@/rules/inputRules'

import usePermRoleApi from '@/composable/permRolesApi'
import trashIcon from '@/assets/logo/icons/trashIcon.vue'
import editIcon from '@/assets/logo/icons/editIcon.vue'

const { getPermission, getRoles, roles, createRoles, deleteRole } =
  usePermRoleApi()
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
const valid = ref<boolean>(false)
const error = ref<boolean>(false)
const roleRef = ref()

const handleEditClick = (id: string) => {
  console.log('edit', id)
}

const handleDeleteClick = async (id: string) => {
  await deleteRole(id).then(() => {
    toast.success('Role deleted successfully')
  })
  await getRoles()
}

const submit_createRoles = async () => {
  if (!roleRef.value.validate()) {
    toast.error('Please fill in all required fields')
    return
  }
  if (permSelected.value.length === 0 || roleName.value === '') {
    error.value = true
    toast.error('Please fill in all required fields')
    return
  }

  await createRoles(
    roleName.value,
    roleDescription.value,
    permSelected.value,
  ).finally(() => {
    // clear data
    roleName.value = ''
    roleDescription.value = ''
    permSelected.value = []
    error.value = false

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
