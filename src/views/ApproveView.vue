<template>
  <div class="container mx-auto px-4 h-screen overflow-y-auto relative">
    <h1 class="font-bold text-2xl py-3 px-4">Approve RTC Request Account</h1>
    <div
      class="flex gap-x-6 overflow-y-auto"
      v-for="item in information"
      :key="item.id"
    >
      <div class="flex flex-col gap-y-4">
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
                hide-details
                v-model="item.full_name"
                readonly
              ></v-text-field>
              <v-text-field
                label="Position"
                variant="underlined"
                density="compact"
                hide-details
                v-model="item.position"
                readonly
              ></v-text-field>
              <v-text-field
                label="Company"
                variant="underlined"
                density="compact"
                hide-details
                v-model="item.company"
                readonly
              ></v-text-field>
              <v-text-field
                label="Division"
                variant="underlined"
                density="compact"
                hide-details
                v-model="item.division"
                readonly
              ></v-text-field>
              <v-text-field
                label="Telephone"
                variant="underlined"
                density="compact"
                hide-details
                v-model="item.telephone"
                readonly
              ></v-text-field>
              <v-text-field
                label="E-mail Address"
                variant="underlined"
                density="compact"
                hide-details
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
              <div class="flex gap-2 flex-wrap">
                <p>Request Type :</p>
                <label class="flex gap-2" v-for="type in req_types" :key="type">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm border"
                    :checked="type === item.req_type"
                    disabled
                  />
                  <span class="capitalize">
                    {{ type }}
                  </span>
                </label>
              </div>
              <div>
                <v-text-field
                  label="System"
                  variant="underlined"
                  density="compact"
                  hide-details
                  v-model="item.system"
                  readonly
                ></v-text-field>
              </div>
              <div>
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
              <div class="flex gap-x-4 flex-wrap">
                <p class="w-full">Service Type :</p>
                <label
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
                </label>
              </div>
              <div class="flex gap-4 flex-wrap">
                <p class="w-full">User Type :</p>
                <label
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
                </label>
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
              v-for="(approved, i) in approvedInformation"
              :key="approved.id"
              class="capitalize border"
            >
              <v-stepper>
                <v-stepper-header
                  @click="handleShowStep(approved.status)"
                  class="relative"
                >
                  <div class="absolute right-6">
                    <nt_icon icon="chevron-down" />
                  </div>
                  <v-stepper-item
                    :value="i + 1"
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
                      <p @click="handleShowStep(approved.status)">
                        {{ approved.name }}
                        <span class="text-xs text-gray-400">{{
                          approved.type
                        }}</span>
                        <br />
                      </p>
                      <p class="text-xs text-left">
                        <v-chip size="x-small" >{{ approved.status }}</v-chip>
                      </p>
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
                    v-show="approved.name === approval?.name || isShowStep"
                  >
                    <v-stepper-window-item :value="i + 1">
                      <p>{{ approved.type }}</p>
                      <!-- transition from w-0 to w-fit -->

                      <div class="border border-gray-300 w-fit">
                        <VueSignaturePad
                          ref="signature"
                          height="150px"
                          width="350px"
                          :max-width="options.maxWidth"
                          :min-width="options.minWidth"
                          :options="{
                            penColor: options.penColor,
                            backgroundColor: options.backgroundColor,
                          }"
                          :disabled="approved.name !== approval?.name"
                        />
                      </div>
                      <p class="text-center my-2">( {{ approved.name }} )</p>
                      <v-text-field
                        label="Remark"
                        prepend-icon=""
                        variant="outlined"
                        density="compact"
                        hide-details
                        :disabled="approved.name !== approval?.name"
                      ></v-text-field>
                      <div
                        class="flex w-full gap-2 mt-4"
                        v-show="approved.signature === null"
                      >
                        <v-btn
                          color="#facc15"
                          class="text-white flex-1"
                          size="small"
                          @click="signature_approvedSave"
                          :disabled="approved.name !== approval?.name"
                        >
                          Approval
                        </v-btn>
                        <v-btn
                          size="small"
                          variant="outlined"
                          @click="signature_approvedSave"
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
// import { useAccReqApi } from '@/composable/accReqApi'
import { VueSignaturePad } from '@selemondev/vue3-signature-pad'
import nt_icon from '@/components/icon/nt_icon.vue'
// import { VStepperVertical } from 'vuetify/labs/VStepperVertical'

import type { ApprovedInformation, AccReq } from '@/types/accReqs'
import type { CanvasSignatureRef } from '@selemondev/vue3-signature-pad'
const route = useRoute()
const id = ref(Number(route.params.id))

// const { getAccReqs, accReqs } = useAccReqApi()
const information = ref<AccReq[]>([])
const approvedInformation = ref<ApprovedInformation[]>([])
const selectedServiceTypes = ref<string[]>([])
const selectedUserTypes = ref<string[]>([])
const approval = ref<ApprovedInformation | null>(null)

import data from '@/mockdata/req.json'
const accReqs = ref<AccReq[]>([])

onMounted(async () => {
  // await getAccReqs(id.value)
  accReqs.value = data.data.filter(accReq => accReq.id === id.value)
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
  selectedServiceTypes.value = information.value[0]?.service_type || []
  selectedUserTypes.value = information.value[0]?.user_type || []
  approvedInformation.value.sort((a, b) => a.id - b.id)
  approval.value =
    approvedInformation.value.find(approved => approved.status === 'Pending') ||
    null
})

const req_types = ref<string[]>([
  'New',
  'Terminate',
  'Reset password',
  'Change',
])
const service_types = ref<string[]>([
  'Operating system',
  'Database',
  'Report',
  'CBS',
  'CCC',
  'OCSSS',
])
const user_types = ref<string[]>([
  'Maintenance',
  'Admin User',
  'Developer',
  'System Configuration',
  'Application Support',
  'Log & Report',
  'Vendor 3rd Party',
  'Planing',
  'Marketing',
  'MVNO',
  'Support',
])

const options = ref({
  penColor: 'rgb(0,0,0)',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: 2,
  minWidth: 2,
})
const signature = ref<CanvasSignatureRef>()
const signature_approved = ref<string>()

const signature_approvedSave = () => {
  signature_approved.value =
    (signature.value?.saveSignature && signature.value.saveSignature()) || ''
}

const isShowStep = ref<boolean>(false)
const handleShowStep = (status: string) => {
  if (status === 'Approved' || status === 'Reject') {
    isShowStep.value = !isShowStep.value
  }
  return isShowStep.value
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
