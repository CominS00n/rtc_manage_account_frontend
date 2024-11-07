<template>
  <nt_card class="flex justify-center text-sm">
    <template #detail>
      <div class="max-w-[794px]">
        <div class="border border-black p-2">
          <h2 class="text-xl font-bold">RTC Account Request (RTCAR)</h2>
        </div>
        <div class="border border-t-0 border-black p-2 text-xs">
          <p>
            แบบฟอร์มขอเข้าใช้ระบบภายใต้ความดูแลของส่วนปฏิบัติการระบบ Real Time
            Charging สื่สารไร้สาย
          </p>
        </div>
        <div class="border border-t-0 border-black p-2">
          <p class="font-bold">User Information</p>
        </div>
        <div class="border border-t-0 border-black p-2">
          <div>
            <label for="full-name">Full Name:</label>
            <input type="text" id="full-name" />
          </div>
          <div>
            <label for="position">Position:</label>
            <input type="text" id="position" />
          </div>
          <div>
            <label for="company">Company:</label>
            <input type="text" id="company" />
          </div>
          <div>
            <label for="division">Division:</label>
            <input type="text" id="division" />
          </div>
          <div>
            <label for="phone">Telephone:</label>
            <input type="text" id="phone" />
          </div>
          <div>
            <label for="email">Email address:</label>
            <input type="email" id="email" />
          </div>
        </div>
        <div class="border border-t-0 border-black p-2">
          <p class="font-bold">Request Information</p>
        </div>
        <div class="border border-t-0 border-black p-2">
          <div class="inline-flex items-center">
            <p>Request Type:</p>
            <div
              class="inline-flex items-center"
              v-for="item in request_types"
              :key="item"
            >
              <label class="cursor-pointer space-x-3 inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="request_types_result"
                  :checked="request_types_result.includes(item)"
                  :value="item"
                  class="checkbox checkbox-warning"
                />
                <span class="label-text capitalize">{{ item }}</span>
              </label>
            </div>
          </div>
          <div>
            <label for="system">System:</label>
            <input type="text" id="system" />
          </div>
          <div>
            <label for="request-date">Request Date:</label>
            <input type="date" id="request-date" />
          </div>
        </div>
        <div class="border border-t-0 border-black p-2">
          <p class="font-bold">Requisition</p>
        </div>
        <div class="border border-t-0 border-black p-2">
          <div class="inline-flex items-center">
            <p>Type of Account:</p>
            <div
              class="inline-flex items-center"
              v-for="item in acc_types"
              :key="item"
            >
              <label class="cursor-pointer space-x-3 inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="acc_types_result"
                  @change="handleCheckboxChange"
                  :checked="acc_types_result.includes(item)"
                  :value="item"
                  class="checkbox checkbox-warning"
                />
                <span class="label-text capitalize">{{ item }}</span>
              </label>
            </div>
          </div>
          <div>
            <label for="expiry-date">Expiry Date:</label>
            <input type="date" id="expiry-date" />
          </div>
          <div class="inline-flex items-center">
            <p>Service Type</p>
            <div class="" v-for="item in service_types" :key="item">
              <label class="cursor-pointer space-x-3 inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="service_types_result"
                  :checked="service_types_result.includes(item)"
                  :value="item"
                  class="checkbox checkbox-warning"
                />
                <span class="label-text capitalize">{{ item }}</span>
              </label>
            </div>
          </div>
          <div class="inline-flex items-center flex-wrap overflow-hidden">
            <p>User Type</p>
            <div class="" v-for="item in user_types" :key="item">
              <label class="cursor-pointer space-x-3 inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="user_types_result"
                  :checked="user_types_result.includes(item)"
                  :value="item"
                  class="checkbox checkbox-warning"
                />
                <span class="label-text capitalize">{{ item }}</span>
              </label>
            </div>
          </div>
          <div class="text-xs">
            <p>
              *
              ข้อมูลที่อยู่บนระบบทั้งหมดเมื่อเข้ามาใช้งานแล้วกรุณาไม่เผยแผ่ต่อเพราะเป็นข้อมูลลูกค้า
            </p>
            <p>
              * การใช้งานทั้งหมดตาม User Type บน Authorization Matrix ตาม Sheet
              (Authorization Matrix)
            </p>
          </div>
        </div>
        <div class="border border-t-0 border-black p-2">
          <p class="font-bold">Approval List</p>
        </div>
        <div
          class="grid grid-cols-2 border border-t-0 border-black p-2 gap-x-5"
        >
          <div class="w-full">
            <p>Head of Requestor Approver:</p>
            <div class="flex flex-col justify-center items-center">
              <div class="h-20 max-w-56 border w-full" :class="`${!requestor_signature ? 'block' : 'hidden'}`"></div>
              <img
                :src="requestor_signature"
                class="object-contain h-20 max-w-56 border w-full"
                :class="`${requestor_signature ? 'block' : 'hidden'}`"
              />
              <p class="text-xs">( Full Name Requestor Approver )</p>
            </div>
          </div>
          <div class="w-full">
            <label for="requestor_remark">Remark</label>
            <input type="text" name="requestor_remark" id="requestor_remark" />
          </div>
          <div class="flex gap-x-3 col-span-2">
            <button
              @click="openApprovalModal"
              class="inline-flex justify-center rounded-md border border-transparent w-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Approval
            </button>
            <button
              class="min-w-24 inline-flex justify-center rounded-md border border-transparent px-2 py-1 text-sm font-medium hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
            >
              Reject
            </button>
          </div>
        </div>

        <div class="border border-t-0 border-black p-2">
          <p class="font-bold">Acknowledge</p>
        </div>
        <div
          class="grid grid-cols-2 border border-t-0 border-black p-2 gap-x-5"
        >
          <div class="w-full">
            <p>Implementor:</p>
            <div class="flex flex-col justify-center items-center">
              <div class="h-20 max-w-56 border w-full" :class="`${!implementor_signature ? 'block' : 'hidden'}`"></div>
              <img
                :src="implementor_signature"
                class="object-contain h-20 max-w-56 border w-full"
                :class="`${implementor_signature ? 'block' : 'hidden'}`"
              />
              <p class="text-xs">( Full Name Implementor )</p>
            </div>
          </div>
          <div class="w-full">
            <label for="requestor_remark">Remark</label>
            <input type="text" name="requestor_remark" id="requestor_remark" />
          </div>
          <div class="flex gap-x-3 col-span-2">
            <button
              @click="openImplementorModal"
              class="inline-flex justify-center rounded-md border border-transparent w-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Approval
            </button>
            <button
              class="min-w-24 inline-flex justify-center rounded-md border border-transparent px-2 py-1 text-sm font-medium hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </template>
  </nt_card>

  <TransitionRoot appear :show="isApproval" as="template">
    <Dialog as="div" @close="closeApprovalModal" class="relative z-10">
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
                Approval
              </DialogTitle>
              <div class="mt-2">
                <div class="relative bg-gray-100 rounded-md">
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
                  />
                </div>
              </div>

              <div class="mt-4 space-x-2 flex">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent w-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="requestorSignatureSave"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  @click="closeApprovalModal"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot appear :show="isImplementor" as="template">
    <Dialog as="div" @close="closeImplementorModal" class="relative z-10">
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
              Implementor Approval
              </DialogTitle>
              <div class="mt-2">
                <div class="relative bg-gray-100 rounded-md">
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
                  />
                </div>
              </div>

              <div class="mt-4 space-x-2 flex">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent w-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="implementorSignatureSave"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  @click="closeImplementorModal"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import nt_card from '@/components/cards/nt_card.vue'

