<template>
  <div>
    <h1 class="font-bold text-2xl py-3">Account Requests</h1>
    Test: {{ tt }}
    <v-card>
      <v-card-text class="hidden md:block">
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
          class="data-table text-nowrap"
          :sort-by="[{ key: 'req_date', order: 'desc' }]"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.full_name }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.company }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.req_type }}</td>
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
              <td class="fixed-column">
                <div class="flex justify-center gap-x-2">
                  <router-link
                    :to="{ name: 'ViewRequest', params: { id: item.id } }"
                  >
                    <document-text />
                  </router-link>
                  <router-link
                    :to="{ name: 'ViewRequest', params: { id: item.id } }"
                  >
                    <document-download />
                  </router-link>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-text class="block md:hidden">
        <v-list lines="one" :items="allAccReqs">
          <v-list-item v-for="listItem in allAccReqs" :key="listItem.id">
            <template #prepend>
              <v-list-item-avatar class="mr-4">
                <document-icon
                  :color="
                    listItem.status === 'Approved'
                      ? 'green'
                      : listItem.status === 'Rejected'
                        ? 'red'
                        : ''
                  "
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ listItem.full_name }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    :color="
                      listItem.status === 'Approved'
                        ? 'green'
                        : listItem.status === 'Rejected'
                          ? 'red'
                          : ''
                    "
                    size="x-small"
                  >
                    {{ listItem.status }}
                  </v-chip>
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  >{{ listItem.position }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  server: {{ listItem.system.join(', ') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
            <template #append>
              <v-list-item-action>
                <router-link
                  :to="{ name: 'ViewRequest', params: { id: listItem.id } }"
                >
                  <document-download />
                </router-link>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAccReqApi } from '@/composable/accReqApi'
import nt_icon from '@/components/icon/nt_icon.vue'
import documentDownload from '@/assets/logo/icons/documents/documentDownload.vue'
import documentIcon from '@/assets/logo/icons/documents/documentIcon.vue'
import documentText from '@/assets/logo/icons/documents/documentText.vue'

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
  // { key: 'actions', title: 'Actions' },
])

const tt = computed(() => localStorage.getItem('user-store'))

onMounted(async () => {
  await getAllAccReqs()
})
</script>

<style scoped>
.fixed-column {
  position: sticky;
  right: 0;
  z-index: 10;
  width: 3rem;
  background-color: white;
}
</style>
