<script setup lang="ts">
import {ref, reactive, onMounted, onActivated, createVNode} from 'vue'
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import {message, Modal} from 'ant-design-vue'
import {ExclamationCircleOutlined} from '@ant-design/icons-vue'
import {fetchEnabledList, deactivateHost, forceOfflineHost, deleteEnabledHost} from '@/api/host'
import {useAppStore} from '@/store/app-store'
import {columns} from './data.js'
import Header from '../../components/Header.vue'
import Search from './components/Search.vue'

const router = useRouter()
const appStore = useAppStore()

const pagination = reactive({current: 1, pageSize: 10, total: 0})
const listData = ref([])
const searchParams = ref({})

const onSearchReset = () => {
  console.log('搜索重置')

  getList(1, pagination.pageSize)
}
const onSearchSubmit = (values) => {
  console.log('搜索提交，参数：', values)
  searchParams.value = values
  getList(1, pagination.pageSize, values.mac, values.username, values.mg_id, values.status, values.use_by)
}


const handleTableChange = (page, filters, sorter) => {
  console.log('表格参数变化:', page, filters, sorter)
  if (page) {
    pagination.current = page.current
    pagination.pageSize = page.pageSize

    getList(page.current, pagination.pageSize, searchParams.value.mac, searchParams.value.username, searchParams.value.mg_id, searchParams.value.status, searchParams.value.use_by)
  }
}

const handleView = (record) => {
  console.log('查看详情:', record)
  router.push({path: '/enabled/detail', name: 'EnabledDetail', params: {id: record.host_id}})
}

const confirmDelete = (record) => {
  console.log('删除:', record)
  appStore.setLoading(true)
  deleteEnabledHost(record.host_id).then(res => {
    console.log('res', res)
    message.success(res.message)
    getList(pagination.current, pagination.pageSize, searchParams.value.mac, searchParams.value.username, searchParams.value.mg_id, searchParams.value.status, searchParams.value.use_by)
  }).catch(() => {
    appStore.setLoading(false)
  })
}

const getList = (page = 1, size = 10, mac = '', username = '', mg_id = '', state = null, use_by = '') => {
  appStore.setLoading(true)
  console.log('获取列表数据')
  fetchEnabledList({
    page: page,
    page_size: size,
    mac: mac,
    username: username,
    use_by: use_by,
    mg_id: mg_id,
    host_state: state,
  }).then((res) => {
    console.log('fetch pending list response:', res)
    if (page == pagination.current) {
      listData.value = res.data.hosts
    } else {
      listData.value = listData.value.concat(res.data.hosts)
    }
    pagination.current = page
    pagination.pageSize = size
    pagination.total = res.data.total
  }).finally(() => {
    appStore.setLoading(false)
  })
}

const stopHost = (record) => {
  Modal.confirm({
    title: createVNode('div', {style: 'color:red;font-size:16px;'}, '确认停用这条HOST？'),
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      confirmDeactivateHost(record)
    },
    okText: '确认',
    cancelText: '取消',
    class: 'logout-modal',
  })
}

const offlineHost = (record) => {
  Modal.confirm({
    title: createVNode('div', {style: 'color:red;font-size:16px;'}, '确认强制下线这条HOST？'),
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      confirmOfflineHost(record)
    },
    okText: '确认',
    cancelText: '取消',
    class: 'logout-modal',
  })
}

const confirmDeactivateHost = (record) => {
  appStore.setLoading(true)
  deactivateHost({host_id: record.host_id}).then(res => {
    console.log('res', res)
    message.success(res.message)
    getList(pagination.current, pagination.pageSize, searchParams.value.mac, searchParams.value.username, searchParams.value.mg_id, searchParams.value.status, searchParams.value.use_by)

  }).catch(() => {
    appStore.setLoading(false)
  })
}

const confirmOfflineHost = (record) => {
  appStore.setLoading(true)
  forceOfflineHost({host_id: record.host_id}).then(res => {
    console.log('res', res)
    message.success(res.message)
    getList(pagination.current, pagination.pageSize, searchParams.value.mac, searchParams.value.username, searchParams.value.mg_id, searchParams.value.status, searchParams.value.use_by)
  }).catch(() => {
    appStore.setLoading(false)
  })
}

onMounted(() => {
  console.log('Pending onMounted')
  getList()
})
onActivated(() => {
  console.log('Pending onActivated')
})

</script>
<template>
  <div style="height: 100%;overflow: auto">
    <a-space direction="vertical" style="width: 100%; gap: 16px">
      <Header title="可用HOST管理" subTitle="HOST测试机管理"/>
      <Search @reset="onSearchReset" @submit="onSearchSubmit"/>
      <!-- 数据列表 -->
      <a-table
          class="host-table"
          :columns="columns"
          :data-source="listData"
          :pagination="pagination"
          row-key="id"
          @change="handleTableChange">
        <template #title>
          <span>HOST列表</span>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space size="small">
              <a-button size="small" type="link" @click="handleView(record)">查看</a-button>
              <a-button size="small" type="link" @click="stopHost(record)">停用</a-button>
              <a-button size="small" type="link" @click="offlineHost(record)">强制下线</a-button>
              <a-popconfirm
                  title="确认删除HOST？"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="confirmDelete(record)"
              >
                <a-button size="small" type="link" class="delete-btn">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-space>
  </div>
</template>
<style scoped>
:deep(.ant-table) {
  padding: 24px;
  height: 100%;
  overflow: auto;
}

:deep(.ant-table-wrapper .ant-table-title) {
  padding: 0 16px 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.delete-btn.ant-btn-link {
  color: red;
}
</style>