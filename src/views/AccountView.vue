<template>
  <section>
    <h1 class="font-bold text-2xl mb-3">Account Requests</h1>
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
          :sort-by="[{ key: 'created_at', order: 'desc' }]"
        >
          <template v-slot:item="{ item }">
            <tr class="text-capitalize">
              <td>{{ item.full_name }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.company }}</td>
              <td class="text-none">
                <!-- {{ item.email }} -->
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <p v-bind="props" class="max-w-[200px] truncate">
                      {{ item.email }}
                    </p>
                  </template>
                  <template #default>
                    <p>{{ item.email }}</p>
                  </template>
                </v-tooltip>
              </td>
              <td>{{ item.req_type }}</td>
              <td>{{ item.system.join(', ') }}</td>
              <td>{{ item.req_date }}</td>
              <td>{{ item.account_type }}</td>
              <td>
                <v-tooltip
                  location="top"
                  :text="item.user_type.join(', ') ?? undefined"
                >
                  <template v-slot:activator="{ props }">
                    <p v-bind="props" class="max-w-[200px] truncate">
                      {{ item.user_type.join(', ') }}
                    </p>
                  </template>
                </v-tooltip>
                <!-- {{ item.user_type.join(', ') }} -->
              </td>
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
                <v-tooltip location="top" :text="item.remarks ?? undefined">
                  <template v-slot:activator="{ props }">
                    <p v-bind="props" class="max-w-[200px] truncate">{{ item.remarks }}</p>
                  </template>
                </v-tooltip>
              </td>
              <td>
                {{
                  item.created_at
                    ? formatDateTime(new Date(item.created_at))
                    : ''
                }}
              </td>
              <td class="fixed-column">
                <v-menu location="left top">
                  <template v-slot:activator="{ props: menu }">
                    <v-btn icon variant="plain" v-bind="mergeProps(menu)">
                      <more-icon class="rotate-90" />
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <router-link
                        :to="{ name: 'ViewRequest', params: { id: item.id } }"
                        class="inline-flex items-center gap-x-2"
                      >
                        <document-download />
                        <span>Download(PDF)</span>
                      </router-link>
                    </v-list-item>
                    <v-list-item>
                      <div
                        @click="openModal(item.id)"
                        class="inline-flex items-center gap-x-2 cursor-pointer"
                      >
                        <document-text />
                        <span>Comment</span>
                      </div>
                    </v-list-item>
                  </v-list>
                </v-menu>
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

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-[999]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-[640px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Administrator Comment
                </DialogTitle>
                <div class="mt-2">
                  <v-text-field
                    label="Name"
                    v-model="accReq[0].full_name"
                    variant="underlined"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Email"
                    v-model="accReq[0].email"
                    variant="underlined"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Position"
                    v-model="accReq[0].position"
                    variant="underlined"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Company"
                    v-model="accReq[0].company"
                    variant="underlined"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Division"
                    v-model="accReq[0].division"
                    variant="underlined"
                    readonly
                  ></v-text-field>
                  <div class="flex flex-wrap gap-4 items-center">
                    <span>Request Type: </span>
                    <v-chip class="capitalize">{{ accReq[0].req_type }}</v-chip>
                  </div>
                  <div class="flex flex-wrap gap-4 items-center mt-1">
                    <span>Systems: </span>
                    <ul class="flex flex-wrap gap-4">
                      <li v-for="item in accReq[0]?.system" :key="item">
                        <v-chip class="capitalize">{{ item }}</v-chip>
                      </li>
                    </ul>
                  </div>
                  <div class="flex flex-wrap gap-4 items-center mt-1">
                    <span>Service type: </span>
                    <ul class="flex flex-wrap gap-4">
                      <li v-for="item in accReq[0]?.service_type" :key="item">
                        <v-chip class="capitalize">{{ item }}</v-chip>
                        <!-- <span class="inline-flex gap-2">
                          <tick-icon />
                          <p class="capitalize">{{ item }}</p>
                        </span> -->
                      </li>
                    </ul>
                  </div>
                  <div class="flex flex-wrap gap-4 items-center mt-1">
                    <span>User type: </span>
                    <ul class="flex flex-wrap gap-4">
                      <li v-for="item in accReq[0]?.user_type" :key="item">
                        <v-chip class="capitalize">{{ item }}</v-chip>
                        <!-- <span class="inline-flex gap-2">
                          <tick-icon />
                          <p class="capitalize">{{ item }}</p>
                        </span> -->
                      </li>
                    </ul>
                  </div>
                  <v-textarea
                    label="Comment"
                    variant="outlined"
                    class="mt-4"
                    v-model="accReq[0].remarks"
                    no-resize
                  ></v-textarea>
                </div>
                <div class="mt-4 flex gap-x-4">
                  <v-btn color="#facc15" class="flex-1" @click="saveData">
                    <p class="capitalize">Submit</p>
                  </v-btn>
                  <v-btn @click="closeModal" variant="text">
                    <p class="capitalize">Cancel</p>
                  </v-btn>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, mergeProps } from 'vue'
import { RouterLink } from 'vue-router'
import { useAccReqApi } from '@/composable/accReqApi'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import formatDateTime from '@/constants/dateFormat'
import nt_icon from '@/components/icon/nt_icon.vue'
import documentDownload from '@/assets/logo/icons/documents/documentDownload.vue'
import documentIcon from '@/assets/logo/icons/documents/documentIcon.vue'
import documentText from '@/assets/logo/icons/documents/documentText.vue'
// import menuIcon from '@/assets/logo/icons/menuIcon.vue'
import moreIcon from '@/assets/logo/icons/moreIcon.vue'
// import tickIcon from '@/assets/logo/icons/tickIcon.vue'

const { getAllAccReqs, allAccReqs, accReq, getAccReq, putAccReqComment } =
  useAccReqApi()

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
  { key: 'remarks', title: 'Remarks' },
  { key: 'created_at', title: 'Created' },
])

onMounted(async () => {
  await getAllAccReqs()
})

const isOpen = ref(false)
const id_select = ref<string>('')

function closeModal() {
  isOpen.value = false
}
const openModal = async (id: string) => {
  await getAccReq(id).finally(() => {
    isOpen.value = true
    id_select.value = id
  })
}

const saveData = async () => {
  const data = {
    ...accReq.value[0],
    remarks: accReq.value[0].remarks,
  }
  await putAccReqComment(id_select.value, data)
  closeModal()
}
</script>

<style scoped>
.fixed-column {
  position: sticky;
  right: 0;
  z-index: 10;
  width: 3rem;
  background-color: white;
}

td {
  @apply max-w-[200px] truncate cursor-default;
}
</style>
