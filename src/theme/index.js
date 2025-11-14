// 主题配置文件

// 浅色主题变量
export const lightTheme = {
	// 基础颜色
	primaryColor: '#1890ff',
	successColor: '#52c41a',
	warningColor: '#faad14',
	errorColor: '#f5222d',
	infoColor: '#1890ff',

	// 背景色
	backgroundColor: '#e6f7ff',
	componentBackgroundColor: 'rgba(255, 255, 255, 0)',

	// 文字颜色
	textColor: '#333333',
	textSecondaryColor: '#666666',
	textDisabledColor: '#999999',

	// 边框颜色
	borderColor: '#d9d9d9',
	dividerColor: '#f0f0f0',

	// 阴影
	boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',

	// 状态颜色
	hoverColor: '#f0f0f0',
	activeColor: '#e6f7ff',
}

// 深色主题变量
export const darkTheme = {
	// 基础颜色
	primaryColor: '#1890ff',
	successColor: '#52c41a',
	warningColor: '#faad14',
	errorColor: '#ff4d4f',
	infoColor: '#1890ff',

	// 背景色
	backgroundColor: '#141414',
	componentBackgroundColor: '#1f1f1f',

	// 文字颜色
	textColor: '#e0e0e0',
	textSecondaryColor: '#a0a0a0',
	textDisabledColor: '#666666',

	// 边框颜色
	borderColor: '#3f3f3f',
	dividerColor: '#2c2c2c',

	// 阴影
	boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',

	// 状态颜色
	hoverColor: '#2c2c2c',
	activeColor: '#1a3f5f',
}

// 获取当前主题
export const getCurrentTheme = () => {
	const theme = localStorage.getItem('theme') || 'light'
	return theme === 'dark' ? darkTheme : lightTheme
}

// 保存主题到localStorage
export const saveTheme = (theme) => {
	localStorage.setItem('theme', theme)
}

// 判断是否为深色主题
export const isDarkTheme = () => {
	return localStorage.getItem('theme') === 'dark'
}