import { VueSignaturePad } from '@selemondev/vue3-signature-pad'
import type { CanvasSignatureRef } from '@selemondev/vue3-signature-pad'

const options = ref({
  penColor: 'rgb(0,0,0)',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: 2,
  minWidth: 2,
})

const request_types = ref<string[]>(['new', 'terminate', 'reset', 'change'])
const acc_types = ref<string[]>(['permanent', 'temporary'])
const service_types = ref<string[]>([
  'operating system',
  'database',
  'report',
  'CBS',
  'CCC',
  'OCSSS',
])
const user_types = ref<string[]>([
  'maintenance',
  'admin user',
  'developer',
  'system configuration',
  'application support',
  'log & report',
  'vendor 3rd party',
  'planing',
  'marketing',
  'MVNO',
  'support',
])

const signature = ref<CanvasSignatureRef>()
const request_types_result = ref<string[]>([])
const acc_types_result = ref<string[]>([])
const service_types_result = ref<string[]>([])
const user_types_result = ref<string[]>([])
const requestor_signature = ref<string>()
const implementor_signature = ref<string>()

const isApproval = ref(false)
const isImplementor = ref(false)

function closeApprovalModal() {
  isApproval.value = false
}
function openApprovalModal() {
  isApproval.value = true
}

function closeImplementorModal() {
  isImplementor.value = false
}
function openImplementorModal() {
  isImplementor.value = true
}

const requestorSignatureSave = () => {
  requestor_signature.value =
    (signature.value?.saveSignature && signature.value.saveSignature()) || ''
  closeApprovalModal()
}
const implementorSignatureSave = () => {
  implementor_signature.value =
    (signature.value?.saveSignature && signature.value.saveSignature()) || ''
    closeImplementorModal()
}

const handleCheckboxChange = () => {
  if (acc_types_result.value.length > 1) {
    acc_types_result.value = [
      acc_types_result.value[acc_types_result.value.length - 1],
    ]
  }
}
</script>

<style scoped>
input {
  @apply border;
}

input[type='checkbox'] {
  @apply checkbox;
}
</style>
