import {defineStore} from 'pinia'
import {ref} from 'vue'

// Application store - manages global application state
// Contains loading state that can be shared across components
export const useAppStore = defineStore('app-store', () => {
  // Global loading state - indicates if any operation is in progress
  const loading = ref(false)

  // Set loading state - updates the global loading indicator
  // Parameter: value (boolean) - true to show loading, false to hide
  function setLoading(value) {
    loading.value = value
  }
  return {
    loading,
    setLoading,
  }
})