<template>
  <span>
    <Icon :icon="`heroicons-outline:${props.icon}`" />
  </span>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { defineProps } from 'vue'

const props = defineProps<{
  icon: string
}>()
</script>
