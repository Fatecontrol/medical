<template>
  <div class="knowledge__list">
    <div class="knowledge-list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <KnowledgeCard v-for="item in list" :key="item.id" :item="item"></KnowledgeCard>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { getKnowledgePage } from '@/services/knowledge'
import type { KnowledgeList, KnowledgeParams, KnowledgeType } from '@/types/consult'
import { ref } from 'vue'
const props = defineProps<{
  type: KnowledgeType
}>()
const loading = ref(false)
const finished = ref(false)
const list = ref<KnowledgeList>([])
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const onLoad = async () => {
  // 加载数据
  const knowledgeRes = await getKnowledgePage(params.value)
  console.log('knowledgeRes', knowledgeRes)

  list.value.push(...knowledgeRes.data.rows)

  // 模拟加载完毕
  if (params.value.current > knowledgeRes.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>
.knowledge__list {
  padding: 0 15px;
}
</style>
