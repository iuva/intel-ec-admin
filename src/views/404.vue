<script setup lang="ts">

import {Empty} from 'ant-design-vue'

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>

<template>
  <div class="container">
    <a-empty :image="simpleImage" description="没有找到页面" >
      <a-button type="primary" @click="$router.replace('/')">返回首页</a-button>
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