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

const LogStatusMap = {
  0: '空闲',
  1: '启动',
  2: '成功',
  3: '失败'
};
export const columns = [
  {
    title: 'hostID',
    dataIndex: 'host_id',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
  {
    title: 'user name',
    dataIndex: 'username',
    align: 'center',
    customRender: ({text}) => text || '--',
  },
  {
    title: 'MachineGuid',
    dataIndex: 'mg_id',
    align: 'center',
    customRender: ({text}) => text || '--',
  },
  {
    title: 'mac',
    dataIndex: 'mac',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
  {

    title: '使用人',
    dataIndex: 'use_by',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'host_state',
    customRender: ({text}) => HostStatusMap.get(text) || '--',
    align: 'center'
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    align: 'center'
  }
]
export const log_columns = [
  {
    title: '日期',
    dataIndex: 'exec_date',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
  {
    title: '时间',
    dataIndex: 'exec_time',
    align: 'center',
    customRender: ({text}) => text || '--',
  },
  {
    title: '执行tc_id',
    dataIndex: 'tc_id',
    align: 'center',
    customRender: ({text}) => text || '--',
  },
  {
    title: '使用人',
    dataIndex: 'use_by',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
  {

    title: '状态',
    dataIndex: 'case_state',
    customRender: ({text}) => LogStatusMap[text] || '--',
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'result_msg',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
]