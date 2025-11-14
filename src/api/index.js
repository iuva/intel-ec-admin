import request from '../utils/request'

// 登录接口
export const login = (data) => {
  return request({
    url: '/api/v1/auth/admin/login',
    method: 'post',
    data
  })
}

// 刷新token接口
export const refreshToken = (refreshToken,token) => {
  return request({
    url: '/api/v1/auth/refresh',
    method: 'post',
    headers: { Authorization: 'Bearer ' + token },
    data: {
      refresh_token: refreshToken
    }
  })
}

// 获取测试列表数据
export const getTestList = (params) => {
  return request({
    url: '/test/list',
    method: 'get',
    params
  })
}

// 获取测试详情
export const getTestDetail = (id) => {
  return request({
    url: `/test/detail/${id}`,
    method: 'get'
  })
}