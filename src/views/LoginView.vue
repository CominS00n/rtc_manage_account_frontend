<template>
  <section>
    <div class="login h-screen flex justify-center items-center">
      <nt_card class="max-w-96">
        <template #detail>
          <label for="username">username</label>
          <input type="text" name="username" v-model="username" />
          <label for="password">password</label>
          <input type="password" name="password" v-model="password" />
        </template>
        <template #action>
          <button @click="handleLogin">Login</button>
          <button @click="handleBack">Cancel</button>
        </template>
      </nt_card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

import useLoginApi from '@/composable/loginApi'

import nt_card from '@/components/cards/nt_card.vue'

const router = useRouter()
const userStore = useUserStore()

const username = ref<string>('')
const password = ref<string>('')

const { login } = useLoginApi()

const handleLogin = async () => {
  try {
    await login(username.value, password.value).then(res => {
      if (res) {
        userStore.setPermissions(res.permissions)
        userStore.setUser(res.name)
      }
    })
    router.push('/')
    // .then(() => {
    //   location.reload()
    // })
  } catch (error) {
    console.error(error)
  }
}

const handleBack = () => router.go(-1)
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
