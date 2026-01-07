<template>
  <div class="detail-container">
    <a-card title="Test Data Details" class="detail-card">
      <a-button type="link" @click="goBack">Return to List</a-button>

      <div v-if="loading" class="loading">
        <a-spin tip="Loading..." />
      </div>

      <div v-else-if="detailData" class="detail-content">
        <a-descriptions bordered column="2">
          <a-descriptions-item label="ID">{{ detailData.id }}</a-descriptions-item>
          <a-descriptions-item label="Name">{{ detailData.name }}</a-descriptions-item>
          <a-descriptions-item label="Description" :span="2">
            {{ detailData.description }}
          </a-descriptions-item>
          <a-descriptions-item label="Creation Time">{{ detailData.createTime }}</a-descriptions-item>
          <a-descriptions-item label="Status">
            <a-tag :color="detailData.status === 'active' ? 'success' : 'default'">
              {{ detailData.status === 'active' ? 'Active' : 'Inactive' }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="Notes" :span="2">
            {{ detailData.remark || 'None' }}
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <div v-else class="no-data">
        <a-empty description="No data" />
      </div>
    </a-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTestDetail } from '../api/index'

export default {
  name: 'Detail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const loading = ref(false)
    const detailData = ref(null)

    // 获取详情数据
    const fetchDetail = async () => {
      const id = route.params.id
      if (!id) return

      loading.value = true
      try {
        // 模拟数据，实际项目中调用真实接口
        // const res = await getTestDetail(id)
        
        // 模拟数据
        const mockDetail = {
          id: id,
          name: `Test Project${id}`,
          description: `This is the detailed description for test project${id}, including various configurations and instructions.`,
          createTime: new Date().toLocaleString(),
          status: Math.random() > 0.5 ? 'active' : 'inactive',
          remark: `This is the notes for test project${id}.`
        }

        detailData.value = mockDetail
      } catch (error) {
        console.error('获取详情失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 返回列表
    const goBack = () => {
      router.push('/list')
    }

    onMounted(() => {
      fetchDetail()
    })

    return {
      loading,
      detailData,
      goBack
    }
  }
}
</script>

<style scoped>
.detail-container {
  padding: 20px 0;
}

.detail-card {
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.loading,
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
}

.detail-content {
  margin-top: 20px;
}

:deep(.ant-descriptions-header-item) {
  color: var(--textColor) !important;
  font-weight: 600;
  transition: color 0.3s ease;
}

:deep(.ant-descriptions-item-label) {
  color: var(--textSecondaryColor) !important;
  transition: color 0.3s ease;
}

:deep(.ant-descriptions-item-content) {
  color: var(--textColor) !important;
  transition: color 0.3s ease;
}

:deep(.ant-descriptions-border) {
  border-color: var(--borderColor) !important;
  transition: border-color 0.3s ease;
}

:deep(.ant-descriptions-item) {
  border-color: var(--borderColor) !important;
  transition: border-color 0.3s ease;
}
</style>