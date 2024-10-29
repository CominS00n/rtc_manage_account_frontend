<template>
  <section>
    <div>
      <button
        @click="isModal = true"
        class="w-full bg-yellow-400 rounded-md p-2 text-white"
      >
        Login
      </button>
    </div>
    <div
      class="fixed h-screen w-screen top-0 left-0 z-[9999] flex justify-center items-center"
      v-show="isModal"
    >
      <div>
        <div
          class="fixed w-full h-full bg-black bg-opacity-50 -z-10 top-0 left-0"
          @click="handleClose"
        ></div>
        <div class="login">
          <nt_card class="max-w-96">
            <template #icon>
              <button>
                <nt_icon icon="x-mark" @click="handleClose" />
              </button>
            </template>
            <template #detail>
              <label for="username">username</label>
              <input type="text" name="username" v-model="username" />
              <label for="password">password</label>
              <input type="password" name="password" v-model="password" />
            </template>

            <template #action>
              <button @click="handleLogin">Login</button>
            </template>
          </nt_card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLoginApi from '@/composable/loginApi'

import nt_card from '@/components/cards/nt_card.vue'
import nt_icon from '@/components/icon/nt_icon.vue'

const isModal = ref<boolean>(false)
const username = ref<string>('')
const password = ref<string>('')

const { login } = useLoginApi()

const handleLogin = async () => {
  // console.log(username, password)
  await login(username.value, password.value)
  handleClose()
}

const handleClose = () => {
  isModal.value = false
}
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
