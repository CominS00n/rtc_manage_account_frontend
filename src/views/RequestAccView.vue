<template>
  <div class="container mx-auto flex flex-col gap-y-4">
    <h1 class="font-bold text-2xl py-3">RTC Request Account</h1>
    <v-form @submit.prevent v-model="valid" class="flex flex-col gap-y-4">
      <v-card>
        <v-card-title class="font-weight-bold m-2"
          >User Information</v-card-title
        >
        <v-card-text>
          <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 items-center">
            <v-text-field
              v-model="name"
              id="name"
              label="Name"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
            ></v-text-field>
            <v-text-field
              v-model="position"
              id="position"
              label="Position"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
            ></v-text-field>
            <v-text-field
              v-model="company"
              id="company"
              label="Company"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
            ></v-text-field>
            <v-text-field
              v-model="division"
              id="division"
              label="Division"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
            ></v-text-field>
            <v-text-field
              v-model="telephone"
              id="telephone"
              label="Telephone"
              variant="outlined"
              density="compact"
              :rules="inputDefaultRules"
            ></v-text-field>
            <v-text-field
              v-model="email"
              id="email"
              label="E-mail Address"
              variant="outlined"
              density="compact"
              :rules="emailRules"
            ></v-text-field>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="font-weight-bold m-2"
          >Request Information</v-card-title
        >
        <v-card-text>
          <div class="grid grid-cols-2 gap-x-6 gap-y-3">
            <div class="flex gap-2 flex-wrap">
              Request Type :
              <label class="flex gap-2" v-for="type in req_types" :key="type">
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm border"
                  :value="type"
                  v-model="request_type"
                />
                <span class="capitalize">
                  {{ type }}
                </span>
              </label>
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
              ></v-combobox>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="font-weight-bold m-2"
          >Requisition Information</v-card-title
        >
        <v-card-text>
          <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 mb-3">
            <v-select
              v-model="selected_type"
              label="Select Type of Account"
              :items="['Permanent', 'Temporary']"
              density="compact"
              variant="outlined"
              clearable
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
              ></v-date-input>
            </div>
            <div class="flex gap-4 flex-wrap items-center">
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
                <span class="capitalize">
                  {{ type }}
                </span>
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
                ></v-combobox>
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
                  v-model="user_type"
                  :value="type"
                />
                <span class="capitalize">
                  {{ type }}
                </span>
              </label>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="font-weight-bold m-2">Approval</v-card-title>
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
                  ></v-text-field>
                  <hr class="bg-gray-400 h-10 border mx-2" />
                  <v-text-field
                    :id="item.email"
                    v-model="item.email"
                    label="Email"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :rules="emailRules"
                  ></v-text-field>
                  <v-btn
                    size="x-small"
                    icon=""
                    @click="removeHeadOfReqCount(i)"
                    class="ml-2"
                    color="#f87171"
                  >
                    <nt_icon icon="minus" />
                  </v-btn>
                </div>
                <div class="divider divider-neutral mt-4">
                  <v-btn size="x-small" icon="" @click="addHeadOfReq">
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
                label="Select Implementor"
                :items="implementorItems"
                density="compact"
                variant="outlined"
                clearable
              >
              </v-select>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-form>

    <div class="flex w-full gap-x-2">
      <v-btn color="#facc15" class="flex-1 text-white" @click="sendRequest">
        Submit
      </v-btn>
      <v-btn variant="outlined">Cancel</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import {
  inputDefaultRules,
  emailRules,
  dateRules,
  comboboxRules,
} from '@/rules/inputRules'
import nt_icon from '@/components/icon/nt_icon.vue'

import { useAccReqApi } from '@/composable/accReqApi'

import type { approvedInformation, sendReq } from '@/types/sendReq'

const { postAccReq } = useAccReqApi()
const initialCount = ref(1)

const valid = ref<boolean>(false)

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

const sendRequest = async () => {
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
  })

  const implementor_email = ref<string>(implementor.value?.split(' ')[0] || '')
  const implementor_name = ref<string>(
    implementor.value?.split('(')[1].replace(')', '') || '',
  )
  console.log(implementor_name.value)
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

  await postAccReq(last_result)
  location.reload()
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

const implementorItems = ref<string[]>(['spuckpooforwork@gmail.com (CominS00n)'])

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
