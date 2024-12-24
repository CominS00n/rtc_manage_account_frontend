<template>
  <section>Oops, Not Found Item</section>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue'

onUnmounted(() => {
  alert('Unmounted')
})
</script>
