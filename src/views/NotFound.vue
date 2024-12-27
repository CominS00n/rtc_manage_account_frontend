<template>
  <section
    class="flex justify-center items-center absolute inset-0 bg-[#f5f5f5]"
  >
    <div class="inline-flex flex-col items-center gap-6">
      <p class="text-2xl">
        <span class="font-bold">404</span> | Page not found!
      </p>
      <v-btn variant="outlined" class="w-fit" @click="back">
        <icon icon="arrow-left" />
      </v-btn>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import icon from '@/components/icon/nt_icon.vue'

const router = useRouter()
const back = () => router.push('/').then(() => location.reload())
</script>
