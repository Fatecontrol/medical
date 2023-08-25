<script setup lang="ts">
import { Button as VanButton } from 'vant'
</script>

<template>
  <div class="bigbox">
    <div class="box">
      <div class="small"></div>
      <div class="small"></div>
    </div>
  </div>

  <van-button type="danger">按钮</van-button>
  <RouterView />
</template>

<style lang="scss" scoped>
.bigbox {
  width: 375px;
  height: 375px;
  border-radius: 50%;
  background-color: #f00;
  position: relative;
  .box {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 70px;
    left: 65px;
    background-color: #00a28e;
    border-radius: 50px;
    padding: 20px;
    .small {
      width: 50px;
      height: 50px;
      background-color: #ff0;
      border-radius: 50%;
    }
  }
}
</style>
