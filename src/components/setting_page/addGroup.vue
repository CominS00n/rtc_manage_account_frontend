<template>
  <v-card>
    <v-card-title>
      <h1 class="font-bold text-xl">Group</h1>
    </v-card-title>
    <v-card-text class="grid gap-4 lg:grid-cols-2">
      <v-form
        @submit.prevent="submit_createGroup"
        v-model="valid"
        ref="groupRef"
        class="mt-6 space-y-2"
      >
        <v-text-field
          v-model="groupName"
          label="Group name"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :rules="inputDefaultRules"
        />
        <v-textarea
          v-model="groupDescription"
          label="Description"
          variant="outlined"
          density="compact"
          validate-on="submit"
          no-resize
          :rules="inputDefaultRules"
        ></v-textarea>

        <v-btn type="submit" color="#facc15" class="w-full mt-4">
          <p class="capitalize">Create</p>
        </v-btn>
      </v-form>
      <div class="flex flex-col h-full">
        <p class="text-md font-bold">View all groups</p>
        <div
          class="h-full max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg"
        >
          <v-list lines="one">
            <v-list-item
              v-for="group in groups"
              :key="group.id"
              :title="group.name"
              :subtitle="group.description"
            >
              <template #append>
                <div class="flex gap-x-4">
                  <edit-icon
                    class="cursor-pointer"
                    @click="handleEditGroup(group.id)"
                  />
                  <trash-icon
                    color="red"
                    class="cursor-pointer"
                    @click="handleDeleteGroup(group.id)"
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
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Update Implementor
              </DialogTitle>
              <v-form
                class="mt-6"
                @submit.prevent="editSubmit"
                v-model="valid"
                ref="roleRef"
              >
                <v-text-field
                  v-model="groupNameEdit"
                  label="Group name"
                  variant="outlined"
                  density="compact"
                  validate-on="submit"
                  :rules="inputDefaultRules"
                />
                <v-textarea
                  v-model="groupDescriptionEdit"
                  label="Description"
                  variant="outlined"
                  density="compact"
                  validate-on="submit"
                  no-resize
                  :rules="inputDefaultRules"
                ></v-textarea>
                <div class="mt-4 flex gap-4">
                  <v-btn color="#facc15" class="flex-1" type="submit">
                    <p class="capitalize">Submit</p>
                  </v-btn>
                  <v-btn variant="outlined" @click="closeModal">
                    <p class="capitalize">Cancel</p>
                  </v-btn>
                </div>
              </v-form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { inputDefaultRules } from '@/rules/inputRules'
import { useToast } from 'vue-toastification'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import useGroupApi from '@/composable/groupApi'
import trashIcon from '@/assets/logo/icons/trashIcon.vue'
import editIcon from '@/assets/logo/icons/editIcon.vue'

const { getGroups, groups, createGroup, deleteGroup, getGroupID, group, updateGroup } =
  useGroupApi()
const toast = useToast()

onMounted(async () => {
  await getGroups()
})

const groupName = ref('')
const groupDescription = ref('')
const valid = ref(false)
const groupRef = ref()
const isOpen = ref(false)

const groupNameEdit = ref<string>('')
const groupDescriptionEdit = ref<string>('')

const submit_createGroup = async () => {
  if (!groupRef.value.validate()) {
    toast.error('Please fill in all required fields')
    return
  }

  if (!groupName.value || !groupDescription.value) {
    toast.error('Please fill in all required fields')
    return
  }
  const data = {
    name: groupName.value,
    description: groupDescription.value,
  }
  await createGroup(data).finally(() => {
    groupName.value = ''
    groupDescription.value = ''
    valid.value = false
    toast.success('Group created successfully')
  })

  await getGroups()
}

const handleDeleteGroup = async (id: string) => {
  await deleteGroup(id).finally(() => {
    toast.success('Group deleted successfully')
  })
  await getGroups()
}

const handleEditGroup = async (id: string) => {
  await getGroupID(id)
  isOpen.value = true
  if (group.value) {
    groupNameEdit.value = group.value[0].name
    groupDescriptionEdit.value = group.value[0].description
  }
}

const editSubmit = async () => {
  if (!groupNameEdit.value || !groupDescriptionEdit.value) {
    toast.error('Please fill in all required fields')
    return
  }
  const data = {
    name: groupNameEdit.value,
    description: groupDescriptionEdit.value,
  }
  await updateGroup(group.value[0].id, data).finally(() => {
    groupNameEdit.value = ''
    groupDescriptionEdit.value = ''
    valid.value = false
    toast.success('Group updated successfully')
  })

  await getGroups()
  isOpen.value = false
}

const closeModal = () => {
  isOpen.value = false
}
</script>
