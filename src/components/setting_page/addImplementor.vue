<template>
  <v-card>
    <v-card-title>
      <h1 class="font-bold text-xl">Implementor</h1>
    </v-card-title>
    <v-card-text class="grid gap-4 grid-cols-2">
      <v-form
        @submit.prevent="addImplementor"
        ref="implementorRef"
        class="mt-6"
      >
        <!-- <h2 class="text-lg font-bold mb-4">Add Implementor</h2> -->
        <div class="flex gap-x-4">
          <v-text-field
            label="Name"
            v-model="name"
            variant="outlined"
            density="compact"
            validate-on="submit"
            :rules="inputDefaultRules"
          />
          <v-text-field
            label="Email"
            v-model="email"
            variant="outlined"
            density="compact"
            validate-on="submit"
            :rules="emailRules"
            type="email"
          />
        </div>

        <v-btn type="submit" color="#facc15" class="w-full">
          <p class="capitalize">save</p>
        </v-btn>
      </v-form>

      <div class="flex flex-col h-full">
        <p class="text-md font-bold">View all implementors</p>
        <div
          class="h-full max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg"
        >
          <v-list lines="one">
            <v-list-item
              v-for="implementor in allImplementors"
              :key="implementor.id"
              :title="implementor.name"
              :subtitle="implementor.email"
            >
              <template #append>
                <div class="flex gap-x-4">
                  <edit-icon
                    class="cursor-pointer"
                    @click="handleEditClick(implementor.id)"
                  />
                  <trash-icon
                    color="red"
                    class="cursor-pointer"
                    @click="handleDeleteClick(implementor.id)"
                  />
                </div>
              </template>
              <v-divider class="border-opacity-100 mt-2"></v-divider>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[999]">
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
                Update Implementor
              </DialogTitle>
              <div class="mt-6">
                <v-form
                  ref="editImplementRef"
                  @submit.prevent="
                    saveData(
                      implementor[0].id,
                      implementor[0].name,
                      implementor[0].email,
                    )
                  "
                  class="text-sm text-gray-500"
                >
                  <v-text-field
                    label="Name"
                    v-model="implementor[0].name"
                    variant="outlined"
                    density="compact"
                    validate-on="submit"
                    :rules="inputDefaultRules"
                  />
                  <v-text-field
                    label="Email"
                    v-model="implementor[0].email"
                    variant="outlined"
                    density="compact"
                    validate-on="submit"
                    :rules="emailRules"
                    type="email"
                  />
                </v-form>
              </div>

              <div class="mt-4">
                <v-btn color="#facc15">
                  <p class="capitalize">Submit</p>
                </v-btn>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useToast } from 'vue-toastification'
import { inputDefaultRules, emailRules } from '@/rules/inputRules'
import { useImplementorApi } from '@/composable/implementorApi'

import trashIcon from '@/assets/logo/icons/trashIcon.vue'
import editIcon from '@/assets/logo/icons/editIcon.vue'

const toast = useToast()
const {
  allImplementors,
  getAllImplementors,
  getImplementor,
  implementor,
  updateImplementor,
  deleteImplementor,
  postImplementor,
} = useImplementorApi()

const name = ref<string>('')
const email = ref<string>('')
const implementorRef = ref()
const editImplementRef = ref()
const isOpen = ref(false)

onMounted(async () => {
  await getAllImplementors()
})

const addImplementor = async () => {
  const isValid = await implementorRef.value.validate()
  if (!isValid.valid) {
    toast.error('Please fill in all required fields')
    return false
  }
  const result = {
    name: name.value,
    email: email.value,
  }
  postImplementor(result).finally(() => {
    getAllImplementors()
    toast.success('Implementor added successfully')
    name.value = ''
    email.value = ''
  })
}
const handleEditClick = async (id: string) => {
  await getImplementor(id).finally(() => {
    isOpen.value = true
  })
}
const handleDeleteClick = (id: string) => {
  if (confirm('Are you sure you want to delete this implementor?')) {
    deleteImplementor(id).finally(() => {
      getAllImplementors()
      toast.success('Implementor deleted successfully')
    })
  } else {
    return false
  }
}

const saveData = async (id: string, name: string, email: string) => {
  const isValid = await editImplementRef.value.validate()
  if (!isValid.valid) {
    toast.error('Please fill in all required fields')
    return false
  }
  const result = {
    id,
    name,
    email,
  }
  await updateImplementor(result).finally(() => {
    isOpen.value = false
    getAllImplementors()
    toast.success('Implementor updated successfully')
  })
}

const closeModal = () => {
  isOpen.value = false
}
</script>
