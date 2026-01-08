<template>
  <div class="dashboard">
    <h1>Welcome to Admin Management System</h1>
    <p class="subtitle">This is a management system developed based on Vue3 + Vite + Ant Design Vue</p>

    <div class="stats-container">
      <a-card class="stat-card">
        <p class="stat-number">1,234</p>
        <p class="stat-label">Total Users</p>
      </a-card>
      <a-card class="stat-card">
        <p class="stat-number">567</p>
        <p class="stat-label">New Today</p>
      </a-card>
      <a-card class="stat-card">
        <p class="stat-number">89%</p>
        <p class="stat-label">Activity</p>
      </a-card>
    </div>

    <div class="action-tips">
      <a-alert
        message="Operation Tips"
        description="You can access various system functions through the left menu bar"
        type="info"
        show-icon
      />
    </div>
  </div>
</template>

<script>
// Dashboard component - displays system overview and statistics
// Shows key metrics and provides quick access to system functions
export default {
  name: 'Dashboard'
}
</script>

<style scoped>
.dashboard {
  padding: 20px 0;
}

h1 {
  color: var(--primaryColor);
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.subtitle {
  color: var(--textSecondaryColor);
  font-size: 16px;
  margin-bottom: 30px;
  transition: color 0.3s ease;
}

.stats-container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  flex: 1;
  text-align: center;
  padding: 30px 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--boxShadow) !important;
}

.stat-number {
  font-size: 36px;
  font-weight: bold;
  color: var(--primaryColor);
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.stat-label {
  font-size: 16px;
  color: var(--textSecondaryColor);
  transition: color 0.3s ease;
}

.action-tips {
  margin-top: 30px;
}
</style>