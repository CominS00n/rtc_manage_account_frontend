<template>
  <v-card>
    <v-card-title>
      <h1 class="font-bold text-xl">Add Users</h1>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="addUserRef"
        @submit.prevent="submitForm"
        class="grid gap-4 grid-cols-2"
      >
        <v-text-field
          v-model="userData.username"
          label="Username"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :rules="[v => !!v || 'Username is required']"
        />
        <v-text-field
          v-model="userData.password"
          label="Password"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :type="visible ? 'text' : 'password'"
          :rules="passwordRules"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visible = !visible"
        />
        <v-text-field
          v-model="userData.name"
          label="Fullname"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :rules="[v => !!v || 'Fullname is required']"
        />
        <v-text-field
          v-model="userData.position"
          label="Position"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :rules="[v => !!v || 'Position is required']"
        />
        <v-text-field
          v-model="userData.company"
          label="Company"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :rules="[v => !!v || 'Company is required']"
        />
        <v-text-field
          v-model="userData.division"
          label="Division"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :rules="[v => !!v || 'Division is required']"
        />
        <v-text-field
          v-model="userData.email"
          label="Email"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :rules="emailRules"
        />
        <v-text-field
          v-model="userData.phone"
          label="Phone"
          variant="outlined"
          density="compact"
          validate-on="submit"
          :rules="[v => !!v || 'Phone is required']"
        />
        <v-select
          v-model="roleId"
          :items="roles"
          item-title="name"
          item-value="id"
          label="Select Role"
          density="compact"
          variant="outlined"
          clearable
          multiple
          chips
          :rules="multipleComboboxRules"
          validate-on="submit"
        >
        </v-select>
        <v-select
          v-model="groupId"
          :items="groups"
          item-title="name"
          item-value="id"
          label="Select Group"
          density="compact"
          variant="outlined"
          clearable
          multiple
          chips
          :rules="multipleComboboxRules"
          validate-on="submit"
        >
        </v-select>
        <div class="col-span-2 flex gap-2">
          <v-btn type="submit" color="#facc15" class="flex-1">
            <p class="capitalize">Submit</p>
          </v-btn>
          <v-btn variant="outlined" @click="handleCancel">Cancel</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { UserRegister } from '@/types/ntType'

import { onMounted, reactive, ref } from 'vue'
import {
  multipleComboboxRules,
  passwordRules,
  emailRules,
} from '@/rules/inputRules'
import { useToast } from 'vue-toastification'

import usePermRoleApi from '@/composable/permRolesApi'
import useGroupApi from '@/composable/groupApi'
import useUserApi from '@/composable/userApi'

const { getRoles, roles } = usePermRoleApi()
const { getGroups, groups } = useGroupApi()
const { postUser } = useUserApi()

const toast = useToast()
const visible = ref<boolean>(false)

onMounted(async () => {
  await getRoles()
  await getGroups()
})

const userData = reactive<UserRegister>({
  username: '',
  password: '',
  name: '',
  position: '',
  company: '',
  division: '',
  email: '',
  phone: '',
})
const roleId = ref<string[]>([])
const groupId = ref<string[]>([])
const addUserRef = ref()

const submitForm = async () => {
  const isValid = await addUserRef.value.validate()
  if (!isValid) {
    toast.error('Please fill all required fields')
    return false
  }
  if (roleId.value.length === 0 || groupId.value.length === 0)
    return toast.error('Please select role or group')
  userData.name = userData.name.toLowerCase()
  await postUser(userData, roleId.value, groupId.value).finally(async () => {
    await addUserRef.value.reset()
    userData.password = ''
    toast.success('User added successfully')
    handleCancel()
  })
}

const handleCancel = async () => {
  await addUserRef.value.reset()
}
</script>
