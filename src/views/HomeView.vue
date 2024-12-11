<template>
  <div>
    <h1 class="font-bold text-2xl py-3">Account Requests</h1>
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
          :items="allAccReqs"
          :headers="headers"
          :search="search"
          class="data-table"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-nowrap">{{ item.full_name }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.company }}</td>
              <td>{{ item.email }}</td>
              <td class="text-nowrap">{{ item.req_type }}</td>
              <td>{{ item.system.join(', ') }}</td>
              <td>{{ item.req_date }}</td>
              <td>{{ item.account_type }}</td>
              <td>{{ item.user_type.join(', ') }}</td>
              <td>
                <v-chip
                  :color="
                    item.status === 'Approved'
                      ? 'green'
                      : item.status === 'Rejected'
                        ? 'red'
                        : ''
                  "
                  >{{ item.status }}</v-chip
                >
              </td>
              <td>
                <router-link
                  :to="{ name: 'ViewRequest', params: { id: item.id } }"
                >
                  <eye-icon />
                </router-link>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAccReqApi } from '@/composable/accReqApi'
import nt_icon from '@/components/icon/nt_icon.vue'
import eyeIcon from '@/assets/logo/icons/eyeIcon.vue'

const { getAllAccReqs, allAccReqs } = useAccReqApi()

const search = ref<string>('')

const headers = ref([
  { key: 'full_name', title: 'Full Name' },
  { key: 'position', title: 'Position' },
  { key: 'company', title: 'Company' },
  { key: 'email', title: 'Email' },
  { key: 'req_type', title: 'Request Type' },
  { key: 'system', title: 'System' },
  { key: 'req_date', title: 'Request Date' },
  { key: 'account_type', title: 'Account Type' },
  { key: 'user_type', title: 'User Type' },
  { key: 'status', title: 'Status' },
  { key: 'actions', title: 'Actions' },
])

onMounted(async () => {
  await getAllAccReqs()
})
</script>
