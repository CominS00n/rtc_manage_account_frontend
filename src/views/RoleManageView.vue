<template>
  <section>
    <h1 class="font-bold text-2xl py-3">Role Management</h1>
    <nt_card>
      <template #detail>
        <div class="grid grid-cols-5 gap-x-10">
          <div class="col-span-1">
            <h2 class="text-xl font-bold py-4">Roles</h2>
          </div>
          <div class="col-span-4">
            <h2 class="text-xl font-bold py-4">New Role</h2>
            <label class="input input-bordered flex items-center gap-2 w-full">
              Role Name :
              <input type="text" class="grow" placeholder="" />
            </label>
            <div
              v-for="group in perm_group"
              :key="group.title"
              class="mt-6 first-of-type:mt-0"
            >
              <h2 class="font-bold capitalize py-4">{{ group.title }}</h2>
              <div class="inline-flex gap-x-6">
                <label
                  class="flex items-center gap-2"
                  v-for="item in group.perm"
                  :key="item.id"
                >
                  <input type="checkbox" class="checkbox checkbox-sm" />
                  <span class="capitalize">
                    {{ item.description }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
    </nt_card>
  </section>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

import nt_card from '@/components/cards/nt_card.vue'
// import nt_icon from '@/components/icon/nt_icon.vue'

import type { Permission } from '@/types/ntType'

const permission = ref<Permission[]>([])
// const roles = ref([])

const perm_group = reactive({
  user: {
    title: 'User Permissions',
    perm: <Permission[]>[],
  },
  role: {
    title: 'Role Permissions',
    perm: <Permission[]>[],
  },
  req: {
    title: 'Request Permissions',
    perm: <Permission[]>[],
  },
  log: {
    title: 'Log Permissions',
    perm: <Permission[]>[],
  },
})

onMounted(async () => {
  try {
    const response = await axios.get(
      'http://localhost:8000/api/v2/permissions',
      {
        withCredentials: true,
      },
    )


    permission.value = response.data.data

    // Filter permissions to include only those with 'user' in the name
    perm_group.user.perm = permission.value.filter(item => {
      return item.name.includes('user')
    })

    // Filter permissions to include only those with 'role' in the name
    perm_group.role.perm = permission.value.filter(item => {
      return item.name.includes('role') && !item.name.includes('rolePerm')
    })

    perm_group.req.perm = permission.value.filter(item => {
      return item.name.includes('req')
    })

    perm_group.log.perm = permission.value.filter(item => {
      return item.name.includes('log')
    })
  } catch (error) {
    console.error('Error fetching permissions:', error)
  }
})
</script>
