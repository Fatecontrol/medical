<template>
  <div class="room__page">
    <cp-nav-bar title="医生问诊室"></cp-nav-bar>
    聊天内容
    <van-button type="primary" @click="router.push('/order/pay?id=' + '6938947207249920')"
      >进入药品支付</van-button
    >
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
.room__page {
  padding-top: 46px;
}
</style>
