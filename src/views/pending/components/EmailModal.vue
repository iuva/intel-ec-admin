<template>
  <div>
    <a-modal
        v-model:open="open"
        title="Maintain Notification Email"
        :ok-button-props="{ disabled: email_value === '' ||inputStatus === 'error' }"
        @cancel="cancel"
        :confirmLoading="modalLoading"
        @ok="handleOk"
        cancel-text="Cancel"
        ok-text="Save">
      <div>

        <a-textarea
            v-model:value="email_value"
            placeholder="Basic usage"
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
  emails: string;
  loading: boolean;
}>()
const emits = defineEmits(['cancel', 'ok'])

const open = ref(false)
const modalLoading = ref(false)
const email_value = ref('')
const inputStatus = ref('')
const inputErrorMessage = ref('')

const reset = () => {
  email_value.value = ''
  inputStatus.value = ''
  inputErrorMessage.value = ''
}

const handleOk = () => {
  emits('ok', {email: email_value.value.trim()})
}

const cancel = () => {
  console.log('email cancel')
  emits('cancel')
  reset()
}
const verifyMailbox = (input) => {
  console.log('Verify mailbox', input)
  if (/，/.test(input)) {
    return {valid: false, message: 'Please use English comma (,) to separate email addresses'}
  }

  const emails = input.trim().split(',')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  for (const email of emails) {
    const trimmed = email.trim()
    if (trimmed === '') {
      return {valid: false, message: 'Empty email item exists, please check input'}
    }
    if (!emailRegex.test(trimmed)) {
      return {valid: false, message: `Email format error: ${trimmed}`}
    }
  }

  return {valid: true, message: 'Email format correct'}
}

watch(() => props.visible, (newVal) => {
  open.value = newVal
}, {
  immediate: true,
  deep: true
})
watch(() => props.emails, (newVal) => {
  email_value.value = newVal
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
watch(email_value, (newVal) => {
  if (newVal.trim() !== '') {
    const {valid, message} = verifyMailbox(newVal)
    inputStatus.value = valid ? '' : 'error'
    inputErrorMessage.value = message
  }
}, {
  immediate: true,
  deep: true
})
</script>
