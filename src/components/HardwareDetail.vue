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
    <a-row v-if="detail.length > 0" v-for="(item, index) in detail" :key="index">
      <a-col :span="4">
        <div class="created_time_container">
          <div class="mark" :class="{ 'blue': index === 0, 'gray': index !== 0}"></div>
          {{ new Date(item.created_time || item.appr_time).toLocaleString() }}
        </div>
      </a-col>

      <a-col :span="20">
        <pre>{{ item.hw_info || item.hw_info.length > 0 ? JSON.stringify(item.hw_info, null, 2) : '--' }}</pre>
      </a-col>
    </a-row>
    <div v-else>暂无硬件信息</div>
  </div>
</template>

<style scoped>

.created_time_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mark {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.blue {
  background-color: #1890ff;
}

.gray {
  background-color: #9f9f9f;
}

pre {
  background: #1e1e1e;
  padding: 16px;
  border-radius: 8px;
  color: #f8f8f2;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
}

code {
  background: #1e1e1e;
  padding: 16px;
  border-radius: 8px;
  color: #f8f8f2;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
}

</style>