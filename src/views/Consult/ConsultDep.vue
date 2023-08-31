<template>
  <div class="consult__dep__page">
    <cp-nav-bar title="选择科室"></cp-nav-bar>
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="item in allDep" :key="item.id" :title="item.name" />
      </van-sidebar>
      <div class="sub__dep">
        <router-link to="/consult/illness" v-for="item in subDep" :key="item.id">{{
          item.name
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAllDep } from '@/services/knowledge'
import type { TopDep } from '@/types/consult'
const active = ref(0)
const allDep = ref<TopDep[]>([])
const subDep = computed(() => {
  return allDep.value[active.value]?.child
})
onMounted(async () => {
  const depRes = await getAllDep()
  // console.log('depRes', depRes)
  allDep.value = depRes.data
})
</script>

<style lang="scss" scoped>
.consult__dep__page {
  padding-top: 46px;

  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;

    .van-sidebar {
      width: 114px;

      &-item {
        padding: 14px;
        color: var(--cp-tag);

        &--select {
          color: var(--cp-main);
          font-weight: normal;

          &::before {
            display: none;
          }
        }
      }
    }

    .sub__dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;

      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>
