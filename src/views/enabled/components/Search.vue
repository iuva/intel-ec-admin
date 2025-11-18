<template>
  <div class="search-container">
    <a-form class="search-form" ref="searchForm" :model="searchModel" label-align="right" :label-col="{ style: { width: '100px' } }">
      <a-row>
        <a-col :span="20">
          <a-row>
            <a-col :span="8">
              <a-form-item name="mac" label="mac">
                <a-input v-model:value="searchModel.mac" class="search-input" placeholder="请输入"/>
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="4">
              <a-form-item label="username" name="username">
                <a-input v-model:value="searchModel.username" class="search-input" placeholder="请输入"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-show="deployed">
            <a-col :span="8">
              <a-form-item label="状态" name="status">
                <a-select v-model:value="searchModel.status" class="search-input" placeholder="请输入">
                  <a-select-option v-for="item in statusList" :key="item[0]" :value="item[0]">{{ item[1] }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="4">
              <a-form-item label="使用人" name="use_by">
                <a-input v-model:value="searchModel.use_by" class="search-input" placeholder="请输入"/>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row v-show="deployed">
            <a-col :span="8">
              <a-form-item label="MachineGuid" name="mg_id">
                <a-input v-model:value="searchModel.mg_id" class="search-input" placeholder="请输入"/>
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="4">
            </a-col>
          </a-row>
        </a-col>
        <a-col>
          <a-space>
            <a-button @click="reset">重置</a-button>
            <a-button type="primary" @click="submit">搜索</a-button>
            <a-button class="toggle-btn" type="link" @click="toggle">
              {{ deployed ? '收缩' : '展开' }}
              <DownOutlined :class="{ 'rotate-180': deployed }"/>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue'
import {HostStatusMap} from '../data.js'

const emits = defineEmits(['submit', 'reset'])

const deployed = ref(false)
const searchForm = ref(null)
const searchModel = ref({
  mac: '',
  mg_id: '',
  use_by: '',
  username: '',
  status: null
})
const statusList = [...HostStatusMap.entries()]
console.log('statusList = ', statusList)


const toggle = () => {
  deployed.value = !deployed.value
}

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
