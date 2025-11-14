<template>
  <div>
    <a-modal
        v-model:open="open"
        title="修改HOST密码"
        :ok-button-props="{ disabled: password_value === '' ||inputStatus === 'error' }"
        @cancel="cancel"
        :confirmLoading="modalLoading"
        @ok="handleOk"
        cancel-text="取消"
        ok-text="保存">
      <div>

        <a-input
            v-model:value="password_value"
            placeholder="请输入新密码"
            :rows="4"
            :status="inputStatus"/>
        <div style="height:10px">
          <span style="color: red" v-if="inputStatus === 'error'">{{ inputErrorMessage }}</span>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue'

const props = defineProps<{
  visible: boolean;
  password?: string;
  loading: boolean;
}>()
const emits = defineEmits(['cancel', 'ok'])

const open = ref(false)
const modalLoading = ref(false)
const password_value = ref('')
const inputStatus = ref('')
const inputErrorMessage = ref('')

const reset = () => {
  password_value.value = ''
  inputStatus.value = ''
  inputErrorMessage.value = ''
}

const handleOk = () => {
  emits('ok', {password: password_value.value.trim()})
  password_value.value = ''
}

const cancel = () => {
  console.log('email cancel')
  emits('cancel')
  reset()
}
const verifyPassword = (input) => {
  console.log('Verify password', input)
  if (input.trim() === '') {
    return {valid: false, message: '请输入新密码'}
  }

  return {valid: true, message: '密码格式正确'}
}

watch(() => props.visible, (newVal) => {
  open.value = newVal
}, {
  immediate: true,
  deep: true
})
watch(() => props.password, (newVal) => {
  console.log('password', newVal)
  password_value.value = newVal
}, {
  immediate: true,
  deep: true
})
watch(() => props.loading, (newVal) => {
  modalLoading.value = newVal
}, {
  immediate: true,
  deep: true
})
watch(password_value, (newVal) => {
  if (newVal && newVal.trim() !== '') {
    const {valid, message} = verifyPassword(newVal)
    inputStatus.value = valid ? '' : 'error'
    inputErrorMessage.value = message
  }
}, {
  immediate: true,
  deep: true
})
</script>
