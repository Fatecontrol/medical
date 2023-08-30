<template>
  <div class="follow__doctor__page">
    <div className="header">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <van-swipe :width="150" :show-indicators="false" :loog="false">
        <van-swipe-item v-for="item in list" :key="item.id">
          <DoctorCard :item="item"></DoctorCard>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
import { getDoctorPage } from '@/services/knowledge'
import type { DoctorList } from '@/types/consult'
import { onMounted, ref } from 'vue'
const list = ref<DoctorList>([])
const loadData = async () => {
  const doctorRes = await getDoctorPage({ current: 1, pageSize: 5 })
  console.log('doctorRes', doctorRes)

  list.value = doctorRes.data.rows
}
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.follow__doctor__page {
  background-color: var(--cp-bg);
  height: 250px;
  .header {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
