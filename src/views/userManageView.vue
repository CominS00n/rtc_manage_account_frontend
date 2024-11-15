<template>
  <section>
    <h1 class="font-bold text-2xl py-3">User Management</h1>
    <nt_card>
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
import { ref } from 'vue'

// import useUserApi from '@/composable/userApi'
import nt_card from '@/components/cards/nt_card.vue'
import nt_icon from '@/components/icon/nt_icon.vue'

// const { getUsers, users } = useUserApi()

// onMounted(async () => {
//   await getUsers()
//   console.log(users.value)
// })

const users = ref([
  {
    user_id: 1,
    user_name: 'sitthihai puckpoo',
    user_email: 'spuckpoo@gmail.com',
    user_username: 'admin',
    user_password:
      '$2b$10$54g.qYL5Xh5aH5sbjEwMtu3WW8iWbw8wTcSto3nMd1m/fzLownAFG',
    roles: [
      {
        role_id: 1,
        role_name: 'super-admin',
        permissions: ['allowAll'],
      },
      {
        role_id: 2,
        role_name: 'admin',
        permissions: [
          'userCreate',
          'userRead',
          'userUpdate',
          'userDelete',
          'roleCreate',
          'roleRead',
          'permRead',
          'rolePermCreate',
          'rolePermRead',
          'reqAccountCreate',
          'reqAccountRead',
          'reqAccountUpdate',
          'reqAccountDelete',
        ],
      },
    ],
    groups: ['user', 'admin'],
  },
])
</script>
