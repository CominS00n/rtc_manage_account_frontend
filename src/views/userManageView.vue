<template>
  <section>
    <h1 class="font-bold text-2xl mb-3">User Management</h1>
    <v-card>
      <v-card-text>
        <v-data-table
          :items="users"
          :headers="headers"
          class="text-nowrap max-h-[720px]"
          :items-per-page-options="[10, 25, 50]"
          :items-per-page="10"
          fixed-header
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.user_name }}</td>
              <td>{{ item.user_username }}</td>
              <td>{{ item.user_email }}</td>
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
                <nt_icon icon="user-circle" class="text-xl text-green-500" />
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'

import useUserApi from '@/composable/userApi'
import useGroupApi from '@/composable/groupApi'
import nt_icon from '@/components/icon/nt_icon.vue'

const { getUsers, users, getUserGroups } = useUserApi()
const { group, getGroupID } = useGroupApi()

const userStore = useUserStore()
const groupID = ref(userStore.groups)

const headers = [
  { key: 'Name', title: 'user_name' },
  { key: 'Username', title: 'user_username' },
  { key: 'Email', title: 'user_email' },
  { key: 'Role', title: 'roles' },
  { key: 'Status', title: 'status' },
]

const getGroupNames = async (groupID: string) => {
  await getGroupID(groupID)
  return group.value[0].name
}
const group_name = ref<string[]>([])

onMounted(async () => {
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
</script>
