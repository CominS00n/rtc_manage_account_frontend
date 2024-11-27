<template>
  <div class="container mx-auto flex flex-col gap-y-4">
    <h1 class="font-bold text-2xl py-3">RTC Request Account</h1>
    <v-card>
      <v-card-title class="font-weight-bold m-2">User Information</v-card-title>
      <v-card-text>
        <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 items-center">
          <v-text-field
            label="Name"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="Position"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="Company"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="Division"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="Telephone"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="E-mail Address"
            variant="outlined"
            density="compact"
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
          <div class="flex gap-2">
            Request Type :
            <label class="flex gap-2" v-for="type in req_types" :key="type">
              <input type="checkbox" class="checkbox checkbox-sm border" />
              <span class="capitalize">
                {{ type }}
              </span>
            </label>
          </div>
          <div>
            <v-text-field
              label="System"
              variant="outlined"
              density="compact"
              hide-details
            ></v-text-field>
          </div>
          <div>
            <v-date-input
              label="Request Date"
              prepend-icon=""
              variant="outlined"
              density="compact"
              persistent-placeholder
            ></v-date-input>
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
          <v-select
            v-model="selected_type"
            label="Select Type of Account"
            :items="['Permanent', 'Temporary']"
            density="compact"
            variant="outlined"
            hide-details
            clearable
          ></v-select>
          <div>
            <v-date-input
              v-show="selected_type === 'Temporary'"
              label="Expire Date"
              prepend-icon=""
              variant="outlined"
              density="compact"
              persistent-placeholder
              hide-details
            ></v-date-input>
          </div>
          <div class="flex gap-4 flex-wrap">
            <p class="w-full">Service Type :</p>
            <label class="flex gap-2" v-for="type in service_types" :key="type">
              <input type="checkbox" class="checkbox checkbox-sm border" />
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
              <input type="checkbox" class="checkbox checkbox-sm border" />
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
                  v-model="item.name"
                  label="Name"
                  variant="outlined"
                  density="compact"
                  hide-details
                ></v-text-field>
                <hr class="bg-gray-400 h-10 border mx-2" />
                <v-text-field
                  v-model="item.email"
                  label="Email"
                  variant="outlined"
                  density="compact"
                  hide-details
                ></v-text-field>
                <v-btn
                  size="x-small"
                  icon=""
                  @click="removeHeadOfReqCount(i)"
                  class="ml-2"
                  color="#f87171"
                  ><nt_icon icon="trash"
                /></v-btn>
              </div>
              <div class="divider divider-neutral mt-4">
                <v-btn size="x-small" icon="" @click="addHeadOfReq"
                  ><nt_icon icon="plus"
                /></v-btn>
              </div>
            </div>
          </div>
          <div>
            <p class="font-weight-bold mb-2">Implementor</p>
            <v-select
              label="Select Implementor"
              :items="[
                'example1@mail.com (Full Name)',
                'example2@mail.com (Full Name)',
              ]"
              density="compact"
              variant="outlined"
              clearable
            ></v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <div class="flex w-full gap-x-2">
      <v-btn color="#facc15" class="flex-1 text-white">Submit</v-btn>
      <v-btn variant="outlined">Cancel</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import nt_icon from '@/components/icon/nt_icon.vue'

const selected_type = ref<string | null>(null)
const initialCount = ref(1)
const headOfReq = ref<{ name: string; email: string }[]>([])

function addHeadOfReq() {
  headOfReq.value.push({ name: '', email: '' })
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
  'new',
  'terminate',
  'reset password',
  'change',
])
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
</script>
