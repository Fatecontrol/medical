<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  title: String,
  rightText: String
})

const onClickLeft = () => {
  // 判断是否有历史记录  有：返回上一页  有：进入主页
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
const emits = defineEmits<{ (e: 'click-right'): void }>()
const onClickRight = () => {
  emits('click-right')
}
</script>
<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :title="title"
      left-arrow
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
      color: var(--cp-primary);
    }
  }
}
</style>
