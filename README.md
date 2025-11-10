# CPU Admin 后台管理系统

一个基于 Vue 3 + Vite + Ant Design Vue 开发的现代化后台管理系统模板。

## ✨ 功能特性

- **用户认证**：登录系统，基于token的身份验证
- **响应式布局**：自适应不同屏幕尺寸的界面设计
- **主题切换**：支持浅色/深色主题，用户偏好持久化存储
- **路由管理**：基于Vue Router的完整路由体系，包含权限控制
- **数据展示**：表格列表、详情展示等数据呈现方式
- **网络请求**：基于Axios的HTTP请求封装
- **组件化设计**：模块化、可复用的组件结构

## 🛠 技术栈

- **前端框架**：Vue 3
- **构建工具**：Vite
- **UI组件库**：Ant Design Vue
- **路由管理**：Vue Router
- **状态管理**：（预留Vuex/Pinia集成）
- **HTTP客户端**：Axios
- **样式处理**：CSS + CSS Variables (主题切换)

## 🚀 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone [仓库地址]
cd cpu-admin
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 开发环境运行
```bash
npm run dev
# 或
yarn dev
```

4. 构建生产版本
```bash
npm run build
# 或
yarn build
```

## 📁 项目结构

```
src/
├── api/            # API接口定义
├── assets/         # 静态资源
├── components/     # 通用组件
├── layout/         # 布局组件
├── router/         # 路由配置
├── theme/          # 主题配置
├── utils/          # 工具函数
├── views/          # 页面组件
│   ├── Dashboard.vue  # 仪表盘
│   ├── List.vue       # 列表页面
│   ├── Detail.vue     # 详情页面
│   └── Login.vue      # 登录页面
├── App.vue         # 根组件
├── main.js         # 入口文件
└── style.css       # 全局样式
```

## 🔄 路由说明

| 路径 | 名称 | 组件 | 权限要求 |
|------|------|------|----------|
| /login | Login | Login.vue | 无需登录 |
| / | Dashboard | Dashboard.vue | 需要登录 |
| /list | List | List.vue | 需要登录 |
| /detail/:id | Detail | Detail.vue | 需要登录 |

## 🎨 主题功能

系统支持浅色和深色两种主题模式，通过顶部导航栏的切换开关可以随时切换。主题设置会保存在浏览器的localStorage中，下次访问时自动应用用户的偏好设置。

主题配置文件位于 `src/theme/index.js`，可以根据需要自定义颜色变量。

## 🔧 开发配置

### 环境变量配置

项目使用 `.env` 文件管理环境变量，支持开发环境和生产环境的配置分离：

- **.env.development**：开发环境配置
- **.env.production**：生产环境配置

**主要配置项：**

```
# API 基础地址
VITE_API_BASE_URL=http://localhost:8080

# 环境标识
VITE_ENV=development

# 调试模式
VITE_DEBUG=true
```

**注意事项：**
- 所有自定义环境变量需要以 `VITE_` 前缀开头才能在代码中访问
- 在代码中通过 `import.meta.env.VITE_XXX` 访问环境变量
- 修改环境变量后需要重启开发服务器才能生效

### 跨域代理配置

项目在开发环境中配置了跨域代理，将 `/api` 开头的请求代理到后端 API 服务。

### 代理配置说明

在 `vite.config.js` 中配置了如下代理规则：

```javascript
proxy: {
  '/api': {
    target: process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
    changeOrigin: true,
    rewrite: (path) => path
  }
}
```

### 开发服务器配置

- 开发服务器端口：3000
- API 请求基础路径：`/api`
- 后端服务地址：由 `VITE_API_BASE_URL` 环境变量指定

## 📦 构建与部署

执行 `npm run build` 命令后，构建产物将生成在 `dist` 目录中。可以将该目录部署到任何静态文件服务器或CDN上。

### 注意事项

- 生产构建会生成较大的chunk文件，建议在实际项目中考虑使用动态导入进行代码分割
- 部署时需要确保服务器配置正确处理单页应用的路由

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 📄 许可证

[MIT License](LICENSE)
