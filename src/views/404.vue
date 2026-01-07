<script setup lang="ts">

import {Empty} from 'ant-design-vue'

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