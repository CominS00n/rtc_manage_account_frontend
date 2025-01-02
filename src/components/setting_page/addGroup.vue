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
        <div class="h-full max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg">
          <v-list lines="one">
            <v-list-item
              v-for="group in groups"
              :key="group.id"
              :title="group.name"
              :subtitle="group.description"
            >
              <template #append>
                <div class="flex gap-x-4">
                  <edit-icon class="cursor-pointer" />
                  <trash-icon color="red" class="cursor-pointer" />
                </div>
              </template>
              <v-divider class="border-opacity-100 mt-2"></v-divider>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { inputDefaultRules } from '@/rules/inputRules'
import { useToast } from 'vue-toastification'

import useGroupApi from '@/composable/groupApi'
import trashIcon from '@/assets/logo/icons/trashIcon.vue'
import editIcon from '@/assets/logo/icons/editIcon.vue'

const { getGroups, groups, createGroup } = useGroupApi()
const toast = useToast()

onMounted(async () => {
  await getGroups()
})

const groupName = ref('')
const groupDescription = ref('')
const valid = ref(false)
const groupRef = ref()

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
</script>
