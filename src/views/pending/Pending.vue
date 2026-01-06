<script setup lang="ts">
import {ref, reactive, onMounted, onActivated, createVNode} from 'vue'
import {ExclamationCircleOutlined} from '@ant-design/icons-vue'
import {useRouter} from 'vue-router'
import {message, Modal} from 'ant-design-vue'
import {fetchPendingList, fetchMaintainEmail, maintainEmail, activateHost, deleteEnabledHost} from '@/api/host'
import {useAppStore} from '@/store/app-store'
import {columns} from './data.js'
import Header from '../../components/Header.vue'
import Search from './components/Search.vue'
import EmailModal from './components/EmailModal.vue'

const router = useRouter()
const appStore = useAppStore()
const showEmailModal = ref(false)
const isMaintainingEmail = ref(false)
const searchParams = ref({})
const pagination = reactive<{ current: number; pageSize: number; total: number; [key: string]: any; }>({
  showQuickJumper: true,
  showSizeChanger: true,
  current: 1,
  pageSize: 10,
  total: 0
})
const listData = ref([])
const email = ref('')
const onSearchReset = () => {
  console.log('搜索重置')

  getList(1, pagination.pageSize)
}
const onSearchSubmit = (values) => {
  console.log('搜索提交，参数：', values)
  searchParams.value = values
  getList(1, pagination.pageSize, values.mac, values.machine_guid, values.status)
}


const handleTableChange = (pagination, filters, sorter) => {
  console.log('表格参数变化:', pagination, filters, sorter)
  getList(pagination.current, pagination.pageSize, searchParams.value.mac, searchParams.value.machine_guid, searchParams.value.status)
}

const handleView = (record) => {
  router.push(
      {
        path: '/pending/detail',
        name: 'PendingDetail',
        params: {id: record.host_id}
      })
}

const activeHost = (record) => {
  console.log('activeHost:', record)
  Modal.confirm({
    title: '确认启用这条HOST？',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      if (record.diff_state == 1) {
        confirmActivateHost(record.diff_state, null)
      } else {
        confirmActivateHost(record.diff_state, [record.host_id])
      }
    },
    okText: '确认',
    cancelText: '取消',
    class: 'logout-modal',
  })

}
const handleEmail = () => {
  console.log('维护通知邮箱')
  showEmailModal.value = true
  getMaintainEmail()
}

const onEmailModalOK = (values) => {
  console.log('onEmailModalOK:', values)
  isMaintainingEmail.value = true
  maintainEmail(values).then((res) => {
    console.log('维护通知邮箱成功:', res)
    message.success(res.message)
    showEmailModal.value = false
  }).finally(() => {
    isMaintainingEmail.value = false
  })
}
const onEmailModalCancel = (values) => {
  console.log('onEmailModalCancel:', values)
  showEmailModal.value = false
  isMaintainingEmail.value = true
  email.value = ''
}
const getMaintainEmail = () => {
  isMaintainingEmail.value = true
  fetchMaintainEmail().then((res) => {
    console.log('获取维护通知邮箱成功:', res)
    email.value = res.data.conf_val
  }).finally(() => {
    isMaintainingEmail.value = false
  })
  console.log('获取维护通知邮箱')
}

const confirmDelete = (record) => {
  console.log('删除:', record)
  appStore.setLoading(true)
  deleteEnabledHost(record.host_id).then(res => {
    console.log('res', res)
    message.success(res.message)

    getList(pagination.current, pagination.pageSize, searchParams.value.mac, searchParams.value.machine_guid, searchParams.value.status)
  }).catch(() => {
    appStore.setLoading(false)
  })
}

const getList = (page = 1, size = 10, mac = '', mg_id = '', state = null) => {
  console.log('获取列表数据')
  appStore.setLoading(true)
  fetchPendingList({
    page: page,
    page_size: size,
    mac: mac,
    mg_id: mg_id,
    host_state: state,
  }).then((res) => {
    console.log('fetch pending list response:', res)
    if (page == 1) {

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

const confirmActivateHost = (diff_type, host_ids) => {

  console.log('aconfirmActivateHost:', diff_type, host_ids)
  appStore.setLoading(true)
  activateHost({diff_type, host_ids}).then((res) => {
    console.log('activate host response:', res)

    const data = res.data
    const failMessage = data.results.filter(item => !item.success).map((item) => item.message).join('\n')
    const successMessage = data.results.filter(item => item.success).map((item) => item.message).join('\n')
    const failed_count = data.failed_count
    const success_count = data.success_count
    if (success_count > 0) {

      message.success(successMessage)
      getList(pagination.current, pagination.pageSize, searchParams.value.mac, searchParams.value.machine_guid, searchParams.value.status)
    }
    if (failed_count > 0) {
      message.error(failMessage)
      appStore.setLoading(false)
    }

    if (success_count == 0 && failed_count == 0) {
      message.success(res.message)
      appStore.setLoading(false)
    }

  }).catch((error) => {
    appStore.setLoading(false)
  }).finally(() => {
  })

}

const batchUpgrades = () => {
  console.log('批量审批版本号升级:')
  Modal.confirm({
    title: '批量审批版本号升级',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      confirmActivateHost(1, null)
    },
    okText: '确认',
    cancelText: '取消',
    class: 'logout-modal',
  })
}

onMounted(() => {
  console.log('Pending onMounted')
  getList()
})
onActivated(() => {
  console.log('Pending onActivated')
  if (sessionStorage.getItem('needRefresh')) {
    getList(pagination.current, pagination.pageSize, searchParams.value.mac, searchParams.value.machine_guid, searchParams.value.status)
    sessionStorage.removeItem('needRefresh')
  }
})

</script>
<template>
  <div>
    <a-space direction="vertical" style="width: 100%; gap: 16px;">
      <Header title="待审批HOST" subTitle="审批通过后可进入可用HOST清单（插件可见）"/>
      <Search @reset="onSearchReset" @submit="onSearchSubmit"/>
      <!-- 数据列表 -->
      <a-table
          class="host-table"
          :columns="columns"
          :data-source="listData"
          :pagination="pagination"
          row-key="host_id"
          @change="handleTableChange">
        <template #title>
          <span>HOST列表</span>
          <a-space>
            <a-button type="primary" @click="batchUpgrades">批量审批版本号升级</a-button>
            <a-button type="primary" @click="handleEmail">维护通知邮箱</a-button>
          </a-space>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space size="small">
              <a-button size="small" type="link" @click="handleView(record)">查看</a-button>
              <a-button size="small" type="link" @click="activeHost(record)">同意启用</a-button>
              <a-popconfirm title="确认删除HOST？" ok-text="确认" cancel-text="取消" @confirm="confirmDelete(record)">
                <a-button size="small" type="link" class="delete-btn">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-space>
  </div>

  <EmailModal
      :visible.sync="showEmailModal"
      :emails="email"
      :loading="isMaintainingEmail"
      @cancel="onEmailModalCancel"
      @ok="onEmailModalOK"/>
</template>
<style scoped>
:deep(.ant-table) {
  padding: var(--componentPadding);
  background: transparent;
  box-shadow: none;
}

.host-table {
  background: #ffffff;
  border-radius: var(--borderRadius);
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

:deep(.ant-pagination) {
  padding: 0 24px;
}
</style>