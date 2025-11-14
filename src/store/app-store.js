import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAppStore = defineStore('app-store', () => {
  const loading = ref(false)

  function setLoading(value) {
    loading.value = value
  }
  return {
    loading,
    setLoading,
  }
})