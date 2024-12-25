<template>
  <section>
    <h1 class="font-bold text-2xl py-3">Settings</h1>
    <div class="grid grid-cols-2 gap-4">
      <v-card class="h-fit">
        <v-card-title>
          <h1 class="font-bold text-xl">Add Implementor</h1>
        </v-card-title>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel
              title="Add Implementor"
              variant="inset"
              collapse-icon="mdi-minus"
              expand-icon="mdi-plus"
            >
              <template #text>
                <v-text-field label="Name" v-model="name" variant="outlined" />
                <v-text-field
                  label="Email"
                  v-model="email"
                  variant="outlined"
                />
                <v-btn @click="addImplementor"> Save </v-btn>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-list lines="one">
            <v-list-item
              v-for="n in 3"
              :key="n"
              :title="'Implementor ' + n"
              subtitle="example@mail.com"
            >
              <template #append> <v-btn>Delete</v-btn> </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card class="h-fit">
        <v-card-title>
          <h1 class="font-bold text-xl">Add Implementor</h1>
        </v-card-title>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel
              title="Add Implementor"
              variant="inset"
              collapse-icon="mdi-minus"
              expand-icon="mdi-plus"
            >
              <template #text>
                <v-text-field label="Name" v-model="name" variant="outlined" />
                <v-text-field
                  label="Email"
                  v-model="email"
                  variant="outlined"
                />
                <v-btn @click="addImplementor"> Save </v-btn>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-list lines="one">
            <v-list-item
              v-for="n in 3"
              :key="n"
              :title="'Implementor ' + n"
              subtitle="example@mail.com"
            >
              <template #append> <v-btn>Delete</v-btn> </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card class="h-fit">
        <v-card-title>
          <h1 class="font-bold text-xl">Add Implementor</h1>
        </v-card-title>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel
              title="Add Implementor"
              variant="inset"
              collapse-icon="mdi-minus"
              expand-icon="mdi-plus"
            >
              <template #text>
                <v-text-field label="Name" v-model="name" variant="outlined" />
                <v-text-field
                  label="Email"
                  v-model="email"
                  variant="outlined"
                />
                <v-btn @click="addImplementor"> Save </v-btn>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-list lines="one">
            <v-list-item
              v-for="n in 3"
              :key="n"
              :title="'Implementor ' + n"
              subtitle="example@mail.com"
            >
              <template #append> <v-btn>Delete</v-btn> </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card class="h-fit">
        <v-card-title>
          <h1 class="font-bold text-xl">Add Implementor</h1>
        </v-card-title>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel
              title="Add Implementor"
              variant="inset"
              collapse-icon="mdi-minus"
              expand-icon="mdi-plus"
            >
              <template #text>
                <v-text-field label="Name" v-model="name" variant="outlined" />
                <v-text-field
                  label="Email"
                  v-model="email"
                  variant="outlined"
                />
                <v-btn @click="addImplementor"> Save </v-btn>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-list lines="one">
            <v-list-item
              v-for="n in 3"
              :key="n"
              :title="'Implementor ' + n"
              subtitle="example@mail.com"
            >
              <template #append> <v-btn>Delete</v-btn> </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const name = ref<string>('')
const email = ref<string>('')

const addImplementor = () => {
  console.log(name.value, email.value)
}
</script>
