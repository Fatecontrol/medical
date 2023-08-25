<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <div class="login">
    <cp-nav-bar @click-right="router.push('/register')" right-text="注册"></cp-nav-bar>
  </div>
</template>

<style lang="scss" scoped></style>
