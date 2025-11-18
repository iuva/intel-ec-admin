<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'
import {useRoute} from 'vue-router'
import {fetchPendingHostDetail} from '@/api/host'
import {useAppStore} from '@/store/app-store'
import HardwareDetail from '../../components/HardwareDetail.vue'
import Header from '../../components/Header.vue'

const route = useRoute()
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
          <a-button type="primary">同意启用</a-button>
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