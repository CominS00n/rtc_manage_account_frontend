<template>
  <section>
    <h1 class="font-bold text-2xl mb-3">Activity Log</h1>
    <nt_card>
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
import { ref } from 'vue'

// import type { ActivityLog } from '@/types/ntType'
// import useActivityLogApi from '@/composable/activityLogApi'
import nt_card from '@/components/cards/nt_card.vue'

// const { activityLogs, getActivityLogs } = useActivityLogApi()

// const result = ref<ActivityLog[]>([])

// onMounted(async () => {
//   await getActivityLogs().then(() => {
//     result.value = activityLogs.value
//     console.log(result.value)
//   })
// })

const result = ref([
  {
    id: 1,
    activityUser: 'sitthihai puckpoo',
    activityDetails: 'User logged in',
    activityDate: '2024-11-12',
  },
  {
    id: 2,
    activityUser: 'sitthihai puckpoo',
    activityDetails: 'User logged in',
    activityDate: '2024-11-13',
  },
  {
    id: 3,
    activityUser: 'sitthihai puckpoo',
    activityDetails: 'User logged in',
    activityDate: '2024-11-14',
  },
  {
    id: 4,
    activityUser: 'sitthihai puckpoo',
    activityDetails: 'User logged in',
    activityDate: '2024-11-11',
  },
])
</script>
