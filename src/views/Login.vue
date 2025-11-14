<template>
  <a-row>
    <a-col :xs="0" :sm="0" :md="0" :lg="13" :xl="13" style="background-color: skyblue;">
      <div class="platform-name">
        <span>{{ appName }}</span>
      </div>
    </a-col>
    <a-col :xs="24" :sm="24" :md="24" :lg="11" :xl="11">
      <div class="login-container">
        <div class="login-form-wrapper">
          <h2 class="login-title">账号密码登录</h2>
          <a-form :model="formState" name="login" :rules="rules" ref="formRef" class="login-form">
            <a-form-item name="username">
              <a-input v-model:value="formState.username" placeholder="请输入登录账号" prefix-icon="<user-outlined />"/>
            </a-form-item>

            <a-form-item name="password">
              <a-input-password v-model:value="formState.password" placeholder="请输入密码" prefix-icon="<lock-outlined />"
                                visibilityToggle/>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" class="login-button" :loading="loading" @click="handleSubmit">
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import {ref, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {message as antdMessage} from 'ant-design-vue'
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'
import {login, refreshToken} from '../api/index'
import {setToken, setRefreshToken, getRefreshToken} from '../utils/auth'

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
    const appName = ref('')
    appName.value = import.meta.env.VITE_APP_NAME
    const formState = reactive({
      username: '',
      password: ''
    })

    const rules = {
      username: [
        {required: true, message: '请输入账号', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'}
      ]
    }

    const handleSubmit = async () => {
      try {
        await formRef.value.validate()
        loading.value = true

        // 由于是模拟环境，我们直接模拟登录成功
        // 实际项目中应该调用真实的登录接口
        const {data, message} = await login(formState)
        console.log('登录成功:', data, message)

        // const rt = getRefreshToken()
        // refreshToken(rt)

        setToken(data.token)
        setRefreshToken(data.refresh_token)

        antdMessage.success(message)
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
      handleSubmit,
      appName
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
  width: 100%;
  background: white;
}

.login-form-wrapper {
  padding: 40px;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease;

}

:deep(.login-form-wrapper .ant-form) {
  box-shadow: none
}

.login-title {
  text-align: center;
  margin-bottom: 40px;
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

.platform-name {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.platform-name span {
  color: white;
  font-size: 40px;
}
</style>