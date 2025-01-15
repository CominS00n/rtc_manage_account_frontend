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
          :items-per-page-options="[10, 25, 50]"
          :items-per-page="10"
          :sort-by="[{ key: 'created_at', order: 'desc' }]"
          class="data-table text-nowrap max-h-[720px]"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.activityCode }}</td>
              <td>{{ item.activityUser }}</td>
              <td>{{ item.activityAction }}</td>
              <td class="max-w-64 text-wrap">{{ item.activityDetails }}</td>
              <td>{{ dateFormat(new Date(item.created_at)) }}</td>
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
import dateFormat from '@/constants/dateFormat'

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
  { key: 'created_at', title: 'Date' },
])
</script>
