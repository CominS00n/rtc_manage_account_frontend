<template>
  <v-card>
    <v-card-title>
      <h1 class="font-bold text-xl">Add Users</h1>
    </v-card-title>
    <v-card-text >
      <v-form ref="form" v-model="valid" @submit.prevent="submitForm" class="grid gap-4 grid-cols-2">
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
          :rules="[v => !!v || 'You must select an account type']"
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
          :rules="[v => !!v || 'You must select an account type']"
          validate-on="submit"
        >
        </v-select>
        <v-btn type="submit" color="#facc15">
          <p class="capitalize">Submit</p>
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { UserRegister } from '@/types/ntType'
import usePermRoleApi from '@/composable/permRolesApi'
import useGroupApi from '@/composable/groupApi'

const { getRoles, roles } = usePermRoleApi()
const { getGroups, groups } = useGroupApi()
// const group = ref(sessionStorage.getItem('group'))

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
const roleId = ref<string | undefined>(undefined)
const groupId = ref<string | undefined>(undefined)
const valid = ref<boolean>(false)
const form = ref()

const submitForm = () => {
  if (form.value.validate()) {
    console.log('Form is valid', userData, roleId.value)
  } else {
    console.log('Form is invalid')
  }
}
</script>
