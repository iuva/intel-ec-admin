import request from '../utils/request'

export const fetchPendingList = (params) => {
  return request({
    url: '/api/v1/host/admin/appr-host/list',
    method: 'get',
    params,
  })
}

export const fetchEnabledList = (params) => {
  return request({
    url: '/api/v1/host/admin/host/list',
    method: 'get',
    params,
  })
}

export const maintainEmail = (data) => {
  return request({
    url: '/api/v1/host/admin/appr-host/maintain-email',
    method: 'post',
    data,
  })
}

export const fetchMaintainEmail = (params) => {
  return request({
    url: '/api/v1/host/admin/appr-host/maintain-email',
    method: 'get',
    params,
  })
}

export const fetchEnabledHostDetail = (params) => {
  return request({
    url: '/api/v1/host/admin/host/detail',
    method: 'get',
    params,
  })
}
export const fetchPendingHostDetail = (params) => {
  return request({
    url: '/api/v1/host/admin/appr-host/detail',
    method: 'get',
    params,
  })
}

export const fetchLogs = (params) => {
  return request({
    url: '/api/v1/host/admin/host/exec-logs',
    method: 'get',
    params,
  })
}
export const activateHost = (data) => {
  return request({
    url: '/api/v1/host/admin/appr-host/approve',
    method: 'post',
    data,
  })
}

export const deactivateHost = (data) => {
  return request({
    url: '/api/v1/host/admin/host/disable',
    method: 'put',
    data,
  })
}

export const forceOfflineHost = (data) => {
  return request({
    url: '/api/v1/host/admin/host/force-offline',
    method: 'post',
    data,
  })
}

export const deleteEnabledHost = (id) => {
  return request({
    url: `/api/v1/host/admin/host/${id}`,
    method: 'delete'
  })
}


export const modifyHostPassword = (host_id, password) => {
  return request({
    url: `/api/v1/host/admin/host/password`,
    method: 'put',
    data: {
      host_id,
      password
    }
  })
}
