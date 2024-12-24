<template>
  <section>
    <h1 class="font-bold text-2xl py-3">Role Management</h1>
    <v-card>
      <v-card-text>
        <div>
          <v-btn @click="openModal">
            <template #prepend>
              <nt_icon icon="plus" />
            </template>
            <p class="text-sm">add user</p>
          </v-btn>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>server name</th>
              <th>server ip</th>
              <th>username</th>
              <th>user ID</th>
              <th>group</th>
              <th>admin</th>
              <th>shell script</th>
              <th>has home</th>
              <th>expire date</th>
              <th>active</th>
              <th>disable</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </v-card-text>
    </v-card>
  </section>

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
                Add user audit
              </DialogTitle>
              <div class="mt-2">
                <div class="flex space-x-3">
                  <v-text-field
                    label="Server name"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                  <v-text-field
                    label="IP server"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </div>
                <v-text-field
                  label="username"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
                <div class="flex space-x-3">
                  <v-text-field
                    label="user ID"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                  <v-text-field
                    label="group"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </div>
                <div class="flex flex-wrap gap-5">
                  <label class="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm border"
                    />
                    <span class="capitalize"> admin </span>
                  </label>
                  <label class="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm border"
                    />
                    <span class="capitalize"> shell script </span>
                  </label>
                  <label class="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm border"
                    />
                    <span class="capitalize"> has home </span>
                  </label>
                  <label class="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm border"
                    />
                    <span class="capitalize"> disable </span>
                  </label>
                </div>
                <div class="mt-4">
                  <v-date-input
                    label="Expire date"
                    prepend-icon=""
                    variant="outlined"
                    density="compact"
                    placeholder="DD/MM/YYYY"
                    persistent-placeholder
                  ></v-date-input>
                </div>
              </div>

              <div class="mt-4 flex gap-x-2">
                <v-btn @click="closeModal" class="flex-1"> Submit </v-btn>
                <v-btn variant="outlined" @click="closeModal"> close </v-btn>
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
import nt_icon from '@/components/icon/nt_icon.vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const isOpen = ref(false)
function closeModal() {
  isOpen.value = false
  toast.success('save success')
}
function openModal() {
  isOpen.value = true
}
</script>
