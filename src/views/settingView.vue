<template>
  <section>
    <h1 class="font-bold text-2xl mb-3">Settings</h1>
    <div class="flex flex-row-reverse gap-4">
      <nav class="flex flex-col h-fit gap-2 sticky top-0 w-[150px]">
        <a href="#users" @click.prevent="scrollToSection('users')">#Users</a>
        <a href="#roles" @click.prevent="scrollToSection('roles')">#Roles</a>
        <a href="#implementor" @click.prevent="scrollToSection('implementor')">
          #Implementor
        </a>
        <a href="#group" @click.prevent="scrollToSection('group')">#Group</a>
      </nav>
      <v-divider vertical class="border-black border-opacity-50"></v-divider>
      <div class="flex-1 flex flex-col gap-4">
        <div id="users">
          <add-users />
        </div>
        <div id="roles">
          <add-roles />
        </div>
        <div id="implementor">
          <add-implementor />
        </div>
        <div id="group">
          <add-group />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import addImplementor from '@/components/setting_page/addImplementor.vue'
import addRoles from '@/components/setting_page/addRoles.vue'
import addUsers from '@/components/setting_page/addUsers.vue'
import addGroup from '@/components/setting_page/addGroup.vue'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
