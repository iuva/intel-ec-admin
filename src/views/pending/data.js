// Host status mapping - maps host state codes to human-readable status strings
// Used for displaying host status in tables and UI components
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

// Table columns definition for pending hosts table
// Contains configuration for displaying pending host information in a table
// Each column specifies how to display data from the host records
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
    title: 'Status',
    dataIndex: 'host_state',
    customRender: ({ text, record, index }) => HostStatusMap.get(text) || '--',
    align: 'center'
  },
  {
    title: 'Submission Time',
    dataIndex: 'subm_time',
    customRender: ({ text, record, index }) => new Date(text).toLocaleString() || '--',
    align: 'center'
  },
  {
    title: 'Action',
    key: 'action',
    width: 80,
    align: 'center'
  }
]