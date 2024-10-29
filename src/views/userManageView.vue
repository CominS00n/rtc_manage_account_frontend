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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in result" :key="item.email">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>
                <nt_icon icon="user-circle" class="text-xl text-green-500" />
              </td>
            </tr>
          </tbody>
        </table>
        <!-- {{ result }} -->
      </template>
    </nt_card>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import type { User } from '@/types/ntType'
import useUserApi from '@/composable/userApi'
import nt_card from '@/components/cards/nt_card.vue'
import nt_icon from '@/components/icon/nt_icon.vue'

const { getUsers, users } = useUserApi()
const result = ref<User[]>([])

onMounted(async () => {
  await getUsers().then(() => {
    result.value = users.value
  })
})
</script>
