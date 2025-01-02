<template>
  <section
    class="flex justify-center items-center absolute inset-0 bg-[#f5f5f5]"
  >
    <v-card>
      <v-card-text>
        <div class="flex items-center justify-between text-[#53595f]">
          <img src="/ntlogo.ico" alt="" class="w-12" />
          <h1 class="text-2xl font-bold">Login</h1>
        </div>
        <div class="mt-6">
          <v-text-field
            label="Username"
            variant="outlined"
            width="480"
            density="compact"
            v-model="username"
          ></v-text-field
          ><v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            label="Password"
            variant="outlined"
            :type="visible ? 'text' : 'password'"
            width="480"
            density="compact"
            v-model="password"
            @click:append-inner="visible = !visible"
          ></v-text-field>
        </div>
        <div class="flex items-center gap-x-4 mt-6">
          <v-btn @click="handleLogin" color="#facc15" class="flex-1"
            >Login</v-btn
          >
          <v-btn @click="handleBack">Cancel</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

import useLoginApi from '@/composable/loginApi'

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

const username = ref<string>('')
const password = ref<string>('')

const { login } = useLoginApi()
const visible = ref<boolean>(false)

const handleLogin = async () => {
  if (!username.value || !password.value) {
    toast.error('Please enter username and password')
    return
  }
  try {
    await login(username.value, password.value).then(res => {
      if (res.status === 401) {
        toast.error('Invalid username or password')
        return
      } else {
        userStore.setPermissions(res.permissions)
        userStore.setUser(res.name)
        sessionStorage.setItem('group', res.groups)
      }
    })
    router.push('/').then(() => {
      location.reload()
    })
  } catch (error) {
    console.error(error)
  }
}

const handleBack = () => router.push('/')
</script>

<style scoped>
input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
