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
  console.log('Search reset')

  getList(1, pagination.pageSize)
}
const onSearchSubmit = (values) => {
  console.log('Search submitted, parameters:', values)
  searchParams.value = values
  getList(1, pagination.pageSize, values.mac, values.machine_guid, values.status)
}


const handleTableChange = (pagination, filters, sorter) => {
  console.log('Table parameters changed:', pagination, filters, sorter)
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
    title: 'Confirm enabling this HOST?',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      if (record.diff_state == 1) {
        confirmActivateHost(record.diff_state, null)
      } else {
        confirmActivateHost(record.diff_state, [record.host_id])
      }
    },
    okText: 'OK',
    cancelText: 'Cancel',
    class: 'logout-modal',
  })

}
const handleEmail = () => {
  console.log('Maintain notification email')
  showEmailModal.value = true
  getMaintainEmail()
}

const onEmailModalOK = (values) => {
  console.log('onEmailModalOK:', values)
  isMaintainingEmail.value = true
  maintainEmail(values).then((res) => {
    console.log('Maintain notification email successful:', res)
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
    console.log('Get maintain notification email successful:', res)
    email.value = res.data.conf_val
  }).finally(() => {
    isMaintainingEmail.value = false
  })
  console.log('Get maintain notification email')
}

const confirmDelete = (record) => {
  console.log('Delete:', record)
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
  console.log('Get list data')
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
  console.log('Batch approve version upgrade:')
  Modal.confirm({
    title: 'Batch approve version upgrade',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      confirmActivateHost(1, null)
    },
    okText: 'OK',
    cancelText: 'Cancel',
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
      <Header title="Pending HOST" subTitle="After approval, it can enter the available HOST list (plugin visible)"/>
      <Search @reset="onSearchReset" @submit="onSearchSubmit"/>
      <!-- Data list -->
      <a-table
          class="host-table"
          :columns="columns"
          :data-source="listData"
          :pagination="pagination"
          row-key="host_id"
          @change="handleTableChange">
        <template #title>
          <span>HOST List</span>
          <a-space>
            <a-button type="primary" @click="batchUpgrades">Batch Approve Version Upgrade</a-button>
            <a-button type="primary" @click="handleEmail">Maintain Notification Email</a-button>
          </a-space>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space size="small">
              <a-button size="small" type="link" @click="handleView(record)">View</a-button>
              <a-button size="small" type="link" @click="activeHost(record)">Approve Enable</a-button>
              <a-popconfirm title="Confirm delete HOST?" ok-text="OK" cancel-text="Cancel" @confirm="confirmDelete(record)">
                <a-button size="small" type="link" class="delete-btn">Delete</a-button>
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