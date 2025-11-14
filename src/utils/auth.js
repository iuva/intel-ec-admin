// 从localStorage中获取token
export const getToken = () => {
  return localStorage.getItem('access_token')
}

// 获取refresh token
export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token')
}

// 保存token
export const setToken = (token) => {
  localStorage.setItem('access_token', token)
}

// 保存refresh token
export const setRefreshToken = (token) => {
  localStorage.setItem('refresh_token', token)
}

// 清除所有token
export const removeToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

// 判断是否已登录
export const isLoggedIn = () => {
  return !!getToken()
}