<template>
  <div class="container mx-auto px-4 h-screen overflow-y-auto">
    <h1 class="font-bold text-2xl py-3 px-4">Approve RTC Request Account</h1>
    <div
      class="flex gap-x-6 overflow-y-auto"
      v-for="item in information"
      :key="item.id"
    >
      <div class="flex flex-col gap-y-4 flex-1">
        <v-card>
          <v-card-title class="font-weight-bold m-2"
            >User Information</v-card-title
          >
          <v-card-text>
            <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 items-center">
              <v-text-field
                label="Name"
                variant="underlined"
                density="compact"
                v-model="item.full_name"
                readonly
              ></v-text-field>
              <v-text-field
                label="Position"
                variant="underlined"
                density="compact"
                v-model="item.position"
                readonly
              ></v-text-field>
              <v-text-field
                label="Company"
                variant="underlined"
                density="compact"
                v-model="item.company"
                readonly
              ></v-text-field>
              <v-text-field
                label="Division"
                variant="underlined"
                density="compact"
                v-model="item.division"
                readonly
              ></v-text-field>
              <v-text-field
                label="Telephone"
                variant="underlined"
                density="compact"
                v-model="item.telephone"
                readonly
              ></v-text-field>
              <v-text-field
                label="E-mail Address"
                variant="underlined"
                density="compact"
                v-model="item.email"
                readonly
              ></v-text-field>
            </div>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title class="font-weight-bold m-2"
            >Request Information</v-card-title
          >
          <v-card-text>
            <div class="grid grid-cols-2 gap-x-6 gap-y-6">
              <div class="flex items-center gap-x-4">
                <p>Request Type :</p>
                <v-chip class="capitalize" color="primary" text-color="white">
                  {{ item.req_type }}
                </v-chip>
                <!-- <label class="flex gap-2" v-for="type in req_types" :key="type">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm border"
                    :checked="type === item.req_type"
                    disabled
                  />
                  <span class="capitalize">
                    {{ type }}
                  </span>
                </label> -->
              </div>
              <div>
                <div class="inline-flex items-center gap-x-4 flex-wrap">
                  <p>System :</p>
                  <v-chip
                    class="capitalize"
                    color="primary"
                    text-color="white"
                    v-for="system in item.system"
                    :key="system"
                  >
                    {{ system }}
                  </v-chip>
                </div>
                <!-- <v-text-field
                  label="System"
                  variant="underlined"
                  density="compact"
                  hide-details
                  v-model="item.system"
                  readonly
                ></v-text-field> -->
              </div>

              <v-text-field
                label="Request Date"
                prepend-icon=""
                variant="underlined"
                density="compact"
                persistent-placeholder
                hide-details
                v-model="item.req_date"
                readonly
              ></v-text-field>
            </div>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title class="font-weight-bold m-2"
            >Request Information</v-card-title
          >
          <v-card-text>
            <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 mb-3">
              <v-text-field
                v-model="item.account_type"
                label="Type of Account"
                :items="['Permanent', 'Temporary']"
                density="compact"
                variant="underlined"
                hide-details
                readonly
                clearable
              ></v-text-field>
              <div>
                <v-text-field
                  v-show="item.account_type === 'Temporary'"
                  label="Expire Date"
                  prepend-icon=""
                  variant="underlined"
                  density="compact"
                  persistent-placeholder
                  hide-details
                  v-model="item.expiry_date"
                  readonly
                ></v-text-field>
              </div>
              <div class="flex items-start">
                <div class="inline-flex items-center gap-x-4 flex-wrap">
                  <p>Service Type :</p>
                  <v-chip
                    class="capitalize"
                    v-for="type in selectedServiceTypes"
                    :key="type"
                    color="primary"
                    text-color="white"
                  >
                    {{ type }}
                  </v-chip>
                </div>
                <!-- <label
                  class="flex gap-2"
                  v-for="type in service_types"
                  :key="type"
                >
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm border"
                    :value="type"
                    v-model="selectedServiceTypes"
                    disabled
                  />
                  <span class="capitalize">
                    {{ type }}
                  </span>
                </label> -->
              </div>
              <div class="flex gap-4 items-start">
                <div class="inline-flex items-center gap-x-4 flex-wrap">
                  <p>User Type :</p>
                  <v-chip
                    class="capitalize"
                    v-for="type in selectedUserTypes"
                    :key="type"
                    color="primary"
                    text-color="white"
                  >
                    {{ type }}
                  </v-chip>
                </div>
                <!-- <label
                  class="flex items-center gap-2"
                  v-for="type in user_types"
                  :key="type"
                >
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm border"
                    v-model="selectedUserTypes"
                    :value="type"
                    disabled
                  />
                  <span class="capitalize">
                    {{ type }}
                  </span>
                </label> -->
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <div>
        <v-card>
          <v-card-title class="font-weight-bold m-2">Approval</v-card-title>
          <v-card-text>
            <div
              v-for="(approved, index) in approvedInformation"
              :key="approved.id"
              class="capitalize border"
            >
              <v-stepper>
                <v-stepper-header
                  @click="handleShowStep(index)"
                  class="relative"
                >
                  <div class="absolute right-6">
                    <nt_icon icon="chevron-down" />
                  </div>
                  <v-stepper-item
                    :value="index + 1"
                    class="capitalize"
                    :color="
                      approved.status === 'Approved'
                        ? 'green'
                        : approved.status === 'Reject'
                          ? 'red'
                          : ''
                    "
                  >
                    <template #title>
                      <div @click="handleShowStep(index)">
                        <p>
                          {{ approved.name }}
                          <span class="text-xs text-gray-400">{{
                            approved.type
                          }}</span>
                          <br />
                        </p>
                        <p class="text-xs text-left">
                          <v-chip size="x-small">{{ approved.status }}</v-chip>
                        </p>
                      </div>
                    </template>
                    <template #icon>
                      <nt_icon
                        :icon="
                          approved.status === 'Approved'
                            ? 'check'
                            : approved.status === 'Reject'
                              ? 'x-mark'
                              : '?'
                        "
                        :color="approved.status === 'Approved' ? 'green' : ''"
                      />
                    </template>
                  </v-stepper-item>
                </v-stepper-header>
                <transition name="step-transition">
                  <v-stepper-window
                    direction="vertical"
                    v-show="
                      approved.name === approval?.name || isShowStep[index]
                    "
                  >
                    <v-stepper-window-item :value="index + 1">
                      <p>{{ approved.type }}</p>
                      <div class="border border-gray-300 w-fit">
                        <VueSignaturePad
                          :ref="
                            el =>
                              (signatureRefs[index] = el as CanvasSignatureRef)
                          "
                          height="150px"
                          width="350px"
                          :max-width="options.maxWidth"
                          :min-width="options.minWidth"
                          :options="{
                            penColor: options.penColor,
                            backgroundColor: options.backgroundColor,
                          }"
                          :disabled="approved.name !== approval?.name"
                          v-if="approved.signature === null"
                        />
                        <img
                          :src="approved.signature"
                          alt="signature"
                          height="150px"
                          width="350px"
                          v-else
                        />
                      </div>
                      <p class="text-center my-2">( {{ approved.name }} )</p>
                      <v-text-field
                        label="Remark"
                        prepend-icon=""
                        variant="outlined"
                        density="compact"
                        v-model="approved.remark"
                        hide-details
                        :readonly="approved.signature !== null"
                      ></v-text-field>
                      <div
                        class="flex w-full gap-2 mt-4"
                        v-show="approved.signature === null"
                      >
                        <v-btn
                          color="#facc15"
                          class="text-white flex-1"
                          size="small"
                          @click="signature_approvedSave(index, approved)"
                        >
                          Approval
                        </v-btn>
                        <v-btn
                          size="small"
                          variant="outlined"
                          :disabled="approved.name !== approval?.name"
                        >
                          Reject
                        </v-btn>
                      </div>
                    </v-stepper-window-item>
                  </v-stepper-window>
                </transition>
              </v-stepper>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAccReqApi } from '@/composable/accReqApi'
