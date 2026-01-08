// Application entry point - initializes and mounts the Vue application
import { createApp } from 'vue'
// Import global styles
import './style.css'
// Import root application component
import App from './App.vue'
// Import router for navigation
import router from './router'
// Import Ant Design Vue UI library
import Antd from 'ant-design-vue'
// Import Ant Design Vue reset styles
import 'ant-design-vue/dist/reset.css'
// Import Pinia for state management
import { createPinia } from 'pinia'

// Create Vue application instance
const app = createApp(App)
// Create Pinia instance for state management
const pinia = createPinia()

// Register router plugin
app.use(router)
// Register Ant Design Vue UI library
app.use(Antd)
// Register Pinia state management
app.use(pinia)

// Mount the application to the DOM element with id 'app'
app.mount('#app')
