<template>
  <div class="list-container">
    <a-card title="测试数据列表" class="list-card">
      <!-- 搜索和筛选区域 -->
      <div class="search-bar">
        <a-input
          v-model:value="searchKeyword"
          placeholder="请输入关键词搜索"
          allow-clear
          class="search-input"
          @pressEnter="handleSearch"
        />
        <a-button type="primary" @click="handleSearch">搜索</a-button>
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
            <a-button type="link" @click="handleView(record)">查看详情</a-button>
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
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '操作',
        key: 'action',
        width: 100
      }
    ]

    // 获取列表数据
    const fetchList = async () => {
      loading.value = true
      try {
        // 模拟数据，实际项目中调用真实接口
        // const res = await getTestList({
        //   page: pagination.current,
        //   pageSize: pagination.pageSize,
        //   keyword: searchKeyword.value
        // })
        
        // 模拟数据
        const mockData = {
          list: Array.from({ length: pagination.pageSize }, (_, index) => ({
            id: (pagination.current - 1) * pagination.pageSize + index + 1,
            name: `测试项目${(pagination.current - 1) * pagination.pageSize + index + 1}`,
            description: `这是测试项目${(pagination.current - 1) * pagination.pageSize + index + 1}的描述`,
            createTime: new Date().toLocaleString()
          })),
          total: 100
        }
        
        listData.value = mockData.list
        pagination.total = mockData.total
      } catch (error) {
        console.error('获取列表失败:', error)
      } finally {
        loading.value = false
      }
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