import nt_icon from '@/components/icon/nt_icon.vue'
import { jwtDecode } from 'jwt-decode'

import type { ApprovedInformation, AccReq } from '@/types/accReqs'
import type { approved } from '@/types/sendReq'
import { status_type } from '@/types/sendReq'

import { VueSignaturePad } from '@selemondev/vue3-signature-pad'
import type { CanvasSignatureRef } from '@selemondev/vue3-signature-pad'

interface approval_type {
  id?: number
  acc_req_id: number
  type?: string
  name: string
  email: string
  signature: string | null
  remark: string | null
  status: string
  date: string | null
  created_at?: string
  updated_at?: string
}

const route = useRoute()

const token = ref(route.params.token as string)
let decodedToken: { id: number } | null = null

try {
  decodedToken = jwtDecode<{ id: number }>(token.value)
} catch (error) {
  console.error('Invalid token:', error)
}

const id = ref(decodedToken ? decodedToken.id : 0)

const { getAccReqs, accReqs, approveAccReq } = useAccReqApi()
const information = ref<AccReq[]>([])
const approvedInformation = ref<ApprovedInformation[]>([])
const selectedServiceTypes = ref<string[]>([])
const selectedUserTypes = ref<string[]>([])
const approval = ref<ApprovedInformation | null>(null)

