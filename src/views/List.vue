<template>
  <div class="list-container">
    <a-card title="Test Data List" class="list-card">
      <!-- 搜索和筛选区域 -->
      <div class="search-bar">
        <a-input
          v-model:value="searchKeyword"
          placeholder="Please enter keyword to search"
          allow-clear
          class="search-input"
          @pressEnter="handleSearch"
        />
        <a-button type="primary" @click="handleSearch">Search</a-button>
      </div>

      <!-- 数据列表 -->
      <a-table
        :columns="columns"
        :data-source="listData"
        :pagination="pagination"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleView(record)">View Details</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTestList } from '../api/index'

export default {
  name: 'List',
  setup() {
    const router = useRouter()
    const searchKeyword = ref('')
    const listData = ref([])
    const loading = ref(false)
    
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0
    })

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: 'Creation Time',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: 'Action',
        key: 'action',
        width: 100
      }
    ]

    // Get list data
    const fetchList = async () => {
      loading.value = true
      try {
        // 模拟数据，实际项目中调用真实接口
        // const res = await getTestList({
        //   page: pagination.current,
        //   pageSize: pagination.pageSize,
        //   keyword: searchKeyword.value
        // })

        // Mock data
        const mockData = {
          list: Array.from({ length: pagination.pageSize }, (_, index) => ({
            id: (pagination.current - 1) * pagination.pageSize + index + 1,
            name: `Test Project${(pagination.current - 1) * pagination.pageSize + index + 1}`,
            description: `This is the description for test project${(pagination.current - 1) * pagination.pageSize + index + 1}`,
            createTime: new Date().toLocaleString()
          })),
          total: 100
        }

        listData.value = mockData.list
        pagination.total = mockData.total
      } catch (error) {
        console.error('Failed to get list:', error)
      } finally {
        loading.value = false
      }
    }

    // Search
    const handleSearch = () => {
      pagination.current = 1
      fetchList()
    }

    // Table change handling
    const handleTableChange = (pagination) => {
      Object.assign(pagination, pagination)
      fetchList()
    }

    // View details
    const handleView = (record) => {
      router.push(`/detail/${record.id}`)
    }

    onMounted(() => {
      fetchList()
    })

    return {
      searchKeyword,
      listData,
      loading,
      pagination,
      columns,
      handleSearch,
      handleTableChange,
      handleView
    }
  }
}
</script>

<style scoped>
.list-container {
  padding: 20px 0;
}

.list-card {
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.search-bar {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.search-input {
  width: 300px;
  transition: all 0.3s ease;
}

:deep(.ant-table-thead > tr > th) {
  background-color: var(--componentBackgroundColor) !important;
  color: var(--textColor) !important;
  border-color: var(--borderColor) !important;
  transition: all 0.3s ease;
}

:deep(.ant-table-tbody > tr > td) {
  border-color: var(--borderColor) !important;
  transition: all 0.3s ease;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: var(--hoverColor) !important;
}
</style>