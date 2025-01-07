<template>
  <v-card>
    <v-card-title>
      <h1 class="font-bold text-xl">Group</h1>
    </v-card-title>
    <v-card-text class="grid gap-4 lg:grid-cols-2">
      <v-form
        @submit.prevent="submit_createGroup"
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

        <v-btn type="submit" color="#facc15" class="w-full mt-4" :disabled="!checkPermission('groupCreate')">
          <p class="capitalize">Submit</p>
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
                    v-show="checkPermission('groupUpdate')"
                  />
                  <trash-icon
                    color="red"
                    class="cursor-pointer"
                    @click="handleDeleteGroup(group.id)"
                    v-show="checkPermission('groupDelete')"
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
                ref="editGroupRef"
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
import { checkPermission } from '@/constants/checkPermission'

import useGroupApi from '@/composable/groupApi'
import useActivityLogApi from '@/composable/activityLogApi'
import trashIcon from '@/assets/logo/icons/trashIcon.vue'
import editIcon from '@/assets/logo/icons/editIcon.vue'
import Swal from 'sweetalert2'

const {
  getGroups,
  groups,
  createGroup,
  deleteGroup,
  getGroupID,
  group,
  updateGroup,
} = useGroupApi()
const { postActivityLog } = useActivityLogApi()
const toast = useToast()

onMounted(async () => {
  await getGroups()
})

const groupName = ref('')
const groupDescription = ref('')

const groupRef = ref()
const editGroupRef = ref()
const isOpen = ref(false)

const groupNameEdit = ref<string>('')
const groupDescriptionEdit = ref<string>('')

const submit_createGroup = async () => {
  const isValid = await groupRef.value.validate()
  if (!isValid.valid) {
    toast.error('Please fill in all required fields')
    return false
  }

  if (!groupName.value || !groupDescription.value) {
    toast.error('Please fill in all required fields')
    return
  }
  const data = {
    name: groupName.value,
    description: groupDescription.value,
  }
  await createGroup(data).finally(async () => {
    groupName.value = ''
    groupDescription.value = ''
    await postActivityLog(
      'CREATE-GROUP-' + new Date().getTime(),
      localStorage.getItem('user') || '',
      'Create New group',
      `Create group [${data.name}]`,
    )
    toast.success('Group created successfully')
  })

  await getGroups()
}

const handleDeleteGroup = async (id: string) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button',
    },
  }).then(async result => {
    if (result.isConfirmed) {
      await deleteGroup(id).finally(async () => {
        await postActivityLog(
          'DELETE-GROUP-' + new Date().getTime(),
          localStorage.getItem('user') || '',
          'Delete group',
          `Delete group [${id}]`,
        )
        toast.success('Group deleted successfully')
      })
      await getGroups()
    }
  })
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
  const isValid = await editGroupRef.value.validate()
  if (!isValid.valid) {
    toast.error('Please fill in all required fields')
    return false
  }
  const data = {
    name: groupNameEdit.value,
    description: groupDescriptionEdit.value,
  }
  await updateGroup(group.value[0].id, data).finally(async () => {
    await postActivityLog(
      'UPDATE-GROUP-' + new Date().getTime(),
      localStorage.getItem('user') || '',
      'Edit group',
      `Edit group [${data.name}]`,
    )
    editGroupRef.value.reset()
  })

  await getGroups()
  isOpen.value = false
}

const closeModal = () => {
  isOpen.value = false
}
</script>
