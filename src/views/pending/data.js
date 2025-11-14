export const HostStatusMap = new Map([
  [0, '空闲'],
  [1, '已锁定'],
  [2, '已占用'],
  [3, 'case执行中'],
  [4, '离线'],
  [5, '待激活'],
  [6, '硬件改动'],
  [7, '手动停用'],
  [8, '更新中']
]);
export const columns = [
  {
    title: 'hostID',
    dataIndex: 'host_id',
    customRender: ({ text, record, index }) => text || '--',
    align: 'center'
  },
  {
    title: 'MachineGuid',
    dataIndex: 'mg_id',
    align: 'center',
    customRender: ({ text, record, index }) => text || '--',
  },
  {
    title: 'mac',
    dataIndex: 'mac_addr',
    customRender: ({ text, record, index }) => text || '--',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'host_state',
    customRender: ({ text, record, index }) => HostStatusMap.get(text) || '--',
    align: 'center'
  },
  {
    title: '申报时间',
    dataIndex: 'subm_time',
    customRender: ({ text, record, index }) => new Date(text).toLocaleString() || '--',
    align: 'center'
  },
  {
    title: '操作',
    key: 'action',
    width: 80,
    align: 'center'
  }
]