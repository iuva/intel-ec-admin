import request from '../utils/request'

export const uploadFile = (data) => {
  return request({
    url: '/api/v1/host/file/upload',
    headers: {'Content-Type': 'multipart/form-data'},
    method: 'post',
    data,
  })
}

export const fetchFileUrl = (filename) => {
  return request({
    url: `/api/v1/host/file/${filename}`,
    method: 'get'
  })
}
