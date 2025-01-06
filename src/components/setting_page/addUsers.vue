<template>
  <v-card>
    <v-card-title>
      <h1 class="font-bold text-xl">Add Users</h1>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="formAddUser"
        v-model="valid"
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
          :rules="[v => !!v || 'Password is required']"
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
          :rules="[v => !!v || 'Email is required']"
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
import { multipleComboboxRules } from '@/rules/inputRules'
import { useToast } from 'vue-toastification'

import usePermRoleApi from '@/composable/permRolesApi'
import useGroupApi from '@/composable/groupApi'
import useUserApi from '@/composable/userApi'

const { getRoles, roles } = usePermRoleApi()
const { getGroups, groups } = useGroupApi()
const { postUser } = useUserApi()

const toast = useToast()
// const group = ref(sessionStorage.getItem('group'))

onMounted(async () => {
  await getRoles()
  await getGroups()
})

const userData = reactive<UserRegister>({
  username: 'comins00n',
  password: '!admin1234',
  name: 'sitthichai',
  position: 'test',
  company: 'test',
  division: 'test',
  email: 'gamesxbow@gmail.com',
  phone: '095xxxxxxx',
})
const roleId = ref<string[]>([])
const groupId = ref<string[]>([])
const valid = ref<boolean>(false)
const formAddUser = ref()

const submitForm = async () => {
  console.log('Form is valid', userData)
  if (!formAddUser.value.validate())
    return toast.error('Please fill all required fields')
  if (valid.value === false)
    return toast.error('Please fill all required fields')
  userData.name = userData.name.toLowerCase()
  await postUser(userData, roleId.value, groupId.value)
  handleCancel()
}

const handleCancel = () => {
  userData.username = ''
  userData.password = ''
  userData.name = ''
  userData.position = ''
  userData.company = ''
  userData.division = ''
  userData.email = ''
  userData.phone = ''
  roleId.value = []
  groupId.value = []
}
</script>
