import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const toastOptions = {
  transition: "Vue-Toastification__fade",
  timeout: 3000,
}

router.beforeEach((to, from, next) => {
  const defaultTitle = 'Account Management';
  document.title = typeof to.meta.title === 'string' ? to.meta.title : defaultTitle;
  next();
});

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
