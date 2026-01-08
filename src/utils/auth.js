// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('access_token')
}

// Get refresh token
export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token')
}

// Save token
export const setToken = (token) => {
  localStorage.setItem('access_token', token)
}

// Save refresh token
export const setRefreshToken = (token) => {
  localStorage.setItem('refresh_token', token)
}

// Clear all tokens
export const removeToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

// Check if logged in
export const isLoggedIn = () => {
  return !!getToken()
}