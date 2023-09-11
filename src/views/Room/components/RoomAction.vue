<template>
  <div class="room__action">
    <van-field
      type="text"
      placeholder="问医生"
      :border="false"
      autocomplete="off"
      class="input"
      :disabled="disabled"
      v-model="text"
      @keyup.enter="sendText"
    />
    <van-uploader :preview-image="false" :disabled="disabled" :after-read="afterRead">
      <cp-icons name="consult-img"></cp-icons>
    </van-uploader>
  </div>
</template>

<script setup lang="ts">
import { showLoadingToast, closeToast, showToast } from 'vant'
import { uploadImage } from '@/services/consult'
import { ref } from 'vue'
defineProps<{
  disabled: boolean
}>()
const emit = defineEmits<{
  (e: 'sendText', text: string): void
  (e: 'sendImage', data: { id: string; url: string }): void
}>()
const text = ref<string>('')
// 向父组件传递输入框的内容 父组件通过websocket发送给服务端
const sendText = () => {
  if (text.value.trim() === '') return showToast('请输入内容')
  emit('sendText', text.value)
  text.value = ''
}
// 图片上传
const afterRead = async (data: any) => {
  // console.log(data)
  if (!data.file) return
  showLoadingToast('正在上传')
  const imgRes = await uploadImage(data.file)
  console.log(imgRes)
  closeToast()
  emit('sendImage', imgRes.data)
}
</script>

<style lang="scss" scoped>
.room__action {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    flex: 1;
    background-color: var(--cp-bg);
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
  }
  .cp-icon {
    margin-left: 10px;
    width: 24px;
    height: 24px;
  }
}
</style>
