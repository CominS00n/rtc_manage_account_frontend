<template>
  <v-card>
    <v-card-title>
      <h1 class="font-bold text-xl">Roles</h1>
    </v-card-title>
    <v-card-text class="grid gap-4 grid-cols-2">
      <div>
        <v-text-field
          label="Role name"
          variant="outlined"
          density="compact"
          validate-on="submit"
        />
        <div v-for="group in perm_group" :key="group.title" class="">
          <h2 class="font-bold capitalize py-4">{{ group.title }}</h2>
          <div class="inline-flex gap-x-6 flex-wrap gap-y-4">
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
        <div class="flex justify-end">
          <v-btn type="submit" color="#facc15" width="240px">
            <p class="capitalize">Create</p>
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'

import usePermRoleApi from '@/composable/permRolesApi'

const { getPermission } = usePermRoleApi()

interface Role {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

const perm_group = reactive({
  user: {
    title: 'User Permissions',
    perm: <Role[]>[],
  },
  role: {
    title: 'Role Permissions',
    perm: <Role[]>[],
  },
  req: {
    title: 'Request Permissions',
    perm: <Role[]>[],
  },
  log: {
    title: 'Log Permissions',
    perm: <Role[]>[],
  },
})

const response = ref<Role[]>([])
const permSelected = ref<string[]>([])
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
})
</script>
