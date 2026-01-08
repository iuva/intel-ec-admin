<script setup lang="ts">
// 404 Error Page component - displays when a requested page is not found
// Provides a user-friendly error message and option to return home

import {Empty} from 'ant-design-vue'

// Use simple empty image for 404 page
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>

<template>
  <div class="container">
    <a-empty :image="simpleImage" description="Page not found" >
      <a-button type="primary" @click="$router.replace('/')">Return to Home</a-button>
    </a-empty>
  </div>
</template>

<style scoped>

.container{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>