<script setup lang="ts">
import {ref, onMounted, reactive, watch, createVNode} from 'vue'
import {useRoute} from 'vue-router'
import {Modal, message} from 'ant-design-vue'
import {ExclamationCircleOutlined} from '@ant-design/icons-vue'
import {EditOutlined} from '@ant-design/icons-vue'
import {useAppStore} from '@/store/app-store'
import {fetchEnabledHostDetail, fetchLogs, deactivateHost, forceOfflineHost, modifyHostPassword} from '@/api/host'
import Header from '../../components/Header.vue'
import HardwareDetail from '../../components/HardwareDetail.vue'
import {log_columns} from './data.js'
import PasswordModal from './components/PasswordModal.vue'

const route = useRoute()
const appStore = useAppStore()
const hostId = ref('')
const activeKey = ref(['1', '2', '3'])
const detail = ref(null)
const logs = ref([])
const showPasswordModal = ref(false)
const currentPassword = ref('')
const isMaintainingPassword = ref(false)

const pagination = reactive({
  showSizeChanger: true,
  current: 1,
  pageSize: 10,
  total: 0
})

const getLogs = (id, page, size = 10) => {
  appStore.setLoading(true)
  fetchLogs({host_id: id, page: page, page_size: size}).then(res => {
    console.log('res', res)
    logs.value = res.data.logs
    pagination.total = res.data.total
    pagination.current = res.data.page
    pagination.pageSize = res.data.page_size
  }).finally(() => {
    appStore.setLoading(false)
  })
}

const handleTableChange = (page, filters, sorter) => {
  console.log('表格参数变化:', page, filters, sorter)
  if (page) {
    pagination.current = page.current
    pagination.pageSize = page.pageSize
    getLogs(hostId.value, page.current, pagination.pageSize)
  }
}

const onPasswordModalCancel = () => {
  showPasswordModal.value = false
  currentPassword.value = ''
}
const onPasswordModalOK = ({password}) => {
  console.log('onPasswordModalOK', password)
  isMaintainingPassword.value = true
  modifyHostPassword(hostId.value, password).then(res => {
    showPasswordModal.value = false
    console.log('res', res)
    message.success(res.message)
    getData(hostId.value)
  }).finally(() => {
    isMaintainingPassword.value = false
  })

}

const editHostPassword = () => {
  console.log('editHostPassword')
  currentPassword.value = detail.value.password
  showPasswordModal.value = true
}


const getData = (id) => {
  appStore.setLoading(true)
  Promise.all([fetchEnabledHostDetail({host_id: id}),
    fetchLogs({host_id: id, page: pagination.current, page_size: pagination.pageSize})
  ]).then(res => {
    console.log('res', res)
    const [detailRes, logsRes] = res
    detail.value = detailRes.data
    logs.value = logsRes.data.logs
    pagination.total = logsRes.data.total
    pagination.current = logsRes.data.page
    pagination.pageSize = logsRes.data.page_size
  }).finally(() => {
    appStore.setLoading(false)
  })
}

const stopHost = () => {
  Modal.confirm({
    title: createVNode('div', {style: 'color:red;font-size:16px;'}, '确认停用这条HOST？'),
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      confirmDeactivateHost()
    },
    okText: '确认',
    cancelText: '取消',
    class: 'logout-modal',
  })
}


const offlineHost = () => {
  Modal.confirm({
    title: createVNode('div', {style: 'color:red;font-size:16px;'}, 'host未占用状态才可以下线'),
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      confirmOfflineHost()
    },
    okText: '确认',
    cancelText: '取消',
    class: 'logout-modal',
  })
}

const confirmDeactivateHost = () => {
  appStore.setLoading(true)
  deactivateHost({host_id: hostId.value}).then(res => {
    console.log('res', res)
    message.success(res.message)
    getData(hostId.value)
  }).catch(() => {
    appStore.setLoading(false)
  })
}

