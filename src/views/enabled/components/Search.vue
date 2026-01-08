<template>
  <!-- Search form component - provides filtering options for host management -->
  <div class="search-container">
    <!-- Form with search criteria -->
    <a-form class="search-form" ref="searchForm" :model="searchModel" label-align="right" :label-col="{ style: { width: '100px' } }">
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
              <a-form-item label="username" name="username">
                <!-- Username input field -->
                <a-input v-model:value="searchModel.username" class="search-input" placeholder="Please enter"/>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- Advanced search fields row (shown when expanded) -->
          <a-row v-show="deployed">
            <a-col :span="8">
              <a-form-item label="Status" name="status">
                <!-- Status dropdown with available host statuses -->
                <a-select v-model:value="searchModel.status" class="search-input" placeholder="Please enter">
                  <a-select-option v-for="item in statusList" :key="item[0]" :value="item[0]">{{ item[1] }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="4">
              <a-form-item label="User" name="use_by">
                <!-- User input field -->
                <a-input v-model:value="searchModel.use_by" class="search-input" placeholder="Please enter"/>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- Additional advanced search fields row -->
          <a-row v-show="deployed">
            <a-col :span="8">
              <a-form-item label="MachineGuid" name="mg_id">
                <!-- Machine GUID input field -->
                <a-input v-model:value="searchModel.mg_id" class="search-input" placeholder="Please enter"/>
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="4">
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
// Search form component - provides filtering options for host management
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
  mg_id: '',
  use_by: '',
  username: '',
  status: null
})

// Filter status list to show only statuses with key < 5 (relevant for enabled hosts)
const statusList = [...HostStatusMap.entries()].filter(([key]) => key < 5)
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
    mg_id: '',
    use_by: '',
    username: '',
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
}

</script>
<style scoped>
.search-container {

  background-color: #ffffff;
  border-radius: var(--borderRadius);
  padding: 24px 24px 0px;

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
