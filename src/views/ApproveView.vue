<template>
  <div
    v-show="information.length <= 0"
    class="flex items-center justify-center fixed h-screen w-screen top-0 left-0"
  >
    <v-card class="h-[200px] w-[400px] flex content-center">
      <v-card-text class="flex flex-col items-center justify-center">
        <img src="/info-circle.svg" class="w-12 h-12" />
        <h1 class="font-bold text-2xl">Oops!</h1>
        <p>Not Found Item</p>
      </v-card-text>
    </v-card>
  </div>
  <div class="px-4 h-screen overflow-y-auto" v-show="information.length > 0">
    <h1 class="font-bold text-2xl py-3 px-4">Approve RTC Request Account</h1>
    <div
      class="flex flex-col xl:flex-row gap-x-6 gap-y-6 overflow-y-auto"
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
              </div>
              <div class="flex gap-4 items-start">
                <div class="inline-flex items-center gap-x-4 gap-y-3 flex-wrap">
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
              class="capitalize"
            >
              <v-stepper>
                <v-stepper-header
                  @click="handleShowStep(index)"
                  class="cursor-pointer"
                >
                  <v-stepper-item
                    :value="index + 1"
                    class="capitalize cursor-pointer"
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
                            : approved.status === 'Rejected'
                              ? 'x-mark'
                              : '?'
                        "
                        :color="
                          approved.status === 'Approved'
                            ? 'green'
                            : approved.status === 'Rejected'
                              ? 'red'
                              : ''
                        "
                      />
                    </template>
                  </v-stepper-item>
                </v-stepper-header>
                <transition name="step-transition">
                  <v-stepper-window
                    direction="vertical"
                    v-show="
                      (approved.name === approval?.name &&
                        approved.email === emailToken) ||
                      isShowStep[index]
                    "
                  >
                    <v-stepper-window-item :value="index + 1">
                      <p>{{ approved.type }}</p>
                      <div class="border border-gray-300 w-fit">
                        <div
                          class="h-[150px] w-[350px]"
                          v-if="
                            approved.signature === null ||
                            approved.status === 'Rejected'
                          "
                        ></div>
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
                        readonly
                        v-if="approved.remark !== null"
                      ></v-text-field>
                      <div
                        class="flex w-full gap-2 mt-4"
                        v-show="
                          approved.signature === null &&
                          approval?.status !== 'Rejected'
                        "
                      >
                        <v-btn
                          color="#facc15"
                          class="text-white flex-1"
                          size="small"
                          @click="setIsOpen(index, approved)"
                          v-if="approved.email === emailToken"
                        >
                          Approval
                        </v-btn>
                        <v-btn
                          size="small"
                          variant="outlined"
                          @click="rejectApproved"
                          v-if="approved.email === emailToken"
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

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Signature Approval
              </DialogTitle>
              <div class="mt-2 space-y-4">
                <div class="border">
                  <VueSignaturePad
                    :ref="
                      el =>
                        (signatureRefs[approvalIndex] =
                          el as CanvasSignatureRef)
                    "
                    height="150px"
                    width="350px"
                    :max-width="options.maxWidth"
                    :min-width="options.minWidth"
                    :options="{
                      penColor: options.penColor,
                      backgroundColor: options.backgroundColor,
                    }"
                  />
                </div>
                <v-text-field
                  label="Remark"
                  prepend-icon=""
                  variant="outlined"
                  density="compact"
                  v-model="computedRemark"
                  hide-details
                ></v-text-field>
              </div>

              <div class="mt-4">
                <v-btn @click="approvalSubmit" class="w-full">
                  <span class="capitalize">Approval</span>
                </v-btn>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAccReqApi } from '@/composable/accReqApi'
import { jwtDecode } from 'jwt-decode'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useToast } from 'vue-toastification'

import nt_icon from '@/components/icon/nt_icon.vue'

import type { ApprovedInformation, AccReq } from '@/types/accReqs'
import type { approved } from '@/types/sendReq'
import { status_type } from '@/types/sendReq'

import { VueSignaturePad } from '@selemondev/vue3-signature-pad'
import type { CanvasSignatureRef } from '@selemondev/vue3-signature-pad'

const toast = useToast()
const route = useRoute()

const isOpen = ref<boolean>(false)
const approvalIndex = ref<number>(0)
const approvalValue = ref<approval_type | null>(null)
const setIsOpen = (index: number, approved: approval_type) => {
  approvalIndex.value = index
  approvalValue.value = approved
  isOpen.value = !isOpen.value
}
const closeModal = () => {
  isOpen.value = false
}
const computedRemark = computed({
  get() {
    return approvalValue.value?.remark || ''
  },
  set(value) {
    if (approvalValue.value) {
      approvalValue.value.remark = value
    }
  },
})

const approvalSubmit = () => {
  try {
    if (!approvalValue.value) {
      toast.error('Approval value is not set')
    } else {
      signature_approvedSave(approvalIndex.value, approvalValue.value)
    }
  } catch (error) {
    console.error(error)
    toast.error('Failed to approve request')
  } finally {
    closeModal()
  }
}

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

const token = ref(route.params.token as string)
let decodedToken: { id: string; email: string } | null = null

try {
  decodedToken = jwtDecode<{ id: string; email: string }>(token.value)
} catch (error) {
  console.error('Invalid token:', error)
}

const id = ref<string>(decodedToken ? decodedToken.id : '')
const emailToken = ref<string>(decodedToken ? decodedToken.email : '')

const { getAccReq, accReq, approveAccReq, resMessage } = useAccReqApi()
const information = ref<AccReq[]>([])
const approvedInformation = ref<ApprovedInformation[]>([])
const selectedServiceTypes = ref<string[]>([])
const selectedUserTypes = ref<string[]>([])
const approval = ref<ApprovedInformation | null>(null)

onMounted(async () => {
  await getAccReq(id.value)
  approvedInformation.value = accReq.value[0]?.approved || []
  information.value = accReq.value.map(accReq => {
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
  approvedInformation.value.sort((a, b) =>
    a.created_at.localeCompare(b.created_at),
  )
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
  } catch (error) {
    console.error(error)
  }
}

const rejectApproved = async () => {
  try {
    const data: approved = {
      acc_req_id: approvedInformation.value[approvalIndex.value].acc_req_id,
      name: approvedInformation.value[approvalIndex.value].name,
      email: approvedInformation.value[approvalIndex.value].email,
      status: status_type.rejected,
      signature: '',
      remark: '',
      date: new Date().toISOString(),
    }

    await approveAccReq(data).then(() => {
      toast.success(resMessage)
    })
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
