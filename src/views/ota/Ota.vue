<template>
  <Space direction="vertical" style="width: 100%; gap: 16px;">
    <Header title="OTA Management" subTitle="Software upgrade and version management"/>
    <div class="list-container">

      <Space direction="vertical" style="width: 100%; gap: 16px;">
        <a-collapse v-for="item in list" :key="item.id" expandIconPosition="end" v-model:activeKey="activeKey">
          <a-collapse-panel :key="item.id" :header="item.conf_name">
            <UploadForm :ota-data="item" @submit="deployOTA"/>
          </a-collapse-panel>
        </a-collapse>
      </Space>
    </div>
  </Space>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {Space, message} from 'ant-design-vue'
import {useRouter} from 'vue-router'
import {useAppStore} from '../../store/app-store'
import {fetchOTAList, deploy} from '@/api/ota'
import UploadForm from './components/UploadForm.vue'
import Header from '@/components/Header.vue'

const appStore = useAppStore()
const list = ref([])
const activeKey = ref([])

// Get list data
const fetchList = () => {
  appStore.setLoading(true)
  fetchOTAList().then((res) => {
    console.log('fetch OTA list response:', res)
    activeKey.value = res.data.ota_configs.map((item) => item.id)
    list.value = res.data.ota_configs
  }).finally(() => {
    appStore.setLoading(false)
  })
}

const deployOTA = (data) => {
  console.log('deploy OTA data:', data)
  appStore.setLoading(true)
  deploy(data).then((res) => {
    console.log('deploy OTA response:', res)
    message.success(res.message)
    fetchList()
  }).catch(() => {
    appStore.setLoading(false)
  })
}

onMounted(() => {
  fetchList()
})
</script>

<style scoped>
.list-container {
  padding: var(--componentPadding);
  border-radius: var(--borderRadius);
  background: #ffffff;
}

:deep(.ant-collapse-header-text) {
  font-weight: bold;
}
</style>