const confirmOfflineHost = () => {
  appStore.setLoading(true)
  forceOfflineHost({host_id: hostId.value}).then(res => {
    console.log('res', res)
    message.success(res.message)
    getData(hostId.value)
  }).catch(() => {
    appStore.setLoading(false)
  })
}


onMounted(() => {
  hostId.value = route.params.id as string
  console.log('PendingDetail onMounted', hostId.value)
  // getHostDetail(hostId.value)
  // getLogs(hostId.value, 1)
  getData(hostId.value)
})

watch(detail, (newVal) => {
  console.log('detail', newVal)
}, {
  immediate: true,
  deep: true
})
</script>

<template>
  <div style="position: relative;height: 100%">
    <a-space direction="vertical" style="width: 100%;gap: 16px;">
      <Header :title="`HOST ID: ${hostId}`" subTitle="case执行中">
        <template #action>
          <a-space :size="30">
            <a-button type="primary" @click="stopHost">停用host</a-button>
            <a-button type="primary" @click="offlineHost">下线</a-button>
          </a-space>
        </template>
      </Header>
      <div class="detail-container">
        <a-space direction="vertical" style="width: 100%; gap: 24px;">
          <a-collapse expandIconPosition="end" v-model:activeKey="activeKey">
            <a-collapse-panel key="1" header="识别信息">
              <a-row>
                <a-col span="8"><span class="detail-text">MachineGuid:  {{ detail?.mg_id ? detail.mg_id : '--' }}</span></a-col>
                <a-col span="8"><span class="detail-text">mac:  {{ detail?.mac ? detail.mac : '--' }}</span></a-col>
                <a-col span="8"><span class="detail-text">IP:  {{ detail?.ip ? detail.ip : '--' }}</span></a-col>
              </a-row>
              <a-row style="margin-top: 8px">
                <a-col span="8"><span class="detail-text">username:  {{ detail?.username ? detail.username : '--' }}</span></a-col>
                <a-col span="8"><span class="detail-text">password:  {{ detail?.password ? detail.password : '--' }} <EditOutlined
                    @click="editHostPassword"/></span></a-col>
                <a-col span="8"><span class="detail-text">port:  {{ detail?.port ? detail.port : '--' }}</span></a-col>
              </a-row>
            </a-collapse-panel>
          </a-collapse>
          <a-collapse expandIconPosition="end" v-model:activeKey="activeKey">


            <a-collapse-panel key="2" header="硬件信息">
              <HardwareDetail :info="detail?.hw_list"/>
            </a-collapse-panel>
          </a-collapse>
          <a-collapse expandIconPosition="end" v-model:activeKey="activeKey">

            <a-collapse-panel key="3" header="执行日志">
              <a-table
                  size="small"
                  class="log-table"
                  :columns="log_columns"
                  :data-source="logs"
                  :pagination="pagination"
                  row-key="id"
                  @change="handleTableChange">
              </a-table>
            </a-collapse-panel>
          </a-collapse>
        </a-space>

      </div>
    </a-space>
    <div class="footer">
      <a-button @click="$router.back()">取消</a-button>
    </div>
  </div>
  <PasswordModal
      :visible.sync="showPasswordModal"
      :password="currentPassword"
      :loading="isMaintainingPassword"
      @cancel="onPasswordModalCancel"
      @ok="onPasswordModalOK"/>
</template>

<style scoped>

.detail-container {
  padding: 24px;
  background: #ffffff;
  border-radius: var(--borderRadius);
  width: 100%;
  margin-bottom: 60px;
}

.detail-text {
  font-size: 16px;
}

:deep(.ant-collapse-header-text) {
  font-weight: bold;
}

:deep(.log-table .ant-table) {
  box-shadow: none;
}

.footer {
  height: 50px;
  background: #ffffff;
  width: calc(100% - 290px);
  padding: 0 var(--componentPadding);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  bottom: 0
}
</style>