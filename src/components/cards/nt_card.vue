<template>
  <div class="bg-white rounded-md p-5">
    <div class="flex justify-between items-center">
      <h2 class=" text-xl font-bold">{{ props.title }}</h2>
      <slot name="icon"></slot>
    </div>
    <slot name="detail"></slot>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
})
</script>
