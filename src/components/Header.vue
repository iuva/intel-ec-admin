<template>
  <!-- Header component - displays page title and subtitle with optional action slot -->
  <div class="header-container">

    <div class="title-container">
      <!-- Main title of the page -->
      <div class="title">{{ title }}</div>
      <!-- Subtitle providing additional context -->
      <div class="sub-title">{{ subTitle }}</div>
    </div>
    <!-- Optional action slot for buttons or other elements -->
    <div>
      <slot name="action"/>
    </div>
  </div>
</template>
<script setup lang="ts">
// Header component - displays page title and subtitle with optional action slot
// Props:
//   title (string) - main title text
//   subTitle (string) - subtitle text providing additional context
defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  }
})
</script>
<style scoped>
.header-container {
  background-color: #ffffff;
  border-radius: var(--borderRadius);
  padding: 24px 48px 24px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.title-container .title {
  font-size: 20px;
  font-weight: 600;
  color: #333333;
}

.title-container .sub-title {
  margin-top: 14px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}
</style>