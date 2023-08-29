<template>
  <div>
    <div class="cp__radio__btn">
      <a
        class="item"
        href.prevent=""
        v-for="item in options"
        :key="item.value"
        :class="{ active: modelValue == item.value }"
        @click="toggleItem(item.value)"
        >{{ item.label }}</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  options: {
    label: string
    value: string | number
  }[]
  modelValue?: string | number
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
const toggleItem = (value: string | number) => {
  // 触发自定义事件把数据传给父组件
  emits('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.cp__radio__btn {
  display: flex;
  flex-wrap: wrap;

  .item {
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;

    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