onMounted(async () => {
  await getAccReqs(id.value)
  approvedInformation.value = accReqs.value[0]?.approved || []
  information.value = accReqs.value.map(accReq => {
    return {
      id: accReq.id,
      full_name: accReq.full_name,
      position: accReq.position,
      company: accReq.company,
      division: accReq.division,
      telephone: accReq.telephone,
      email: accReq.email,
      req_type: accReq.req_type,
      system: accReq.system,
      req_date: accReq.req_date,
      account_type: accReq.account_type,
      expiry_date: accReq.expiry_date,
      service_type: accReq.service_type,
      user_type: accReq.user_type,
      status: accReq.status,
    }
  })
  console.log(approvedInformation.value)
  selectedServiceTypes.value = information.value[0]?.service_type || []
  selectedUserTypes.value = information.value[0]?.user_type || []
  approvedInformation.value.sort((a, b) => a.created_at.localeCompare(b.created_at))
  approval.value =
    approvedInformation.value.find(approved => approved.status === 'Pending') ||
    null
  isShowStep.value = new Array(approvedInformation.value.length).fill(false)
})

const options = ref({
  penColor: 'rgb(0,0,0)',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: 2,
  minWidth: 2,
})
const signature_approved = ref<string>('')
const signatureRefs = ref<(CanvasSignatureRef | null)[]>([])

const signature_approvedSave = async (
  index: number,
  approved: approval_type,
) => {
  const signature = signatureRefs.value[index]
  if (signature) {
    signature_approved.value =
      (signature.saveSignature && signature.saveSignature()) || ''
  }

  try {
    // const result = signature_approved.value.split(',')[1]
    const data: approved = {
      acc_req_id: approved.acc_req_id,
      name: approved.name,
      email: approved.email,
      status: status_type.approved,
      signature: signature_approved.value,
      remark: approved.remark,
      date: new Date().toISOString(),
    }

    await approveAccReq(data)
    location.reload()
  } catch (error) {
    console.error(error)
  }
}

const isShowStep = ref<boolean[]>([])
const handleShowStep = (index: number) => {
  isShowStep.value[index] = !isShowStep.value[index]
}
</script>

<style scoped>
.step-transition-enter-active,
.step-transition-leave-active {
  transition: all 0.5s ease;
}
.step-transition-enter-from,
.step-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.step-transition-enter-to,
.step-transition-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
