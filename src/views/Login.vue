<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <h2 class="login-title">后台管理系统</h2>
      <a-form
        :model="formState"
        name="login"
        :rules="rules"
        ref="formRef"
        class="login-form"
      >
        <a-form-item label="账号" name="username">
          <a-input
            v-model:value="formState.username"
            placeholder="请输入账号"
            prefix-icon="<user-outlined />"
          />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入密码"
            prefix-icon="<lock-outlined />"
            visibilityToggle
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-button"
            :loading="loading"
            @click="handleSubmit"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login, refreshToken } from '../api/index'
import { setToken, setRefreshToken, getRefreshToken } from '../utils/auth'

export default {
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const router = useRouter()
    const formRef = ref()
    const loading = ref(false)
    const formState = reactive({
      username: '',
      password: ''
    })

    const rules = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    }

    const handleSubmit = async () => {
      try {
        await formRef.value.validate()
        loading.value = true

        // 由于是模拟环境，我们直接模拟登录成功
        // 实际项目中应该调用真实的登录接口
        const { data } = await login(formState)
        
        // const rt = getRefreshToken()
        // refreshToken(rt)

        setToken(data.token)
        setRefreshToken(data.refresh_token)
        
        message.success('登录成功')
        router.push('/')
      } catch (error) {
        console.error('登录失败:', error)
        // message.error('登录失败，请检查账号密码')
      } finally {
        loading.value = false
      }
    }

    return {
      formRef,
      loading,
      formState,
      rules,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, var(--primaryColor) 0%, #764ba2 100%);
  transition: background 0.3s ease;
}

.login-form-wrapper {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 400px;
  max-width: 90%;
  transition: all 0.3s ease;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: var(--primaryColor);
  font-size: 24px;
  transition: color 0.3s ease;
}

.login-form {
  width: 100%;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
  transition: all 0.3s ease;
}

/* 深色主题下的登录表单样式 */
body.dark-theme .login-form-wrapper {
  background: var(--componentBackgroundColor);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

body.dark-theme .login-title {
  color: var(--primaryColor);
}
</style>