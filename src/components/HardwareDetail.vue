<script setup>
// HardwareDetail component - displays hardware information with timestamps
import {ref, watch} from 'vue'

// Props:
//   info (Array) - array of hardware information objects with timestamps
const props = defineProps({
  info: Array
})
// Reactive reference to store hardware details
const detail = ref([])

// Watch for changes in the info prop and update the detail array
// Parameter: newVal - new value of the info prop
// Parameter: oldVal - previous value of the info prop (not used)
watch(() => props.info, (newVal, oldVal) => {
  if (newVal) {
    console.log('hw_list', newVal)
    detail.value = newVal
  }
})

</script>

<template>
  <!-- Hardware detail display component -->
  <div>
    <!-- Display hardware information if available -->
    <a-row v-if="detail.length > 0" v-for="(item, index) in detail" :key="index">
      <!-- Timestamp column -->
      <a-col :span="4">
        <div class="created_time_container">
          <!-- Visual marker - blue for first item, gray for others -->
          <div class="mark" :class="{ 'blue': index === 0, 'gray': index !== 0}"></div>
          <!-- Display formatted timestamp -->
          {{ new Date(item.created_time || item.appr_time).toLocaleString() }}
        </div>
      </a-col>

      <!-- Hardware information column -->
      <a-col :span="20">
        <!-- Display hardware information as formatted JSON -->
        <pre>{{ item.hw_info || item.hw_info.length > 0 ? JSON.stringify(item.hw_info, null, 2) : '--' }}</pre>
      </a-col>
    </a-row>
    <!-- Display message when no hardware information is available -->
    <div v-else>No hardware information</div>
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