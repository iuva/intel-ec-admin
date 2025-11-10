<template>
  <a-layout class="layout" :class="{ 'dark-layout': isDark }">
    <!-- 头部 -->
    <a-layout-header class="header">
      <div class="logo">后台管理系统</div>
      <div class="header-actions">

        <!-- 退出登录 -->
        <a-button 
          type="text" 
          @click="handleLogout"
          :style="{ color: isDark ? '#e0e0e0' : '#333333' }"
        >
          退出登录
        </a-button>
      </div>
    </a-layout-header>
    
    <a-layout>
      <!-- 左侧菜单栏 -->
      <a-layout-sider 
        width="256" 
        :theme="isDark ? 'dark' : 'light'" 
        v-model:collapsed="collapsed"
        class="sidebar"
      >
        <a-menu
          mode="inline"
          :selected-keys="[selectedKey]"
          :default-open-keys="['sub1']"
          class="menu-sidebar"
          :style="{
            backgroundColor: isDark ? '#1f1f1f' : '#ffffff',
            borderRightColor: isDark ? '#3f3f3f' : '#e8e8e8'
          }"
        >
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span>测试管理</span>
              </span>
            </template>
            <a-menu-item key="/list" @click="navigate('/list')">
              <span>列表页面</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      
      <!-- 右侧内容区 -->
      <a-layout-content class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined } from '@ant-design/icons-vue'
import { login, refreshToken } from '../api/index'
import { removeToken, getRefreshToken } from '../utils/auth'
import { isDarkTheme, saveTheme, getCurrentTheme } from '../theme/index'

export default {
  name: 'Layout',
  components: {
    UserOutlined
  },
  setup() {
    const router = useRouter()
    const collapsed = ref(false)
    const isDark = ref(false)
    
    // 计算当前选中的菜单项
    const selectedKey = computed(() => {
      const currentPath = router.currentRoute.value.path
      // 当访问详情页时，高亮列表菜单项
      if (currentPath.includes('/detail/')) {
        return '/list'
      }
      return currentPath
    })
    
    // 导航到指定路径
    const navigate = (path) => {
      router.push(path)
    }
    
    // 切换主题
    const toggleTheme = (checked) => {
      isDark.value = checked
      saveTheme(checked ? 'dark' : 'light')
      applyTheme()
    }
    
    // 应用主题样式
    const applyTheme = () => {
      const theme = getCurrentTheme()
      const root = document.documentElement
      
      // 设置CSS变量
      Object.keys(theme).forEach(key => {
        root.style.setProperty(`--${key}`, theme[key])
      })
      
      // 添加/移除深色主题类
      if (isDark.value) {
        document.body.classList.add('dark-theme')
      } else {
        document.body.classList.remove('dark-theme')
      }
    }
    
    // 退出登录
    const handleLogout = () => {


        const rt = getRefreshToken()
        refreshToken(rt)

      // removeToken()
      // router.push('/login')
    }
    
    // 监听主题变化，实时应用
    watch(isDark, () => {
      applyTheme()
    })
    
    onMounted(() => {
      // 初始化主题
      isDark.value = isDarkTheme()
      applyTheme()
    })
    
    return {
      collapsed,
      selectedKey,
      navigate,
      isDark,
      toggleTheme,
      handleLogout
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
  background: var(--componentBackgroundColor, #ffffff);
  box-shadow: var(--boxShadow, 0 2px 8px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: var(--primaryColor, #1890ff);
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
  height: 100%;
  border-right: 1px solid;
  transition: all 0.3s ease;
}

.content {
  margin: 24px;
  padding: 24px;
  background: var(--componentBackgroundColor, #ffffff);
  min-height: 280px;
  border-radius: 8px;
  box-shadow: var(--boxShadow, 0 2px 8px rgba(0, 0, 0, 0.1));
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
</style>