<template>
  <section>
    <h1 class="font-bold text-2xl mb-3">Settings</h1>
    <div class="flex flex-col gap-4">
      <add-implementor />
      <add-roles />
    </div>
  </section>
</template>

<script lang="ts" setup>
import addImplementor from '@/components/setting_page/addImplementor.vue'
import addRoles from '@/components/setting_page/addRoles.vue'
</script>
