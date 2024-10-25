<template>
  <section class="fixed h-screen w-screen top-0 left-0 z-[9999]">
    <div class="flex justify-center items-center h-full">
      <div class="login">
        <nt_card title="Hollo Word!" class="max-w-96">
          <template #detail>
            <ul class="steps">
              <li class="step step-warning" data-content="">Register</li>
              <li class="step step-warning">Choose plan</li>
              <li class="step">Purchase</li>
              <li class="step">Receive Product</li>
            </ul>
          </template>
        </nt_card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import nt_card from '@/components/cards/nt_card.vue'

defineEmits(['close'])
</script>

<style scoped>
.login::before {
  content: '';
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
</style>
