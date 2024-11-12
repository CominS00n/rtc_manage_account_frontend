<template>
  <div class="container mx-auto overflow flex flex-col gap-y-4">
    <h1 class="font-bold text-2xl py-3">RTC Request Account</h1>
    <nt_card class="">
      <template #detail>
        <h4 class="font-bold text-lg pb-6">User Information</h4>
        <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 items-center">
          <label class="input input-bordered flex items-center gap-2">
            Name :
            <input type="text" class="grow" placeholder="Full Name" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            Position :
            <input type="text" class="grow" placeholder="Position" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            Company :
            <input type="text" class="grow" placeholder="Company" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            Division :
            <input type="text" class="grow" placeholder="Division" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            Telephone :
            <input type="text" class="grow" placeholder="09xxxxxxxx" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            E-mail Address :
            <input type="text" class="grow" placeholder="mail@mail.com" />
          </label>
        </div>
      </template>
    </nt_card>

    <nt_card>
      <template #detail>
        <h4 class="font-bold text-lg pb-6">Request Information</h4>
        <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 items-center">
          <div class="flex items-center gap-2 p-4">
            Request Type :
            <label
              class="flex items-center gap-2"
              v-for="type in req_types"
              :key="type"
            >
              <input type="checkbox" class="checkbox checkbox-sm" />
              <span class="capitalize">
                {{ type }}
              </span>
            </label>
          </div>
          <div>
            <label class="input input-bordered flex items-center gap-2">
              System :
              <input
                type="text"
                class="grow"
                placeholder="server: 10.100.xxx.xx"
              />
            </label>
          </div>
          <div>
            <label class="input input-bordered flex items-center gap-2">
              Request Date :
              <input type="date" class="grow" />
            </label>
          </div>
        </div>
      </template>
    </nt_card>

    <nt_card>
      <template #detail>
        <h4 class="font-bold text-lg pb-6">Request Information</h4>
        <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 items-center">
          <label class="flex items-center gap-2 p-4">
            Type of Account :
            <select class="select select-bordered select-sm w-full max-w-xs">
              <option disabled selected>Select account type</option>
              <option>Permanent</option>
              <option>Temporary</option>
            </select>
          </label>
          <label class="input input-bordered flex items-center gap-2">
            Request Date :
            <input type="date" class="grow" />
          </label>
          <div class="flex gap-4 p-4 flex-wrap">
            <p class="w-full">Service Type :</p>
            <label
              class="flex items-center gap-2"
              v-for="type in service_types"
              :key="type"
            >
              <input type="checkbox" class="checkbox checkbox-sm" />
              <span class="capitalize">
                {{ type }}
              </span>
            </label>
          </div>
          <div class="flex gap-4 p-4 flex-wrap">
            <p class="w-full">User Type :</p>
            <label
              class="flex items-center gap-2"
              v-for="type in user_types"
              :key="type"
            >
              <input type="checkbox" class="checkbox checkbox-sm" />
              <span class="capitalize">
                {{ type }}
              </span>
            </label>
          </div>
        </div>
      </template>
    </nt_card>

    <nt_card>
      <template #detail>
        <h4 class="font-bold text-lg pb-6">Approval</h4>
        <div class="grid lg:grid-cols-2 gap-y-3 lg:gap-x-6 items-center">
          <label class="flex items-center gap-2 p-4">
            Head of Requestor Approver :
            <select class="select select-bordered select-sm w-full max-w-xs">
              <option disabled selected>Select requestor approver</option>
              <option>example@mail.com (Full Name)</option>
              <option>example@mail.com (Full Name)</option>
            </select>
          </label>
          <label class="flex items-center gap-2 p-4">
            Implementor :
            <select class="select select-bordered select-sm w-full max-w-xs">
              <option disabled selected>Select implementor</option>
              <option>example@mail.com (Full Name)</option>
              <option>example@mail.com (Full Name)</option>
            </select>
          </label>
        </div>
      </template>
    </nt_card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import nt_card from '@/components/cards/nt_card.vue'

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

<style scoped>
/* input[type='text'] {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
} */
</style>
