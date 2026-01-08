// Host status mapping - maps host state codes to human-readable status strings
export const HostStatusMap = new Map([
  [0, 'Idle'],
  [1, 'Locked'],
  [2, 'Occupied'],
  [3, 'Case Executing'],
  [4, 'Offline'],
  [5, 'Pending Activation'],
  [6, 'Hardware Modification'],
  [7, 'Manually Disabled'],
  [8, 'Updating']
]);

// Log status mapping - maps log state codes to human-readable status strings
const LogStatusMap = {
  0: 'Idle',
  1: 'Start',
  2: 'Success',
  3: 'Failed'
};

// Table columns definition for enabled hosts table
// Contains configuration for displaying host information in a table
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

    title: 'User',
    dataIndex: 'use_by',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
  {
    title: 'Status',
    dataIndex: 'host_state',
    customRender: ({text}) => HostStatusMap.get(text) || '--',
    align: 'center'
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    align: 'center'
  }
]

// Table columns definition for log entries table
// Contains configuration for displaying execution log information in a table
export const log_columns = [
  {
    title: 'Date',
    dataIndex: 'exec_date',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
  {
    title: 'Time',
    dataIndex: 'exec_time',
    align: 'center',
    customRender: ({text}) => text || '--',
  },
  {
    title: 'Execute tc_id',
    dataIndex: 'tc_id',
    align: 'center',
    customRender: ({text}) => text || '--',
  },
  {
    title: 'User',
    dataIndex: 'use_by',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
  {

    title: 'Status',
    dataIndex: 'case_state',
    customRender: ({text}) => LogStatusMap[text] || '--',
    align: 'center'
  },
  {
    title: 'Notes',
    dataIndex: 'result_msg',
    customRender: ({text}) => text || '--',
    align: 'center'
  },
]