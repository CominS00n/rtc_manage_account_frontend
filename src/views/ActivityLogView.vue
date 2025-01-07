<template>
  <section>
    <h1 class="font-bold text-2xl mb-3">Activity Log</h1>
    <v-card>
      <v-card-text>
        <div class="flex justify-end">
          <v-text-field
            v-model="search"
            label="Search"
            variant="outlined"
            density="compact"
            class="max-w-64"
            hide-details
            single-line
          >
            <template #prepend-inner>
              <nt_icon icon="search" />
            </template>
          </v-text-field>
        </div>

        <v-data-table
          :items="activityLogs"
          :headers="headers"
          :search="search"
          class="data-table text-nowrap max-h-[720px]"
          :items-per-page-options="[10, 25, 50]"
          :items-per-page="10"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.activityCode }}</td>
              <td>{{ item.activityUser }}</td>
              <td>{{ item.activityAction }}</td>
              <td>{{ item.activityDetails }}</td>
              <td>{{ item.activityDate }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import useActivityLogApi from '@/composable/activityLogApi'

const { getActivityLogs, activityLogs } = useActivityLogApi()
onMounted(async () => {
  await getActivityLogs()
})

const search = ref<string>('')
const headers = ref([
  { key: 'activityCode', title: 'Ref Code.' },
  { key: 'activityUser', title: 'Full Name' },
  { key: 'activityAction', title: 'Action' },
  { key: 'activityDetails', title: 'Detail' },
  { key: 'activityDate', title: 'Date' },
])
</script>
