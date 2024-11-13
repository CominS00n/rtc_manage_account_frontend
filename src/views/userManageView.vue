<template>
  <section>
    <!-- <h1>User Management</h1>
    <p>Welcome to the User Manage page!</p> -->
    <nt_card title="User Management">
      <template #detail>
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in result" :key="item.user_email">
              <td>{{ item.user_id }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.user_username }}</td>
              <td>{{ item.user_email }}</td>
              <td>
                <ul
                  v-for="subItem in item.roles"
                  :key="subItem"
                  class="md:inline-flex md:ml-2 first:ml-0"
                >
                  <li class="badge badge-ghost text-center">
                    <p>{{ subItem }}</p>
                  </li>
                </ul>
              </td>
              <td>
                <nt_icon icon="user-circle" class="text-xl text-green-500" />
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </nt_card>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

// import type { User } from '@/types/ntType'
import useUserApi from '@/composable/userApi'
import nt_card from '@/components/cards/nt_card.vue'
import nt_icon from '@/components/icon/nt_icon.vue'

const { getUsers, users } = useUserApi()

type User = {
  user_id: number
  user_name: string
  user_username: string
  user_email: string
  roles: string[]
}
const result = ref<User[]>([])

onMounted(async () => {
  await getUsers()
  result.value = users.value.map(user => ({
    ...user,
    roles: Array.isArray(user.roles)
      ? user.roles.map(role => role.role_name)
      : [],
  }))
})
</script>
