# CPU Admin Backend Management System

A modern backend management system template developed based on Vue 3 + Vite + Ant Design Vue.

## ✨ Features

- **User Authentication**: Login system, token-based authentication, supports automatic token refresh
- **Responsive Layout**: Interface design that adapts to different screen sizes
- **Theme Switching**: Supports light/dark themes, user preferences stored persistently
- **Routing Management**: Complete routing system based on Vue Router, including permission control
- **Data Display**: Table lists, detail views, device management, OTA updates and other data presentation methods
- **Network Requests**: HTTP request encapsulation based on Axios, supports cross-origin proxy
- **State Management**: Custom Store state management, supports application state persistence
- **File Upload**: Supports file upload functionality
- **Device Management**: Device lists, device details, device status monitoring
- **OTA Updates**: Firmware online upgrade functionality
- **Component Design**: Modular, reusable component structure

## 🛠 Tech Stack

- **Frontend Framework**: Vue 3
- **Build Tool**: Vite
- **UI Component Library**: Ant Design Vue
- **Routing Management**: Vue Router
- **State Management**: Custom Store state management
- **HTTP Client**: Axios
- **Style Processing**: CSS + CSS Variables (theme switching)

## 🚀 Quick Start

### Environment Requirements

- Node.js 16+
- npm or yarn

### Installation Steps

1. Clone the project
```bash
git clone [repository address]
cd cpu-admin
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run in development environment
```bash
npm run dev
# or
yarn dev
```

4. Build production version
```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── api/            # API interface definitions
│   ├── index.js    # Authentication related APIs
│   ├── host.js     # Host management APIs
│   ├── ota.js      # OTA update APIs
│   └── upload.js   # File upload APIs
├── assets/         # Static resources
├── components/     # Common components
│   ├── Header.vue      # Top navigation
│   ├── HardwareDetail.vue  # Hardware details
│   ├── HelloWorld.vue  # Example component
│   └── JSONViewer.vue  # JSON viewer
├── layout/         # Layout components
│   └── index.vue   # Main layout
├── router/         # Routing configuration
│   ├── index.js    # Routing instance
│   └── routers.js  # Routing configuration
├── store/          # State management
│   └── app-store.js # Application state management
├── theme/          # Theme configuration
│   └── index.js    # Theme management
├── utils/          # Utility functions
│   ├── auth.js     # Authentication utilities
│   └── request.js  # Request encapsulation
├── views/          # Page components
│   ├── Dashboard.vue      # Dashboard
│   ├── List.vue           # List page
│   ├── Detail.vue         # Detail page
│   ├── Login.vue          # Login page
│   ├── 404.vue            # 404 page
│   ├── enabled/           # Enabled devices pages
│   ├── pending/           # Pending devices pages
│   └── ota/               # OTA update pages
├── App.vue         # Root component
├── main.js         # Entry file
└── style.css       # Global styles
```

## 🔄 Routing Guide

| Path | Name | Component | Permission Required |
|------|------|-----------|---------------------|
| /login | Login | Login.vue | No login required |
| / | Dashboard | Dashboard.vue | Login required |
| /list | List | List.vue | Login required |
| /detail/:id | Detail | Detail.vue | Login required |
| /enabled | Enabled Devices | enabled/ | Login required |
| /pending | Pending Devices | pending/ | Login required |
| /ota | OTA Update | ota/ | Login required |

## 🎨 Theme Functionality

The system supports two theme modes: light and dark. Themes can be switched anytime through the toggle switch in the top navigation bar. Theme settings are saved in the browser's localStorage and automatically applied according to user preferences on the next visit.

Theme configuration file is located at `src/theme/index.js`, and color variables can be customized as needed.

**CSS Variable Definitions:**
- `--primary-color`: Primary color
- `--bg-color`: Background color
- `--text-color`: Text color
- `--border-color`: Border color

## 🔧 Development Configuration

### Environment Variable Configuration

The project uses `.env` files to manage environment variables, supporting configuration separation between development and production environments:

- **.env.development**: Development environment configuration
- **.env.production**: Production environment configuration

**Main Configuration Items:**

```
# API Base Address
VITE_API_BASE_URL=http://127.0.0.1:8000

# Environment Identifier
VITE_ENV=development

# Debug Mode
VITE_DEBUG=true
```

**Notes:**
- All custom environment variables need to start with the `VITE_` prefix to be accessible in code
- Access environment variables in code via `import.meta.env.VITE_XXX`
- Restart the development server after modifying environment variables for changes to take effect

### Cross-Origin Proxy Configuration

The project configures a cross-origin proxy in the development environment, proxying requests starting with `/api` to the backend API service.

#### Proxy Configuration Explanation

The following proxy rules are configured in `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
    changeOrigin: true,
    rewrite: (path) => path
  }
}
```

#### Development Server Configuration

- Development server port: 3000 (automatically uses 3001 if occupied)
- API request base path: `/api`
- Backend service address: specified by `VITE_API_BASE_URL` environment variable
- Supports hot reload: automatically refreshes page after code modifications

## 📦 Build and Deployment

### Build Command

```bash
npm run build
```

After executing the build command, build artifacts will be generated in the `dist` directory.

### Deployment Steps

1. Build project: `npm run build`
2. Deploy the `dist` directory to a static file server or CDN
3. Configure server to support single-page application routing (such as Nginx's try_files configuration)
4. Configure production environment variables

### Notes

- Production builds generate large chunk files, consider using dynamic imports for code splitting in actual projects
- Ensure server configuration properly handles single-page application routing during deployment
- Recommend enabling Gzip compression to optimize loading performance

## 🔌 API Interface Specifications

### Authentication Interfaces
- `POST /api/login` - User login
- `POST /api/refresh-token` - Refresh token

### Device Management Interfaces
- `GET /api/hosts` - Get device list
- `GET /api/hosts/:id` - Get device details

### OTA Update Interfaces
- `POST /api/ota/upload` - Upload firmware file
- `POST /api/ota/update` - Execute OTA update

## 🔐 Authentication Mechanism

The system adopts token-based authentication:
- Returns access_token and refresh_token after successful login
- access_token is used for API request authentication, with a short validity period
- refresh_token is used to refresh access_token, with a longer validity period
- Request interceptor automatically handles token expiration refresh

## 📊 State Management

Use custom Store to manage application state:
- User information (login status, user data)
- Theme settings (current theme mode)
- Device list data
- Global loading state

## 🤝 Contribution

Welcome to submit Issues and Pull Requests to improve this project.

## 📄 License

[MIT License](LICENSE)