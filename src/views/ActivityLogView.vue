<template>
  <section>
    <nt_card title="Activity Log">
      <template #detail>
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>activityUser</th>
              <th>activityDetails</th>
              <th>activityDate</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in result" :key="item.id">
              <td>{{ item.activityUser }}</td>
              <td>{{ item.activityDetails }}</td>
              <td>{{ item.activityDate }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </nt_card>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import type { ActivityLog } from '@/types/ntType'
import useActivityLogApi from '@/composable/activityLogApi'
import nt_card from '@/components/cards/nt_card.vue'

const { activityLogs, getActivityLogs } = useActivityLogApi()

const result = ref<ActivityLog[]>([])

onMounted(async () => {
  await getActivityLogs().then(() => {
    result.value = activityLogs.value
    console.log(result.value)
  })
})
</script>
