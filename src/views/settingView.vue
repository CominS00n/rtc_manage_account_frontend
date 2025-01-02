<template>
  <section>
    <h1 class="font-bold text-2xl mb-3">Settings</h1>
    <div class="flex flex-row-reverse gap-4">
      <nav class="flex flex-col h-fit gap-4 sticky top-0 w-[150px]">
        <a href="#implement">#Implementor</a>
        <a href="#roles">#Roles</a>
        <a href="#users">#Users</a>
      </nav>
      <v-divider vertical class="border-black border-opacity-50"></v-divider>
      <div class="flex flex-col gap-4">
        <add-implementor id="implement" />
        <add-roles id="roles" />
        <add-users id="users" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import addImplementor from '@/components/setting_page/addImplementor.vue'
import addRoles from '@/components/setting_page/addRoles.vue'
import addUsers from '@/components/setting_page/addUsers.vue';
</script>

<style scoped>
section {
  scroll-behavior: smooth;
}
</style>
