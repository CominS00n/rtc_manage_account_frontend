<template>
  <section>
    <!-- <h1>Home</h1> -->
    <h1 class="font-bold text-2xl py-3">Overviews</h1>
    <v-card>
      <v-card-text>
        {{ accReqs }}
      </v-card-text>
    </v-card>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccReqApi } from '@/composable/accReqApi'

const { getAccReqs, accReqs } = useAccReqApi()

onMounted(async () => {
  await getAccReqs(1)
})
</script>
