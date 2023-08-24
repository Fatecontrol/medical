<script setup lang="ts">
import { Button as VanButton } from 'vant'
</script>

<template>
  <div class="bigbox">
    <div class="box"></div>
  </div>

  <van-button type="danger">按钮</van-button>
  <RouterView />
</template>

<style lang="scss" scoped>
.bigbox {
  width: 200px;
  height: 100px;
  background-color: #f00;
  .box {
    width: 100px;
    height: 50px;
    background-color: #ff0;
  }
}
</style>
