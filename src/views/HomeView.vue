<template>
  <section>
    <!-- <h1>Home</h1> -->
    <h1 class="font-bold text-2xl py-3">Overviews</h1>
    <v-card>
      <v-card-text>
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Requester</th>
              <th>Request Email</th>
              <th>Request Type</th>
              <th>Request Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in accReqs" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.full_name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.created_at ? item.created_at.split('T')[0] : '' }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
    </v-card>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccReqApi } from '@/composable/accReqApi'

const { getAccReqs, accReqs } = useAccReqApi()

onMounted(async () => {
  await getAccReqs(1)
})
</script>
