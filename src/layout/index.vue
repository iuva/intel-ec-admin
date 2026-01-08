<template>
  <a-spin :spinning="loading">
    <a-layout class="layout" :class="{ 'dark-layout': isDark }">
      <a-layout-header class="header">
        <div class="logo">
          <div style="width: 240px;margin-right: 16px">
            <AuditOutlined style="margin-right: 8px"/>
            <span class="text">{{ appName }}</span>
          </div>
          <a-button type="link" @click="toggleCollapsed" style="font-size: 16px;color: black">
            <template #icon>
              <MenuUnfoldOutlined v-if="collapsed"/>
              <MenuFoldOutlined v-else/>
            </template>
          </a-button>
        </div>

        <div class="header-actions">
          <a-button type="text" @click="handleLogout" :style="{ color: isDark ? '#e0e0e0' : '#333333' }">
            Logout
          </a-button>
        </div>
      </a-layout-header>

      <a-layout class="content-container" has-sider>
        <a-layout-sider width="240" v-model:collapsed="collapsed" class="sidebar">

          <a-menu mode="inline" :selected-keys="[selectedKey]" :default-open-keys="['enabled']"
                  class="menu-sidebar">
            <a-menu-item key="/enabled" popupClassName="custom-sub-menu" @click="navigate('/enabled')">
              <span>
                <ContainerOutlined/>
                <span>Available HOST Management</span>
              </span>
            </a-menu-item>
            <a-menu-item key="/pending" popupClassName="custom-sub-menu" @click="navigate('/pending')">
              <span>
                <AuditOutlined/>
                <span>Pending HOST</span>
              </span>
            </a-menu-item>
            <a-menu-item key="/ota" popupClassName="custom-sub-menu" @click="navigate('/ota')">
            <span>
              <CloudUploadOutlined/>
              <span>OTA Management</span>
            </span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>

        <a-layout-content class="content">
          <router-view v-slot="{ Component,route}">
            <transition name="fade" mode="out-in">
              <component
                  :is="Component"
                  :key="route.fullPath"
                  v-if="!route.meta.keepAlive"
              />
            </transition>

            <keep-alive>
              <component
                  :is="Component"
                  :key="route.fullPath"
                  v-if="route.meta.keepAlive"
              />
            </keep-alive>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-spin>
</template>

<script>
import {ref, computed, onMounted, watch, createVNode} from 'vue'
import {Modal} from 'ant-design-vue'
import {storeToRefs} from 'pinia'
import {useRouter, useRoute} from 'vue-router'
import {
  AuditOutlined,
  MenuUnfoldOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  CloudUploadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import {removeToken} from '../utils/auth'
import {isDarkTheme, saveTheme, getCurrentTheme} from '../theme/index'

import {useAppStore} from '../store/app-store'

export default {
  name: 'Layout',
  components: {
    AuditOutlined,
    CloudUploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ContainerOutlined
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const collapsed = ref(false)
    const isDark = ref(false)
    const appName = ref('')
    const currentKey = ref('')
    const appStore = useAppStore()
    appName.value = import.meta.env.VITE_APP_NAME

    const {loading} = storeToRefs(appStore)

    // Calculate currently selected menu item
    const selectedKey = computed(() => {
      const currentPath = router.currentRoute.value.path
      // When accessing detail page, highlight list menu item
      if (currentPath.includes('/detail/')) {
        return currentPath.substring(0, currentPath.lastIndexOf('/detail/'))

      }
      return currentPath
    })

    // Navigate to specified path
    const navigate = (path) => {
      router.push(path)
      currentKey.value = path
    }

    // Switch theme
    const toggleTheme = (checked) => {
      isDark.value = checked
      saveTheme(checked ? 'dark' : 'light')
      applyTheme()
    }

    // Apply theme style
    const applyTheme = () => {
      const theme = getCurrentTheme()
      const root = document.documentElement

      // Set CSS variables
      Object.keys(theme).forEach(key => {
        root.style.setProperty(`--${key}`, theme[key])
      })

      // Add/remove dark theme class
      if (isDark.value) {
        document.body.classList.add('dark-theme')
      } else {
        document.body.classList.remove('dark-theme')
      }
    }

    // Log out
    const handleLogout = () => {


      // const rt = getRefreshToken()
      // const token = getToken()
      // refreshToken(rt,token)

      Modal.confirm({
        title: createVNode('div', {style: 'color:red;font-size:16px;'}, 'Confirm logout?'),
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          removeToken()
          router.push('/login')
        },
        okText: 'OK',
        cancelText: 'Cancel',
        class: 'logout-modal',
      });
    }

    // Monitor theme changes, apply in real time
    watch(isDark, () => {
      applyTheme()
    })

    // Monitor theme changes, apply in real time
    watch(loading, () => {
      console.log('loading', loading.value)
    })

    onMounted(() => {
      // Initialize theme
      isDark.value = isDarkTheme()
      applyTheme()
    })

    const toggleCollapsed = () => {
      console.log('toggleCollapsed called')
      collapsed.value = !collapsed.value
    }

    return {
      route,
      collapsed,
      selectedKey,
      navigate,
      isDark,
      toggleTheme,
      handleLogout,
      appName,
      loading,
      toggleCollapsed
    }
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  transition: all 0.3s ease;
}

.dark-layout {
  background-color: var(--backgroundColor, #141414);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: var(--componentBackgroundColor, rgba(255, 255, 255, 0));
  box-shadow: none;
  transition: all 0.3s ease;
}


.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.logo .text {
  color: var(--primaryColor, #1890ff);
  line-height: 40px;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.sidebar {
  transition: all 0.3s ease;
}

.menu-sidebar {
  height: calc(100vh - 64px);
  border-right: 1px solid;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}

.content-container {
  position: relative;
}

.content {
  height: calc(100vh - 64px);
  overflow: auto;
  margin: 0 16px 0 16px;
  min-height: 280px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.ant-layout .ant-layout-sider {
  background-color: rgba(255, 255, 255, 0);
  margin-left: 20px;
  box-shadow: none;
}

.ant-layout .ant-layout-sider-collapsed .ant-menu-inline-collapsed {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  box-shadow: none;
}

:deep(.ant-menu-inline) {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
}

* {
  scrollbar-width: none;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* Firefox: thumb + track */
}
</style>