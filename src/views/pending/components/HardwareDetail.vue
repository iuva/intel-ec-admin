<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
  info: Array
})
const detail = ref([])

watch(() => props.info, (newVal, oldVal) => {
  if (newVal) {
    console.log('hw_list', newVal)
    detail.value = newVal
  }
})

</script>

<template>

  <div>
    <a-row v-for="(item, index) in detail" :key="index">
      <a-col :span="4">
        {{item.created_time}}
      </a-col>

      <a-col :span="20">
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>

</style>