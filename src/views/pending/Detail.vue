<script setup lang="ts">
import {ref, onMounted, onUnmounted, createVNode} from 'vue'
import {ExclamationCircleOutlined} from '@ant-design/icons-vue'
import {useRoute, useRouter} from 'vue-router'
import {message, Modal} from 'ant-design-vue'
import {fetchPendingHostDetail, activateHost} from '@/api/host'
import {useAppStore} from '@/store/app-store'
import HardwareDetail from '../../components/HardwareDetail.vue'
import Header from '../../components/Header.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const hostId = ref('')
const activeKey = ref(['1', '2'])
const detail = ref(null)
const hardware = ref([])
const getHostDetail = (id) => {
  appStore.setLoading(true)
  fetchPendingHostDetail({host_id: id}).then(res => {
    console.log('res', res)
    detail.value = res.data
    hardware.value = res.data.hw_list
  }).finally(() => {
    appStore.setLoading(false)
  })
}
const activeHost = () => {
  console.log('activeHost:', detail.value)
  Modal.confirm({
    title: '确认启用这条HOST？',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {

      if (detail.value.diff_state == 1) {
        confirmActivateHost(detail.value.diff_state, null)
      } else {
        confirmActivateHost(detail.value.diff_state, [hostId.value])
      }
    },
    okText: '确认',
    cancelText: '取消',
    class: 'logout-modal',
  })

}
const confirmActivateHost = (diff_type, host_ids) => {

  console.log('confirmActivateHost:', diff_type, host_ids)
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
    }
    if (failed_count > 0) {
      message.error(failMessage)
    } else {
      sessionStorage.setItem('needRefresh', '1')
      router.back()
    }
  }).catch((error) => {
    appStore.setLoading(false)
  }).finally(() => {
  })

}

onMounted(() => {
  hostId.value = route.params.id as string
  console.log('PendingDetail onMounted', hostId.value)
  getHostDetail(hostId.value)
})
onUnmounted(() => {
  detail.value = null
})
</script>

<template>
  <div style="position: relative;height: 100%">
    <a-space direction="vertical" style="width: 100%;gap: 16px;">
      <Header :title="`待审批HOST: ${hostId}`" subTitle="潜在的硬件改动">
        <template #action>
          <a-button :disabled="!detail || appStore.loading" @click="activeHost(detail)" type="primary">同意启用</a-button>
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
                <a-col span="8"><span class="detail-text">password:  {{ detail?.password ? detail.password : '--' }}</span></a-col>
                <a-col span="8"><span class="detail-text">port:  {{ detail?.port ? detail.port : '--' }}</span></a-col>
              </a-row>
            </a-collapse-panel>

          </a-collapse>
          <a-collapse expandIconPosition="end" v-model:activeKey="activeKey">
            <a-collapse-panel key="2" header="硬件信息">
              <HardwareDetail :info="detail?.hw_list"/>
              <!--{{detail?.hw_list}}-->
            </a-collapse-panel>
          </a-collapse>
        </a-space>
      </div>

    </a-space>
    <div class="footer">
      <a-button @click="$router.back()">取消</a-button>
    </div>
  </div>
</template>

<style scoped>

.detail-container {
  padding: 24px;
  background: #ffffff;
  border-radius: var(--borderRadius);
  width: 100%;
  height: 100%;
  margin-bottom: 60px;
}

.detail-text {
  font-size: 16px;
}

:deep(.ant-collapse-header-text) {
  font-weight: bold;
}

.footer {
  position: fixed;
  bottom: 0;
  height: 50px;
  background: #ffffff;
  width: calc(100% - 290px);
  padding: 0 var(--componentPadding);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>