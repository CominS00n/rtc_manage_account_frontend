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
            <tr v-for="item in users" :key="item.user_email">
              <td>{{ item.user_id }}</td>
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
          </tbody>
        </table>
      </template>
    </nt_card>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import useUserApi from '@/composable/userApi'
import nt_card from '@/components/cards/nt_card.vue'
import nt_icon from '@/components/icon/nt_icon.vue'

const { getUsers, users } = useUserApi()

onMounted(async () => {
  await getUsers()
})
</script>
