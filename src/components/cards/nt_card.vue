<template>
  <div class="bg-white rounded-md p-5">
    <h2 class="text-xl font-bold">{{ props.title }}</h2>
    <slot name="detail"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
}>()
</script>
