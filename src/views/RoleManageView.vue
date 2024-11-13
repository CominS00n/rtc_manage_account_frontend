<template>
  <section>
    <h1 class="font-bold text-2xl py-3">Role Management</h1>
    <nt_card title="Add Roles">
      <template #detail>
        <div v-for="(group, i) in perm_group" :key="i">
          <h2 class="font-bold text-xl capitalize">{{ i }}</h2>
          <p v-for="item in group" :key="item.id">
            {{ item.description }}
          </p>
        </div>
      </template>
    </nt_card>
  </section>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

import nt_card from '@/components/cards/nt_card.vue'

import type { Permission } from '@/types/ntType'

const permission = ref<Permission[]>([])
// const user_perm = ref<Permission[]>([])

const perm_group = reactive({
  user: <Permission[]>[],
  role: <Permission[]>[],
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
    perm_group.user = permission.value.filter(item => {
      return item.name.includes('user')
    })

    // Filter permissions to include only those with 'role' in the name
    perm_group.role = permission.value.filter(item => {
      return item.name.includes('role') && !item.name.includes('rolePerm')
    })
  } catch (error) {
    console.error('Error fetching permissions:', error)
  }
})
</script>
