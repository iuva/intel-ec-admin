<template>
  <!-- Search form component for pending hosts - provides filtering options for pending host management -->
  <div class="search-container">
    <!-- Form with search criteria for pending hosts -->
    <a-form class="search-form" ref="searchForm" :model="searchModel" :label-col="{ style: { width: '100px' } }">
      <a-row>
        <a-col :span="20">
          <!-- Basic search fields row -->
          <a-row>
            <a-col :span="8">
              <a-form-item name="mac" label="mac">
                <!-- MAC address input field -->
                <a-input v-model:value="searchModel.mac" class="search-input" placeholder="Please enter"/>
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="4">
              <a-form-item label="MachineGuid" name="machine_guid">
                <!-- Machine GUID input field -->
                <a-input v-model:value="searchModel.machine_guid" class="search-input" placeholder="Please enter"/>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- Advanced search fields row (shown when expanded) -->
          <a-row v-show="deployed">
            <a-col :span="8">
              <a-form-item label="Status" name="status">
                <!-- Status dropdown with all available host statuses -->
                <a-select v-model:value="searchModel.status" class="search-input" placeholder="Please enter">
                  <a-select-option v-for="item in statusList" :key="item[0]" :value="item[0]">{{ item[1] }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Action buttons column -->
        <a-col>
          <a-space>
            <!-- Reset button - clears all search fields -->
            <a-button @click="reset">Reset</a-button>
            <!-- Search button - triggers search with current criteria -->
            <a-button type="primary" @click="submit">Search</a-button>
            <!-- Toggle button - expands/collapses advanced search options -->
            <a-button class="toggle-btn" type="link" @click="toggle">
              {{ deployed ? 'Collapse' : 'Expand' }}
              <DownOutlined :class="{ 'rotate-180': deployed }"/>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
// Search form component for pending hosts - provides filtering options for pending host management
import {ref} from 'vue'
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue'
// Import host status mapping for status dropdown
import {HostStatusMap} from '../data.js'

// Define emitted events for parent component communication
const emits = defineEmits(['submit', 'reset'])

// Reactive reference to track if advanced search is deployed (expanded)
const deployed = ref(false)
// Reference to the form instance for validation and reset
const searchForm = ref(null)
// Reactive model for search criteria
const searchModel = ref({
  mac: '',
  machine_guid: '',
  status: null
})
// Use all status entries for pending hosts (different from enabled hosts)
const statusList = [...HostStatusMap.entries()]
console.log('statusList = ', statusList)


// Toggle advanced search visibility
const toggle = () => {
  deployed.value = !deployed.value
}

// Reset search form to initial state
const reset = () => {
  console.log('reset form')
  searchForm.value.resetFields()
  searchModel.value = {
    mac: '',
    machine_guid: '',
    status: null
  }
  emits('reset')
}

// Submit search form after validation
const submit = () => {
  searchForm.value
  .validate()
  .then((values) => {
    emits('submit', values)
  })
  .catch((error) => {
  })
}

</script>
<style scoped>
.search-container {

  background-color: #ffffff;
  border-radius: var(--borderRadius);
  padding: var(--componentPadding);
  padding-bottom: 0px;

}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.search-container .search-form {
  box-shadow: none;
  width: 100%;
}

:deep(.toggle-btn.ant-btn) {
  padding: 4px 0px;
}
</style>
