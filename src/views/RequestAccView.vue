<template>
  <section class="flex flex-col h-full">
    <h1 class="font-bold text-2xl mb-3">RTC Request Account</h1>
    <v-form
      @submit.prevent="sendRequest"
      ref="reqAccRef"
      class="flex flex-col gap-y-4"
    >
      <v-card>
        <v-card-title class="font-weight-bold m-2">
          User Information <span class="text-red-500">*</span>
        </v-card-title>
        <v-card-text>
          <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 items-center">
            <v-text-field
              v-model="name"
              id="name"
              label="Name"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
              validate-on="submit"
            ></v-text-field>
            <v-text-field
              v-model="position"
              id="position"
              label="Position"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
              validate-on="submit"
            ></v-text-field>
            <v-text-field
              v-model="company"
              id="company"
              label="Company"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
              validate-on="submit"
            ></v-text-field>
            <v-text-field
              v-model="division"
              id="division"
              label="Division"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
              validate-on="submit"
            ></v-text-field>
            <v-text-field
              v-model="telephone"
              id="telephone"
              label="Telephone"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
              validate-on="submit"
            ></v-text-field>
            <v-text-field
              v-model="email"
              id="email"
              label="E-mail Address"
              variant="outlined"
              density="compact"
              :rules="emailRules"
              validate-on="submit"
            ></v-text-field>
          </div>
        </v-card-text>
      </v-card>

      <v-card id="request_type">
        <v-card-title class="font-weight-bold m-2">
          Request Information <span class="text-red-500">*</span>
        </v-card-title>
        <v-card-text>
          <div class="grid grid-cols-2 gap-x-6 gap-y-3">
            <div id="request_type">
              <div
                class="flex gap-2 flex-wrap content-start"
                :class="
                  error && request_type.length === 0 ? 'text-[#b00020]' : ''
                "
              >
                <p>Request Type :</p>
                <label class="flex gap-2" v-for="type in req_types" :key="type">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm border"
                    :value="type"
                    v-model="request_type"
                  />
                  <span class="capitalize">{{ type }}</span>
                </label>
              </div>
              <span
                v-if="error && request_type.length === 0"
                class="text-[#b00020] text-xs pl-4"
              >
                Please select at least one request type.
              </span>
            </div>
            <div>
              <v-date-input
                id="request_date"
                label="Request Date"
                prepend-icon=""
                variant="outlined"
                density="compact"
                placeholder="DD/MM/YYYY"
                persistent-placeholder
                :rules="dateRules"
                v-model="request_date"
                validate-on="submit"
              ></v-date-input>
            </div>
            <div>
              <v-combobox
                v-model="system"
                id="system"
                label="System"
                variant="outlined"
                density="compact"
                chips
                multiple
                :rules="comboboxRules"
                validate-on="submit"
              ></v-combobox>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="font-weight-bold m-2">
          Requisition Information
          <span class="text-red-500">*</span>
        </v-card-title>
        <v-card-text>
          <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 mb-3">
            <v-select
              v-model="selected_type"
              label="Select Type of Account"
              :items="['Permanent', 'Temporary']"
              density="compact"
              variant="outlined"
              clearable
              :rules="[v => !!v || 'You must select an account type']"
              validate-on="submit"
            ></v-select>
            <div>
              <v-date-input
                v-model="expire_date"
                id="expire_date"
                v-show="selected_type === 'Temporary'"
                label="Expire Date"
                prepend-icon=""
                variant="outlined"
                density="compact"
                placeholder="DD/MM/YYYY"
                persistent-placeholder
                :rules="dateRules"
                validate-on="submit"
              ></v-date-input>
            </div>
            <div id="service_type">
              <div
                class="flex gap-4 flex-wrap items-center content-start m-2"
                :class="
                  error && service_type.length === 0 ? 'text-[#b00020]' : ''
                "
              >
                <p class="w-full">Service Type :</p>
                <label
                  class="flex gap-2"
                  v-for="type in service_types"
                  :key="type"
                >
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm border"
                    v-model="service_type"
                    :value="type"
                  />
                  <span class="capitalize">{{ type }}</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm border"
                    v-model="otherService"
                  />
                  <span class="capitalize"> Other </span>
                  <v-combobox
                    v-model="otherServiceType"
                    id="otherService"
                    variant="underlined"
                    density="compact"
                    chips
                    multiple
                    hide-details
                    :disabled="!otherService"
                    :hidden="!otherService"
                    class="ml-3 min-w-[200px] max-w-[400px]"
                    validate-on="submit"
                  ></v-combobox>
                </label>
              </div>
              <span
                v-if="error && service_type.length === 0"
                class="text-[#b00020] text-xs pl-4"
              >
                Please select at least one request type.
              </span>
            </div>
            <div id="user_type">
              <div
                class="flex gap-4 flex-wrap content-start"
                :class="error && user_type.length === 0 ? 'text-[#b00020]' : ''"
              >
                <p class="w-full">User Type :</p>
                <label
                  class="flex items-center gap-2"
                  v-for="type in user_types"
                  :key="type"
                >
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm border"
                    v-model="user_type"
                    :value="type"
                  />
                  <span class="capitalize">{{ type }}</span>
                </label>
              </div>
              <span
                v-if="error && user_type.length === 0"
                class="text-[#b00020] text-xs pl-4"
              >
                Please select at least one request type.
              </span>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="font-weight-bold m-2">
          Approval
          <span class="text-red-500">*</span>
        </v-card-title>
        <v-card-text>
          <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6">
            <div>
              <p class="font-weight-bold mb-2">Head of Requester</p>
              <div class="space-y-1.5">
                <div
                  class="inline-flex w-full items-center"
                  v-for="(item, i) in headOfReq"
                  :key="i"
                >
                  <v-text-field
                    :id="item.name"
                    v-model="item.name"
                    label="Name"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :rules="inputDefaultRules"
                    validate-on="submit"
                  ></v-text-field>
                  <hr class="bg-gray-400 h-10 border mx-2" />
                  <v-text-field
                    :id="item.email"
                    v-model="item.email"
                    label="Email"
                    variant="outlined"
                    density="compact"
                    hide-details
                    type="email"
                    :rules="emailRules"
                    validate-on="submit"
                  ></v-text-field>
                  <v-btn
                    variant="text"
                    size="small"
                    icon
                    @click="removeHeadOfReqCount(i)"
                  >
                    <trash-icon color="red" />
                  </v-btn>
                </div>
                <div class="divider divider-neutral mt-4">
                  <v-btn size="small" icon @click="addHeadOfReq">
                    <nt_icon icon="plus" />
                  </v-btn>
                </div>
              </div>
            </div>
            <div>
              <p class="font-weight-bold mb-2">Implementor</p>
              <v-select
                id="implementor"
                v-model="implementor"
                :items="implementorItems"
                label="Select Implementor"
                density="compact"
                variant="outlined"
                clearable
                :rules="[v => !!v || 'You must select an account type']"
                validate-on="submit"
              >
              </v-select>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <div class="flex w-full gap-x-2">
        <v-btn color="#facc15" class="flex-1 text-white" type="submit"
          >Submit</v-btn
        >
        <v-btn variant="outlined">Cancel</v-btn>
      </div>
    </v-form>
    <router-view />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import { RouterView } from 'vue-router'
