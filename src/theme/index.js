// Theme configuration file

// Light theme variables
export const lightTheme = {
	// Basic colors
	primaryColor: '#1890ff',
	successColor: '#52c41a',
	warningColor: '#faad14',
	errorColor: '#f5222d',
	infoColor: '#1890ff',

	// Background color
	backgroundColor: '#f2f9ff',
	componentBackgroundColor: 'rgba(255, 255, 255, 0)',

	// Text color
	textColor: '#333333',
	textSecondaryColor: '#666666',
	textDisabledColor: '#999999',

	// Border color
	borderColor: '#d9d9d9',
	dividerColor: '#f0f0f0',

	// Shadow
	boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',

	// Status colors
	hoverColor: '#f0f0f0',
	activeColor: '#e6f7ff',
}

// Dark theme variables
export const darkTheme = {
	// Basic colors
	primaryColor: '#1890ff',
	successColor: '#52c41a',
	warningColor: '#faad14',
	errorColor: '#ff4d4f',
	infoColor: '#1890ff',

	// Background color
	backgroundColor: '#141414',
	componentBackgroundColor: '#1f1f1f',

	// Text color
	textColor: '#e0e0e0',
	textSecondaryColor: '#a0a0a0',
	textDisabledColor: '#666666',

	// Border color
	borderColor: '#3f3f3f',
	dividerColor: '#2c2c2c',

	// Shadow
	boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',

	// Status colors
	hoverColor: '#2c2c2c',
	activeColor: '#1a3f5f',
}

// Get current theme
export const getCurrentTheme = () => {
	const theme = localStorage.getItem('theme') || 'light'
	return theme === 'dark' ? darkTheme : lightTheme
}

// Save theme to localStorage
export const saveTheme = (theme) => {
	localStorage.setItem('theme', theme)
}

// Check if it's dark theme
export const isDarkTheme = () => {
	return localStorage.getItem('theme') === 'dark'
}
