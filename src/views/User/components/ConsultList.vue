<template>
  <div class="consult__list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ConsultItem
        v-for="item in list"
        :key="item.id"
        :item="item"
        @on-delete="handleDeleteOrder"
      ></ConsultItem>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ConsultType } from '@/types/enums'
import { getConsultOrderList } from '@/services/consult'
import type { ConsultOrderListParams, ConsultOrderItem } from '@/types/consult'
import { ref } from 'vue'
import ConsultItem from './ConsultItem.vue'
const props = defineProps<{
  type: ConsultType
}>()
const params = ref<ConsultOrderListParams>({
  type: props.type,
  current: 1,
  pageSize: 5
})
const loading = ref(false)
const finished = ref(false)
const list = ref<ConsultOrderItem[]>([])
const onLoad = async () => {
  const res = await getConsultOrderList(params.value)
  console.log(res)
  list.value.push(...res.data.rows)
  if (params.value.current < res.data.pageTotal) {
    params.value.current++
  } else {
    finished.value = true
  }
  loading.value = false
}
// 删除订单
const handleDeleteOrder = (id: string | number) => {
  list.value = list.value.filter((item) => item.id !== id)
}
</script>

<style lang="scss" scoped>
.consult__list {
  padding: 10px 15px;
}
</style>