import { VDateInput } from 'vuetify/labs/VDateInput'
import {
  inputDefaultRules,
  emailRules,
  dateRules,
  comboboxRules,
} from '@/rules/inputRules'
import { useToast } from 'vue-toastification'

import trashIcon from '@/assets/logo/icons/trashIcon.vue'
import nt_icon from '@/components/icon/nt_icon.vue'

import { useAccReqApi } from '@/composable/accReqApi'
import { useImplementorApi } from '@/composable/implementorApi'

import type { approvedInformation, sendReq } from '@/types/sendReq'

const { postAccReq } = useAccReqApi()
const { allImplementors, getAllImplementors } = useImplementorApi()
const implementorItems = ref<string[]>([])

onMounted(async () => {
  await getAllImplementors()
  implementorItems.value = allImplementors.value.map(
    item => item.email + ' (' + item.name + ')',
  )
})

const initialCount = ref(1)
const toast = useToast()

const reqAccRef = ref()

// Data variable user information
const name = ref<string>('')
const position = ref<string>('')
const company = ref<string>('')
const division = ref<string>('')
const telephone = ref<string>('')
const email = ref<string>('')

// Data variable request information
const request_type = ref<string[]>([])
const request_date = ref<string | null>(null)
const system = ref<string[] | null>(null)

