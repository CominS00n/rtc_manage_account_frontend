<template>
  <section class="flex flex-col justify-center items-center h-full">
    <icon icon="document-magnifying-glass" class="text-5xl" />
    <h1 class="text-3xl font-bold">404</h1>
    <p>Page not found</p>
    <button @click="back">
      <icon icon="arrow-left" />
    </button>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import icon from '@/components/icon/nt_icon.vue'

const router = useRouter()
const back = () => router.push({ name: 'Default' })
</script>
