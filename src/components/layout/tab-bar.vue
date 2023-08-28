<template>
  <div class="layout__page">
    <van-tabbar route active-color="var(--cp-primary)" inactive-color="var(--cp-text1)">
      <van-tabbar-item v-for="item in tabBarList" :key="item.path" replace :to="item.path">
        {{ item.name }}
        <template #icon="{ active }">
          <cp-icons :name="active ? item.active : item.default"></cp-icons>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
const tabBarList = [
  {
    name: '首页',
    default: 'home-index-default',
    active: 'home-index-active',
    path: '/home'
  },
  {
    name: '健康百科',
    default: 'home-article-default',
    active: 'home-article-active',
    path: '/article'
  },
  {
    name: '消息中心',
    default: 'home-notice-default',
    active: 'home-notice-active',
    path: '/notify'
  },
  {
    name: '我的',
    default: 'home-mine-default',
    active: 'home-mine-active',
    path: '/user'
  }
]
</script>

<style lang="scss" scoped>
.layout__page {
  ::v-deep() {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }
      &__text {
        font-size: 11px;
      }
    }
  }
}
</style>