// Data variable Requisition information
const selected_type = ref<string | null>(null)
const expire_date = ref<string | null>(null)
watch(selected_type, newValue => {
  if (newValue === 'Temporary') {
    expire_date.value = null
  }
})
const service_type = ref<string[]>([])
const user_type = ref<string[]>([])
const otherService = ref<boolean>(false)
const otherServiceType = ref<string[]>([])
watch(otherServiceType, (newValue, oldValue) => {
  newValue.forEach(item => {
    if (!service_type.value.includes(item)) {
      service_type.value.push(item)
    }
  })

  oldValue.forEach(item => {
    if (!newValue.includes(item)) {
      const index = service_type.value.indexOf(item)
      if (index > -1) {
        service_type.value.splice(index, 1)
      }
    }
  })
})

// Data variable Approval
const headOfReq = ref<{ name: string; type: string; email: string }[]>([])
const implementor = ref<string | null>(null)

const error = ref(false)

// Scroll to error
const scrollToError = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    toast.error('Please fill in all required fields')
  }
}

const validateSelection = () => {
  if (request_type.value.length === 0) {
    error.value = true
    scrollToError('request_type')
    return false
  }
  if (service_type.value.length === 0) {
    error.value = true
    scrollToError('service_type')
    return false
  }
  if (user_type.value.length === 0) {
    error.value = true
    scrollToError('user_type')
    return false
  }

  error.value = false
  return true
}

const sendRequest = async () => {
  if (!validateSelection()) {
    return
  }

  const isValid = await reqAccRef.value.validate()
  if (!isValid.valid) {
    toast.error('Please fill in all required fields')
    return false
  }

  const account_request = reactive({
    full_name: name.value,
    position: position.value,
    company: company.value,
    division: division.value,
    telephone: telephone.value,
    email: email.value,
    req_type: request_type.value[0].toString(),
    system: system.value,
    req_date: request_date.value
      ? new Date(request_date.value).toISOString()
      : null,
    account_type: selected_type.value,
    expiry_date: expire_date.value
      ? new Date(expire_date.value).toISOString()
      : null,
    service_type: service_type.value,
    user_type: user_type.value,
    status: 'Pending',
    remarks: '',
  })

  const implementor_email = ref<string>(implementor.value?.split(' ')[0] || '')
  const implementor_name = ref<string>(
    implementor.value?.split('(')[1].replace(')', '') || '',
  )
  const implementor_type = ref<string>('Implementor')
  const implementor_result: approvedInformation[] = [
    {
      name: implementor_name.value,
      type: implementor_type.value,
      email: implementor_email.value,
    },
  ]

  const approved_result: approvedInformation[] = []
  headOfReq.value.forEach(item => {
    approved_result.push({
      name: item.name,
      type: item.type,
      email: item.email,
    })
  })
  approved_result.push(...implementor_result)

  const last_result: sendReq = {
    account_request,
    approved_result,
  }

  try {
    await postAccReq(last_result)
    toast.success('Request has been sent')
    // Reset all form
    await reqAccRef.value.reset()
  } catch (error) {
    console.error(error)
    toast.error('Failed to send request')
  }
}

function addHeadOfReq() {
  headOfReq.value.push({
    name: '',
    type: 'Head of Requestor Approver',
    email: '',
  })
}

function removeHeadOfReqCount(index: number) {
  headOfReq.value.splice(index, 1)
}

onMounted(() => {
  for (let i = 0; i < initialCount.value; i++) {
    addHeadOfReq()
  }
})

const req_types = ref<string[]>([
  'New Account',
  'Terminate',
  'Reset Password',
  'Change',
])
const service_types = ref<string[]>([
  'Operating System',
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
</script>
