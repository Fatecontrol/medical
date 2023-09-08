<template>
  <div class="room__action">
    <van-field
      type="text"
      placeholder="问医生"
      :border="false"
      autocomplete="off"
      class="input"
      :disabled="true"
    />
    <van-uploader :preview-image="false" :disabled="true">
      <cp-icons name="consult-img"></cp-icons>
    </van-uploader>
  </div>
</template>

<script setup lang="ts"></script>

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
