<template>
  <Space direction="vertical" style="width: 100%; gap: 16px;">
    <Header title="OTA管理" subTitle="软件升级及版本管理"/>
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

const router = useRouter()
const appStore = useAppStore()
const loading = ref(false)
const list = ref([])
const activeKey = ref([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 获取列表数据
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
    message.success('OTA下发成功')
    fetchList()
  }).catch((err) => {
    appStore.setLoading(false)
  })
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  fetchList()
}

// 表格变化处理
const handleTableChange = (pagination) => {
  Object.assign(pagination, pagination)
  fetchList()
}

// 查看详情
const handleView = (record) => {
  router.push(`/detail/${record.id}`)
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
:deep(.ant-collapse-header-text){
  font-weight: bold;
}
</style>