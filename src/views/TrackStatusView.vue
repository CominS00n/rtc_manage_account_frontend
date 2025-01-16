<template>
  <section>
    <v-card>
      <v-card-title>
        <h1 class="font-bold text-xl">
          Track Status Account Request ID: {{ id }}
        </h1>
      </v-card-title>
      <v-card-text class="flex flex-col mt-4">
        <ul class="steps w-[75%] mx-auto">
          <li class="step step-warning" data-content="✓">
            <p class="inline-flex flex-col items-center">Requested</p>
          </li>
          <li class="step step-warning" data-content="✓">
            <p class="inline-flex flex-col items-center">
              Waiting for Approval
            </p>
          </li>
          <li
            :data-content="
              item.status === 'Approved'
                ? '✓'
                : item.status === 'Rejected'
                  ? '✕'
                  : index + 2
            "
            class="step"
            :class="{
              'step-warning': item.status === 'Approved',
              'step-error': item.status === 'Rejected',
            }"
            v-for="(item, index) in approved"
            :key="item.id"
          >
            <p class="inline-flex flex-col items-center">
              {{ item.name }}
              <span class="text-sm text-gray-500">{{ item.status }}</span>
            </p>
          </li>

          <li
            class="step"
            :data-content="
              status === 'Approved' ? '✓' : status === 'Rejected' ? '✕' : ''
            "
            :class="{
              'step-warning': status === 'Approved',
              'step-error': status === 'Rejected',
            }"
          >
            <p class="inline-flex flex-col items-center">
              {{ status }}
            </p>
          </li>
        </ul>

        <v-divider class="my-4" opacity="100" />
        <ExportPdfView views_only />
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAccReqApi } from '@/composable/accReqApi'
import type { ApprovedInformation } from '@/types/accReqs'

import ExportPdfView from './ExportPdfView.vue'

const route = useRoute()
const router = useRouter()
const { getAccReq, accReq } = useAccReqApi()
const approved = ref<ApprovedInformation[]>()
const status = ref<string>('')

const id = ref<string>(route.params.id.toString())

onMounted(async () => {
  await getAccReq(id.value)
  if (accReq.value.length === 0) {
    router.push({ name: 'notfound item' })
  }
  approved.value = accReq.value[0].approved
  status.value = accReq.value[0].status
})
</script>
