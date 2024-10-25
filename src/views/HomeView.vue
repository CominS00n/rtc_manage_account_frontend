<template>
  <section>
    <h1>Home</h1>
    <p>Welcome to the Home page!</p>
    <nt_card title="Hollo Word!">
      <template #detail>
        <ul class="steps">
          <li class="step step-warning" data-content="">Register</li>
          <li class="step step-warning">Choose plan</li>
          <li class="step">Purchase</li>
          <li class="step">Receive Product</li>
        </ul>
      </template>
    </nt_card>
  </section>
</template>

<script setup lang="ts">
import nt_card from '@/components/cards/nt_card.vue'
</script>
